# HTML Tables

HTML tables are used to display data in a tabular format, with rows and columns.

## Basic Table Structure

An HTML table is defined with the `<table>` tag. Inside the `<table>` tag, you will find the following elements:

*   `<tr>`: Defines a table row.
*   `<th>`: Defines a table header cell. By default, the text in a `<th>` element is bold and centered.
*   `<td>`: Defines a table data cell.

Here is an example of a simple HTML table:

```html
<table>
  <tr>
    <th>Firstname</th>
    <th>Lastname</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table>
```

## Table Borders

By default, HTML tables are displayed without borders. To add borders, you can use the `border` attribute on the `<table>` tag. However, the `border` attribute is deprecated, and it is recommended to use CSS to style table borders.

### CSS for Table Borders

```css
table, th, td {
  border: 1px solid black;
  border-collapse: collapse; /* This will make the borders collapse into a single border */
}
```

## Colspan and Rowspan

You can use the `colspan` and `rowspan` attributes to make a cell span over multiple columns or rows.

*   `colspan`: Specifies the number of columns a cell should span.
*   `rowspan`: Specifies the number of rows a cell should span.

### Colspan Example

```html
<table>
  <tr>
    <th colspan="2">Name</th>
    <th>Age</th>
  </tr>
  <tr>
    <td>Jill</td>
    <td>Smith</td>
    <td>50</td>
  </tr>
  <tr>
    <td>Eve</td>
    <td>Jackson</td>
    <td>94</td>
  </tr>
</table>
```

### Rowspan Example

```html
<table>
  <tr>
    <th>Name</th>
    <td>Jill</td>
  </tr>
  <tr>
    <th rowspan="2">Phone</th>
    <td>555-1234</td>
  </tr>
  <tr>
    <td>555-5678</td>
  </tr>
</table>
```

## Table Headers, Body, and Footer

HTML provides tags to structure your tables into a header, body, and footer section.

*   `<thead>`: Groups the header content in a table.
*   `<tbody>`: Groups the body content in a table.
*   `<tfoot>`: Groups the footer content in a table.

These tags do not affect the layout of the table by default, but they can be useful for styling and for accessibility.

```html
<table>
  <thead>
    <tr>
      <th>Firstname</th>
      <th>Lastname</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Peter</td>
      <td>Griffin</td>
    </tr>
    <tr>
      <td>Lois</td>
      <td>Griffin</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="2">Family Guy</td>
    </tr>
  </tfoot>
</table>
```
