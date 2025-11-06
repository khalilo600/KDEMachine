// You can also manipulate lists using JavaScript.
// For example, you can add new list items.

// Get the unordered list
const ul = document.querySelector('ul');

// Create a new list item
const newItem = document.createElement('li');
newItem.textContent = 'Item 4';

// Add it to the list
ul.appendChild(newItem);
