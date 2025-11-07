// how to make funtions 
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

export function power(base, exponent) {
    return Math.pow(base, exponent);
}

export function squareRoot(num) {
    return Math.sqrt(num);
}
// return type
export function greet(name) {
    return `Hello, ${name}!`;
}

export function isEven(num) {
    return num % 2 === 0;
}

export function isOdd(num) {
    return num % 2 !== 0;
}

export function isPositive(num) {
    return num > 0;
}

export function isNegative(num) {
    return num < 0;
}

export function isZero(num) {
    return num === 0;
}   
// function args
export function sum(...numbers) {
    return numbers.reduce((acc, num) => acc + num, 0);
}

export function average(...numbers) {
    if (numbers.length === 0) {
        return 0;
    }
    return numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
}

export function max(...numbers) {
    return Math.max(...numbers);
}

export function min(...numbers) {
    return Math.min(...numbers);
}   
// optional argument
export function greetWithName(name, greeting = "Hello") {
    return `${greeting}, ${name}!`;
}

// arrow functions
export const addArrow = (a, b) => a + b;

export const subtractArrow = (a, b) => a - b;

export const multiplyArrow = (a, b) => a * b;

export const divideArrow = (a, b) => {
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
};

export const powerArrow = (base, exponent) => Math.pow(base, exponent);

export const squareRootArrow = num => Math.sqrt(num);   

// higher order functions
export function calculate(a, b, operation) {
    return operation(a, b);
}

// map
export function doubleNumbers(numbers) {
    return numbers.map(num => num * 2);
}

// filter
export function filterEvenNumbers(numbers) {
    return numbers.filter(num => num % 2 === 0);
}

// reduce
// forEach
export function formatNumbersForLogging(numbers) {
    const logs = [];
    numbers.forEach(num => logs.push(`Number: ${num}`));
    return logs;
}

// find
export function findNumber(numbers, target) {
    return numbers.find(num => num === target);
}

// findIndex
export function findNumberIndex(numbers, target) {
    return numbers.findIndex(num => num === target);
}

// some
export function hasEvenNumber(numbers) {
    return numbers.some(num => num % 2 === 0);
}

// every
export function allNumbersAreEven(numbers) {
    return numbers.every(num => num % 2 === 0);
}

// sort
export function sortNumbersAscending(numbers) {
    return [...numbers].sort((a, b) => a - b);
}

// object destructuring
export function getPersonInfo(person) {
    const { name, age } = person;
    return `${name} is ${age} years old.`;
}

// array destructuring
export function getFirstTwoColors(colors) {
    const [first, second] = colors;
    return `First: ${first}, Second: ${second}`;
}

// spread operator
export function mergeArrays(arr1, arr2) {
    return [...arr1, ...arr2];
}

export function createPersonWithDefaults(person) {
    const defaultPerson = { name: "Unknown", age: 0 };
    return { ...defaultPerson, ...person };
}

// nullish coalescing operator
export function getValueOrDefault(value, defaultValue) {
    return value ?? defaultValue;
}

// optional chaining
export function getUserAddressCity(user) {
    return user?.address?.city;
}
