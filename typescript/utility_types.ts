// ==============================
// Utility Types
// ==============================

// 1. Partial
// 2. Required
// 3. Readonly
// 4. Record
// 5. Pick
// 6. Omit
// 7. Exclude
// 8. Extract
// 9. NonNullable
// 10. Parameters
// 11. ConstructorParameters
// 12. ReturnType
// 13. InstanceType
// 14. NoInfer
// 15. ThisParameterType
// 16. OmitThisParameter
// 17. ThisType
// 18. Awaited

// 1. Partial<Type>

// Partial makes all properties in the interface or Type optional

interface Todo {
    title: string;
    description: string;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    return { ...todo, ...fieldsToUpdate };
}

const todo1 = {
    title: "organize desk",
    description: "clear clutter",
};

const todo2 = updateTodo(todo1, {
    description: "Learn TS",
});

console.log(todo2) // { title: 'organize desk', description: 'Learn TS' }

// By making use of Partial, we are making each property in the User interface optional
type User = {
    name: string;
    email: string;
    age: number;
}

type PartialUser = Partial<User>;

// 2. Required

// Required makes all properties in the interface or Type required

interface Props {
    a?: number;
    b?: string
}

const obj1 = { a: 1 }

type RequiredProps = Required<Props>

const obj3: RequiredProps = { a: 1, b: "hello" } // remove a or b from obj3 and it will throw an error

// 3. Readonly<Type>

// Readonly makes all properties in the interface or Type readonly

type Payload = {
    id: number;
}

type ReadOnlyPayload = Readonly<Payload>;

const payload: ReadOnlyPayload = { id: 1 }

//  // This will throw an error because id is readonly. Uncomment the next line to see
// payload.id = 2

// Readonly works the same way as Object.freeze
// Cannot modify existing properties
// Cannot add new properties

const payload2 = Object.freeze({ id: 1 })
// This will throw an error because id is readonly. Uncomment the next line to see
// payload2.id = 2

// 4. Record<Keys, Type>

// Record is used to map the properties of one type to another type

type CatName = "miffy" | "boris" | "mordred" | "jane";

interface CatInfo {
    age: number;
    breed: string;
}

const cats: Record<CatName, CatInfo> = {
    miffy: { age: 10, breed: "Persian" },
    boris: { age: 5, breed: "Maine Coon" },
    mordred: { age: 16, breed: "British Shorthair" },
    jane: { age: 20, breed: "Persian" },
}

console.log(cats)

// real world example

type User1 = {
    id: number;
    name: string;
    email: string;
}

type UserRecord = Record<number, User1>;

const users11: UserRecord = {
    1: { id: 1, name: "John Doe", email: "john.doe@example.com" },
    2: { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
}

console.log(users11)

// 5. Pick<Type, Keys>

// Pick is used to pick the properties from the interface or Type

type UserInfo = {
    name: string;
    age: number;
    email: string;
    isAdmin: boolean;
}

type UpdateUserDTO = Pick<UserInfo, "name" | "email">;

const userToUpdate: UpdateUserDTO = { name: "John Doe", email: "john.doe@example.com" }

console.log(userToUpdate) // { name: 'John Doe', email: 'john.doe@example.com' }

// 6. Omit<Type, Keys>

// Omit is used to omit the properties from the interface or Type
// First it will pick all the properties from the interface or Type
// Then it will omit the properties that are passed in the generic

type UserInfo2 = {
    name: string;
    age: number;
    email: string;
    isAdmin: boolean;
}

type newUserInfo = Omit<UserInfo2, "email" | "isAdmin">;

const userToUpdate2: newUserInfo = { name: "John Doe", age: 20 }

console.log(userToUpdate2) // { name: 'John Doe', age: 20 }

// 7. Exclude<UnionType, ExcludedMembers>

// Exclude is used to exclude the properties from the UnionType.
// ExcludedMembers tell us which types to remove
// ExcludedMembers can also be a UnionType

type T0 = Exclude<"a" | "b" | "c", "a">;
//type T0 = "b" | "c"

type T1 = Exclude<"a" | "b" | "c", "a" | "b">;
//type T1 = "c"

type T2 = Exclude<string | number | (() => void), Function>;
//type T2 = string | number

type Shape =
    | { kind: "circle"; radius: number }
    | { kind: "square"; x: number }
    | { kind: "triangle"; x: number; y: number };

type T3 = Exclude<Shape, { kind: "circle" }>

/*
type T3 = {
    kind: "square";
    x: number;
} | {
    kind: "triangle";
    x: number;
    y: number;
}
*/

// 8. Extract<Type, Union>
type T00 = Extract<"a" | "b" | "c", "a" | "f">;
//type T00 = "a"

type T11 = Extract<"a" | "b" | "c", "a" | "b">;
//type T11 = "a" | "b"

type T22 = Extract<string | number | (() => void), Function>;
//type T22 = () => void

type ShapeUpdated =
    | { kind: "circle"; radius: number }
    | { kind: "square"; x: number }
    | { kind: "triangle"; x: number; y: number };

type T33 = Extract<ShapeUpdated, { kind: "triangle" }>
// type T33 = { kind: "triangle"; x: number; y: number }

// 9. NonNullable<Type>

// NonNullable is used to remove null and undefined from the Type

type T001 = string | null | undefined;
type T002 = NonNullable<T001>;
// type T002 = string

type T011 = NonNullable<string[] | null | undefined>;
// type T011 = string[]

// 10. Parameters<Type>

// This utility type is used to create a tuple type from parameters of a function given in type.

type T101 = Parameters<() => string>;
// type T101 = []

type T102 = Parameters<(s: string) => void>;
// type T102 = [string]

declare function f1(arg: { a: number; b: string }): void;
type T103 = Parameters<typeof f1>;

/*type T103 = [arg: {
    a: number;
    b: string;
}]
*/

declare function f2(arg1: string, arg2: number): void;
type T104 = Parameters<typeof f2>;
// type T104 = [string, number]

// Type 'string' does not satisfy the constraint '(...args: any) => any'.ts(2344)
// Error. Uncomment the next line to see
// type T105 = Parameters<string>;

// 11. ConstructorParameters<Type>

// This utility type is used to extract the parameters of a constructor function type and create a tuple type from them.

type T106 = ConstructorParameters<ErrorConstructor>;
// type T106 = [message?: string | undefined]

type T107 = ConstructorParameters<FunctionConstructor>;
// type T107 = string[]

class C {
    constructor(a: number, b: string) { }
}

type T108 = ConstructorParameters<typeof C>;
// type T108 = [a: number, b: string]

// 12. ReturnType<Type>

// This utility type is used to extract the return type of a function type.

type T121 = ReturnType<() => string>;
// type T121 = string

type T122 = ReturnType<(s: string) => void>;
// type T122 = void

declare function f3(): { a: number; b: string };
type T123 = ReturnType<typeof f3>;
// type T123 = { a: number; b: string }

type T124 = ReturnType<any>;
// type T124 = any

type T125 = ReturnType<never>;
// type T125 = never

type T126 = ReturnType<<T extends U, U extends number[]>(arg: T) => T>;
// type T126 = number[]

// Error. Uncomment the next line to see
// type T127 = ReturnType<string>;

// undefined. Uncomment the next line to see
// type T8 = ReturnType<Function>;

// 13. InstanceType<Type>

// This utility type is used to extract the instance type of a constructor function given in type.

class CC {
    x = 0;
    y = 0;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }
}

type T131 = InstanceType<typeof CC>;
// type T131 = CC

class UserMetaData {
    name: string;
    age: number;
    email: string;

    constructor(name: string, age: number, email: string) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}

type T132 = InstanceType<typeof UserMetaData>;
// type T132 = UserMetaData

// 14. NoInfer<Type>

// This utility type is used to remove the inference of the type from the generic.

function createStreetLight<C extends string>(
    colors: C[],
    defaultColor?: NoInfer<C>,
) {
    // ...
}
createStreetLight(["red", "yellow", "green"], "red");  // OK
// uncomment the next line to see the error as blue is not in the array
// createStreetLight(["red", "yellow", "green"], "blue")

/*
TypeScript first infers C from the colors array parameter to be "red" | "yellow" | "green"
The NoInfer prevents TypeScript from expanding the type of C based on the defaultColor parameter
Therefore, defaultColor must be one of the colors already in the colors array
This is why "blue" causes an error - it's not one of the inferred colors
*/

// ThisParameterType<Type>

// This utility type is used to extract the type of the this parameter of a function type.

type T151 = ThisParameterType<() => void>;
// type T151 = unknown

type T152 = ThisParameterType<(s: string) => void>;
// type T152 = string

function toHex(this: Number) {
    return this.toString(16);
}

function numberToString(n: ThisParameterType<typeof toHex>) {
    return toHex.apply(n);
}
// type of n would be number

// 16. OmitThisParameter<Type>

// This utility type is used to omit the this parameter from a function type.

function toHex1(this: Number) {
    return this.toString(16);
}

const fiveToHex: OmitThisParameter<typeof toHex1> = toHex1.bind(5);

console.log(fiveToHex());
// type of fiveToHex is () => string. number is not removed as this parameter

// 17. ThisType<Type>

// acts as empty interface

// This utility does not return a transformed type. Instead, it serves as a marker for a contextual this type. Note that the noImplicitThis flag must be enabled to use this utility.

// 18. Awaited<Type>

// This utility type is used to extract the type of the value returned by a Promise.

type T181 = Awaited<Promise<string>>;
// type T181 = string

type B = Awaited<Promise<Promise<number>>>;
// type B = number

type C11 = Awaited<boolean | Promise<number>>;
// type C11 = boolean | number