/*
 Regular Views
 
 A view is a virtual table based on a SELECT statement.
 A view does not store data; it only executes the query and returns the results.
 compute results each time they are queried
 
 Materialized Views
 
 A materialized view is a database object that contains the precomputed results of a query 
 Stored  in the physical database i.e. disks, not in the memory. 
 They are created by the database engine and are used to improve performance.
 
 Key Characteristics
 - 1- Physical Storage: Results are stored on disk
 - 2- Periodic Refresh: Need to be refreshed to stay current with source data
 - 3- Query Performance: Faster access to computed results
 - 4- Storage Space: Requires additional storage compared to regular views
 
 Types of Refresh Methods
 - 1- Complete Refresh: Entire view is recomputed
 - 2- Incremental Refresh: Only changes are updated
 - 3- On-Demand Refresh: Manual refresh when needed
 - 4- Scheduled Refresh: Automatic refresh at specified intervals
 
 Advantages
 - 1- Performance: Faster query execution
 - 2- Complex Computations: Pre - calculated results
 - 3- Reduced Server Load: Less real - time computation
 - 4- Data Consistency: Snapshot of data at a point in time
 
 Disadvantages
 - Storage Space: Requires additional disk space
 - Data Freshness: May not reflect real - time data
 - Maintenance: Requires refresh strategy
 - Development Complexity: Need to manage refresh timing
 */
-- Creating a base table
CREATE TABLE sales (
    sale_id INT PRIMARY KEY,
    product_id INT,
    sale_date DATE,
    amount DECIMAL(10, 2)
);

-- Creating a materialized view for monthly sales summary
CREATE MATERIALIZED VIEW monthly_sales_summary AS
SELECT
    DATE_TRUNC('month', sale_date) AS month,
    SUM(amount) AS total_sales,
    COUNT(*) AS number_of_sales
FROM
    sales
GROUP BY
    DATE_TRUNC('month', sale_date) WITH DATA;

-- Refreshing the materialized view
REFRESH MATERIALIZED VIEW monthly_sales_summary;