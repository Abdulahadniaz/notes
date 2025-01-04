// Powerful TS features that help us write more type-safe and flexible code

// Following are the advanced types:

// 1. Union Types
// Allows a value to be one of several types

// Allows a value to be one of several types
let value: string | number;
value = "hello"; // OK
value = 42;      // OK
// uncomment the next line to see the error
// value = true;

// 2. Intersection Types
// Combines multiple types into one

interface BusinessPartner {
    name: string;
    credit: number;
}

interface Identity {
    id: number;
    name: string;
}

interface Contact {
    email: string;
    phone: string;
}

type Employee = Identity & Contact;

const employee: Employee = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "1234567890"
};

type Customer = BusinessPartner & Contact;

const customer: Customer = {
    name: "Jane Doe",
    credit: 1000,
    email: "jane.doe@example.com",
    phone: "0987654321"
};

// When you intersect types, the order of the types doesn’t matter. For example:

type typeA = { a: number };
type typeB = { b: string };

type typeAB = typeA & typeB;
type typeBA = typeB & typeA;
// both are same

// 3. Type Guards
// Type Guards allow you to narrow down the type of a variable within a conditional block.

// i - typeof
type alphanumeric = string | number;

function add(a: alphanumeric, b: alphanumeric) {
    if (typeof a === 'number' && typeof b === 'number') {
        return a + b;
    }

    if (typeof a === 'string' && typeof b === 'string') {
        return a.concat(b);
    }

    throw new Error('Invalid arguments. Both arguments must be either numbers or strings.');
}
// add(1, 2) // 3
// add("hello", "world") // "helloworld"
// add(1, "world") // Error
// we narrow down the type of a variable within a conditional block by the use of typeof


// ii - instanceof
// Similar to typeof, but for objects/classes

class CustomerNew {
    isCreditAllowed(): boolean {
        // ...
        return true;
    }
}

class SupplierNew {
    isInShortList(): boolean {
        // ...
        return true;
    }
}

type BusinessPartnerNew = CustomerNew | SupplierNew;

function signContract(partner: BusinessPartnerNew): string {
    let message: string;
    // Inside the following if block, TypeScript knows that the partner is an
    // instance of the Customer type due to the instanceof operator:
    if (partner instanceof CustomerNew) {
        message = partner.isCreditAllowed() ? 'Sign a new contract with the customer' : 'Credit issue';
    }
    // Likewise, TypeScript knows that the partner is an instance of Supplier inside the following if block:
    if (partner instanceof SupplierNew) {
        message = partner.isInShortList() ? 'Sign a new contract the supplier' : 'Need to evaluate further';
    }

    return 'done'
}

// iii - in
// Checks if a property exists on an object
function signContract11(partner: BusinessPartnerNew): string {
    let message: string;
    // if isCreditAllowed exists in partner
    if ('isCreditAllowed' in partner) {
        message = partner.isCreditAllowed() ? 'Sign a new contract with the customer' : 'Credit issue';
    } else {
        // must be Supplier
        message = partner.isInShortList() ? 'Sign a new contract the supplier ' : 'Need to evaluate further';
    }
    return message;
}

// iv - custom type guard / user defined type guard
// Allows you to create your own type guard functions

function isCustomer(partner: any): partner is CustomerNew {
    return partner instanceof CustomerNew;
}

function signContract111(partner: BusinessPartnerNew): string {
    let message: string;
    // calls isCustomer custom type guard function, which returns partner which is an instance of CustomerNew
    if (isCustomer(partner)) {
        message = partner.isCreditAllowed() ? 'Sign a new contract with the customer' : 'Credit issue';
    } else {
        // must be Supplier
        message = partner.isInShortList() ? 'Sign a new contract the supplier ' : 'Need to evaluate further';
    }
    return message;
}