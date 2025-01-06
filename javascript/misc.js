// ==============================
// 1 - let vs var vs const
// ==============================

// var
var age = 25;
var age = 26; // can be redeclared
age = 27; // can be updated

// var is function-scoped, not block-scoped
function example() {
  var x = 1;
  if (true) {
    var x = 2; // Same variable as above!
    console.log(x); // 2
  }
  console.log(x); // 2
}

// let
// let is block-scoped, can be updated but not redeclared
let score = 100;
// let score = 200;  // Error: Cannot redeclare
score = 200; // OK: Can be updated

function example() {
  if (true) {
    let blockScoped = "only visible here";
    console.log(blockScoped); // "only visible here"
  }
  console.log(blockScoped); // Error: blockScoped is not defined
}

// const
// const is block-scoped, cannot be updated or redeclared
const PI = 3.14159;
// PI = 3.14;        // Error: Cannot reassign
// const PI = 3.14;  // Error: Cannot redeclare

// Note: const objects can have their properties modified
const user = {
  name: "John",
};
user.name = "Jane"; // OK: Modifying property
// user = {};        // Error: Cannot reassign object itself

// ==============================
// 2 - Hoisting
// ==============================

// Hoisting is JavaScript's default behavior of moving all declarations to the top of the current scope

// 1. Variable Hoisting with var
console.log(myVar); // undefined (not an error!)
var myVar = 5; // declaration is hoisted, but assignment stays here

// The above is interpreted as:
// var myVar;          // declaration is hoisted to top
// console.log(myVar); // undefined
// myVar = 5;

// 2. Variable Hoisting with let/const
// console.log(myLet);  // ReferenceError: Cannot access before initialization
let myLet = 10; // let/const are hoisted but in "temporal dead zone"

// 3. Function Declaration Hoisting
sayHello(); // "Hello!" - This works!
function sayHello() {
  console.log("Hello!");
}

// 4. Function Expression Hoisting
// sayGoodbye();      // TypeError: sayGoodbye is not a function
var sayGoodbye = function () {
  console.log("Goodbye!");
};

// 5. Class Declaration Hoisting
// const car = new Car();  // ReferenceError: Cannot access before initialization
class Car {
  constructor() {
    this.brand = "Toyota";
  }
}

// 6. Real-world example showing hoisting pitfalls
function example() {
  console.log(x); // undefined
  var x = 1;

  if (true) {
    var x = 2; // same variable as above due to function scope
    console.log(x); // 2
  }
  console.log(x); // 2
}

// ==============================
// 3 - Closure - A function that remembers the variables from its parent scope even after the parent function has returned
// ==============================

// 1. Basic Closure Example
function createCounter() {
  let count = 0;
  return {
    increment: function () {
      count++;
      return count;
    },
    decrement: function () {
      count--;
      return count;
    },
    getCount: function () {
      return count;
    },
  };
}

const counter = createCounter();
console.log(counter.increment()); // 1
console.log(counter.decrement()); // 0
console.log(counter.getCount()); // 0
// since count is a private variable, it is not accessible outside the function
console.log(counter.count); // ERROR: count is not defined

// 2. Closure for Partial Application
function multiply(a) {
  return function (b) {
    return a * b;
  };
}

const multiplyByTwo = multiply(2);
console.log(multiplyByTwo(4)); // 8
console.log(multiplyByTwo(5)); // 10

// ==============================
// 4 - Higher Order Functions
// ==============================

// 1. Function that takes a function as an argument
function calculate(operation, a, b) {
  return operation(a, b);
}

// Functions to pass as arguments
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;

console.log(calculate(add, 5, 3)); // 8
console.log(calculate(subtract, 5, 3)); // 2
console.log(calculate(multiply, 5, 3)); // 15

// 2. Functions that return other functions
function createMultiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const doubleVal = double(5);
console.log(doubleVal); // 10

const triple = createMultiplier(3);
const tripleVal = triple(5);
console.log(tripleVal); // 15

// 3. Array Higher Order Functions

// 3.1 map - transforms each element
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map((num) => num * num);
console.log(squared); // [1, 4, 9, 16, 25]

// 3.2 filter - creates new array with elements that pass the test
const evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // [2, 4]

// 3.3 reduce - reduces array to single value
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum); // 15

// 4. Practical Example: Data Processing Pipeline
const users = [
  { name: "John", age: 25, active: true },
  { name: "Jane", age: 30, active: false },
  { name: "Bob", age: 35, active: true },
];

const processUser = (users) => {
  return users
    .filter((user) => user.active)
    .map((user) => ({
      name: user.name.toUpperCase(),
      age: user.age,
    }))
    .sort((a, b) => a.age - b.age);
};

console.log(processUser(users));
// [{name: "JOHN", age: 25}, {name: "BOB", age: 35}]

// 5. Function Composition
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

const addOne = (x) => x + 1;
const double1 = (x) => x * 2;
const square = (x) => x * x;

const compute = compose(square, double1, addOne);
console.log(compute(2)); // ((2 + 1) * 2)² = 36

// ==============================
// 5 - Destructuring
// ==============================

// Extracting values from arrays or properties from objects into distinct variables

// 1. Basic Destructuring
const person = { name: "John", age: 30 };
const { name, age } = person;
console.log(name); // "John"
console.log(age); // 30

const [a, b] = [1, 2];
console.log(a); // 1
console.log(b); // 2

// 2. Destructuring with Default Values
const { x = 10 } = {};
console.log(x); // 10

// 3. Nested Destructuring
const person1 = {
  name: "John",
  age: 30,
  address: { city: "New York", state: "NY" },
};
const {
  name1,
  address: { city },
} = person1;
console.log(name1); // "John"
console.log(city); // "New York"

// 4. Destructuring with Rest
const [first, ...rest] = [1, 2, 3, 4];
console.log(first); // 1
console.log(rest); // [2, 3, 4]

// 5. Destructuring with Spread
const numbers1 = [1, 2, 3, 4, 5];
const [first1, second1, ...rest1] = numbers1;
console.log(first1); // 1
console.log(second1); // 2
console.log(rest1); // [3, 4, 5]

// ==============================
// 6 - Rest Parameter (...)
// ==============================

// 1. Rest in function parameters - collects all remaining arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Real-world example
function createUser(firstName, lastName, ...otherInfo) {
  return {
    firstName,
    lastName,
    additionalInfo: otherInfo,
  };
}
console.log(createUser("John", "Doe", "Developer", 30, "New York"));
// { firstName: "John", lastName: "Doe", additionalInfo: ["Developer", 30, "New York"] }

// ==============================
// 7 - Spread Operator (...)
// ==============================

// 1. Spread with Arrays - expands an array into individual elements
const numbers5 = [1, 2, 3];
const newNumbers5 = [...numbers5, 4, 5];
console.log(newNumbers5); // [1, 2, 3, 4, 5]

// 2. Spread with Objects - copies properties
const baseConfig = { api: "http://api.com", timeout: 3000 };
const finalConfig = {
  ...baseConfig,
  debug: true,
};
console.log(finalConfig); // { api: "http://api.com", timeout: 3000, debug: true }

// 3. Common Use Cases

// Combining arrays
const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];
const produce = [...fruits, ...vegetables];
console.log(produce); // ["apple", "orange", "carrot", "potato"]

// Copying arrays/objects (shallow copy)
const originalArray = [1, 2, 3];
const copy = [...originalArray];

// Function arguments
const numbers4 = [1, 2, 3];
console.log(Math.max(...numbers4)); // 3
