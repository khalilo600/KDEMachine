# HTML Links and Images

Links and images are two of the most fundamental and widely used elements in HTML. They allow you to connect to other pages and display visual content.

## HTML Links (Hyperlinks)

HTML links are defined with the `<a>` tag. The `href` attribute specifies the destination address of the link.

```html
<a href="https://www.google.com">Visit Google</a>
```

### The `target` Attribute

The `target` attribute specifies where to open the linked document. It can have one of the following values:

*   `_self`: (Default) Opens the document in the same window/tab as it was clicked.
*   `_blank`: Opens the document in a new window or tab.
*   `_parent`: Opens the document in the parent frame.
*   `_top`: Opens the document in the full body of the window.

```html
<a href="https://www.google.com" target="_blank">Visit Google in a new tab</a>
```

### Absolute vs. Relative URLs

You can use both absolute and relative URLs for the `href` attribute.

*   **Absolute URL:** A full web address, including the protocol (e.g., `https://www.example.com/page.html`).
*   **Relative URL:** A local link to a page within the same website (e.g., `about.html` or `/contact/contact.html`).

## HTML Images

HTML images are defined with the `<img>` tag. The `src` attribute specifies the path to the image, and the `alt` attribute provides alternative text for the image if it cannot be displayed.

```html
<img src="image.jpg" alt="A beautiful landscape">
```

The `<img>` tag is an empty element, which means it does not have a closing tag.

### Image Size - Width and Height

You can use the `width` and `height` attributes to specify the size of an image.

```html
<img src="image.jpg" alt="A beautiful landscape" width="500" height="300">
```

It is a good practice to specify the `width` and `height` of an image. If these attributes are not specified, the browser will have to re-render the page after the image is loaded, which can cause the page layout to flicker.

### Linking an Image

You can also use an image as a link by nesting the `<img>` tag inside an `<a>` tag.

```html
<a href="page.html">
  <img src="button.png" alt="Click me">
</a>
```
