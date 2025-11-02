# JavaScript Functions

Functions are one of the fundamental building blocks in JavaScript. A function is a block of code that is designed to perform a particular task. Functions are reusable, which means that you can define a function once and then call it multiple times.

## Defining a Function

There are several ways to define a function in JavaScript.

### Function Declaration

The most common way to define a function is with a function declaration. A function declaration consists of the `function` keyword, followed by the name of the function, a list of parameters in parentheses, and a block of code in curly braces.

```javascript
function greet(name) {
  console.log("Hello, " + name + "!");
}
```

### Function Expression

A function can also be defined with a function expression. A function expression is similar to a function declaration, but it is assigned to a variable.

```javascript
const greet = function(name) {
  console.log("Hello, " + name + "!");
};
```

### Arrow Functions (ES6)

Arrow functions were introduced in ES6. They provide a more concise syntax for writing functions.

```javascript
const greet = (name) => {
  console.log("Hello, " + name + "!");
};
```

If the function only has one statement, you can omit the curly braces and the `return` keyword.

```javascript
const add = (a, b) => a + b;
```

## Calling a Function

To execute a function, you need to call it. You can call a function by using its name followed by parentheses.

```javascript
greet("John"); // "Hello, John!"
```

## Parameters and Arguments

*   **Parameters** are the names listed in the function definition.
*   **Arguments** are the real values passed to the function when it is called.

## The `return` Statement

A function can optionally return a value. The `return` statement is used to specify the value that the function should return.

```javascript
function add(a, b) {
  return a + b;
}

let sum = add(5, 10); // 15
```

If a function does not have a `return` statement, it will return `undefined` by default.

## Scope

Scope determines the accessibility of variables. In JavaScript, there are two types of scope: global scope and local scope.

*   **Global scope:** Variables declared outside of a function are in the global scope. They can be accessed from anywhere in the program.
*   **Local scope:** Variables declared inside of a function are in the local scope. They can only be accessed from within that function.

```javascript
let globalVar = "I am global";

function myFunction() {
  let localVar = "I am local";
  console.log(globalVar); // "I am global"
  console.log(localVar); // "I am local"
}

myFunction();

console.log(globalVar); // "I am global"
console.log(localVar); // Uncaught ReferenceError: localVar is not defined
```

## Higher-Order Functions

In JavaScript, functions are first-class citizens. This means that they can be treated like any other value. They can be assigned to variables, passed as arguments to other functions, and returned from other functions.

A function that takes another function as an argument or returns a function is called a higher-order function.

```javascript
function sayHello() {
  return function() {
    console.log("Hello!");
  };
}

const myFunc = sayHello();
myFunc(); // "Hello!"
```

Functions are a powerful and essential concept in JavaScript. By understanding how to define and use functions effectively, you can write more modular, reusable, and maintainable code.
