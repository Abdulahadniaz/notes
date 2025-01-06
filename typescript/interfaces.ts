// Interfaces

/*
Interfaces are a way to define a contract for an object.
We can also say that interfaces are a way to define a blueprint for an object.
They provide a way to ensure that an object has a certain structure.
They provide explicit names to ensure type checking
*/

function getFullName(person: { firstName: string; lastName: string }) {
    return `${person.firstName} ${person.lastName}`;
}

const person = { firstName: 'John', lastName: 'Doe' };
console.log(getFullName(person)); // John Doe

// Define an interface for the person object

interface Person {
    firstName: string;
    lastName: string;
}

function getFullNameAgain(person: Person) {
    return `${person.firstName} ${person.lastName}`;
}

const person11: Person = { firstName: 'John', lastName: 'Doe' };
console.log(getFullNameAgain(person11)); // John Doe

// Make code less:

function getFullNameOnceMore({ firstName, lastName }: Person) {
    return `${firstName} ${lastName}`;
}

const person12: Person = { firstName: 'John', lastName: 'Doe' };
console.log(getFullNameOnceMore(person12)); // John Doe

// Optional properties

interface PersonWithOptional {
    firstName: string;
    lastName: string;
    age?: number;
}

function getFullNameWithOptional(person: PersonWithOptional) {
    // workes with or without age
    return `${person.firstName} ${person.lastName} ${person.age}`;
}

const person13: PersonWithOptional = { firstName: 'John', lastName: 'Doe' };
console.log(getFullNameWithOptional(person13)); // John Doe
const person14: PersonWithOptional = { firstName: 'John', lastName: 'Doe', age: 30 };
console.log(getFullNameWithOptional(person14)); // John Doe 30

// Readonly properties

interface PersonWithReadonly {
    readonly id: number;
    firstName: string;
    lastName: string;
}

const person15: PersonWithReadonly = { id: 1, firstName: 'John', lastName: 'Doe' };
// person15.id = 2; // Error: Cannot assign to 'id' because it is a read-only property.

// Function types

interface StringFormat {
    (str: string, isUpper: boolean): string
}

let format: StringFormat;
format = function (str: string, isUpper: boolean) {
    return isUpper ? str.toUpperCase() : str.toLowerCase();
}

console.log(format('hello', true)); // HELLO
console.log(format('hello', false)); // hello

// Note that the parameter names dont need to match the function signature.
// The following example is equivalent to the above example:

interface StringFormat2 {
    (str: string, isUpper: boolean): string
}

let format2: StringFormat2;
format2 = function (src, isUpper) {
    // we have src instead of str, but will work
    return isUpper ? src.toUpperCase() : src.toLowerCase();
}

console.log(format2('hi', true)); // HI
console.log(format2('hi', false)); // hi

let lowerCase: StringFormat;
// we can assign a function that has only str, but not isUpper
// but only while assigning to the interface
lowerCase = function (str: string) {
    return str.toLowerCase();
}

// when we call the function, we need to pass both parameters
console.log(lowerCase('Hi', false)); // hi
// console.log(lowerCase('Hi')); // Error: Expected 2 arguments, but got 1.