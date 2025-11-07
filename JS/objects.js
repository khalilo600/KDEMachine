// objects.js
// how to define an object
export const person = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    isEmployed: true,
    address: {
        street: "123 Main St",
        city: "Anytown",
        country: "USA"
    },
    hobbies: ["reading", "traveling", "swimming"]
};
// how to crud and manipulate objects
export function getFirstName(obj) {
    return obj.firstName;
}

// use functions of arrays and strings within object functions
export function getLastName(obj) {
    return obj.lastName;
}

// loops of array within object functions
export function getHobbies(obj) {
    return obj.hobbies;
}

// object functions
export function getAge(obj) {
    return obj.age;
}

// object functions
export function getFullName(obj) {
    return `${obj.firstName} ${obj.lastName}`;
}

export function celebrateBirthday(obj) {
    obj.age += 1;
    return obj.age;
}

export function addHobby(obj, hobby) {
    obj.hobbies.push(hobby);
    return obj.hobbies;
}

export function updateAddress(obj, newAddress) {
    obj.address = { ...obj.address, ...newAddress };
    return obj.address;
}

export function isAdult(obj) {
    return obj.age >= 18;
}

export function getHobbyCount(obj) {
    return obj.hobbies.length;
}

export function removeHobby(obj, hobby) {
    obj.hobbies = obj.hobbies.filter(h => h !== hobby);
    return obj.hobbies;
}

export function hasHobby(obj, hobby) {
    return obj.hobbies.includes(hobby);
}

export function cloneObject(obj) {
    return { ...obj };
}

export function mergeObjects(obj1, obj2) {
    return { ...obj1, ...obj2 };
}

export function getObjectKeys(obj) {
    return Object.keys(obj);
}

export function getObjectValues(obj) {
    return Object.values(obj);
}

export function getObjectEntries(obj) {
    return Object.entries(obj);
}

export function clearObject(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            delete obj[key];
        }
    }
    return obj;
}

export function objectToString(obj) {
    return JSON.stringify(obj);
}

export function stringToObject(str) {
    try {
        return JSON.parse(str);
    } catch (error) {
        console.error("Failed to parse string as JSON object:", error);
        return {}; // Return an empty object or handle the error as appropriate
    }
}

export function isObjectEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export function updateObjectProperty(obj, key, value) {
    obj[key] = value;
    return obj;
}

export function deleteObjectProperty(obj, key) {
    delete obj[key];
    return obj;
}

export function getNestedProperty(obj, keyPath) {
    return keyPath.split('.').reduce((acc, key) => acc && acc[key], obj);
}

export function setNestedProperty(obj, keyPath, value) {
    const keys = keyPath.split('.');
    let current = obj;
    for (let i = 0; i < keys.length - 1; i++) {
        if (!current[keys[i]]) current[keys[i]] = {};
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    return obj;
}

export function hasNestedProperty(obj, keyPath) {
    return keyPath.split('.').every((key) => {
        if (obj && obj.hasOwnProperty(key)) {
            obj = obj[key];
            return true;
        }
        return false;
    });
}

export function countObjectProperties(obj) {
    return Object.keys(obj).length;
}

export function freezeObject(obj) {
    return Object.freeze(obj);
}

export function isObjectFrozen(obj) {
    return Object.isFrozen(obj);
}

export function sealObject(obj) {
    return Object.seal(obj);
}

export function isObjectSealed(obj) {
    return Object.isSealed(obj);
}

export function defineObjectProperty(obj, key, descriptor) {
    Object.defineProperty(obj, key, descriptor);
    return obj;
}

export function getObjectPropertyDescriptor(obj, key) {
    return Object.getOwnPropertyDescriptor(obj, key);
}

export function getPrototypeOfObject(obj) {
    return Object.getPrototypeOf(obj);
}

export function setPrototypeOfObject(obj, prototype) {
    Object.setPrototypeOf(obj, prototype);
    return obj;
}   
export function createObjectFromEntries(entries) {
    return Object.fromEntries(entries);
}
export function iterateObjectProperties(obj, callback) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            callback(key, obj[key]);
        }
    }
}