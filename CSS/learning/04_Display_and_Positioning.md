# CSS Display and Positioning

The `display` and `position` properties are two of the most important and powerful properties in CSS. They are used to control the layout and positioning of elements on a web page.

## The `display` Property

The `display` property specifies how an element is displayed. Every HTML element has a default display value, depending on what type of element it is. The two most common display values are `block` and `inline`.

### `block` and `inline` Elements

*   **`block`:** A block-level element always starts on a new line and takes up the full width available. Examples of block-level elements include `<div>`, `<h1>`-`<h6>`, `<p>`, and `<ul>`.
*   **`inline`:** An inline element does not start on a new line and only takes up as much width as necessary. Examples of inline elements include `<span>`, `<a>`, and `<img>`.

### Changing the Default Display Value

You can change the default display value of an element using the `display` property. For example, you can make a `<li>` element display as an inline element, or a `<span>` element display as a block element.

```css
li {
  display: inline;
}

span {
  display: block;
}
```

### Other `display` Values

*   **`inline-block`:** This value is a hybrid of `inline` and `block`. It allows you to set a width and height on the element, but it does not start on a new line.
*   **`none`:** This value will hide the element completely. The element will not take up any space on the page.
*   **`flex`:** This value enables Flexbox, a powerful layout model for creating flexible and responsive layouts.
*   **`grid`:** This value enables CSS Grid, a two-dimensional layout system for creating complex grid-based layouts.

## The `position` Property

The `position` property specifies the type of positioning method used for an element. There are five different position values:

*   `static`
*   `relative`
*   `fixed`
*   `absolute`
*   `sticky`

### `static`

This is the default value. `static` positioned elements are not affected by the `top`, `bottom`, `left`, and `right` properties. They are always positioned according to the normal flow of the page.

### `relative`

An element with `position: relative;` is positioned relative to its normal position. You can use the `top`, `bottom`, `left`, and `right` properties to move the element from its normal position.

```css
.my-element {
  position: relative;
  left: 20px;
}
```

This will move the element 20 pixels to the right from its normal position.

### `fixed`

An element with `position: fixed;` is positioned relative to the viewport, which means it always stays in the same place even if the page is scrolled. The `top`, `bottom`, `left`, and `right` properties are used to position the element.

```css
.my-element {
  position: fixed;
  bottom: 0;
  right: 0;
}
```

This will fix the element to the bottom-right corner of the viewport.

### `absolute`

An element with `position: absolute;` is positioned relative to the nearest positioned ancestor (instead of positioned relative to the viewport, like `fixed`). If an `absolute` positioned element has no positioned ancestors, it uses the document body, and moves along with page scrolling.

### `sticky`

An element with `position: sticky;` is positioned based on the user's scroll position. A sticky element toggles between `relative` and `fixed`, depending on the scroll position. It is positioned relative until a given offset position is met in the viewport - then it "sticks" in place (like `position:fixed`).

Understanding the `display` and `position` properties is crucial for creating complex and responsive web layouts.
