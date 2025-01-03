// Classical vs Prototypal Inheritance

/*
While many languages use classical inheritance, JavaScript uses prototypal inheritance. Every object in JavaScript has a hidden [[Prototype]] property (accessible via __proto__ or Object.getPrototypeOf()) that links to another object.

The ways are:
1  __proto__
2 - Object.getPrototypeOf()
3 - Object.setPrototypeOf()
4 - Object.create()
5 - class
*/

// 1. Basic Prototypal Inheritance using Object.create()
const animal = {
  makeSound() {
    console.log("Some sound");
  },
  eat() {
    console.log("eating now");
  },
};

const dog = Object.create(animal);
dog.bark = function () {
  console.log("Dog Barking");
};

// dog can access animal's methods
dog.makeSound(); // "Some sound"
dog.eat(); // "Eating..."
dog.bark(); // "Woof!"

// 2. Modern Class Syntax (ES6+)
class ModernAnimal {
  constructor(name) {
    this.name = name;
  }

  makeSound() {
    console.log("Some sound");
  }
}

class ModernDog extends ModernAnimal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  bark() {
    console.log("Woof!");
  }
}

const myModernDog = new ModernDog("Buddy", "Golden Retriever");
myModernDog.makeSound(); // "Some sound"
myModernDog.bark(); // "Woof!"

// 3.. Constructor Functions - Pre-ES6
function Animal(name) {
  this.name = name;
}

Animal.prototype.makeSound = function () {
  console.log("Some sound");
};

function Dog(name, breed) {
  Animal.call(this, name);
  this.breed = breed;
}

Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;

// Add Dog-specific methods
Dog.prototype.bark = function () {
  console.log("Woof!");
};

const myDog = new Dog("Buddy", "Golden Retriever");
myDog.makeSound(); // "Some sound"
myDog.bark(); // "Woof!"
