// Inheritance is a mechanism where a new class is created based on an existing
// class.
// The new class is called the child class, and the existing class is called the
// parent class.
// The child class inherits the properties and methods of the parent class.
// The child class can also add its own properties and methods.
// The child class can also override the properties and methods of the parent
// class.

// 1. Basic Single Inheritance

// Parent class
// A -> B
public class Animal {
    protected String name;
    protected int age;

    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void makeSound() {
        System.out.println("Some sound");
    }
}

// Child class
public class Dog extends Animal {
    private String breed;

    public Dog(String name, int age, String breed) {
        super(name, age); // Call parent constructor
        this.breed = breed;
    }

    @Override
    public void makeSound() { // Method overriding
        System.out.println("Woof!");
    }

    public void fetch() { // Additional method
        System.out.println(name + " is fetching the ball");
    }
}

// 2. Multi-Level Inheritance
// A -> B -> C
public class Animal1 {
    protected void eat() {
        System.out.println("I can eat");
    }
}

public class Mammal1 extends Animal1 {
    protected void walk() {
        System.out.println("I can walk");
    }
}

public class Dog1 extends Mammal1 {
    public void bark() {
        System.out.println("I can bark");
    }
}

// 3. Hierarchical Inheritance
// In Hierarchical inheritance, more than one sub-class inherits the property of
// a single base class.
// A -> B, C
// A -> D, E
// Animal is the base class, and multiple classes (Dog, Cat, Bird) inherit from
// it
public class Animal111 {
    protected String name;
    protected int age;

    public Animal111(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void eat() {
        System.out.println(name + " is eating");
    }

    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Dog inherits from Animal
public class Dog111 extends Animal111 {
    private String breed;

    public Dog111(String name, int age, String breed) {
        super(name, age);
        this.breed = breed;
    }

    public void bark() {
        System.out.println("Woof! Woof!");
    }

    public void fetch() {
        System.out.println(name + " is fetching the ball");
    }
}

// Cat inherits from Animal
public class Cat111 extends Animal111 {
    private boolean isIndoor;

    public Cat111(String name, int age, boolean isIndoor) {
        super(name, age);
        this.isIndoor = isIndoor;
    }

    public void meow() {
        System.out.println("Meow!");
    }

    public void scratch() {
        System.out.println(name + " is scratching");
    }
}

// Bird inherits from Animal
public class Bird111 extends Animal111 {
    private double wingspan;

    public Bird111(String name, int age, double wingspan) {
        super(name, age);
        this.wingspan = wingspan;
    }

    public void fly() {
        System.out.println(name + " is flying");
    }

    public void chirp() {
        System.out.println("Tweet! Tweet!");
    }
}