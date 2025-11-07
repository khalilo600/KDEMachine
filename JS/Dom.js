// Dom manipulation utilities
// create HTML elements

//  select an element by its ID
export function getElementById(id) {
    return document.getElementById(id);
}

// select elements by their class name
export function getElementsByClassName(className) {
    return document.getElementsByClassName(className);
}

// remove a DOM element
export function removeElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}
// slect elements by their tag name
export function getElementsByTagName(tagName) {
    return document.getElementsByTagName(tagName);
}   

// select elements by their CSS selector
export function querySelectorAll(selector) {
    return document.querySelectorAll(selector);
}
// slect the first element that matches a CSS selector
export function querySelector(selector) {
    return document.querySelector(selector);
}


// Create a new DOM element with specified tag and attributes
export function createElement(tag, attributes = {}, textContent = '', children = []) {
    const element = document.createElement(tag);
    for (const [key, value] of Object.entries(attributes)) {
        element.setAttribute(key, value);
    }
    if (textContent) {
        element.textContent = textContent;
    }
    children.forEach(child => element.appendChild(child));
    return element;
}

// Set the text content of a DOM element
export function setTextContent(element, text) {
    if (element) {
        element.textContent = text;
    }
}

// Set multiple attributes on a DOM element
export function setAttributes(element, attributes = {}) {
    if (element) {
        for (const [key, value] of Object.entries(attributes)) {
            element.setAttribute(key, value);
        }
    }
}

// Add a class to a DOM element
export function addClass(element, className) {
    if (element && className) {
        element.classList.add(className);
    }
}

// Remove a class from a DOM element
export function removeClass(element, className) {
    if (element && className) {
        element.classList.remove(className);
    }
}

// Toggle a class on a DOM element
export function toggleClass(element, className) {
    if (element && className) {
        element.classList.toggle(className);
    }
}

// Add an event listener to a DOM element
export function addEventListener(element, eventType, handler, options) {
    if (element) {
        element.addEventListener(eventType, handler, options);
    }
}

// Remove an event listener from a DOM element
export function removeEventListener(element, eventType, handler, options) {
    if (element) {
        element.removeEventListener(eventType, handler, options);
    }
}

// Append a child element to a parent element
export function appendChild(parent, child) {
    parent.appendChild(child);
}

// Create and append a new DOM element to a parent
export function createAndAppendElement(parent, tag, attributes = {}, textContent = '', children = []) {
    const element = createElement(tag, attributes, textContent, children);
    parent.appendChild(element);
    return element;
}