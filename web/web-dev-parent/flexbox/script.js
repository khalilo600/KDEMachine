// JavaScript can be used to interact with flexbox layouts.
// For example, you can change flex properties like justify-content.

const flexContainer = document.querySelector('.flex-container');

// After 2 seconds, change the alignment of the flex items
setTimeout(() => {
    flexContainer.style.justifyContent = 'space-around';
}, 2000);
