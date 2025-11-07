// Demonstrates a basic for loop to iterate over elements in an array.
export function iterateArray(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i]);
    }
}
// Demonstrates a while loop to count down from a given number.
export function countdown(num) {
    while (num > 0) {
        console.log(num);
        num--;
    }
}
// Demonstrates a do...while loop, which guarantees at least one execution of its body.
export function executeAtLeastOnce() {
    let count = 0;
    let result = [];
    do {
        result.push(`Count is: ${count}`);
        count++;
    } while (count < 3);
    return result;
}
// Demonstrates a for...in loop to iterate over enumerable properties of an object.
export function iterateObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(`${key}: ${obj[key]}`);
        }
    }
}
// Demonstrates a for...of loop to iterate over iterable objects (like arrays, strings, maps, sets).
export function iterateIterable(iterable) {
    for (let value of iterable) {
        console.log(value);
    }
}   
// Demonstrates nested for loops to create a multiplication table.
export function multiplicationTable(size) {
    for (let i = 1; i <= size; i++) {
        let row = '';
        for (let j = 1; j <= size; j++) {
            row += (i * j) + '\t';
        }
        console.log(row);
    }
}
// Demonstrates the use of a 'break' statement to exit a loop early when a condition is met.
export function findFirstEven(arr) {
    for (let num of arr) {
        if (num % 2 === 0) {
            console.log(`First even number: ${num}`);
            break;
        }
    }
}
// Demonstrates the use of a 'continue' statement to skip the current iteration of a loop.
export function skipOddNumbers(arr) {
    for (let num of arr) {
        if (num % 2 !== 0) {
            continue;
        }
        console.log(num);
    }
}
// Demonstrates a labeled statement to break out of nested loops.
export function breakNestedLoops() {
    outerLoop: for (let i = 1; i <= 3; i++) {
        for (let j = 1; j <= 3; j++) {
            if (i === 2 && j === 2) {
                break outerLoop;
            }
            console.log(`i: ${i}, j: ${j}`);
        }
    }
}
// Demonstrates an infinite loop with a conditional exit using a 'break' statement.
export function infiniteLoopWithExit() {
    let count = 0;
    while (true) {
        console.log("Looping...");
        count++;
        if (count >= 5) {
            console.log("Exiting loop");
            break;
        }
    }
}
// Demonstrates iterating over an array using the `forEach` method.
export function arrayForEach(arr) {
    arr.forEach(item => {
        console.log(item);
    });
}
// Demonstrates transforming array elements using the `map` method.
export function arrayMap(arr) {
    return arr.map(item => item * 2);
}
// Demonstrates creating a new array with elements that pass a test using the `filter` method.
export function arrayFilter(arr) {
    return arr.filter(item => item % 2 === 0);
}
// Demonstrates reducing an array to a single value using the `reduce` method.
export function arrayReduce(arr) {
    return arr.reduce((acc, item) => acc + item, 0);
}   
// Demonstrates asynchronous iteration using async/await with a for...of loop.
export async function asyncLoop(arr) {
    for (let item of arr) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log(item);
    }
}
// Demonstrates iteration using a generator function.
export function* generatorLoop(arr) {
    for (let item of arr) {
        yield item;
    }
}
// Demonstrates array iteration using recursion.
export function recursiveLoop(arr, index = 0) {
    if (index < arr.length) {
        console.log(arr[index]);
        recursiveLoop(arr, index + 1);
    }
}
// Demonstrates iterating with a delay using `setTimeout` for each item.
export function loopWithTimeout(arr) {
    arr.forEach((item, index) => {
        setTimeout(() => {
            console.log(item);
        }, index * 1000);
    });
}
// Demonstrates iterating with a fixed interval using `setInterval`.
export function loopWithInterval(arr) {
    let index = 0;
    const intervalId = setInterval(() => {
        if (index < arr.length) {
            console.log(arr[index]);
            index++;
        } else {
            clearInterval(intervalId);
        }
    }, 1000);
}
// Demonstrates iterating using `requestAnimationFrame` for smooth animations or updates.
export function loopWithAnimationFrame(arr) {
    let index = 0;
    function loop() {
        if (index < arr.length) {
            console.log(arr[index]);
            index++;
            requestAnimationFrame(loop);
        }
    }
    requestAnimationFrame(loop);
}   
// Demonstrates iterating over asynchronous iterables using `for await...of`.
export async function forAwaitOfLoop(asyncIterable) {
    for await (let item of asyncIterable) {
        console.log(item);
    }
}
// Demonstrates iterating over an array with destructuring to get both index and value.
export function destructuringLoop(arr) {
    for (let [index, value] of arr.entries()) {
        console.log(`Index: ${index}, Value: ${value}`);
    }
}
// Demonstrates iterating over an object's key-value pairs using `Object.entries()`.
export function objectEntriesLoop(obj) {
    for (let [key, value] of Object.entries(obj)) {
        console.log(`${key}: ${value}`);
    }
}
// Demonstrates iterating over an object's keys using `Object.keys()`.
export function objectKeysLoop(obj) {
    for (let key of Object.keys(obj)) {
        console.log(`${key}: ${obj[key]}`);
    }
}
// Demonstrates iterating over an object's values using `Object.values()`.
export function objectValuesLoop(obj) {
    for (let value of Object.values(obj)) {
        console.log(value);
    }
}
// Demonstrates checking if all elements in an array pass a test using `every()`.
export function checkEveryElement(arr, predicate) {
    return arr.every(predicate);
}
// Demonstrates checking if at least one element in an array passes a test using `some()`.
export function checkSomeElement(arr, predicate) {
    return arr.some(predicate);
}   
// Demonstrates finding the first element in an array that satisfies a condition using `find()`.
export function findElement(arr, predicate) {
    return arr.find(predicate);
}
// Demonstrates finding the index of the first element in an array that satisfies a condition using `findIndex()`.
export function findElementIndex(arr, predicate) {
    return arr.findIndex(predicate);
}
// Demonstrates mapping and flattening an array into a new array using `flatMap()`.
export function flatMapArray(arr, mapper) {
    return arr.flatMap(mapper);
}   
// Demonstrates sorting the elements of an array in place using `sort()`.
export function sortArray(arr, compareFunction) {
    return arr.sort(compareFunction);
}

// Demonstrates reversing the order of elements in an array in place using `reverse()`.
export function reverseArrayInPlace(arr) {
    return arr.reverse();
}
// Demonstrates filling all the elements of an array with a static value using `fill()`.
export function fillArrayInPlace(arr, value) {
    return arr.fill(value);
}
// Demonstrates copying a sequence of array elements within the array using `copyWithin()`.
export function copyWithinArrayInPlace(arr, target, start, end) {
    return arr.copyWithin(target, start, end);
}
// Demonstrates changing the contents of an array by removing or replacing existing elements and/or adding new elements in place using `splice()`.
export function spliceArrayInPlace(arr, start, deleteCount, ...items) {
    return arr.splice(start, deleteCount, ...items);
}
// Demonstrates extracting a section of an array and returning a new array using `slice()`.
export function sliceArrayIntoNew(arr, start, end) {
    return arr.slice(start, end);
}
// Demonstrates merging two or more arrays using `concat()`.
export function concatenateArrays(arr1, arr2) {
    return arr1.concat(arr2);
}
// Demonstrates joining all elements of an array into a string using `join()`.
export function joinArrayElementsToString(arr, separator) {
    return arr.join(separator);
}
// Demonstrates checking if an array includes a certain value among its entries using `includes()`.
export function checkArrayIncludesValue(arr, value) {
    return arr.includes(value);
}
// Demonstrates finding the first index at which a given element can be found in the array using `indexOf()`.
export function findIndexOfElement(arr, value) {
    return arr.indexOf(value);
}
// Demonstrates finding the last index at which a given element can be found in the array using `lastIndexOf()`.
export function findLastIndexOfElement(arr, value) {
    return arr.lastIndexOf(value);
}
// Demonstrates converting an array to a string using `toString()`.
export function convertArrayToString(arr) {
    return arr.toString();
}
// Demonstrates converting an array to a localized string representation using `toLocaleString()`.
export function convertArrayToLocaleString(arr) {
    return arr.toLocaleString();
}   
// Demonstrates returning the primitive value of an array using `valueOf()`.
export function getArrayPrimitiveValue(arr) {
    return arr.valueOf();
}   
// loop with array.flat()
export function flattenArray(arr) {
    return arr.flat();
}
// loop with array.from()
export function createArrayFromIterable(iterable) {
    return Array.from(iterable);
}
// loop with array.isArray()
export function checkIfIsArray(value) {
    return Array.isArray(value);
}
// loop with array.of()
export function createArrayOfElements(...elements) {
    return Array.of(...elements);
}
// loop with array.fill() and map()
export function fillAndMapArray(arr, value, mapper) {
    return arr.fill(value).map(mapper);
}
// loop with array.copyWithin() and map()
export function copyWithinAndMapArray(arr, target, start, end, mapper) {
    return arr.copyWithin(target, start, end).map(mapper);
}
// loop with array.splice() and map()
export function spliceAndMapArray(arr, start, deleteCount, items, mapper) {
    return arr.splice(start, deleteCount, ...items).map(mapper);
}
// loop with array.slice() and map()
export function sliceAndMapArray(arr, start, end, mapper) {
    return arr.slice(start, end).map(mapper);
}
// loop with array.concat() and map()
export function concatAndMapArrays(arr1, arr2, mapper) {
    return arr1.concat(arr2).map(mapper);
}
   