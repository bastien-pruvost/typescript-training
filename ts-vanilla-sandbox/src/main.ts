import './style.css';

const incrementBtn = document.querySelector('#incrementBtn') as HTMLButtonElement | null;
const counter = <HTMLHeadingElement | null>document.querySelector('#counter');

let i = 0;

let increment = (e: Event): void => {
  console.log(e);

  i++;

  if (counter) {
    counter.textContent = i.toString();
  }
};

incrementBtn?.addEventListener('click', increment);

function printId(id: number | string) {
  if (typeof id === 'number') {
    console.log((id * 3).toString());
  } else {
    console.log(id.toUpperCase());
  }
}

function printSomething(a: number | string, b: number | boolean) {
  if (a === b) {
    console.log(a * b);
  } else {
    console.log(a, b);
  }
}

function mapArray(a: string | string[]) {
  if (Array.isArray(a)) {
    a.map((value) => console.log(value));
  } else {
    console.log(a);
  }
}

function exemple(a: MouseEvent | HTMLInputElement | Object) {
  if ('target' in a) {
    console.log(a?.x, a?.y); // TS know that a is a MouseEvent
  } else if ('value' in a) {
    console.log(a.value); // TS know that a is an HTMLInputElement
  } else {
    console.log(a); // TS know that a is an object
  }
}

// Function with param of type any. It return a
const isAnArray: Function = (b: any): b is any[] => {
  return Array.isArray(b);
};

const myDiv = document.querySelector('#my-div') as HTMLDivElement;
myDiv.textContent = 'Hello world';

const myButton = document.querySelector<HTMLButtonElement>('#button');
// We tell TS that we are sure of the type and he dont check (with 'as')
const otherDiv = document.querySelector('#my-div') as HTMLDivElement | null;
if (otherDiv) {
  otherDiv.textContent = 'Hello world';
}

const myInput = document.querySelector('#my-input') as HTMLInputElement | null;
if (myInput) {
  myInput.value = 'Im the value';
}

// // Create a custom type
// type User = { firstname: string; lastname: string; age: number };
// // Using this type
// const john: User = { firstname: 'John', lastname: 'Doe', age: 24 };

function identify<ArgType>(arg: ArgType): ArgType {
  return arg;
}

const d = identify<number>(3);

function returnFirstValue<MyType>(arr: MyType[]): MyType | null {
  return arr[0] || null;
  // if (Array.isArray(arr) && arr[0]) {
  //   return arr[0]; // The returned value is typed
  // } else {
  //   return null;
  // }
}

const firstValue = returnFirstValue([0, 1, 2, 3]);

type Identity<ArgType> = (arg: ArgType) => ArgType;

const myNewFunc: Identity<string> = (b) => {
  return b;
};

// We tell TS that the type need to have a key length of type number (Any array)
function consoleSize<Type extends { length: number }>(arg: Type): Type {
  console.log(arg.length);
  return arg;
}

// We tell TS that the type need to have a key value of type string and can return strin or null
function consoleSizing(arg: { value: string } | null): string | null {
  console.log(arg?.value);
  return arg?.value || null;
}

consoleSize([3, 2, 1]);
consoleSizing(myInput);

type User = {
  username: string;
  age: number;
  city: string;
};

interface Point {
  x: number;
}

interface Point {
  y: number;
}

const john: User = { username: 'John', age: 24, city: 'Toulouse' };
const myPoint: Point = { x: 12, y: 56 };

printId(3);
printSomething('Test', 3);
mapArray('test');
exemple({ firstname: 'John' });
isAnArray(['Foo', 'Bar']);
console.log(myButton);
console.log(john);
console.log(d);
console.log(firstValue);
const abc = myNewFunc((3).toString());
console.log(abc);
console.log(myPoint);
