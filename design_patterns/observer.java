/*
 * Observer Pattern:
 * 
 * It is a behavioral design pattern that allows you to define a subscription mechanism
 * to notify multiple objects about any events/state changes that happen to the object they are observing.
 */

public interface Observer {
    void update(String message);
}

public class ConcreteObserver implements Observer {
    private String name;

    public ConcreteObserver(String name) {
        this.name = name;
    }

    @Override
    public void update(String message) {
        System.out.println(name + " received message: " + message);
    }
}

public interface Subject {
    void addObserver(Observer observer);

    void removeObserver(Observer observer);

    void notifyObservers(String message);

    void setState(String state);
}

public class ConcreteSubject implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private String state;

    @Override
    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    @Override
    public void removeObserver(Observer observer) {
        observers.remove(observer);
    }

    @Override
    public void notifyObservers(String message) {
        for (Observer observer : observers) {
            observer.update(message);
        }
    }

    public void setState(String state) {
        this.state = state;
    }
}

public class Main {
    public static void main(String[] args) {
        Subject subject = new ConcreteSubject();
        Observer observer1 = new ConcreteObserver("Observer 1");
        Observer observer2 = new ConcreteObserver("Observer 2");
        subject.addObserver(observer1);
        subject.addObserver(observer2);
        // When the state of the subject changes, the observers are notified
        subject.setState("Hello, observers!");
        subject.notifyObservers("Hello, observers!");
    }
}

// Practical Example:

// Chat Application:
// When a user sends a message, the message is sent to all the observers (other
// users in the chat)
// The observers are notified and the message is displayed in their chat window.
