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
// 10. ReturnType
// 11. InstanceType
// 12. Parameters
// 13. ConstructorParameters
// 14. ConstructorType

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

const users: UserRecord = {
    1: { id: 1, name: "John Doe", email: "john.doe@example.com" },
    2: { id: 2, name: "Jane Doe", email: "jane.doe@example.com" },
}

console.log(users)

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