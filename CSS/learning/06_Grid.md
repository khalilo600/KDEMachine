# CSS Grid Layout

CSS Grid Layout is a two-dimensional layout system for the web. It allows you to create complex and responsive grid-based layouts with ease. Unlike Flexbox, which is a one-dimensional layout model, Grid allows you to control both rows and columns.

## The Two Main Components of Grid

Like Flexbox, Grid consists of two main components:

*   **Grid Container:** The parent element that contains the grid items. You can turn any element into a grid container by setting its `display` property to `grid` or `inline-grid`.
*   **Grid Items:** The children of the grid container.

## Grid Container Properties

There are several properties that you can apply to the grid container to control the layout of the grid items.

### `grid-template-columns` and `grid-template-rows`

These properties are used to define the columns and rows of the grid. You can specify the size of each column and row using a variety of units, such as pixels, percentages, or fractions (`fr` unit).

```css
.grid-container {
  display: grid;
  grid-template-columns: 100px 1fr 2fr;
  grid-template-rows: 50px 100px;
}
```

This will create a grid with three columns and two rows. The first column will be 100 pixels wide, the second column will take up one fraction of the remaining space, and the third column will take up two fractions of the remaining space.

### `grid-gap`

This property is a shorthand for `grid-column-gap` and `grid-row-gap`. It is used to set the gap between the columns and rows of the grid.

```css
.grid-container {
  display: grid;
  grid-template-columns: auto auto auto;
  grid-gap: 10px;
}
```

### `justify-items` and `align-items`

These properties are used to align the grid items along the inline (row) and block (column) axes, respectively. They can have one of the following values: `start`, `end`, `center`, or `stretch`.

### `justify-content` and `align-content`

These properties are used to align the grid itself within the grid container. They are useful when the total size of the grid is smaller than the grid container.

## Grid Item Properties

There are also properties that you can apply to the grid items themselves.

### `grid-column-start`, `grid-column-end`, `grid-row-start`, and `grid-row-end`

These properties are used to specify where a grid item should start and end in the grid. You can use them to make an item span across multiple columns or rows.

```css
.grid-item {
  grid-column-start: 1;
  grid-column-end: 3;
}
```

This will make the grid item start at the first column line and end at the third column line, spanning two columns.

### `grid-column` and `grid-row`

These are shorthand properties for `grid-column-start`/`grid-column-end` and `grid-row-start`/`grid-row-end`, respectively.

### `grid-area`

This property can be used to give a name to a grid item, and then use the `grid-template-areas` property on the grid container to create a layout.

## Example of a Simple Grid Layout

```html
<div class="grid-container">
  <div class="item1">Header</div>
  <div class="item2">Menu</div>
  <div class="item3">Main</div>
  <div class="item4">Right</div>
  <div class="item5">Footer</div>
</div>
```

```css
.grid-container {
  display: grid;
  grid-template-areas:
    'header header header header header header'
    'menu main main main right right'
    'menu footer footer footer footer footer';
  grid-gap: 10px;
  background-color: #2196F3;
  padding: 10px;
}

.item1 { grid-area: header; }
.item2 { grid-area: menu; }
.item3 { grid-area: main; }
.item4 { grid-area: right; }
.item5 { grid-area: footer; }
```

This will create a classic holy grail layout with a header, footer, main content area, and two sidebars.

CSS Grid is a powerful and flexible layout system that can be used to create a wide variety of complex and responsive layouts. By mastering the different properties and techniques, you can take your web design skills to the next level.
