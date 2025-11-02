# HTML Lists

HTML offers three main types of lists: unordered lists, ordered lists, and description lists. These are used to group a set of related items.

## Unordered Lists

An unordered list starts with the `<ul>` tag. Each list item starts with the `<li>` tag. The list items will be marked with bullets (small black circles) by default.

```html
<ul>
  <li>Coffee</li>
  <li>Tea</li>
  <li>Milk</li>
</ul>
```

### The `type` Attribute for Unordered Lists

The `type` attribute of the `<ul>` tag can be used to specify the type of bullet. However, this is a deprecated attribute, and it is recommended to use CSS for styling lists.

*   `disc`: (Default) A filled circle.
*   `circle`: An unfilled circle.
*   `square`: A filled square.
*   `none`: No bullet.

## Ordered Lists

An ordered list starts with the `<ol>` tag. Each list item starts with the `<li>` tag. The list items will be marked with numbers by default.

```html
<ol>
  <li>First item</li>
  <li>Second item</li>
  <li>Third item</li>
</ol>
```

### The `type` Attribute for Ordered Lists

The `type` attribute of the `<ol>` tag can be used to specify the type of numbering:

*   `1`: (Default) Numbers (1, 2, 3, ...)
*   `A`: Uppercase letters (A, B, C, ...)
*   `a`: Lowercase letters (a, b, c, ...)
*   `I`: Uppercase Roman numerals (I, II, III, ...)
*   `i`: Lowercase Roman numerals (i, ii, iii, ...)

### The `start` Attribute

The `start` attribute can be used to specify the starting value of an ordered list.

```html
<ol type="1" start="5">
  <li>Fifth item</li>
  <li>Sixth item</li>
  <li>Seventh item</li>
</ol>
```

## Description Lists

A description list is a list of terms, with a description of each term. It is created using the `<dl>` (description list), `<dt>` (description term), and `<dd>` (description details) tags.

```html
<dl>
  <dt>Coffee</dt>
  <dd>- black hot drink</dd>
  <dt>Milk</dt>
  <dd>- white cold drink</dd>
</dl>
```

## Nested Lists

Lists can be nested inside other lists.

```html
<ul>
  <li>Coffee</li>
  <li>Tea
    <ul>
      <li>Black tea</li>
      <li>Green tea</li>
    </ul>
  </li>
  <li>Milk</li>
</ul>
```
