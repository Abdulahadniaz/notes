// Functional Programming is a programming paradigm that treats computation as the evaluation of mathematical functions
// and avoids changing state and mutable data.

// Object-Oriented Programming is a programming paradigm that treats computation as the manipulation of objects
// and data structures.

// Core Concepts of Functional Programming:

// 1. Pure Functions
// A pure function is a function that does not depend on or modify the state of the program.
// It takes input and returns output based on the input only.
// It does not have side effects.
// It does not modify the state of the program.
// It does not depend on the state of the program.
// It does not have any external dependencies.

// ❌ Impure Function
let total = 0;
const addToTotal = (num) => {
  total += num; // Side effect: modifies external state
  return total;
};

// ✅ Pure Function
const add = (a, b) => a + b;

// 2. Immutability
// Immutability is the practice of avoiding changes to existing data.
// Instead, new data is created when changes are needed.
// Data cannot be changed after creation

// ❌ Mutable Data
let numbers1 = [1, 2, 3];
numbers1.push(4); // Modifies existing array

// ✅ Immutable Data
const numbers2 = [1, 2, 3];
const newNumbers2 = [...numbers2, 4]; // Creates a new array

// 3. First Class Functions
// Functions that can be:
// i - Assigned to variables
// ii - Passed as arguments
// iii - Returned from other functions

// Function as variable
const greet = (name) => `Hello ${name}`;

// Function as argument
const executeFunction = (fn, value) => fn(value);
executeFunction(greet, "John"); // "Hello John"

// Function returning function (closure)
const multiply = (x) => (y) => x * y;
const multiplyByTwo = multiply(2);
multiplyByTwo(4); // 8

// 4. Higher Order Functions
// A higher-order function is a function that takes one or more functions as arguments
// or returns a function as its result.

// Map: Higher-order function
const numbers = [1, 2, 3, 4];
const doubled = numbers.map((num) => num * 2);

// Filter: Higher-order function
const evenNumbers = numbers.filter((num) => num % 2 === 0);

// Reduce: Higher-order function
const sum = numbers.reduce((acc, curr) => acc + curr, 0);

// 5. Function Composition
// Function composition is the process of combining two or more functions to create a new function.
// It is a way to build complex functions by combining simpler functions.

// Basic composition
const compose = (f, g) => (x) => f(g(x));

const addOne = (x) => x + 1;
const multiplyByTwo1 = (x) => x * 2;

const addThenMultiply = compose(multiplyByTwo1, addOne);
addThenMultiply(3); // 8 ((3 + 1) * 2)

// More advanced composition
const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((acc, fn) => fn(acc), x);

const processNumber1 = pipe(addOne1, multiplyByTwo1, Math.abs);

// 6. Recursion
// Recursion is the process of defining something in terms of itself.
// It is a way to solve problems by breaking them down into smaller problems.
// Functions calling themselves instead of using loops

// ❌ Imperative approach with loop
const factorial1 = (n) => {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
};

// ✅ Functional approach with recursion
const factorial = (n) => {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
};

// 7. Referential Transparency
// Referential transparency is the property of an expression that can be replaced with its value without changing the behavior of the program.
// It is a way to ensure that a function is pure and does not have side effects.

// Example:
const add1 = (a) => a + 1;
const add2 = (a) => a + 2;

add1(1); // 2
add2(1); // 3

// add1 and add2 are referentially transparent because they can be replaced with their values without changing the behavior of the program.
