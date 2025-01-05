-- ACID
-- Atomicity
-- Consistency
-- Isolation
-- Durability
--------------------------------
-- Atomicity: A transaction is an atomic unit of work that either succeeds or fails completely.
-- If a transaction has two operations, and one fails, and other one succeeds
-- then the transaction should revert back to the original state.
BEGIN TRANSACTION;

-- operation 1
UPDATE
    account
SET
    balance = balance - 1000
WHERE
    account_id = 1;

-- operation 2
UPDATE
    account
SET
    balance = balance + 1000
WHERE
    account_id = 2;

-- Deposit
COMMIT;

-- If operation 1 completes but operation 2 fails, then the transaction should revert back to the original state.
--------------------------------
-- Consistency: A transaction should change the db from one valid state to another valid state.
-- If a transaction is successful, it must leave the database in a consistent state.
-- If a transaction is unsuccessful, it must leave the database in the same state as before the transaction.
-- Constraint: Account balance must never be negative
CREATE TABLE account (
    account_id INT PRIMARY KEY,
    balance DECIMAL CHECK (balance >= 0)
);

BEGIN TRANSACTION;

-- This will fail if it would make balance negative
UPDATE
    account
SET
    balance = balance - 1000
WHERE
    account_id = 1;

COMMIT;

-- If updates succeed, then the transaction is committed and the changes are made permanent.
-- If updates fail, then the transaction is rolled back and the changes are not made permanent.
-- In secod scenario, account balance will not be updated.
--------------------------------
-- Isolation: If there are multiple concurrent transactions,
-- each transaction should be isolated from the others.
-- If a transaction is running, it should not be affected by other transactions.
-- Transaction 1
BEGIN TRANSACTION;

SELECT
    balance
FROM
    account
WHERE
    account_id = 1;

-- Reads $1000
-- Some processing time
UPDATE
    account
SET
    balance = balance - 100
WHERE
    account_id = 1;

COMMIT;

-- Transaction 2 (concurrent)
BEGIN TRANSACTION;

SELECT
    balance
FROM
    account
WHERE
    account_id = 1;

-- Also reads $1000
-- Some processing time
UPDATE
    account
SET
    balance = balance - 200
WHERE
    account_id = 1;

COMMIT;

-- In this scenario, transaction 2 will not be affected by transaction 1.
-- Transaction 1 will commit and update the balance to $900.
-- Transaction 2 will commit and update the balance to $700.
-- This is because the transactions are isolated from each other.
-- Isolation Levels (from strongest to weakest)
-- 1 - SERIALIZABLE
-- -----i - Strongest isolation
-- -----ii - Transactions execute as if they were serial
-- -----iii - Highest consistency, lowest concurrency
-- -----iv - Most expensive in terms of performance
-- 2 - REPEATABLE READ
-- -----i - Prevents dirty reads and non-repeatable reads
-- -----ii - Same data is read during entire transaction
-- 3 - READ COMMITTED
-- -----i - Most commonly used
-- -----ii - Only reads committed data
-- -----iii - Allows non-repeatable reads
-- 4 - READ UNCOMMITTED
-- -----i - Weakest isolation
-- -----ii - Allows dirty reads
-- -----iii - Highest concurrency, lowest consistency
--------------------------------
-- Durability: Once a transaction is committed, it should remain in the database even if there is system crash.
BEGIN TRANSACTION;

INSERT INTO
    audit_log (action, timestamp)
VALUES
    ('payment_received', NOW());

UPDATE
    account
SET
    balance = balance + 500
WHERE
    account_id = 1;

COMMIT;

-- Even if the system crashes immediately after COMMIT,
-- these changes will be preserved when the system recovers