// arrays in js
export const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
export const mixedArray = [1, "two", true, null, undefined, { key: "value" }, [1, 2, 3]];

// array functions
export function getFirstElement(arr) {
    return arr[0];
}

export function getLastElement(arr) {
    return arr[arr.length - 1];
}

export function addElementToEnd(arr, element) {
    arr.push(element);
    return arr;
}

export function removeElementFromEnd(arr) {
    return arr.pop();
}

export function findElementIndex(arr, element) {
    return arr.indexOf(element);
}

export function filterEvenNumbers(arr) {
    return arr.filter(num => num % 2 === 0);
}

export function mapToSquares(arr) {
    return arr.map(num => num * num);
}

export function reduceToSum(arr) {
    return arr.reduce((acc, curr) => acc + curr, 0);
}

export function sortArrayAscending(arr) {
    return arr.sort((a, b) => a - b);
}

export function sortArrayDescending(arr) {
    return arr.sort((a, b) => b - a);
}

export function sliceArray(arr, start, end) {
    return arr.slice(start, end);
}

export function spliceArray(arr, start, deleteCount, ...items) {
    arr.splice(start, deleteCount, ...items);
    return arr;
}

export function includesElement(arr, element) {
    return arr.includes(element);
}

export function joinArrayElements(arr, separator) {
    return arr.join(separator);
}

export function reverseArray(arr) {
    return arr.reverse();
}

export function flattenArray(arr) {
    return arr.flat();
}

export function arrayLength(arr) {
    return arr.length;
}

export function clearArray(arr) {
    arr.length = 0;
    return arr;
}

export function cloneArray(arr) {
    return arr.slice();
}

export function uniqueElements(arr) {
    return [...new Set(arr)];
}

export function mergeArrays(arr1, arr2) {
    return arr1.concat(arr2);
}

export function arrayToString(arr) {
    return JSON.stringify(arr);
}

export function stringToArray(str) {
    try {
        return JSON.parse(str);
    } catch (error) {
        console.error("Failed to parse string as JSON array:", error);
        return []; // Return an empty array or handle the error as appropriate
    }
}

export function findMaxInArray(arr) {
    return Math.max(...arr);
}

export function findMinInArray(arr) {
    return Math.min(...arr);
}

export function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
