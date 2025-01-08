/*
 * Strategy Pattern:
 * 
 * It is one of the behavioral design patterns.
 * It is used when we have multiple algorithms for one specific task
 * and we let the client program choose the actual implementation
 * of the algorithm at runtime.
 * 
 * Example: Collection.sort() method.
 * 
 * It sorts the elements of a collection based on the
 * strategy we pass to it. i.e. we can pass a strategy
 * to sort the elements in ascending order or descending order.
 * 
 * Our example includes a strategy to implement Payment based
 * on credit card or paypal
 */

public interface PaymentStrategy {
    public void pay(int amount);
}

public class CreditCardPayment implements PaymentStrategy {
    String name;
    String cardNumber;
    String cvv;
    String dateOfExpiry;

    public CreditCardPayment(String name, String cardNumber, String cvv, String dateOfExpiry) {
        this.name = name;
        this.cardNumber = cardNumber;
        this.cvv = cvv;
        this.dateOfExpiry = dateOfExpiry;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paid with credit card: " + amount);
    }
}

public class PaypalPayment implements PaymentStrategy {

    String email;
    String password;

    public PaypalPayment(String email, String password) {
        this.email = email;
        this.password = password;
    }

    @Override
    public void pay(int amount) {
        System.out.println("Paid with paypal: " + amount);
    }
}

public class Item {
    String name;
    int price;

    public Item(String name, int price) {
        this.name = name;
        this.price = price;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }
}

public class ShoppingCart {
    List<Item> items;

    public ShoppingCart() {
        this.items = new ArrayList<>();
    }

    public void addItem(Item item) {
        this.items.add(item);
    }

    public void removeItem(Item item) {
        this.items.remove(item);
    }

    public int calculateTotal() {
        int sum = 0;
        for (Item item : items) {
            sum += item.getPrice();
        }
        return sum;
    }

    public void pay(PaymentStrategy paymentType) {
        int amount = calculateTotal();
        paymentType.pay(amount);
    }
}

public class StrategyPatternDemo {
    public static void main(String[] args) {
        ShoppingCart cart = new ShoppingCart();
        cart.addItem(new Item("Item 1", 100));
        cart.addItem(new Item("Item 2", 200));

        // pay with paypal
        cart.pay(new PaypalPayment("john@example.com", "password"));

        // pay with credit card
        cart.pay(new CreditCardPayment("John Doe", "1234567890", "123", "12/24"));
    }

}

/*
 * This pattern is also called policy pattern.
 * 
 * It is similiar to State pattern.
 * 
 * It is used when we have multiple algorithms for one specific task
 * and we let the client program choose the actual implementation
 * of the algorithm at runtime.
 * 
 * vs
 * 
 * State pattern is used when we have context variable in the state
 * and we decide the implementation of the state at runtime based
 * on this state or context
 */
