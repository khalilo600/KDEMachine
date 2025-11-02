# JavaScript Operators

JavaScript operators are used to perform operations on values and variables. They are a fundamental part of the language and are used in almost every program.

## Arithmetic Operators

Arithmetic operators are used to perform mathematical calculations.

*   `+` (Addition)
*   `-` (Subtraction)
*   `*` (Multiplication)
*   `/` (Division)
*   `%` (Modulus - returns the remainder of a division)
*   `**` (Exponentiation - ES2016)
*   `++` (Increment)
*   `--` (Decrement)

## Assignment Operators

Assignment operators are used to assign values to variables.

*   `=` (Assignment)
*   `+=` (Addition assignment)
*   `-=` (Subtraction assignment)
*   `*=` (Multiplication assignment)
*   `/=` (Division assignment)
*   `%=` (Modulus assignment)
*   `**=` (Exponentiation assignment)

## Comparison Operators

Comparison operators are used to compare two values. They return a boolean value (`true` or `false`).

*   `==` (Equal to)
*   `===` (Strict equal to - checks for both value and type)
*   `!=` (Not equal to)
*   `!==` (Strict not equal to)
*   `>` (Greater than)
*   `<` (Less than)
*   `>=` (Greater than or equal to)
*   `<=` (Less than or equal to)

### The Difference Between `==` and `===`

The `==` operator performs type coercion, which means that it will try to convert the values to the same type before comparing them. The `===` operator, on the other hand, does not perform type coercion. It will only return `true` if both the value and the type are the same.

```javascript
5 == "5" // true
5 === "5" // false
```

It is generally recommended to use the `===` operator to avoid unexpected behavior.

## Logical Operators

Logical operators are used to combine multiple boolean expressions.

*   `&&` (Logical AND)
*   `||` (Logical OR)
*   `!` (Logical NOT)

## String Operators

The `+` operator can also be used to concatenate (join) two strings.

```javascript
let firstName = "John";
let lastName = "Doe";
let fullName = firstName + " " + lastName; // "John Doe"
```

## Ternary Operator

The ternary operator is a shorthand for an `if...else` statement. It takes three operands: a condition, an expression to execute if the condition is true, and an expression to execute if the condition is false.

```javascript
let age = 20;
let isAdult = (age >= 18) ? "Yes" : "No"; // "Yes"
```

## `typeof` Operator

The `typeof` operator returns the data type of a variable.

```javascript
typeof 5; // "number"
```

Operators are a fundamental building block of JavaScript. By understanding how to use them effectively, you can write more concise and powerful code.
