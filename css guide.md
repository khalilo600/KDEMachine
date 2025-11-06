# CSS Guide: Comprehensive Learning Outline

This learning material is organized to reflect the comprehensive structure of the CSS course, covering setup, core concepts, layout techniques, advanced features, and organizational best practices.

---

## I. Getting Started and Core Concepts

### A. What is CSS?

CSS stands for **Cascading Style Sheets**. It is a stylesheet language used to describe the **presentation of a document**. While primarily known for use with **HTML**, it can be applied to other media (e.g., XML, SVG, MathML, print, speech).

**Analogy:** If HTML provides the foundation and structure of a building, CSS provides the **paint, carpet, wallpaper, and decorations** (the appearance).

### B. Tools and Setup

1.  **Browser:** The course uses the **Chrome browser**.
2.  **Code Editor:** **Visual Studio Code (VS Code)** is used as the integrated development environment (IDE).
3.  **Project Setup:**
    *   Create a folder for the project.
    *   Create an `index.html` file.
    *   Use the **Emmet shortcut** (`! + Enter`) to quickly create a basic HTML document structure.

    ```html
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>

    </body>
    </html>
    ```

4.  **VS Code Extension:** The **Live Server** extension (by Ritwick Day) simulates a web server environment, allowing immediate reloading of the page upon save, which is necessary for proper development.

### C. Applying Styles to HTML (The Cascade)

There are three ways to apply CSS to a document:

1.  **External Stylesheet:** The recommended method for separating CSS code completely from HTML, promoting a separation of concerns.
    *   Create a dedicated CSS directory and a file (e.g., `CSS/style.css`).
    *   Link the file in the HTML `<head>` using the `<link>` element. The `type` attribute is no longer required.

    ```html
    <!-- In index.html -->
    <head>
        <link rel="stylesheet" href="CSS/style.css">
    </head>
    ```

    ```css
    /* In CSS/style.css */
    body {
        font-family: Arial, sans-serif;
    }
    ```

2.  **Internal Stylesheet:** CSS is written directly within the HTML document using a `<style>` element inside the `<head>` section.

    ```html
    <head>
        <style>
            h1 {
                color: blue;
            }
        </style>
    </head>
    ```

3.  **Inline CSS:** Applied directly to an element using the `style` attribute. This should generally be avoided.

    ```html
    <p style="color: red; font-size: 16px;">This is a red paragraph.</p>
    ```

**The Cascade (Order of Precedence):** CSS is an acronym for *cascading* style sheets, meaning it works like a **waterfall, from top down**.
*   The browser reads styles in order, and **the last definition read is applied**.
*   Inline CSS takes the highest precedent, overriding internal or external stylesheets because it is applied directly to the element.

### D. CSS Rule Anatomy and Syntax

A complete CSS rule set (often referred to simply as a **rule**) consists of:
*   **Selector:** Targets the HTML element(s) to be styled (e.g., `p`).
*   **Declaration:** Contains the property and its value.
    *   **Property:** The specific aspect being changed (e.g., `color`, `font-size`).
    *   **Value:** The definition for the property (e.g., `purple`, `64px`).

```css
/* Example of a CSS Rule */
p { /* Selector */
    color: purple; /* Declaration: property 'color', value 'purple' */
    font-size: 64px; /* Declaration: property 'font-size', value '64px' */
}
```

**Syntax Notes:**
*   **Spelling:** CSS requires the **American spelling** of words like "color" (without the 'u'). Incorrect spelling causes the declaration to be silently ignored, making debugging difficult.
*   **Validation:** Use tools like the **w3c CSS Validation Service** to detect errors.

---

## II. Selectors, Specificity, and Inheritance

### A. Basic Selectors

1.  **Element Selector:** Selects **all** elements of that type (e.g., `body`, `p`, `h1`).

    ```css
    p {
        color: green;
    }
    ```

2.  **Class Selector:** Starts with a period (`.`).
    *   **Most common** type of selector in CSS.
    *   Can be **reused** with multiple elements across the project.

    ```html
    <p class="highlight">This paragraph is highlighted.</p>
    <div class="highlight">This div is also highlighted.</div>
    ```

    ```css
    .highlight {
        background-color: yellow;
    }
    ```

3.  **ID Selector:** Starts with a hashtag (`#`).
    *   IDs **should only exist once** (be unique) per HTML document.
    *   Typically, **ID selectors should be avoided in CSS** but have valid uses in HTML (e.g., linking forms to labels) and JavaScript.

    ```html
    <h1 id="main-title">Welcome</h1>
    ```

    ```css
    #main-title {
        text-align: center;
    }
    ```

### B. Complex Selectors

*   **Grouping Selectors:** Apply the same rule set to multiple selectors by separating them with a **comma** (e.g., `h1, h2`).

    ```css
    h1, h2, h3 {
        font-family: 'Roboto', sans-serif;
        color: #333;
    }
    ```

*   **Descendant Selector:** Selects an element nested **inside** another by listing them with a space in between (e.g., `p span` selects a `span` element only if it is inside a `p` element).

    ```html
    <p>This is a paragraph with a <span>span</span> inside.</p>
    <div>This is a div with a <span>span</span> inside.</div>
    ```

    ```css
    p span {
        font-weight: bold;
        color: blue;
    }
    ```

*   **Universal Selector:** The asterisk (`*`) selects **everything** on the page. It is typically only used for a CSS reset.

    ```css
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ```

### C. Specificity and Conflict Resolution

*   **Specificity** determines which rule applies when conflicts arise. More specific selectors overrule less specific ones, regardless of where they appear in the cascade.
    *   **Order of Specificity (Lowest to Highest):** Element Selector < Class Selector < ID Selector.
*   **Debugging Specificity:** Use the **Inspect tool (Dev Tools)** to view the "Styles" tab, which shows which rules are being applied and which are being crossed out (overridden).
*   **Specificity Calculator:** A tool that assigns scores to selectors (Element=1, Class=10, ID=100) to help understand which rule will prevail.
*   **The `!important` Flag:** The "nuclear option," which overrides everything, including specificity and the cascade. It is generally discouraged for beginners as it often indicates disorganized or "sloppy" code.

### D. Inheritance

*   **Definition:** Where an element inherits property settings from its **parent element**.
*   **Inherited Properties:** Properties related to **font or typography** are usually inherited (e.g., `font-size`, `color`, `line-height`, `alignment`).
*   **Non-inherited Properties:** Properties not related to typography, such as `border`, are not inherited.
*   **Efficiency:** Inheritance is helpful for writing **DRY** (Don't Repeat Yourself) code, allowing designers to set global font styles once on the `body` or `html` element.
*   **Exceptions:** Form elements (e.g., `<button>`, `<input>`) do not typically inherit font and typography settings and may require `font: inherit;`.

---

## III. CSS Units and The Box Model

### A. CSS Units

Units determine the size of elements on the page.

1.  **Absolute Unit:**
    *   **Pixels (`px`):** The most commonly used absolute length unit. Represents one pixel on the screen.

    ```css
    .element {
        width: 200px;
        height: 100px;
    }
    ```

2.  **Relative Units:**
    *   **Percentage (`%`):** Represents a fraction of some other value, always relative to another quantity (e.g., the parent element's width).

    ```css
    .container {
        width: 50%; /* 50% of its parent's width */
    }
    ```

    *   **Root Em (`rem`):** Relative to the font size of the **root element** (`<html>`), which is usually the browser default (16px). It is the recommended unit for **font sizing**.

    ```css
    html {
        font-size: 16px; /* Default */
    }
    h1 {
        font-size: 2rem; /* 32px */
    }
    ```

    *   **Em (`em`):** Relative to the font size of the **element itself**. Can be useful for settings like padding or margin based on the element's font size.

    ```css
    .text-box {
        font-size: 18px;
        padding: 1em; /* 18px padding */
    }
    ```

    *   **Viewport Units (`vw`, `vh`):** 1% of the viewport's width or height, respectively.

    ```css
    .hero-section {
        height: 100vh; /* Full viewport height */
        width: 100vw; /* Full viewport width */
    }
    ```

### B. The Box Model Fundamentals

**Everything in CSS is a box**. The layers of the box, from the inside out, are:
1.  **Content:** The blue area, which holds the text or image.
2.  **Padding:** The green layer inside the border, providing space around the content.
3.  **Border:** The edge around the padding and content.
4.  **Margin:** The orange layer outside the border, providing space between elements.

```
+-----------------------------------+
|             Margin                |
|  +-----------------------------+  |
|  |           Border            |  |
|  |  +-----------------------+  |  |
|  |  |        Padding        |  |  |
|  |  |  +-----------------+  |  |  |
|  |  |  |     Content     |  |  |  |
|  |  |  |                 |  |  |  |
|  |  |  +-----------------+  |  |  |
|  |  |                       |  |  |
|  |  +-----------------------+  |  |
|  |                             |  |
|  +-----------------------------+  |
|                                   |
+-----------------------------------+
```

**Key Box Model Controls:**
*   **Shorthand:** When setting `margin` or `padding`, four values are applied in the order **Top, Right, Bottom, Left**.

    ```css
    .box {
        margin: 10px 20px 30px 40px; /* Top 10px, Right 20px, Bottom 30px, Left 40px */
        padding: 5px 10px; /* Top/Bottom 5px, Left/Right 10px */
    }
    ```

*   **Dev Tools:** The **Computed Tab** in Dev Tools allows developers to visually inspect and measure the content, padding, border, and margin of any selected element.
*   **Outline:** A style defined much like `border`, but it is **not part of the box model** because it does not take up space in the document flow.

### C. The CSS Reset and `box-sizing`

A basic CSS reset is crucial to override browser defaults for consistency.
*   A reset often includes applying `margin: 0; padding: 0;` to all elements (using the universal selector `*`).
*   **`box-sizing`:** This property controls how an element's defined `width` and `height` are calculated.
    *   **Default (`content-box`):** `width` and `height` apply only to the content area, meaning padding and border are added *outside* this defined size.
    *   **Recommended (`border-box`):** `width` and `height` include the padding and border, making size calculation much easier.

    ```css
    /* CSS Reset with border-box */
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    ```

### D. Creating Shapes

*   **Circle:** Use equal `width` and `height`, and set the `border-radius` to **50%** (or half the size of the box).

    ```css
    .circle {
        width: 100px;
        height: 100px;
        background-color: blue;
        border-radius: 50%;
    }
    ```

*   **Centering Horizontally:** A block element with a set width can be centered using `margin: 0 auto;`.

    ```css
    .centered-div {
        width: 80%;
        margin: 0 auto; /* Centers the div horizontally */
    }
    ```

---

## IV. Layout and Positioning Techniques

### A. Display Types

The `display` property determines how an element behaves in the document flow.
*   **`block` (Default for P, Div, etc.):** Starts a new line, takes up 100% of available width, and accepts vertical margins, padding, and height.
*   **`inline` (Default for Span, A, etc.):** Does **not** start a new line, only takes up the width of its content, and ignores vertical margins and height.
*   **`inline-block`:** Does **not** start a new line (stays inline), but accepts vertical properties (margin, padding, height). Useful for arranging navigation items horizontally.
*   **`none`:** Removes the element completely from the document flow (poor for accessibility).

### B. Floats and Column Layout

*   **Purpose:** The `float` property (`left` or `right`) takes an element out of the normal flow, allowing text content to wrap around it.
*   **Container Collapse:** A common problem where a parent container collapses (its height becomes zero) when its only content is floated.
*   **Modern Solution:** To make the container expand and contain the floated element, use `display: flow-root;`. (A legacy solution is `overflow: auto;`).

    ```css
    .container {
        display: flow-root; /* Contains floats */
        /* or overflow: auto; for older browsers */
    }
    .image {
        float: left;
        margin-right: 15px;
    }
    ```

*   **CSS Columns:** Used to split content into vertical columns.
    *   `column-count`: Sets the maximum number of columns.
    *   `column-width`: Sets the minimum width of columns, making the layout responsive (adjusts count based on available space).
    *   `column-rule`: Creates a divider (like a vertical border) between columns.
    *   `break-inside: avoid;`: Prevents an element (like a heading) from being split across columns.
    *   `column-span: all;`: Forces an element (like a featured quote) to span across all defined columns.

    ```css
    .article {
        column-count: 3;
        column-width: 200px; /* Minimum width for columns */
        column-rule: 1px solid #ccc;
    }
    h2 {
        break-inside: avoid;
    }
    .featured-quote {
        column-span: all;
    }
    ```

### C. Positioning

The `position` property dictates how an element is placed.
1.  **`static`:** The default position; `top`/`left`/etc. properties have no effect.
2.  **`relative`:** Positions the element relative to its normal place in the flow. The original space remains reserved.

    ```css
    .relative-box {
        position: relative;
        top: 20px;
        left: 30px;
    }
    ```

3.  **`absolute`:** Removes the element from the normal flow. Positioned relative to the nearest **positioned ancestor** (any ancestor whose position is not `static`).

    ```css
    .parent {
        position: relative; /* Establishes positioning context */
    }
    .absolute-child {
        position: absolute;
        top: 10px;
        right: 10px;
    }
    ```

4.  **`fixed`:** Removed from the normal flow. Positioned relative to the **viewport** (browser window) and stays in place when scrolling.

    ```css
    .fixed-header {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        background-color: #f8f8f8;
    }
    ```

5.  **`sticky`:** Behaves normally until it reaches a defined position (e.g., `top: 0`), then acts like a `fixed` element until its parent container scrolls completely out of view.

    ```css
    .sticky-sidebar {
        position: sticky;
        top: 0; /* Sticks to the top of the viewport */
    }
    ```

6.  **`z-index`:** Controls the stacking order of positioned elements (higher number is on top).

    ```css
    .element-on-top {
        position: absolute;
        z-index: 10;
    }
    .element-below {
        position: absolute;
        z-index: 5;
    }
    ```

### D. Flexbox Fundamentals

Flexbox is a 1-dimensional layout system (row or column).
*   **Enable Flex:** `display: flex;` on the container.
*   **Main Axis (Row):** Controlled by `justify-content` (e.g., `center`, `space-between`, `space-evenly`).
*   **Cross Axis (Column):** Controlled by `align-items` (e.g., `center`, `flex-start`, `stretch`).
*   **Wrapping:** `flex-wrap: wrap;` allows items to move onto multiple rows.
*   **Sizing (Item Properties):** Applied to individual flex items:
    *   `flex-basis`: Sets the initial size.
    *   `flex-grow`: Determines how much available space the item takes up (relative to others).
    *   `flex-shrink`: Determines how much the item shrinks when space is constrained.
    *   Shorthand: `flex: [grow] [shrink] [basis];`.
*   **Ordering:** `order` property changes the visual sequence of items (e.g., `order: -1` moves to the front).
*   **Centering:** A Flex container can center content perfectly using: `display: flex; justify-content: center; align-items: center;`.

    ```html
    <div class="flex-container">
        <div class="flex-item">1</div>
        <div class="flex-item">2</div>
        <div class="flex-item">3</div>
    </div>
    ```

    ```css
    .flex-container {
        display: flex;
        justify-content: center; /* Centers items horizontally */
        align-items: center;   /* Centers items vertically */
        height: 200px;
        border: 1px solid #ccc;
    }
    .flex-item {
        padding: 20px;
        background-color: lightblue;
        margin: 5px;
    }
    ```

### E. Grid Layout Fundamentals

Grid is a 2-dimensional layout system.
*   **Enable Grid:** `display: grid;` on the container.
*   **Column Definition:** `grid-template-columns` defines the number and width of columns.
    *   **Fraction Unit (`fr`):** A unit exclusive to Grid; `1fr` means one fraction of the available space.
    *   **`repeat()` function:** Used to define multiple columns efficiently (e.g., `repeat(3, 1fr)`).

    ```css
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 2fr 1fr; /* Three columns: 1 part, 2 parts, 1 part */
        grid-template-rows: auto 100px; /* Two rows: auto height, 100px height */
        gap: 10px; /* Space between grid items */
    }
    ```

*   **Item Placement:** Items are placed based on **Grid Lines**, which start at line 1.
    *   Shorthand: `grid-column: [start line] / [end line];`.

    ```css
    .grid-item-1 {
        grid-column: 1 / 3; /* Spans from column line 1 to 3 */
        grid-row: 1;
    }
    ```

*   **Named Areas (Advanced):** `grid-template-areas` allows mapping out the visual layout of a page (e.g., `header header sidebar`), and then items are assigned to those areas using `grid-area: name;`.

    ```css
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 3fr;
        grid-template-areas:
            "header header"
            "nav    main"
            "footer footer";
    }
    header { grid-area: header; }
    nav    { grid-area: nav; }
    main   { grid-area: main; }
    footer { grid-area: footer; }
    ```

*   **Accessibility for Tables:** To apply Grid to semantic HTML tables without removing the semantic markup, apply **`display: contents;`** to parent elements like `thead`, `tbody`, and `tr`. This "flattens" the markup so the table cells become direct children of the Grid container.

---

## V. Advanced Features

### A. CSS Variables (Custom Properties)

*   **Purpose:** Allows developers to store values (like colors, sizes) in one central place for easy reuse and updating across large projects.
*   **Declaration:** Variables start with two hyphens (`--variable-name: value;`). For global scope, declare them within the `:root` pseudo-class.

    ```css
    :root {
        --primary-color: #007bff;
        --secondary-color: #6c757d;
        --spacing-unit: 16px;
    }
    ```

*   **Usage:** Retrieve the value using the `var()` function (e.g., `color: var(--DARK-COLOR);`).

    ```css
    body {
        background-color: var(--secondary-color);
        padding: var(--spacing-unit);
    }
    .button {
        background-color: var(--primary-color);
        color: white;
    }
    ```

*   **Dark Mode Implementation:** Variables are essential for themes. A theme can be implemented by overriding core color variables inside the media query: `@media (prefers-color-scheme: dark) { :root { ... } }`.

    ```css
    :root {
        --text-color: #333;
        --background-color: #fff;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --text-color: #eee;
            --background-color: #222;
        }
    }

    body {
        color: var(--text-color);
        background-color: var(--background-color);
    }
    ```

### B. CSS Functions

CSS functions take arguments in parentheses.

*   **Math Functions:**
    *   `calc()`: Performs calculations, often mixing units (e.g., `calc(100% - 20px)`).

        ```css
        .sidebar {
            width: calc(25% - 20px); /* 25% of parent width minus 20px */
        }
        ```

    *   `min(v1, v2)`: Selects the smallest value given.
    *   `max(v1, v2)`: Selects the largest value given.
    *   **`clamp(min, ideal, max)`:** Sets a minimum floor, an ideal responsive size (often using `vh` or `vw`), and a maximum ceiling for a property. Recommended for responsive typography.

        ```css
        h1 {
            font-size: clamp(2rem, 5vw, 4rem); /* Min 2rem, ideal 5vw, max 4rem */
        }
        ```

*   **Filter Functions:** Used for visual effects, often on hover.
    *   `brightness()`: Makes an element lighter or darker.
    *   `hue-rotate(180deg)`: Shifts the color to its complementary opposite on the color wheel.

    ```css
    img:hover {
        filter: brightness(1.2) hue-rotate(90deg);
    }
    ```

*   **Reference Function:** `attr()` retrieves the value of an HTML attribute, commonly used to display `data-*` attributes within `::before`/`::after` elements.

    ```html
    <span data-tooltip="This is a tooltip">Hover me</span>
    ```

    ```css
    span[data-tooltip]::after {
        content: attr(data-tooltip);
        /* ... styling for tooltip ... */
    }
    ```

### C. Pseudo-Selectors (Classes and Elements)

*   **Pseudo-Classes (`:`):** Select elements based on their **state** or relationship.
    *   `:active`, `:hover`, `:visited`, `:focus-within`.
    *   `:is(s1, s2)`: Groups selectors; adopts the specificity of the most specific selector inside.
    *   `:where(s1, s2)`: Groups selectors; specificity is zero.
    *   `:not(s1)`: Selects elements that do **not** match the selector inside.
    *   `:nth-child(n)`: Selects elements based on their position in the HTML source order.

    ```css
    a:hover {
        color: orange;
    }
    li:nth-child(odd) {
        background-color: #f0f0f0;
    }
    button:not(.disabled) {
        cursor: pointer;
    }
    ```

*   **Pseudo-Elements (`::`):** Acts like inserting a new element. Use two colons.
    *   `::before` / `::after`: Used to insert content (using the `content` property) before or after an element. Useful for decorative quotes or icons.
    *   `::first-letter`, `::first-line`.

    ```css
    p::first-letter {
        font-size: 2em;
        font-weight: bold;
    }
    blockquote::before {
        content: "“";
        font-size: 4em;
        color: #ccc;
        line-height: 0.1;
        vertical-align: -0.4em;
        margin-right: 0.1em;
    }
    ```

### D. Transforms, Transitions, and Animations

*   **Transforms (Instant Change):** Changes the shape or position.
    *   `translate(x, y)`: Moves the element.
    *   `rotate(angle)`: Turns the element.
    *   `scale(x, y)`: Resizes the element.
    *   `skew(x, y)`: Tilts the element.

    ```css
    .box:hover {
        transform: translateX(20px) rotate(45deg) scale(1.1);
    }
    ```

*   **Transitions (Change between States):** Used for smooth changes over time, often triggered by `:hover`.
    *   Shorthand: `transition: all 2s ease-in-out 0.5s;` (applies to all properties, lasts 2 seconds, uses the timing function, with a 0.5-second delay).

    ```css
    .button {
        background-color: blue;
        transition: background-color 0.3s ease-in-out, transform 0.2s ease-out;
    }
    .button:hover {
        background-color: darkblue;
        transform: translateY(-3px);
    }
    ```

*   **Animations (Sequenced Changes):** Complex, continuous changes defined by keyframes.
    *   **Keyframes:** `@keyframes [name] { 0% {...} 100% {...} }` defines the steps.
    *   `animation-fill-mode: forwards;`: Crucial property that ensures the element remains in the state defined at 100% of the animation, instead of reverting to the starting state.

    ```css
    @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.05); opacity: 0.8; }
        100% { transform: scale(1); opacity: 1; }
    }

    .animated-element {
        animation: pulse 2s infinite alternate;
        animation-fill-mode: forwards; /* Stays at the end state */
    }
    ```

---

## VI. Organization and Best Practices

### A. Organizing CSS

*   **Follow Team Pattern:** Always follow the organizational structure established by your development team.
*   **Use Comments/Headers:** Divide the stylesheet into logical sections (e.g., Reset, Variables, Utility Classes, General Styles, Header Styles).

    ```css
    /* --- Global Styles --- */
    body {
        /* ... */
    }

    /* --- Components: Buttons --- */
    .button {
        /* ... */
    }
    ```

*   **DRY Principle:** "Don't Repeat Yourself". Use inheritance and variables to avoid writing the same code multiple times.
*   **Sort Properties:** Properties can be sorted alphabetically (known as the "AB CSS" technique) or grouped logically.

### B. Naming Conventions (BEM)

**BEM (Block Element Modifier)** is a popular methodology for naming classes, especially in large projects. It helps maintain consistent, low specificity.

1.  **Block (B):** A standalone component (e.g., `.header`, `.button`).

    ```html
    <div class="header">...</div>
    <button class="button">...</button>
    ```

2.  **Element (E):** A piece that is semantically tied to the Block and has no standalone meaning (e.g., `.header__title`). Uses **two underscores (`__`)**.

    ```html
    <div class="header">
        <h1 class="header__title">My Website</h1>
        <nav class="header__nav">...</nav>
    </div>
    ```

    ```css
    .header__title {
        font-size: 2em;
    }
    ```

3.  **Modifier (M):** A flag for incremental styling or state change (e.g., `.button--secondary`). Applied *in addition* to the Block or Element class. Uses **two dashes (`--`)**.

    ```html
    <button class="button button--primary">Primary</button>
    <button class="button button--secondary">Secondary</button>
    <div class="header header--dark">...</div>
    ```

    ```css
    .button--secondary {
        background-color: gray;
        color: #333;
    }
    .header--dark {
        background-color: #333;
        color: white;
    }
    ```