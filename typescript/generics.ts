// ===============================
// 1. Generics
// ===============================

// A function that returns a random number from an array of numbers
function getRandomNumberElement(items: number[]): number {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

// A function that returns a random element from an array of strings
function getRandomStringElement(items: string[]): string {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

// See the logic is same for both functions
// We can use any type of array
function getRandomAnyElement(items: any[]): any {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

// This option works fine but has a drawback: it doesnt allow you to enforce the type of the returned element. In other words, it isnt type-safe.

let nums = [1, 5, 7, 4, 2, 9];
let colors = ['red', 'green', 'blue'];

console.log(getRandomAnyElement(nums)); // 9
console.log(getRandomAnyElement(colors)); // blue

// Here comes Generics
// Generics allow you to create a function that works with multiple types
// Generics are a way to create reusable and type-safe functions

function getRandomElement<T>(items: T[]): T {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

// The following shows how to use the getRandomElement() with an array of numbers:

let numbersArr = [1, 5, 7, 4, 2, 9];
let randomEle = getRandomElement<number>(numbersArr);
console.log(randomEle); // 9

// Intro to TypeScript Type Inference
// TypeScript can infer the type of a variable based on the value assigned to it

let num = 10;
let str = 'Hello';

console.log(typeof num); // number
console.log(typeof str); // string

// TypeScript can also infer the type of a variable based on the function parameters

function addition(a: number, b: number): number {
    return a + b;
}

let summ = addition(1, 2);
console.log(typeof summ); // number

// The best common type Algorithm is as follows:
// 1. If there is only one possible type, then TypeScript infers that type
// 2. If there are multiple possible types, then TypeScript infers the best common type

let items1 = [1, 2, 3, null];
// TypeScript infers the type of the items array as (number | null)[]

let items2 = [1, 2, 3, 'Cheese'];
// TypeScript infers the type of the items array as (number | string)[]

// Contextual Typing
// TypeScript can infer the type of a variable based on the context in which it is used

// TypeScript infers the type of the event parameter as MouseEvent
document.addEventListener('click', function (event) {
    console.log(event.button);
});

// However, when you change the click event to the scroll the event, TypeScript will issue an error:

// TypeScript knows that the event in this case, is an instance of UIEvent, not a MouseEvent. And UIEvent does not have the button property, therefore, TypeScript throws an error.
document.addEventListener('scroll', function (event) {
    // A compilation error. Uncomment next line to see
    // console.log(event.button);
});

// After learning about TypeScript Type Inference, you can now understand why the following code works:

let numbers1 = [1, 5, 7, 4, 2, 9];
// TypeScript infers the type of the numbers1 array as number[]
let randomEle1 = getRandomElement(numbers1);
console.log(randomEle1); // 9

// So, you cannot assign a string to the returnElem variable because the getRandomElement() function returns a number
let numbers11 = [1, 5, 7, 4, 2, 9];
let returnElem: string;
// compiler error. uncomment next line to see
// returnElem11 = getRandomElement(numbers11);

// Generic functions with multiple types
function merge<T, U>(obj1: T, obj2: U) {
    return {
        ...obj1,
        ...obj2
    }
}

let result = merge({ name: 'John' }, { age: 30 });
console.log(result); // {name: 'John', age: 30}

// The merge() function takes two objects and returns a new object that contains the properties of both objects.

// What if:
let person = merge(
    { name: 'John' },
    25
);

console.log(person); // {name: 'John'}
// TypeScript doesnt issue any errors.
// To make sure that the merge() function works with objects only
// Add a constraint to the merge() function by using the extends keyword

function merge1<T extends object, U extends object>(obj1: T, obj2: U) {
    return {
        ...obj1,
        ...obj2
    }
}

let person1 = merge1(
    { name: 'John' },
    { age: 25 }
    // A compilation error. Comment previous line and uncomment next line to see
    // 25
);

console.log(person1); // A compilation error.

// Using type parameters in generic constraints
function prop1<T, K>(obj: T, key: K) {
    // uncomment next line to see the error
    // return obj[key];
}

// To fix the error, you can add a constraint to the prop() function by using the extends keyword

function prop2<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

let person2 = prop2({ name: 'John' }, 'name');
console.log(person2); // John

// What if you pass a key that is not in the object?
// Uncomment next line to see the error
// let person3 = prop2({ name: 'John' }, 'age');

// Generic Classes
// Generic classes are classes that can take one or more type parameters

class GenericClass<T> {
    // private data: T[] = [];
}

// Can add constraints to the GenericClass class by using the extends keyword

class GenericClass1<T extends number | string> {
    // private data: T[] = [];
}

class Stack<T> {
    private elements: T[] = [];

    constructor(private size: number) {
        // this.elements = [];
    }

    isEmpty(): boolean {
        return this.elements.length === 0;
    }

    isFull(): boolean {
        return this.elements.length === this.size;
    }

    push(element: T): void {
        this.elements.push(element);
    }

    pop(): T | undefined {
        return this.elements.pop();
    }
}

let stack = new Stack<number>(5);
stack.push(1);
stack.push(2);
stack.push(3);
console.log(stack.pop()); // 3
console.log(stack.isEmpty()); // false
console.log(stack.isFull()); // true

// Lets create a stack of strings
const words = "A quick brown fox jumps over the lazy dog".split(' ');
const wordStack = new Stack<string>(words.length);
words.forEach(word => wordStack.push(word));
console.log(wordStack.pop()); // dog

// Generic interfaces
// Generic interfaces are interfaces that can take one or more type parameters just like generic classes

// 1) Generic interfaces that describe object properties

interface KeyvaluePair<K, V> {
    key: K;
    value: V;
}

let kvp1: KeyvaluePair<number, string> = { key: 1, value: 'one' };
let kvp2: KeyvaluePair<string, number> = { key: 'two', value: 2 };

console.log(kvp1); // {key: 1, value: 'one'}
console.log(kvp2); // {key: 'two', value: 2}

// 2) Generic interfaces that describe methods
interface Collection<T> {
    add(o: T): void;
    remove(o: T): void;
}

// 3) Generic interfaces that describe index types
interface Options<T> {
    [key: string]: T;
}

let options: Options<boolean> = {
    'debug': true,
    'logging': false
}

console.log(options); // {debug: true, logging: false}