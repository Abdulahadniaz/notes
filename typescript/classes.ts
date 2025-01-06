// Classes

/*
In javascript, we dont have concrete class concepts as we have in
other programming languages.

In ES5, we used constructor functions to simulate classes. such as:

*/

function Person(name, age) {
    this.name = name;
    this.age = age;
}

// use prototype to add methods to the class such as:

Person.prototype.greet = function () {
    console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
}

const person1 = new Person('John', 30);
person1.greet(); // Hello, my name is John and I am 30 years old.

/*
In ES6, we have the class keyword to define classes.
*/

class Person1 {
    name
    age;

    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    greet() {
        console.log(`Hello, my name is ${this.name} and I am ${this.age} years old.`);
    }
}

const person2 = new Person1('John', 30);
person2.greet(); // Hello, my name is John and I am 30 years old.

/*
Typescript adds type annotations to the class properties and methods.
*/

class Person2 {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    greet(): string {
        return `Hello, my name is ${this.name} and I am ${this.age} years old.`
    }
}

const person3 = new Person2('John', 30);
person3.greet(); // Hello, my name is John and I am 30 years old.

// We use the class keyword to define a class in typescript
// TypeScript leverages the ES6 class syntax and adds type annotations to make the class more robust.
