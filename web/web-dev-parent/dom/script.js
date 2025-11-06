// The DOM allows JavaScript to interact with and manipulate the HTML and CSS of a webpage.

// Selecting an element
const heading = document.getElementById('main-heading');

// Changing content
heading.innerHTML = 'Hello, DOM!';

// Changing styles
heading.style.color = 'red';

// Responding to user events
const button = document.getElementById('my-button');
button.addEventListener('click', () => {
    alert('Button clicked!');
});
