# CSS Selectors and Properties

CSS selectors are used to "find" (or select) the HTML elements you want to style. Properties are the specific styles you want to apply to those elements.

## CSS Selectors

There are several different types of selectors in CSS. Here are some of the most common ones:

### Element Selector

The element selector selects HTML elements based on the element name.

```css
p {
  text-align: center;
  color: red;
}
```

This will select all `<p>` elements on the page.

### ID Selector

The ID selector uses the `id` attribute of an HTML element to select a specific element. The ID of an element should be unique within a page.

To select an element with a specific ID, write a hash (`#`) character, followed by the ID of the element.

```css
#para1 {
  text-align: center;
  color: red;
}
```

This will select the element with `id="para1"`.

### Class Selector

The class selector selects HTML elements with a specific class attribute. To select elements with a specific class, write a period (`.`) character, followed by the class name.

```css
.center {
  text-align: center;
  color: red;
}
```

This will select all elements with `class="center"`.

### Grouping Selectors

You can group selectors to apply the same styles to multiple elements. Separate each selector with a comma.

```css
h1, h2, p {
  text-align: center;
  color: red;
}
```

This will apply the styles to all `<h1>`, `<h2>`, and `<p>` elements.

### Descendant Selectors

The descendant selector selects all elements that are descendants of a specified element.

```css
div p {
  background-color: yellow;
}
```

This will select all `<p>` elements that are inside a `<div>` element.

## Common CSS Properties

Here are some of the most common CSS properties you will use:

*   `color`: Sets the color of the text.
*   `background-color`: Sets the background color of an element.
*   `font-size`: Sets the size of the font.
*   `font-family`: Sets the font for an element.
*   `text-align`: Sets the horizontal alignment of text.
*   `width`: Sets the width of an element.
*   `height`: Sets the height of an element.
*   `margin`: Sets the margin around an element.
*   `padding`: Sets the padding within an element.
*   `border`: Sets a border around an element.

### Example

```css
body {
  font-family: Arial, sans-serif;
  background-color: #f0f0f0;
}

#main-content {
  width: 80%;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border: 1px solid #ccc;
}

h1 {
  font-size: 2em;
  color: #333;
}

p {
  font-size: 1em;
  line-height: 1.5;
}
```

This example demonstrates how to use a combination of selectors and properties to style a simple web page.
