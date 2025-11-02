
# 6. Advanced Formulas in Excel

In this section, we will cover some of the more advanced formulas in Excel.

## `VLOOKUP` and `HLOOKUP`

`VLOOKUP` and `HLOOKUP` are used to look up a value in a table and return a corresponding value.

*   **`VLOOKUP`:** Looks for a value in the first column of a table and returns a value in the same row from a specified column.
*   **`HLOOKUP`:** Looks for a value in the first row of a table and returns a value in the same column from a specified row.

### `VLOOKUP` Example

```excel
=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])
```

## `INDEX` and `MATCH`

`INDEX` and `MATCH` are a powerful combination of functions that can be used to perform more flexible lookups than `VLOOKUP` and `HLOOKUP`.

*   **`INDEX`:** Returns a value from a table based on a row and column number.
*   **`MATCH`:** Returns the position of a value in a range.

### `INDEX`/`MATCH` Example

```excel
=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))
```

## `XLOOKUP`

`XLOOKUP` is a new function in Excel 365 that is designed to replace `VLOOKUP`, `HLOOKUP`, and `INDEX`/`MATCH`. It is more flexible and easier to use than the older lookup functions.

### `XLOOKUP` Example

```excel
=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode], [search_mode])
```

## Array Formulas

An array formula is a formula that can perform multiple calculations on one or more items in an array. You can think of an array as a row of values, a column of values, or a combination of rows and columns of values.

To enter an array formula, you must press `Ctrl+Shift+Enter` instead of just `Enter`.

### Example

To sum the product of two ranges:

```excel
{=SUM(A1:A10*B1:B10)}
```

## Dynamic Array Formulas

Dynamic array formulas are a new feature in Excel 365. With dynamic array formulas, you no longer need to press `Ctrl+Shift+Enter` to enter an array formula.

Dynamic array formulas can "spill" their results into multiple cells.

### New Dynamic Array Functions

*   **`FILTER`:** Filters a range of data based on criteria you define.
*   **`SORT`:** Sorts the contents of a range or array.
*   **`UNIQUE`:** Returns a list of unique values in a list or range.
*   **`SEQUENCE`:** Generates a list of sequential numbers.
*   **`RANDARRAY`:** Generates an array of random numbers.
