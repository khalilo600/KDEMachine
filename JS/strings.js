// stings .js
export const greeting = "Hello, World!";
export const farewell = "Goodbye!";
export const thankYou = "Thank you for your help!";
export const welcomeMessage = "Welcome to our application!";
export const errorMessage = "An error has occurred. Please try again.";
export const infoMessage = "For more information, visit our website.";
export const successMessage = "Operation successful!";
export const promptMessage = "Please enter your name:";
// string functions



// Exporting string manipulation functions
export function toUpperCase(str) {
    return str.toUpperCase();
}

export function toLowerCase(str) {
    return str.toLowerCase();
}

export function capitalizeFirstLetter(str) {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function trimWhitespace(str) {
    return str.trim();
}

export function getStringLength(str) {
    return str.length;
}

export function concatenateStrings(str1, str2) {
    return str1 + str2;
}

export function replaceSubstring(str, searchValue, replaceValue) {
    return str.replace(searchValue, replaceValue);
}

export function splitString(str, delimiter) {
    return str.split(delimiter);
}

export function includesSubstring(str, substring) {
    return str.includes(substring);
}

export function repeatString(str, times) {
    return str.repeat(times);
}

export function sliceString(str, start, end) {
    return str.slice(start, end);
}

export function indexOfSubstring(str, substring) {
    return str.indexOf(substring);
}

export function lastIndexOfSubstring(str, substring) {
    return str.lastIndexOf(substring);
}

export function startsWithSubstring(str, substring) {
    return str.startsWith(substring);
}

export function endsWithSubstring(str, substring) {
    return str.endsWith(substring);
}

export function charAtPosition(str, index) {
    return str.charAt(index);
}

export function charCodeAtPosition(str, index) {
    return str.charCodeAt(index);
}