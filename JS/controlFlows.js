// control flows

// if-else statement to check if a number is positive, negative, or zero
export function checkNumber(num) {
    if (num > 0) {
        return 'Positive';
    } else if (num < 0) {
        return 'Negative';
    } else {
        return 'Zero';
    }
}

// swicth-case statement to get the day of the week
export function getDayOfWeek(dayNumber) {
    switch (dayNumber) {
        case 1:
            return 'Monday';
        case 2:
            return 'Tuesday';
        case 3:
            return 'Wednesday';
        case 4:
            return 'Thursday';
        case 5:
            return 'Friday';
        case 6:
            return 'Saturday';
        case 7:
            return 'Sunday';
        default:
            return 'Invalid day number';
    }
}
// loops with examples

// for loop to calculate the sum of first n natural numbers
export function sumOfNaturalNumbers(n) {
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
}

// while loop to calculate the factorial of a number
export function multiplicationTable(n) {
    const table = [];
    let i = 1;
    do {
        table.push(`${n} x ${i} = ${n * i}`);
        i++;
    } while (i <= 10);
    return table;
}

// function to determine if a number is even
export function isEven(num) {
    return num % 2 === 0;
}

// function to determine if a number is odd
export function isOdd(num) {
    return num % 2 !== 0;
}

// function to get the maximum of two numbers
export function getMax(a, b) {
    return a > b ? a : b;
}

// function to get the minimum of two numbers
export function getMin(a, b) {
    return a < b ? a : b;
}

// function to clamp a number within a range
export function clampNumber(num, min, max) {
    return num < min ? min : num > max ? max : num;
}

export function factorial(n) {
    if (n < 0) return undefined;
    if (n === 0) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

export function fibonacci(n) {
    if (n < 0) return undefined;
    if (n === 0) return 0;
    if (n === 1) return 1;
    let a = 0, b = 1, temp;
    for (let i = 2; i <= n; i++) {
        temp = a + b;
        a = b;
        b = temp;
    }
    return b;
}

export function isPrime(num) {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
}

export function sumInRange(start, end) {
    let sum = 0;
    for (let i = start; i <= end; i++) {
        sum += i;
    }
    return sum;
}

export function reverseNumber(num) {
    let reversed = 0;
    while (num !== 0) {
        const digit = num % 10;
        reversed = reversed * 10 + digit;
        num = Math.floor(num / 10);
    }
    return reversed;
}

export function countDigits(num) {
    if (num === 0) return 1;
    let count = 0;
    while (num !== 0) {
        num = Math.floor(num / 10);
        count++;
    }
    return count;
}

export function isPalindromeNumber(num) {
    return num === reverseNumber(num);
}

export function sumOfDigits(num) {
    let sum = 0;
    while (num !== 0) {
        sum += num % 10;
        num = Math.floor(num / 10);
    }
    return sum;
}

export function largestOfThree(a, b, c) {
    return Math.max(a, b, c);
}

export function smallestOfThree(a, b, c) {
    return Math.min(a, b, c);
}

export function generateEvenNumbers(limit) {
    const evens = [];
    for (let i = 0; i <= limit; i += 2) {
        evens.push(i);
    }
    return evens;
}

export function generateOddNumbers(limit) {
    const odds = [];
    for (let i = 1; i <= limit; i += 2) {
        odds.push(i);
    }
    return odds;
}

export function sumOfArray(arr) {
    return arr.reduce((acc, val) => acc + val, 0);
}

export function productOfArray(arr) {
    return arr.reduce((acc, val) => acc * val, 1);
}

export function averageOfArray(arr) {
    if (arr.length === 0) return 0;
    return sumOfArray(arr) / arr.length;
}

export function findMaxInArray(arr) {
    return Math.max(...arr);
}

export function findMinInArray(arr) {
    return Math.min(...arr);
}

export function countOccurrences(arr, value) {
    return arr.filter(item => item === value).length;
}   
export function arrayIncludes(arr, substring) {
    return arr.some(item => item.includes(substring));
}

export function stringIncludes(str, substring) {
    return str.includes(substring);
}   
export function countVowels(str) {
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }
    return count;
}

export function countConsonants(str) {
    const vowels = 'aeiouAEIOU';
    let count = 0;
    for (let char of str) {
        if (/[a-zA-Z]/.test(char) && !vowels.includes(char)) {
            count++;
        }
    }
    return count;
}
export function isAlphabetic(str) {
    return /^[a-zA-Z]+$/.test(str);
}

export function isNumeric(str) {
    return /^[0-9]+$/.test(str);
}

export function isAlphanumeric(str) {
    return /^[a-zA-Z0-9]+$/.test(str);
}

export function startsWithSubstring(str, substring) {
    return str.startsWith(substring);
}   
export function endsWithSubstring(str, substring) {
    return str.endsWith(substring);
}
export function indexOfSubstring(str, substring) {
    return str.indexOf(substring);
}
export function lastIndexOfSubstring(str, substring) {
    return str.lastIndexOf(substring);
}
export function countSubstringOccurrences(str, substring) {
    let count = 0;
    let pos = str.indexOf(substring);
    while (pos !== -1) {
        count++;
        pos = str.indexOf(substring, pos + substring.length);
    }
    return count;
}
export function replaceAllOccurrences(str, searchValue, replaceValue) {
    return str.split(searchValue).join(replaceValue);
}