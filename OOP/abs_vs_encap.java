/*
 * 
Key Differences:
1. Purpose
    Abstraction: Hides complex implementation by showing only necessary features
    Encapsulation: Wraps data and code together and controls access
Implementation
    Abstraction: Achieved through abstract classes and interfaces
    Encapsulation: Achieved through access modifiers (private, protected, public)
Focus
    Abstraction: What an object does
    Encapsulation: How an object does it
Level of Operation
    Abstraction: Works at the design level
    Encapsulation: Works at the implementation level
Data Hiding
    Abstraction: Hides complex implementation details
    Encapsulation: Hides the internal data and provides interface to access it
In the example below:
    Abstraction is demonstrated by:
        Abstract class Vehicle
        Abstract methods startEngine() and stopEngine()
        Hiding the complexity of how the engine actually works
    Encapsulation is demonstrated by:
        Private variables isEngineRunning and fuelLevel
        Public methods to access and modify these variables
        Data validation in setFuelLevel()

 */

// Abstraction using abstract class
abstract class Vehicle {
    // Abstract method (no implementation)
    abstract void startEngine();

    abstract void stopEngine();

    // Concrete method
    void fuel() {
        System.out.println("Vehicle needs fuel to run");
    }
}

// Implementation of abstract class
class Car extends Vehicle {
    // Encapsulation: private variables
    private boolean isEngineRunning;
    private int fuelLevel;

    // Constructor
    public Car() {
        this.isEngineRunning = false;
        this.fuelLevel = 100;
    }

    // Implementation of abstract methods
    @Override
    void startEngine() {
        if (fuelLevel > 0) {
            isEngineRunning = true;
            System.out.println("Car engine started");
        }
    }

    @Override
    void stopEngine() {
        isEngineRunning = false;
        System.out.println("Car engine stopped");
    }

    // Encapsulation: public methods to access private data
    public boolean isEngineRunning() {
        return isEngineRunning;
    }

    public int getFuelLevel() {
        return fuelLevel;
    }

    public void setFuelLevel(int level) {
        if (level >= 0 && level <= 100) {
            this.fuelLevel = level;
        }
    }
}
