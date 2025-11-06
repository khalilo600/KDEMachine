// You can change the display property of an element using JavaScript.

// Get the hidden element
const hiddenElement = document.querySelector('.hidden-element');

// After 2 seconds, change its display to 'block' to make it visible
setTimeout(() => {
    hiddenElement.style.display = 'block';
}, 2000);
