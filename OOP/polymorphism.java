// Polymorphism is a mechanism where an object can take different forms.
// Compile Time Polymorphism: Method Overloading - Static
// Runtime Polymorphism: Method Overriding - Dynamic

// Method Overloading - Compile Time Polymorphism - Static Polymorphism:
// A mechanism to create multiple methods with the same name but different parameters.
// Can have different return types.
// The following class has 4 add methods. Name is same but you can see how parameters are different
// for each method, the return type is different as.

class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }

    public double add(double a, double b, double c) {
        return a + b + c;
    }
}

// Method Overriding - Runtime Polymorphism - Dynamic Polymorphism:
// A mechanism in which child class implments a method that is already defined
// in the parent class.
// The child class can override the method of the parent class. use @override
// annotation.
// Child class can also add its own methods.

class Shape {
    public int calculateArea() {
        int area = 10;
        // do some calculations
        return area;
    }
}

class Circle extends Shape {
    @Override
    public int calculateArea() {
        int area = 20;
        // calculate the area of the circle
        return area;
    }
}

class Rectangle extends Shape {
    @Override
    public int calculateArea() {
        int area = 30;
        // calculate the area of the rectangle
        return area;
    }
}