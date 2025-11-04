// =========================================================================
// DOM Manipulation Examples
// =========================================================================

// -------------------------------------------------------------------------
// Example 1: Selecting Elements
// -------------------------------------------------------------------------

// Select an element by its ID
const mainContainer = document.getElementById("main-container");

// Select the first element that matches a CSS selector
const firstParagraph = document.querySelector(".content");

// Select all elements that match a CSS selector
const allParagraphs = document.querySelectorAll(".content");

// -------------------------------------------------------------------------
// Example 2: Changing Text Content
// -------------------------------------------------------------------------

const changeTextBtn = document.getElementById("changeTextBtn");
const dynamicText = document.getElementById("dynamicText");

changeTextBtn.addEventListener("click", function() {
    // Change the text content of the paragraph
    dynamicText.textContent = "The text has been changed!";
});

// -------------------------------------------------------------------------
// Example 3: Toggling CSS Classes
// -------------------------------------------------------------------------

const toggleStyleBtn = document.getElementById("toggleStyleBtn");
const styledBox = document.getElementById("styledBox");

toggleStyleBtn.addEventListener("click", function() {
    // Toggle the "highlight" class on the styled box
    styledBox.classList.toggle("highlight");
});

// -------------------------------------------------------------------------
// Example 4: Creating and Appending Elements
// -------------------------------------------------------------------------

const addListItemBtn = document.getElementById("addListItemBtn");
const myList = document.getElementById("myList");

addListItemBtn.addEventListener("click", function() {
    // Create a new list item element
    const newListItem = document.createElement("li");

    // Set the text content of the new list item
    newListItem.textContent = "A new item";

    // Append the new list item to the unordered list
    myList.appendChild(newListItem);
});

// -------------------------------------------------------------------------
// Example 5: Handling Input Events
// -------------------------------------------------------------------------

const myInput = document.getElementById("myInput");
const typedText = document.getElementById("typedText");

myInput.addEventListener("input", function(event) {
    // Get the current value of the input field
    const inputValue = event.target.value;

    // Display the typed text in the span element
    typedText.textContent = inputValue;
});

// -------------------------------------------------------------------------
// Example 6: Changing Styles Directly
// -------------------------------------------------------------------------

// Change the background color of the main container
mainContainer.style.backgroundColor = "#f0f0f0";

// -------------------------------------------------------------------------
// Example 7: Changing Attributes
// -------------------------------------------------------------------------

// Change the placeholder attribute of the input field
myInput.setAttribute("placeholder", "New placeholder text");

// -------------------------------------------------------------------------
// Example 8: Looping through a NodeList
// -------------------------------------------------------------------------

// Add a border to all paragraphs with the class "content"
allParagraphs.forEach(function(paragraph) {
    paragraph.style.border = "1px solid blue";
});
