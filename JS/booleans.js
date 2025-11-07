// booleans.js
export const isTrue = true;
export const isFalse = false;

// boolean functions
export function negateBoolean(value) {
    return !value;
}

export function andOperation(value1, value2) {
    return value1 && value2;
}

export function orOperation(value1, value2) {
    return value1 || value2;
}

export function xorOperation(value1, value2) {
    return (value1 || value2) && !(value1 && value2);
}

export function booleanToString(value) {
    return value.toString();
}

export function stringToBoolean(str) {
    return str.toLowerCase() === 'true';
}

export function areBothTrue(value1, value2) {
    return value1 && value2;
}

export function areBothFalse(value1, value2) {
    return !value1 && !value2;
}