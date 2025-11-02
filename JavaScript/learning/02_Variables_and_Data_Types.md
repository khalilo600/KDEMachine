# JavaScript Variables and Data Types

Variables are used to store data in a program. In JavaScript, you can declare a variable using the `var`, `let`, or `const` keyword.

## Declaring Variables

*   **`var`:** The `var` keyword is the oldest way to declare a variable in JavaScript. It has some quirks with scoping that can lead to unexpected behavior, so it is generally recommended to use `let` or `const` instead.
*   **`let`:** The `let` keyword was introduced in ES6 (ECMAScript 2015). It allows you to declare a block-scoped variable, which means that the variable is only accessible within the block of code where it is defined.
*   **`const`:** The `const` keyword is also used to declare a block-scoped variable, but it must be assigned a value when it is declared, and its value cannot be changed later.

### Example

```javascript
var x = 5;
let y = 10;
const z = 15;
```

## Data Types

JavaScript has a number of different data types that can be stored in variables. These can be divided into two categories: primitive data types and complex data types.

### Primitive Data Types

*   **String:** Represents a sequence of characters. Strings are enclosed in single or double quotes.
*   **Number:** Represents a numerical value. JavaScript does not have a separate integer type; all numbers are floating-point numbers.
*   **Boolean:** Represents a logical value, which can be either `true` or `false`.
*   **Undefined:** Represents a variable that has been declared but has not been assigned a value.
*   **Null:** Represents the intentional absence of any object value.
*   **Symbol:** A unique and immutable primitive value that may be used as the key of an Object property.

### Complex Data Types

*   **Object:** Represents a collection of key-value pairs. Objects are used to store complex data structures.
*   **Array:** A special type of object that is used to store an ordered collection of values.

### Example

```javascript
// String
let name = "John Doe";

// Number
let age = 30;

// Boolean
let isStudent = true;

// Undefined
let car;

// Null
let house = null;

// Object
let person = {
  name: "Jane Doe",
  age: 25
};

// Array
let colors = ["red", "green", "blue"];
```

## Dynamic Typing

JavaScript is a dynamically typed language, which means that you do not have to specify the data type of a variable when you declare it. The data type of a variable is determined automatically at runtime.

```javascript
let x = 5; // x is a number
x = "hello"; // now x is a string
```

## The `typeof` Operator

You can use the `typeof` operator to find out the data type of a variable.

```javascript
console.log(typeof 5); // "number"
console.log(typeof "hello"); // "string"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof null); // "object" (this is a well-known quirk in JavaScript)
console.log(typeof {}); // "object"
console.log(typeof []); // "object"
```

Understanding variables and data types is a fundamental concept in JavaScript. By mastering these concepts, you will be well on your way to becoming a proficient JavaScript developer.
