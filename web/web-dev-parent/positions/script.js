// You can change the position property of an element using JavaScript.

const fixedElement = document.querySelector('.fixed');

// After 2 seconds, change the position of the fixed element
setTimeout(() => {
    fixedElement.style.bottom = '50px';
    fixedElement.style.right = '50px';
}, 2000);
