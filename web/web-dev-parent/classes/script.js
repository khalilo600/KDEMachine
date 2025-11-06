// In JavaScript, you can use the getElementsByClassName() or querySelectorAll() methods to access elements with a specific class.

// Get all elements with the class "important"
const importantElements = document.querySelectorAll('.important');

// Loop through them and add a border
importantElements.forEach(element => {
    element.style.border = '1px solid red';
});
