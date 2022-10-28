# TypeScript Training

## This is a summary of what I learn in TS (A kind of cheatsheet)

```tsx
// --- Basics Types ---
const myStr: string = 'Hello world !';

const myNbr: number = 3;

const myBoo: boolean = true;

const myNull: null = null;
```

```tsx
// --- Arrays ---

// Array of strings
const myArr: string[] = ['John', 'Doe', 'Foo', 'Bar'];

// Array of strings : alt method
const myArr: Array<string> = ['Hey', 'Bro'];

// Array of any types
const arr: any[] = ['Hello', 4, false];

// Array of typed objects
const arrOfObj: Array<{ id: number; age: number }> = [
  { id: 12, age: 31 },
  { id: 13, age: 24 },
  { id: 14, age: 49 }
];
```

```tsx
// --- Objects ---

// Object with typed keys, age? is optional
const user: {firstname: string, lastname: string, age?: number} = {
	firstname: 'John',
	lastname: 'Doe'
};

// Object with id of type number and any other keys of type string
const userTwo = {id: number, [key: string]: string} = {
	id: 12,
	content: 'Hello',
	author: 'John Doe'
};
```

```tsx
// --- Date example ---
const myDate: Date = new Date();
```

```tsx
// --- Functions ---

// Function with param of type Event. Void means that we will never use return
const myCallback: Function = (e: Event): void => {
  console.log(e.target);
};

// Function with param of type any. It return a boolean
const isAnArray: Function = (b: any): boolean => {
  return Array.isArray(b);
};

// Function with param of type any. It return that a is Date (boolean)
const isADate: Function = (c: any): a is Date => {
  return c instanceof Date;
};

// Function with another method to declare params types and potential void
const otherCallback: (e: MouseEvent) => void = (e: MouseEvent) => {
  console.log(e.target.value);
};

// Function declaration with param id of type number and no return (void)
function printId(id: number): void {
  console.log(id.toString());
}

// When we use VOID : We can return something in the function but there is an
//				error only if we use this return somewhere else
```

```tsx
// --- Exemple of TS intelligence ---

// const contain a string that is a key of object
const user = { id: 3, city: 'Toulouse' };
const a = 'username';
console.log(user[a]); // TS ERROR (because username is not a key of user)

const user = { id: 3, username: 'John' };
const a = 'username';
console.log(user[a]); // TS OK (because username is a key of the user)
```

```tsx
// We can change a detected type by any other type with the keyword : AS

// TS Detect a type Element but we tell it's a HTMLButtonElement (more precise)
const myButton = document.querySelector('#button') as HTMLButtonElement | null;

// Alternative method to change the detected type :
const myButton = <HTMLButtonElement | null>document.querySelector('#button');

// /!\ With this forced type we need to tell TS it can be null
```

```tsx
// Accept two types with : "|" (string or number)
const myFunc: Function = (id: string | number): void => {
  console.log(id);
};
```

```tsx
// Prevent from null
const button = document.querySelector('#button');

button.addEventListener('click', callback); // ERROR (because button can be null)

button?.addEventListener('click', callback); // OK (execute if button != null)
```

```tsx
// Prevent from null when assign value to an object key
const myTitle = document.querySelector('#title');

title.textContent = 'What a good title'; // ERROR (because title can be null)

title?.textContent = 'What a good title'; // ERROR (we cant do that when assign)

if (title != null) {
  title.textContent = "It's sure i'm not null"; // OK (title cant be null)
}
```

```tsx
// --- Narrowing ---

// TS understands the type of parameters depending on the conditions
function printId(id: number | string) {
  // id can be string or number
  if (typeof id === 'number') {
    console.log((id * 3).toString()); // TS know that id is a number
  } else {
    console.log(id.toUpperCase()); // TS know that id is a string
  }
}

function printSomething(a: number | string, b: number | boolean) {
  if (a === b) {
    console.log(a * b); // TS know that a and b is number (only type in common)
  }
}

function getYearFromDate(date: string | number) {
  if (date instanceof Date) {
    console.log(date.getFullYear()); // TS know that date is a Date
  }
}

function mapArray(a: string | string[]) {
  if (Array.isArray(a)) {
    a.map((value) => console.log(value)); // TS know that a is an array
  } else {
    console.log(a); // TS know that a is a string
  }
}

function exemple(a: MouseEvent | HTMLInputElement | Object) {
  if ('target' in a) {
    console.log(a?.x, a?.y); // TS know that a is a MouseEvent
  } else if ('value' in a) {
    console.log(a.value); // TS know that a is an HTMLInputElement
  } else {
    console.log(a); // TS know that a is an Object
  }
}

// Function with param of type any. It return true if b is an Array of any (bool)
const isAnArray: Function = (b: any): b is any[] => {
  return Array.isArray(b);
};

// Function with param of type any. It return that c is Date (bool)
const isADate: Function = (c: any): c is Date => {
  return c instanceof Date;
};

// --- Forced Narrowing ---

// We tell TS that we are sure myDiv is not null and he dont check (with '!')
const myDiv = document.querySelector('#my-div')!; // '!'
myDiv.textContent = 'Hello world';

const myDiv = document.querySelector('#my-div');
myDiv!.textContent = 'Hello world'; // '!'

// We tell TS that we are sure of the type and he dont check (with 'as')
const myDiv = document.querySelector('#my-div') as HTMLDivElement | null;
if (myDiv) {
  myDiv.textContent = 'Hello world'; // TS know that myInput is DivElement
}

const myInput = document.querySelector('#my-input') as HTMLInputElement | null;
if (myInput) {
  myInput.value = 'Im the value'; // TS know that myInput is InputElement
}

// We tell TS that we are sure of the type and he dont check (with '<Type>')
const myInput = <HTMLInputElement | null>document.querySelector('#my-input');
if (myInput) {
  myInput.value = 'Im the value'; // TS know that myInput is InputElement
}

// ------------------

const myInput = <HTMLInputElement | null>document.querySelector('#my-input');
// === is same result as
const myInput = document.querySelector<HTMLInputElement>('#my-input');
```

```tsx
// --- Alias (Type) ---

// Create an alias
type User = { firstname: string; lastname: string; age: number };
// Using this alias
const john: User = { firstname: 'John', lastname: 'Doe', age: 24 };

type DateString = string;
// It can be usefull to understand elsewhere that it is a string with a date

// We can tell TS the that type is a key of another type
type UserKey = keyof User;

// We can tell TS that the type depend on another type
type Username = User['firstname'];
// Type Username is a string because firstname is type string
```

```tsx
// --- Generics (Type parameters) ---

// We tell TS that the arg and the returned value is of the same type as
// the type parameter we passed to it
function identity<ArgType>(arg: ArgType): ArgType {
  return arg;
}
const d = identity<number>(3); // d is type number (more precise than 'any')
const d = identity(3); // d is type 3 (more precise than 'number')

// If we dont use this syntax and just put 'any' :
function identity(arg: any): any {
  return arg;
}
const d = identity(3); // d is type any (It's not a good method)

// Other example :
function returnFirstValue<Type>(arr: Type[]): Type {
  return arr[0] || null; // The returned value is typed
}

// ------------------

const myInput = <HTMLInputElement | null>document.querySelector('#my-input');
// === is same result as
const myInput = document.querySelector<HTMLInputElement>('#my-input');
// myInput is of type <HTMLInputElement | null> in both case
```

```tsx
// --- Alias with generics --- 😵‍💫

type Identity<ArgType> = (arg: ArgType) => ArgType;

const myNewFunc: Identity<number> = (b) => {
  return b;
};
myNewFunc(3);
```

```tsx
// --- Type extends ---

// We tell TS that the type need to have a key length of type number (Any array)
function logSize<Type extends { length: number }>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

// We tell TS that the type need to have a key value of type string
// and can return string or null
function logValue<Type extends { value: string }>(arg: Type): string {
  console.log(arg.value);
  return arg.value;
}
```

```tsx
// --- Type vs Interface ---

// Syntax
type User = {
  username: string,
  age: number,
  city: string
};

interface Point {
  x: number,
  y: number,
  get(): number
}

// type define any types
// interface define like a class or object

// Interface can stay open (I can define another property type later)
interface Point {
	x: number
}
interface Point {
	y: number
}

// Types can't stay open
type Point { // ERROR : Duplicate identifier 'Point'
	x: number
}
type Point { // ERROR : Duplicate identifier 'Point'
	y: number
}
```

```tsx
// --- Type unknown ---

// unknown is like any but when we want to define a type later.
// It's less permissive

function a(arg: unknown) {
  arg.value = 'Hello'; // ERROR : Object is of type 'unknown'
}

function a(arg: unknown) {
  if (arg instanceof HTMLInputElement) {
    arg.value = 'Hello'; // OK : Type is unknown but we add a type condition
  }
}

function a(arg: any) {
  arg.value = 'Hello'; // OK : No verification by TS (but not good practice !)
}

// It's safer to use 'unknown' than 'any' when we want to add a type later !
// 'any' disable type verification, 'unknown' allows verification without
// knowing the type
```

```tsx
// --- Lock object or array values ---

const myObj = { isPrivate: true, isPublic: false } as const;
// myObj cannot be modified later
myObj.isPublic = true; // ERROR : Cannot assign to 'isPublic' because read-only

const myArr = [1, 2, 3, 4] as const;
// myArr cannot be modified later
myArr.push(5); // ERROR : Property push does not exist on type read-only
```

```tsx
// --- Tuple (Array with fixed types and length) ---
const myTuple: [string, number] = ['tomato', 3];
// Length and types are fixed !

// Advanced typed tuple
type Item = [string, number]; // We declare a type of Tuple

const a: Item = ['tomate', 2];
const b: Item = ['banane', 3]; // We declare two Tuples

// This function merge two array in one and we specify that the output type is
// an array of type 'two arrays that has same types as inputs arrays'
function merge<T extends unknown[], U extends unknown[]>(a: T, b: U): [...T, ...U] {
  return [...a, ...b];
}
const c = merge(a, b);

// Here we can destructure types and the output is typed from the two inputs
```

```tsx
// --- Enum ---
// Can be usefull for states or status

enum STEPS {
  Intro = 'Intro',
  Choice = 'Choice',
  Cart = 'Cart',
  Payment = 'Payment'
}

let step: STEPS = STEPS.Intro;

if (step === STEPS.Intro) {
  console.log("It's the introduciton");
}

// enum are not usable values but just a state for comparison/checks/conditions

// By de default the values are 1, 2, 3, 4, etc..

console.log(step); // 1
// or
console.log(STEPS[step]); // Intro

// But we can assign other values for debugging
enum STEPS {
  Intro = 'Intro',
  Choice = 'Choice',
  Cart = 'Cart',
  Payment = 'Payment'
}
// Now it's better for debugging :
console.log(step); // 'Intro'

// ---------------------
// We can declare enum with const
const enum STEPS {
  Intro = 'Intro',
  Choice = 'Choice',
  Cart = 'Cart',
  Payment = 'Payment'
}
const step = STEPS.Intro;

// If we do that TS replace step by the value at the build
// (not big difference for dev)
```

```tsx
// --- Enum ---
// Can be usefull for states or status

enum STEPS {
  Intro = 'Intro',
  Choice = 'Choice',
  Cart = 'Cart',
  Payment = 'Payment'
}

let step: STEPS = STEPS.Intro;

if (step === STEPS.Intro) {
  console.log("It's the introduciton");
}

// enum are not usable values but just a state for comparison/checks/conditions

// By de default the values are 1, 2, 3, 4, etc..

console.log(step); // 1
// or
console.log(STEPS[step]); // Intro

// But we can assign other values for debugging
enum STEPS {
  Intro = 'Intro',
  Choice = 'Choice',
  Cart = 'Cart',
  Payment = 'Payment'
}
// Now it's better for debugging :
console.log(step); // 'Intro'

// ---------------------
// We can declare enum with const
const enum STEPS {
  Intro = 'Intro',
  Choice = 'Choice',
  Cart = 'Cart',
  Payment = 'Payment'
}
const step = STEPS.Intro;

// If we do that TS replace step by the value at the build
// (not big difference for dev)
```

```tsx
// -- Readonly --

// Readonly prevent modifying an element
// It's usefull if we pass an arg which should not change

const reverse = <T,>(arr: readonly T[]): T[] => {
  return arr.reverse();
  // ERROR : I can't reverse or push because arg is readonly

  return [...arr].reverse();
  // OK : Because I create a new array and dont edit the readonly array
};
```

```tsx
// --- Classes ---

// Private
class A {
  private num = 3; // num is only accessible in the class , not outside

  logNum = () => {
    console.log(this.num);
  };
}

const instance = new A();

console.log(instance.num); // Error : 'num' is private

instance.logNum(); // It's ok because i call a function inside the class

//Protected
class A {
  protected num = 3;
  // num is only accessible in the class and in child class (extended from A)
}

class B extends A {
  logNumA = () => {
    console.log(this.num); // It's OK because B extends A
    // If i use private instead of protected i have an error
  };
}

// Public & constructor
class A {
  constructor(public a: string) {
    // We dont need to declare this.a = a
    // Because a is 'public' in constructor types
    // 'public' is like a shortcut in constructors
  }
}
const instance = new A(3, 'test');
console.log(instance.a); // 3

// Types work normally in classes :
class Collection<T> {
  constructor(private items: T[]) {}

  first(): T | null {
    return this.items[0] || null;
  }
}

const instance = new Collection([1, 2, 3]);
// TS know that instance is a 'Collection<number>'

const theFirst = instance.first();
// TS know that theFirst is of type 'number | null'

// 12:05
```
