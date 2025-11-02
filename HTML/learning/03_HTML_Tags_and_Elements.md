# HTML Tags and Elements

HTML documents are made up of HTML elements, which are defined by HTML tags.

## What are HTML Elements?

An HTML element is an individual component of an HTML document. It represents a semantic meaning and a specific purpose. For example, the `<p>` element represents a paragraph, and the `<h1>` element represents a top-level heading.

Most HTML elements are written with a start tag (e.g., `<p>`) and an end tag (e.g., `</p>`), with the content in between. The combination of the start tag, the content, and the end tag is the HTML element.

```html
<tagname>Content goes here...</tagname>
```

### Nested HTML Elements

HTML elements can be nested, which means that elements can contain other elements. All HTML documents consist of nested HTML elements.

```html
<!DOCTYPE html>
<html>
<body>

  <h1>My First Heading</h1>
  <p>My first paragraph.</p>

</body>
</html>
```

In this example, the `<html>` element contains the `<body>` element, and the `<body>` element contains the `<h1>` and `<p>` elements.

### Empty HTML Elements

Some HTML elements have no content. These are called empty elements or self-closing tags. An example of an empty element is the `<br>` tag, which represents a line break.

Empty elements are written without an end tag. In XHTML, you must close empty elements with a `/` at the end of the tag (e.g., `<br />`). In HTML5, this is optional.

Other examples of empty elements include `<img>`, `<hr>`, `<input>`, and `<meta>`.

## Common HTML Tags

Here are some of the most common HTML tags you will use:

*   `<h1>` to `<h6>`: Headings, with `<h1>` being the most important and `<h6>` being the least.
*   `<p>`: A paragraph of text.
*   `<a>`: A hyperlink, used to link to other pages.
*   `<img>`: An image.
*   `<ul>`: An unordered (bulleted) list.
*   `<ol>`: An ordered (numbered) list.
*   `<li>`: A list item, used within `<ul>` or `<ol>`.
*   `<div>`: A division or a section in an HTML document. It is a block-level element that is often used as a container for other HTML elements.
*   `<span>`: An inline container used to mark up a part of a text, or a part of a document. It is often used to apply styles to a small part of a text.

## Block vs. Inline Elements

HTML elements can be categorized as either block-level or inline elements.

*   **Block-level elements** always start on a new line and take up the full width available. Examples include `<div>`, `<h1>`-`<h6>`, `<p>`, `<ul>`, and `<li>`.
*   **Inline elements** do not start on a new line and only take up as much width as necessary. Examples include `<span>`, `<a>`, and `<img>`.
