# HTML & CSS Learning Log

This document logs the learning process of building a webpage with HTML and CSS.

## Part 1: HTML Fundamentals

### Task 1: Basic HTML Structure
- **Goal:** Create an `index.html` file with the basic HTML boilerplate.
- **Instructions:** Include `<!DOCTYPE html>`, `<html>`, `<head>`, `<title>`, and `<body>`. The title should be "My First Webpage" and the body should contain an `<h1>` with "Hello, World!".
- **Outcome:** After a few attempts, the basic structure was correctly created.

### Task 2: Paragraph and Link
- **Goal:** Add a paragraph and a link to the page.
- **Instructions:** Add a `<p>` tag with "This is my first paragraph on my webpage." and an `<a>` tag linking to Google with the text "Visit Google".
- **Outcome:** The paragraph and link were added successfully.

### Task 3: Image
- **Goal:** Add an image to the page.
- **Instructions:** Add an `<img>` tag with a placeholder URL and an `alt` attribute.
- **Outcome:** The image was added successfully.

### Task 4: Unordered List
- **Goal:** Add an unordered list.
- **Instructions:** Create a `<ul>` with three `<li>` items.
- **Outcome:** The list was created successfully.

### Task 5: Table
- **Goal:** Add a simple HTML table.
- **Instructions:** Create a `<table>` with a header row and two data rows.
- **Outcome:** The table was created successfully.

### Task 6: Form
- **Goal:** Add a simple HTML form.
- **Instructions:** Create a `<form>` with a label, a text input, and a submit button.
- **Outcome:** The form was created, with some extra exploration by the user. After feedback and corrections, the form was correctly implemented.

### Task 7: Comments
- **Goal:** Add comments to the HTML file.
- **Instructions:** Add comments to explain each section of the HTML file.
- **Outcome:** Comments were successfully added to all sections.

## Part 2: CSS Fundamentals

### Task 8: Inline Styling
- **Goal:** Introduce CSS with inline styles.
- **Instructions:** Wrap the heading and paragraph in a `<div>` and apply `background-color` and `padding` using the `style` attribute.
- **Outcome:** Inline styling was successfully applied.

### Task 9: `<span>` and Inline Styling
- **Goal:** Style a specific part of text.
- **Instructions:** Wrap a part of the paragraph in a `<span>` and apply `color` and `font-weight`.
- **Outcome:** The `<span>` was successfully used for targeted styling.

### Task 10: Internal Stylesheet
- **Goal:** Move from inline styles to an internal stylesheet.
- **Instructions:** Create a `<style>` block in the `<head>` and move the styles there, using an ID selector.
- **Outcome:** The styles were successfully moved to an internal stylesheet.

### Task 11: External Stylesheet
- **Goal:** Move to an external CSS file.
- **Instructions:** Create a `style.css` file, move the styles to it, and link it to the HTML file.
- **Outcome:** The external stylesheet was successfully created and linked.

## Part 3: Advanced CSS

### Task 12: CSS Selectors (Class Selector)
- **Goal:** Use class selectors to style elements.
- **Instructions:** Add a class to the `<table>` and style it using the class selector. Also, style all `<li>` elements using an element selector.
- **Outcome:** The user successfully applied the styles and explored more advanced table styling.

### Task 13: Pseudo-classes and Pseudo-elements
- **Goal:** Style elements based on their state or position.
- **Instructions:** Use `:first-child` to style the first list item and `::after` to add text after the link.
- **Outcome:** After some corrections to the CSS syntax, the pseudo-classes and pseudo-elements were correctly implemented.

### Task 14: Box Model
- **Goal:** Understand and apply the CSS Box Model.
- **Instructions:** Apply `border`, `padding`, and `margin` to the image.
- **Outcome:** The box model properties were successfully applied.

### Task 15: Flexbox
- **Goal:** Use Flexbox for layout.
- **Instructions:** Wrap the image and list in a `div` and use Flexbox to arrange them side-by-side.
- **Outcome:** After correcting some HTML errors, the Flexbox layout was successfully implemented.

### Task 16: Media Queries
- **Goal:** Make the layout responsive.
- **Instructions:** Use a media query to change the `flex-direction` on smaller screens.
- **Outcome:** The media query was successfully implemented to create a responsive layout.

## Part 4: Advanced CSS Topics

### Task 17: CSS Custom Properties (Variables)
- **Goal:** Define and use reusable values in CSS.
- **Instructions:** Define custom properties in `:root` for colors and spacing, and use them in the stylesheet.
- **Outcome:** Custom properties were successfully defined and applied.

### Task 18: CSS Transitions and Animations
- **Goal:** Create smooth visual effects.
- **Instructions:** Add a keyframe animation to a new `div` to make it pulse with color.
- **Outcome:** A keyframe animation was successfully created and applied.

### Task 19: Extensive CSS Comments
- **Goal:** Improve the readability and maintainability of the stylesheet.
- **Instructions:** Add detailed comments to each CSS rule, explaining its purpose and properties.
- **Outcome:** The `style.css` file was fully commented.

---

## Final Code

### `index.html`

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- head is used to contain meta-information about the document -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My First Webpage</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <!-- body is used to contain the main content of the document -->
    <!-- heading used for main title -->
    <div id="header-section">
        <h1>Hello World!</h1>
        <!-- paragraph describing the webpage -->
        <p>This is my <span style="color: blue;font-weight: bold;">first paragraph</span> on my
            webpage</p>

    </div> <!-- link to an external website -->
    <a href="https://www.google.com">Visit Google</a>
    <br>
    <!-- image displayed on the webpage -->
    <div id="flex-container">
        <img src="https://via.placeholder.com/150" alt="A placeholder image" srcset="">
        <ul>
            <!-- unordered list of items -->
            <li>Item 1: Learn HTML</li>
            <li>Item 2: Practice CSS</li>
            <li>Item 3: Build a project</li>
        </ul>
    </div>
    <br>
    <!-- table displaying user information -->

    <table class="data-table">
        <tr>
            <th>Name</th>
            <th>Age</th>
        </tr>
        <tr>
            <td>Alice</td>
            <td>30</td>
        </tr>
        <tr>
            <td>Bob</td>
            <td>24</td>
        </tr>
    </table>
    <br>
    <!-- form for user input -->

    <form>
        <label for="user_name">Your Name:</label>
        <input type="text" id="user_name" name="user_name">
        <br>
        <label for="user_age">Your Age:</label>
        <input type="number" id="user_age" name="user_age">
        <br>
        <input type="submit" value="Submit">
    </form>
    <div class="grid-container">
        <div class="grid-item">Item 1</div>
        <div class="grid-item">Item 2</div>
        <div class="grid-item">Item 3</div>
        <div class="grid-item">Item 4</div>
        <div class="grid-item">Item 5</div>
        <div class="grid-item">Item 6</div>
    </div>
    <div id="animated-box">Animate Me!</div>
</body>

</html>
```

### `style.css`

```css
/*
    CSS Custom Properties (Variables)
    The :root selector targets the root element of the document (the <html> tag).
    By defining custom properties here, they become globally available throughout the stylesheet.
    This makes it easy to manage and update common values like colors and spacing.
*/
:root {
    /* --primary-color is used for main interactive elements and text. */
    --primary-color: #007bff;
    /* --secondary-color is used for less prominent elements, like backgrounds. */
    --secondary-color: #6c757d;
    /* --spacing-medium provides a consistent spacing unit. */
    --spacing-medium: 20px;
}

/*
    Header Section Styling
    This rule targets the main header section of the page.
*/
#header-section {
    /* Sets the background color using the --secondary-color custom property. */
    background-color: var(--secondary-color);
    /* Sets the padding using the --spacing-medium custom property. */
    padding: var(--spacing-medium);
}

/* Styles the main heading within the header section. */
#header-section h1 {
    color: blue;
}

/* Styles the paragraph within the header section. */
#header-section p {
    color: green;
}

/*
    Data Table Styling
    This rule targets the table with the class "data-table".
*/
.data-table {
    /* Makes the table span the full width of its container. */
    width: 100%;
    /* Collapses the borders between table cells for a cleaner look. */
    border-collapse: collapse;
    /* Adds a solid black border to the table. */
    border: 1px solid black;
    /* Adds space above the table. */
    margin-top: 20px;
}

/* Styles the header cells (th) and data cells (td) of the data table. */
.data-table th, .data-table td {
    /* Adds a border to each cell. */
    border: 1px solid black;
    /* Adds padding inside each cell. */
    padding: 8px;
}

/* Styles the header cells of the data table. */
.data-table th {
    /* Sets a light gray background color for the header row. */
    background-color: #f2f2f2;
}

/* Styles the even-numbered rows of the data table for a "zebra-striped" effect. */
.data-table tr:nth-child(even) {
    background-color: #f9f9f9;
}

/* Styles the table rows when hovered over. */
.data-table tr:hover {
    background-color: #e6e6e6;
}

/*
    List Item Styling
    This rule targets all list items (<li>).
*/
li {
    /* Sets the text color using the --primary-color custom property. */
    color: var(--primary-color);
    /* Removes the default bullet points from the list items. */
    list-style-type: none;
    /* Adds space below each list item. */
    margin-bottom: 10px;
}

/* Styles the first list item to be bold. */
li:first-child {
    font-weight: bold;
}

/*
    Link Styling
    This rule adds content after the link element.
*/
a::after {
    /* Adds the text " (External Link)" after the link text. */
    content: " (External Link)";
}

/*
    Image Styling (Box Model)
    This rule applies the CSS Box Model properties to the image.
*/
img {
    /* Adds a solid purple border around the image. */
    border: 5px solid purple;
    /* Adds padding between the image content and its border. */
    padding: 10px;
    /* Adds margin around the image to create space between it and other elements. */
    margin: 20px;
}

/*
    Flexbox Container Styling
    This rule creates a Flexbox layout for the container.
*/
#flex-container {
    /* Sets the display property to flex, enabling Flexbox layout. */
    display: flex;
    /* Allows the flex items to wrap to the next line if there isn't enough space. */
    flex-wrap: wrap;
    /* Distributes space around the flex items. */
    justify-content: space-around;
    /* Vertically aligns the flex items in the center. */
    align-items: center;
}

/*
    Media Query for Responsiveness
    This rule applies styles only on screens with a maximum width of 600px.
*/
@media (max-width: 600px) {
    /* Stacks the flex items vertically on smaller screens. */
    #flex-container {
        flex-direction: column;
    }
}

/*
    Grid Container Styling
    This rule creates a Grid layout for the container.
*/
.grid-container {
    /* Sets the display property to grid, enabling Grid layout. */
    display: grid;
    /* Creates three equal-width columns. */
    grid-template-columns: repeat(3, 1fr);
    /* Adds a gap between the grid items. */
    grid-gap: 20px;
}

/* Styles the individual grid items. */
.grid-item {
    background-color: #f2f2f2;
    padding: 20px;
    text-align: center;
    border: 1px solid #ccc;
    /* Adds a smooth transition effect for the background color. */
    transition: background-color 0.3s ease;
}

/* Styles the grid items when hovered over. */
.grid-item:hover {
    background-color: #e6e6e6;
}

/*
    Animated Box Styling
    This rule styles the box that will be animated.
*/
#animated-box {
    width: 100px;
    height: 100px;
    background-color: red;
    margin-top: 50px;
    /* Applies the "pulse" animation to the box. */
    animation: pulse 2s infinite alternate;
}

/*
    Keyframe Animation
    This rule defines the "pulse" animation sequence.
*/
@keyframes pulse {
    /* At the start of the animation, the background is red. */
    0% { background-color: red; }
    /* Halfway through, the background is blue. */
    50% { background-color: blue; }
    /* At the end, the background is red again. */
    100% { background-color: red; }
}
```
