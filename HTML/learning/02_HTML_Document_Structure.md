# HTML Document Structure

An HTML document has a specific structure that browsers use to render the page correctly. Understanding this structure is fundamental to web development.

## The `<!DOCTYPE>` Declaration

The `<!DOCTYPE html>` declaration is the very first thing in your HTML document. It is not an HTML tag, but an instruction to the web browser about what version of HTML the page is written in. For HTML5, the declaration is simple:

```html
<!DOCTYPE html>
```

## The `<html>` Element

The `<html>` element is the root element of an HTML page. All other elements are descendants of this element.

```html
<!DOCTYPE html>
<html>
  <!-- All other elements go here -->
</html>
```

## The `<head>` Element

The `<head>` element contains meta-information about the document. It is not displayed in the browser window, but it contains important information for the browser and search engines.

Common elements found in the `<head>` include:

*   `<title>`: Sets the title of the page, which appears in the browser tab.
*   `<meta>`: Provides metadata about the HTML document, such as character set, page description, keywords, author, and viewport settings.
*   `<link>`: Used to link to external resources, most commonly CSS stylesheets.
*   `<script>`: Used to embed or reference JavaScript code.

### Example of a `<head>` section:

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Awesome Page</title>
  <link rel="stylesheet" href="style.css">
</head>
```

## The `<body>` Element

The `<body>` element contains the visible content of the HTML document. This is where you will put all your text, images, links, tables, and other content that you want the user to see.

```html
<body>
  <h1>Welcome to my website!</h1>
  <p>This is a paragraph of text.</p>
  <img src="image.jpg" alt="An image">
</body>
```

## A Complete HTML Document Structure

Putting it all together, a basic HTML document looks like this:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>

  <h1>This is a Heading</h1>
  <p>This is a paragraph.</p>

</body>
</html>
```
