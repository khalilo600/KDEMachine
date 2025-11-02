# CSS Flexbox

Flexbox is a one-dimensional layout model that allows you to create flexible and responsive layouts with ease. It provides a more efficient way to lay out, align, and distribute space among items in a container, even when their size is unknown or dynamic.

## The Two Main Components of Flexbox

Flexbox consists of two main components:

*   **Flex Container:** The parent element that contains the flex items. You can turn any element into a flex container by setting its `display` property to `flex` or `inline-flex`.
*   **Flex Items:** The children of the flex container.

## Flex Container Properties

There are several properties that you can apply to the flex container to control the layout of the flex items.

### `flex-direction`

This property defines the direction in which the flex items are placed in the flex container. It can have one of the following values:

*   `row`: (Default) Items are placed from left to right.
*   `row-reverse`: Items are placed from right to left.
*   `column`: Items are placed from top to bottom.
*   `column-reverse`: Items are placed from bottom to top.

### `justify-content`

This property is used to align the flex items along the main axis (the direction of the `flex-direction`). It can have one of the following values:

*   `flex-start`: (Default) Items are packed toward the start of the main axis.
*   `flex-end`: Items are packed toward the end of the main axis.
*   `center`: Items are centered along the main axis.
*   `space-between`: Items are evenly distributed in the line; first item is on the start line, last item on the end line.
*   `space-around`: Items are evenly distributed in the line with equal space around them.

### `align-items`

This property is used to align the flex items along the cross axis (the axis perpendicular to the `flex-direction`). It can have one of the following values:

*   `stretch`: (Default) Items are stretched to fill the container.
*   `flex-start`: Items are placed at the start of the cross axis.
*   `flex-end`: Items are placed at the end of the cross axis.
*   `center`: Items are centered in the cross axis.
*   `baseline`: Items are aligned such as their baselines align.

### `flex-wrap`

This property specifies whether the flex items should wrap or not if there is not enough space for them on one line. It can have one of the following values:

*   `nowrap`: (Default) All flex items will be on one line.
*   `wrap`: Flex items will wrap onto multiple lines, from top to bottom.
*   `wrap-reverse`: Flex items will wrap onto multiple lines from bottom to top.

## Flex Item Properties

There are also properties that you can apply to the flex items themselves.

### `flex-grow`

This property specifies how much a flex item should grow relative to the other flex items in the container. It accepts a unitless value that serves as a proportion.

### `flex-shrink`

This property specifies how much a flex item should shrink relative to the other flex items in the container.

### `flex-basis`

This property specifies the initial main size of a flex item.

### `flex`

This is a shorthand property for `flex-grow`, `flex-shrink`, and `flex-basis`.

### `align-self`

This property allows you to override the `align-items` value for a specific flex item.

## Example of a Simple Flexbox Layout

```html
<div class="flex-container">
  <div>1</div>
  <div>2</div>
  <div>3</div>
</div>
```

```css
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: DodgerBlue;
}

.flex-container > div {
  background-color: #f1f1f1;
  margin: 10px;
  padding: 20px;
  font-size: 30px;
}
```

This will create a flex container with three flex items that are centered both horizontally and vertically.

Flexbox is a powerful tool for creating modern and responsive web layouts. By understanding the different properties and how they work together, you can create a wide variety of layouts with ease.
