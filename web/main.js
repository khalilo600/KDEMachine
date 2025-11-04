// learn JavaScript
console.log("Hello, JavaScript!");
console.log("Learning JavaScript is fun!");
console.log("Let's code some JavaScript!");
console.log("JavaScript powers the web!");
console.log("JavaScript is versatile!");
console.log("JavaScript can be used for front-end and back-end development!");
console.log("With JavaScript, you can create interactive web pages!");
console.log("JavaScript has a rich ecosystem of libraries and frameworks!");
console.log("Asynchronous programming is a key feature of JavaScript!");
console.log("JavaScript continues to evolve with new features!");
console.log("Mastering JavaScript opens up many career opportunities!");
// variables and data types
let name = "Alice";
const age = 30;
var isStudent = false;
let height = 5.7;
const hobbies = ["reading", "traveling", "coding"];
var address = {
    street: "123 Main St",
    city: "Wonderland",
    zip: "12345"
};
// operators
// arrow functions
let sum = (a, b) => a + b;
let isEven = (num) => num % 2 === 0;
// types of functions
function multiply(a, b) {
    return a * b;
}
const divide = function(a, b) {
    return a / b;
};

// control structures
let isAdult = age >= 18;
let fullName = name + " Smith";
console.log("Is Adult:", isAdult);
console.log("Full Name:", fullName);    
// arrays and loops
for (let i = 0; i < hobbies.length; i++) {
    console.log(`Hobby ${i + 1}: ${hobbies[i]}`);
}
// objects and methods
console.log("Address:", address.street, address.city, address.zip);
address.getFullAddress = function() {
    return `${this.street}, ${this.city}, ${this.zip}`;
};
console.log("Full Address:", address.getFullAddress());
// conditionals
if (isStudent) {
    console.log(`${name} is a student.`);
} else {
    console.log(`${name} is not a student.`);
}
// loops
let count = 0;
while (count < 3) {
    console.log("Count:", count);
    count++;
}
// switch statement
let day = 2;
switch (day) {
    case 1:
        console.log("Monday");
        break;
    case 2:
        console.log("Tuesday");
        break;
    case 3:
        console.log("Wednesday");
        break;
    default:
        console.log("Another day");
}
// try-catch block for error handling
try {
    let result = 10 / 0;
    console.log("Result:", result);
} catch (error) {
    console.error("Error:", error.message);
}
// arrays methods
hobbies.push("painting");
console.log("Hobbies after push:", hobbies);
let removedHobby = hobbies.pop();
console.log("Removed Hobby:", removedHobby);
console.log("Hobbies after pop:", hobbies);
// string methods
let upperName = name.toUpperCase();
console.log("Uppercase Name:", upperName);
let nameLength = name.length;
console.log("Name Length:", nameLength);
// date and time
let currentDate = new Date();
console.log("Current Date and Time:", currentDate);
// regular expressions
let regex = /a/i;
let testString = "Alice";
console.log("Regex Test:", regex.test(testString));
// JSON
let jsonString = JSON.stringify(address);
console.log("JSON String:", jsonString);
let jsonObject = JSON.parse(jsonString);
console.log("Parsed JSON Object:", jsonObject);
// higher-order functions
let numbers = [1, 2, 3, 4, 5];
let doubledNumbers = numbers.map(num => num * 2);
console.log("Doubled Numbers:", doubledNumbers);
let evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Even Numbers:", evenNumbers);
let sumOfNumbers = numbers.reduce((acc, curr) => acc + curr, 0);
console.log("Sum of Numbers:", sumOfNumbers);
// ES6 features
let greetMessage = `Hello, ${name}! You are ${age} years old.`;
console.log(greetMessage);
let [firstHobby, secondHobby] = hobbies;
console.log("First Hobby:", firstHobby);
console.log("Second Hobby:", secondHobby);
let { street, city } = address;
console.log("Street:", street);
console.log("City:", city);
// arrow functions
const add = (a, b) => a + b;
console.log("Add Function:", add(5, 3));
// classes
class Animal {
    constructor(name, species) {
        this.name = name;
        this.species = species;
    }
    makeSound() {
        console.log(`${this.name} makes a sound.`);
    }
}
const dog = new Animal("Buddy", "Dog");
dog.makeSound();
// modules (example, not executable in this single file)
// export function multiply(a, b) {
//     return a * b;
// }
// import { multiply } from './math.js';
// console.log("Multiply Function:", multiply(4, 2));
// end of JavaScript code

// Additional JavaScript concepts
// variables
const pi = 3.14159;
var isRaining = true;
// data types
let score = 95;
let temperature = 72.5;
let isActive = false;
// operators
let difference = score - 10;
let isPassing = score >= 60;
let greetingMessage = "Welcome, " + name + "!";
// loops
for (let hobby of hobbies) {
    console.log("Hobby:", hobby);
}
let index = 0;
do {
    console.log("Index:", index);
    index++;
} while (index < 3);
// switch statement
let color = "red";
switch (color) {
    case "red":
        console.log("Color is Red");
        break;
    case "blue":
        console.log("Color is Blue");
        break;
    default:
        console.log("Color is Unknown");
}
// try-catch-finally
try {
    let data = JSON.parse('{"invalidJson": true}');
} catch (error) {
    console.error("Parsing Error:", error.message);
} finally {
    console.log("Execution completed.");
}
// functions
function greet(userName) {
    return `Hello, ${userName}!`;
}
console.log(greet(name));
// control structures
if (age >= 18) {
    console.log(`${name} is an adult.`);
} else {
    console.log(`${name} is a minor.`);
}
for (let i = 0; i < hobbies.length; i++) {
    console.log(`Hobby ${i + 1}: ${hobbies[i]}`);
}
// arrays and objects
hobbies.push("gaming");
console.log("Updated hobbies:", hobbies);
address.country = "Fictionland";
console.log("Updated address:", address);
// ES6 features
const square = (x) => x * x;
console.log("Square of 4:", square(4));
// asynchronous programming with setTimeout
setTimeout(() => {
    console.log("This message is displayed after 2 seconds.");
}, 2000);
// promises
const fetchData = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Data fetched successfully!");
    }, 1500);
});
fetchData.then((result) => {
    console.log(result);
}).catch((error) => {
    console.error(error);
});
// error handling
try {
    let result = 10 / 0;
    console.log("Result:", result);
} catch (error) {
    console.error("Error:", error.message);
}
// classes
class Person {
    // constructor to initialize name and age
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    // method to introduce the person
    introduce() {
        console.log(`Hi, I\'m ${this.name} and I\'m ${this.age} years old.`);
    }
}
const person1 = new Person("Bob", 25);
person1.introduce();
// modules (example, not executable in this single file)
// export function add(a, b) {
//     return a + b;
// }
// import { add } from './math.js';
// console.log("Sum:", add(5, 3));
// DOM manipulation (example, not executable in this single file)
// document.getElementById("demo").innerHTML = "Hello, DOM!";   
// event handling (example, not executable in this single file)
// document.getElementById("myButton").addEventListener("click", function() {
//     alert("Button clicked!");
// });
// JSON handling
// higher-order functions
// template literals
const greeting = `My name is ${name} and I am ${age} years old.`;
console.log(greeting);
// destructuring
const point = { x: 10, y: 20 };
const { x, y } = point;
console.log(`X: ${x}, Y: ${y}`);
// spread operator
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5, 6];
console.log("Combined Array:", arr2);
const obj1 = { a: 1, b: 2 };
const obj2 = { ...obj1, c: 3 };
console.log("Combined Object:", obj2);
// rest parameters
function sumAll(...args) {
    return args.reduce((acc, curr) => acc + curr, 0);
}
console.log("Sum of all arguments:", sumAll(1, 2, 3, 4, 5));
// default parameters
function greetUser(userName = "Guest") {
    console.log(`Welcome, ${userName}!`);
}
greetUser();
greetUser("David");
// generators
function* idGenerator() {
    let id = 1;
    while (true) {
        yield id++;
    }
}
const gen = idGenerator();
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
// async/await
async function fetchDataAsync() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Async data fetched!");
        }, 1000);
    });
}
async function displayData() {
    const data = await fetchDataAsync();
    console.log(data);
}
displayData();
// map, set, weakmap, weakset
const myMap = new Map();
myMap.set("key1", "value1");
myMap.set("key2", "value2");
console.log("Map:", myMap);
const mySet = new Set([1, 2, 3, 4, 5]);
console.log("Set:", mySet);
const myWeakMap = new WeakMap();
let objKey = {};
myWeakMap.set(objKey, "weakValue");
console.log("WeakMap:", myWeakMap);
const myWeakSet = new WeakSet();
let objValue = {};
myWeakSet.add(objValue);
console.log("WeakSet:", myWeakSet);
// end of JavaScript code

// Feature: Change styledBox background color on button click
const toggleStyleBtn = document.getElementById('toggleStyleBtn');
const styledBox = document.getElementById('styledBox');

const colors = ['red', 'blue', 'green', 'purple', 'orange', 'pink'];
let colorIndex = 0;

toggleStyleBtn.addEventListener('click', () => {
    styledBox.style.backgroundColor = colors[colorIndex];
    colorIndex = (colorIndex + 1) % colors.length;
});

// Feature: Change dynamicText content on button click
const changeTextBtn = document.getElementById('changeTextBtn');
const dynamicText = document.getElementById('dynamicText');

const texts = ['Hello there!', 'General Kenobi!', 'You are a bold one.', 'So uncivilized.'];
let textIndex = 0;

changeTextBtn.addEventListener('click', () => {
    dynamicText.textContent = texts[textIndex];
    textIndex = (textIndex + 1) % texts.length;
});