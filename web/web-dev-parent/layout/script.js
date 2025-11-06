// JavaScript can be used to dynamically change the layout of a page.
// For example, you could change the float property of an element.

// However, for complex layouts, it's often better to add or remove CSS classes that define the layout.

const floatLeft = document.querySelector('.float-left');

// After 2 seconds, remove the float
setTimeout(() => {
    floatLeft.style.float = 'none';
}, 2000);
