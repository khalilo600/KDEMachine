# JavaScript Control Flow

Control flow is the order in which the computer executes statements in a script. In JavaScript, you can use control flow statements to control the execution of your code based on certain conditions.

## Conditional Statements

Conditional statements are used to perform different actions based on different conditions.

### `if...else`

The `if...else` statement is the most common conditional statement. It allows you to execute a block of code if a condition is true, and another block of code if the condition is false.

```javascript
let age = 20;

if (age >= 18) {
  console.log("You are an adult.");
} else {
  console.log("You are a minor.");
}
```

### `else if`

You can use the `else if` statement to test for multiple conditions.

```javascript
let time = 14;

if (time < 10) {
  console.log("Good morning.");
} else if (time < 20) {
  console.log("Good day.");
} else {
  console.log("Good evening.");
}
```

### `switch`

The `switch` statement is used to perform different actions based on different cases.

```javascript
let day = "Monday";

switch (day) {
  case "Monday":
    console.log("Today is Monday.");
    break;
  case "Tuesday":
    console.log("Today is Tuesday.");
    break;
  default:
    console.log("Today is another day.");
}
```

## Looping Statements

Looping statements are used to execute a block of code multiple times.

### `for`

The `for` loop is the most common type of loop. It is used to execute a block of code a specific number of times.

```javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
```

### `while`

The `while` loop is used to execute a block of code as long as a condition is true.

```javascript
let i = 0;

while (i < 5) {
  console.log(i);
  i++;
}
```

### `do...while`

The `do...while` loop is similar to the `while` loop, but it will always execute the block of code at least once, even if the condition is false.

```javascript
let i = 0;

do {
  console.log(i);
  i++;
} while (i < 5);
```

### `for...in` and `for...of`

*   The `for...in` loop is used to iterate over the properties of an object.
*   The `for...of` loop is used to iterate over the values of an iterable object, such as an array.

```javascript
// for...in
let person = {name: "John", age: 30};

for (let key in person) {
  console.log(key + ": " + person[key]);
}

// for...of
let colors = ["red", "green", "blue"];

for (let color of colors) {
  console.log(color);
}
```

## `break` and `continue`

*   The `break` statement is used to exit a loop.
*   The `continue` statement is used to skip the current iteration of a loop and move on to the next one.

Control flow statements are essential for creating complex and dynamic programs. By mastering these statements, you will be able to write code that can make decisions and perform repetitive tasks.
