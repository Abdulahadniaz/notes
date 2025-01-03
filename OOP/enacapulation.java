// Encapsulation

/*
 * It is a mechanism which is used to bundle the attributes and methods that
 * operate on these attribute
 * into a single class or unit
 * It is also a way to restrict direct access to some of object's attributes
 * It is also used to hide the internal details
 * Interact with such units with the help of interfaces
 */

// Encapsulation: Achieved through access modifiers (private, protected, public)

// Encapsulation Example
public class BankAccount {
    // Private attributes - data hiding
    private double balance;
    private String accountNumber;
    private String accountHolder;

    // Constructor
    public BankAccount(String accountHolder, String accountNumber) {
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.balance = 0.0;
    }

    // Public methods to access and modify the private attributes
    public double getBalance() {
        return balance;
    }

    public String getAccountNumber() {
        return accountNumber;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    // Method to deposit money
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: $" + amount);
        } else {
            System.out.println("Invalid deposit amount");
        }
    }

    // Method to withdraw money
    public void withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: $" + amount);
        } else {
            System.out.println("Invalid withdrawal amount or insufficient funds");
        }
    }
}

public class enacpsulation {
    public static void main(String[] args) {
        BankAccount account = new BankAccount("John Doe", "1234567890");

        account.deposit(1000);
        System.out.println("Balance: $" + account.getBalance());

        account.withdraw(500);
        System.out.println("Balance: $" + account.getBalance());

        // This won't work because balance is private
        // account.balance = 1000000; // Compilation error!
    }
}