# Advanced CSS Techniques

Once you have mastered the basics of CSS, there are a number of advanced techniques that you can use to create more complex and sophisticated layouts and effects.

## Pseudo-classes and Pseudo-elements

Pseudo-classes and pseudo-elements allow you to style elements based on their state or position.

*   **Pseudo-classes** are used to style an element based on its state, such as `:hover`, `:focus`, or `:nth-child()`.
*   **Pseudo-elements** are used to style a specific part of an element, such as `::before` or `::after`.

### Example

```css
/* Style a link when it is hovered over */
a:hover {
  color: red;
}

/* Add a decorative element before a heading */
h1::before {
  content: "\2728"; /* Sparkles emoji */
  margin-right: 10px;
}
```

## CSS Functions

CSS has a number of built-in functions that you can use to perform calculations and manipulate values.

*   `calc()`: Allows you to perform calculations with CSS units.
*   `var()`: Allows you to use CSS variables.
*   `rgb()`, `rgba()`, `hsl()`, `hsla()`: Allows you to specify colors in different formats.
*   `attr()`: Allows you to retrieve the value of an attribute of an element.

### Example

```css
.my-element {
  width: calc(100% - 20px);
  color: rgba(0, 0, 0, 0.5);
}
```

## CSS Blend Modes

CSS blend modes allow you to blend an element with its background. This can be used to create a variety of interesting effects.

*   `mix-blend-mode`: Specifies how an element's content should blend with the content of the element's parent and the element's background.
*   `background-blend-mode`: Specifies how an element's background images should blend with each other and with the element's background color.

### Example

```css
.my-element {
  background-image: url("image.jpg");
  background-color: red;
  background-blend-mode: multiply;
}
```

## CSS Filters

CSS filters allow you to apply graphical effects like blur or color shifting to an element. Filters are commonly used to adjust the rendering of images, backgrounds, and borders.

### Example

```css
img {
  filter: grayscale(100%);
}
```

This will make the image appear in grayscale.

## CSS Shapes

CSS Shapes allow you to create non-rectangular text flows. You can use shapes to wrap text around a circle, an ellipse, or a polygon.

### Example

```css
.my-element {
  width: 200px;
  height: 200px;
  float: left;
  shape-outside: circle(50%);
}
```

This will make the text wrap around the circular `.my-element`.

## CSS Masking

CSS masking provides a way to hide parts of an element. You can use an image or a gradient as a mask.

### Example

```css
.my-element {
  -webkit-mask-image: url("mask.svg");
  mask-image: url("mask.svg");
}
```

This will mask the `.my-element` with the shape of the `mask.svg` file.

These are just a few of the many advanced techniques that are available in CSS. By exploring these techniques and experimenting with them, you can create truly unique and creative web designs.
