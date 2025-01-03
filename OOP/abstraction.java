// An interface or abstract class is a blueprint or base implementation
// for the actual implementation that will be done by the class which implements
// this interface or abstract class

// Interfaces can't have any concrete implementations.
// Abstract base classes can.
// This allows you to provide concrete implementations in abstract classes.
// This can allow an abstract base class to actually provide a more rigorous
// contract,
// whereas an interface really only describes how a class is used.

// Abstraction is a concept in OOP in which complex implementation details of
// class is hidden from the user and only relevant info is provided
// Real Life Example -> Turn on car key -> Turns on engine
// User only knows that key need to be turned. User doesn't know how the engine
// is starting or working

// Abstraction: Achieved through abstract classes and interfaces

// We have two abstractions: 1. Data Abstraction 2. Process Abstraction

/*
 * Data Abstraction: Hiding the clas variables by keeping them private
 * However, for interaction, we will provide the public methods
 */

/*
 * Process Abstraction: Same as above. When processes are hidden from users
 */

public interface Car {

    void turnOnCar();

    void turnOffCar();

    String getCarType();
}

public class abstraction implements Car {

    private String carType = "Manual";

    @Override
    public void turnOnCar() {
        System.out.println("turn on the manual car");
    }

    @Override
    public void turnOffCar() {
        System.out.println("turn off the manual car");
    }

    @Override
    public String getCarType() {
        return this.carType;
    }
}

public class AutomaticCar implements Car {

    private String carType = "Automatic";

    @Override
    public void turnOnCar() {
        System.out.println("turn on the automatic car");
    }

    @Override
    public void turnOffCar() {
        System.out.println("turn off the automatic car");
    }

    @Override
    public String getCarType() {
        return this.carType;
    }
}

public class CarTest {

    public static void main(String[] args) {
        Car car1 = new abstraction();
        Car car2 = new AutomaticCar();

        car1.turnOnCar();
        car1.turnOffCar();
        System.out.println(car1.getCarType());

        car2.turnOnCar();
        car2.turnOffCar();
        System.out.println(car2.getCarType());

    }

}

// The client program only knows about the Car and the functions that the Car
// provides. The internal implementation details are hidden from the client.
