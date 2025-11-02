# Introduction to CSS

CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in a markup language like HTML. CSS describes how HTML elements should be displayed on screen, paper, or in other media.

## What is CSS?

*   CSS stands for Cascading Style Sheets
*   CSS describes how HTML elements are to be displayed on screen, paper, or in other media
*   CSS saves a lot of work. It can control the layout of multiple web pages all at once
*   External stylesheets are stored in CSS files

## Why Use CSS?

CSS is used to define styles for your web pages, including the design, layout and variations in display for different devices and screen sizes.

Before CSS, all styling had to be done directly in the HTML markup. This made the HTML code bloated and difficult to maintain. With CSS, you can separate the presentation of your website from the HTML structure, which makes the code cleaner, more organized, and easier to manage.

## CSS Syntax

A CSS rule consists of a selector and a declaration block.

*   The **selector** points to the HTML element you want to style.
*   The **declaration block** contains one or more declarations separated by semicolons.
*   Each **declaration** includes a CSS property name and a value, separated by a colon.

```css
selector {
  property: value;
}
```

### Example

```css
p {
  color: red;
  text-align: center;
}
```

In this example, `p` is the selector, and it selects all `<p>` elements on the page. The declaration block contains two declarations: `color: red;` and `text-align: center;`. This will make all paragraphs have red text and be centered.

## How to Add CSS to an HTML Page

There are three ways to add CSS to an HTML page:

1.  **Inline CSS:** By using the `style` attribute inside HTML elements.
2.  **Internal CSS:** By using a `<style>` element in the `<head>` section of the HTML page.
3.  **External CSS:** By using a `<link>` element to link to an external CSS file.

### Inline CSS

An inline style may be used to apply a unique style for a single element.

```html
<h1 style="color:blue;text-align:center;">This is a heading</h1>
```

### Internal CSS

An internal style sheet may be used if one single HTML page has a unique style.

```html
<!DOCTYPE html>
<html>
<head>
<style>
body {
  background-color: linen;
}

h1 {
  color: maroon;
  margin-left: 40px;
}
</style>
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
```

### External CSS

An external style sheet is ideal when the style is applied to many pages. With an external style sheet, you can change the look of an entire web site by changing one file.

**style.css:**
```css
body {
  background-color: lightblue;
}

h1 {
  color: navy;
  margin-left: 20px;
}
```

**index.html:**
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>This is a heading</h1>
<p>This is a paragraph.</p>

</body>
</html>
```

The external style sheet is the most common and recommended way to use CSS.
