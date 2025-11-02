# HTML Text Formatting

HTML provides several elements for defining text with a special meaning. These formatting elements are used to display special types of text.

## Common Text Formatting Tags

Here are some of the most common text formatting tags in HTML:

*   `<b>` - **Bold text**
*   `<strong>` - **Important text** (semantically important, usually displayed as bold)
*   `<i>` - *Italic text*
*   `<em>` - *Emphasized text* (semantically important, usually displayed as italic)
*   `<mark>` - <mark>Marked text</mark>
*   `<small>` - <small>Small text</small>
*   `<del>` - <del>Deleted text</del>
*   `<ins>` - <ins>Inserted text</ins>
*   `<sub>` - <sub>Subscript text</sub>
*   `<sup>` - <sup>Superscript text</sup>

### Example of Text Formatting

```html
<p>This is a normal paragraph.</p>

<p><b>This text is bold.</b></p>
<p><strong>This text is important!</strong></p>

<p><i>This text is italic.</i></p>
<p><em>This text is emphasized.</em></p>

<p>This is <mark>marked</mark> text.</p>

<p>This is <small>small</small> text.</p>

<p>My favorite color is <del>blue</del> <ins>red</ins>.</p>

<p>This is <sub>subscripted</sub> text.</p>
<p>This is <sup>superscripted</sup> text.</p>
```

## The Difference Between `<b>` and `<strong>`, `<i>` and `<em>`

On the surface, the `<b>` and `<strong>` tags, and the `<i>` and `<em>` tags, may seem to have the same effect. However, they have different semantic meanings.

*   `<b>` and `<i>` are used for purely presentational purposes. They make the text bold or italic, respectively, without implying any extra importance.
*   `<strong>` and `<em>` are used to give semantic importance to the text. `<strong>` indicates that the text is important, while `<em>` indicates emphasis. Screen readers and search engines use this semantic information to better understand the content of the page.

In modern web development, it is generally recommended to use `<strong>` and `<em>` for semantic emphasis, and to use CSS for purely presentational styling.
