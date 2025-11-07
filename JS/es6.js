// es6 features
export const es6Features = `
// ### **Step 4: Arrays, Objects & ES6+ Features**

**Focus:** Handle data efficiently (modern JS).

**Key Topics:** ES6 (ECMAScript 2015) introduced many powerful features that are now standard. ES6+ refers to these and subsequent updates.

*   **Array Methods:** Powerful built-in functions for working with arrays.
    *   `map()`: Creates a new array by calling a function on every element in the original array.
        ```javascript
        const numbers = [1, 2, 3];
        const doubled = numbers.map(num => num * 2); // [2, 4, 6]
        ```
    *   `filter()`: Creates a new array with all elements that pass a test implemented by the provided function.
        ```javascript
        const evens = numbers.filter(num => num % 2 === 0); // [2]
        ```
    *   `reduce()`: Executes a reducer function on each element of the array, resulting in a single output value.
        ```javascript
        const sum = numbers.reduce((acc, num) => acc + num, 0); // 6
        ```
    *   Other useful methods: `forEach()`, `find()`, `findIndex()`, `some()`, `every()`, `sort()`.

*   **Destructuring:** A convenient way to extract values from arrays or properties from objects into distinct variables.
    *   **Array Destructuring:**
        ```javascript
        const colors = ["red", "green", "blue"];
        const [firstColor, secondColor] = colors; // firstColor = "red", secondColor = "green"
        ```
    *   **Object Destructuring:**
        ```javascript
        const person = { name: "Jane", age: 28 };
        const { name, age } = person; // name = "Jane", age = 28
        ```

*   **Arrow Functions (`=>`):** A more concise way to write function expressions, especially useful for callbacks.
    ```javascript
    // Traditional function
    const multiply = function(a, b) {
        return a * b;
    };

    // Arrow function
    const multiplyArrow = (a, b) => a * b;
    console.log(multiplyArrow(4, 2)); // Output: 8
    ```

*   **Template Literals (`` ` ``):** Allow for embedded expressions and multi-line strings, making string concatenation much cleaner.
    ```javascript
    const product = "Laptop";
    const price = 1200;
    const productInfo = `The ${product} costs $${price}.`;
    console.log(productInfo); // Output: The Laptop costs $1200.
    ```

*   **`async/await`:** Modern syntax for handling asynchronous operations, making them look and behave more like synchronous code (covered more in Step 5).

**Time Estimate:** 2 weeks

**Project Idea:** Build a dynamic shopping cart for an e-commerce mockup.

**Elaboration:** Create an array of product objects. Use `map()` to display them on the page. Implement functionality to add items to a cart (another array). Use `filter()` to remove items, and `reduce()` to calculate the total price. This project will heavily leverage array and object manipulation.

// 