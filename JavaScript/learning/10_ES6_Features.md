# ES6 (ECMAScript 2015) Features

ES6, also known as ECMAScript 2015, was a major update to the JavaScript language. It introduced a number of new features and syntax improvements that make the language more powerful, flexible, and expressive.

## `let` and `const`

As discussed in a previous section, ES6 introduced the `let` and `const` keywords for declaring variables. These keywords provide block-level scope, which is more intuitive than the function-level scope of the `var` keyword.

## Arrow Functions

Arrow functions provide a more concise syntax for writing functions. They are especially useful for writing anonymous functions.

```javascript
// ES5
var add = function(a, b) {
  return a + b;
};

// ES6
const add = (a, b) => a + b;
```

## Template Literals

Template literals provide an easier way to create strings with embedded expressions. They are enclosed in backticks (`` ` ``) instead of single or double quotes.

```javascript
// ES5
var name = "John";
var message = "Hello, " + name + "!";

// ES6
const name = "John";
const message = `Hello, ${name}!`;
```

## Default Parameters

ES6 allows you to specify default values for function parameters.

```javascript
function greet(name = "World") {
  console.log(`Hello, ${name}!`);
}

greet(); // "Hello, World!"
greet("John"); // "Hello, John!"
```

## Destructuring Assignment

Destructuring assignment allows you to unpack values from arrays or properties from objects into distinct variables.

```javascript
// Array destructuring
const [a, b] = [1, 2];

// Object destructuring
const {name, age} = {name: "John", age: 30};
```

## Rest and Spread Operators

*   The **rest operator** (`...`) allows you to represent an indefinite number of arguments as an array.
*   The **spread operator** (`...`) allows you to expand an iterable (like an array) into individual elements.

```javascript
// Rest operator
function sum(...numbers) {
  return numbers.reduce((acc, val) => acc + val, 0);
}

// Spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];
```

## Classes

ES6 introduced a new syntax for creating classes in JavaScript. This is primarily syntactical sugar over JavaScript's existing prototype-based inheritance, and it does not introduce a new object-oriented inheritance model.

```javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

const john = new Person("John", 30);
john.greet();
```

## Modules

ES6 introduced a new module system for organizing and sharing code. You can use the `export` keyword to export a module, and the `import` keyword to import it into another file.

**myModule.js:**
```javascript
export const myVar = 123;

export function myFunction() {
  // ...
}
```

**main.js:**
```javascript
import {myVar, myFunction} from "./myModule.js";
```

## Promises

As discussed in a previous section, ES6 introduced promises for handling asynchronous operations.

These are just some of the many new features that were introduced in ES6. By using these features, you can write more modern, readable, and maintainable JavaScript code.
