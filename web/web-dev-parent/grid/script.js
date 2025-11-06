// JavaScript can be used to interact with grid layouts.
// For example, you can dynamically add new grid items.

const gridContainer = document.querySelector('.grid-container');

// Create a new grid item
const newItem = document.createElement('div');
newItem.classList.add('grid-item');
newItem.textContent = '7';

// Add it to the grid
gridContainer.appendChild(newItem);
