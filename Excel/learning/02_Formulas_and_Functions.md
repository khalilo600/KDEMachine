
# 2. Formulas and Functions in Excel

**Formulas** are the heart of Excel. A formula is an expression that performs a calculation.

## Creating a Formula

All formulas in Excel begin with an equals sign (`=`).

After the equals sign, you can enter a combination of:

*   **Constants:** Numbers or text values that do not change.
*   **Cell References:** References to other cells (e.g., `A1`, `B2`).
*   **Operators:** Mathematical operators such as `+` (addition), `-` (subtraction), `*` (multiplication), and `/` (division).
*   **Functions:** Built-in formulas that perform a specific task.

### Example

To add the values in cells A1 and B1, you would use the following formula:

```excel
=A1+B1
```

## Cell References

There are two types of cell references:

*   **Relative References:** A relative cell reference adjusts when you copy it to another cell. For example, if you copy the formula `=A1+B1` from cell C1 to cell C2, the formula will change to `=A2+B2`.
*   **Absolute References:** An absolute cell reference does not change when you copy it to another cell. You can make a cell reference absolute by adding a dollar sign (`$`) before the column letter and the row number (e.g., `$A$1`).

## Functions

**Functions** are predefined formulas that perform a specific calculation. Excel has a large library of built-in functions.

To use a function, you enter the function name followed by one or more arguments in parentheses.

### Example

To calculate the sum of the values in cells A1 through A10, you would use the `SUM` function:

```excel
=SUM(A1:A10)
```

## Common Functions

Here are some of the most common functions in Excel:

*   **`SUM`:** Adds a range of numbers.
*   **`AVERAGE`:** Calculates the average of a range of numbers.
*   **`COUNT`:** Counts the number of cells in a range that contain numbers.
*   **`COUNTA`:** Counts the number of cells in a range that are not empty.
*   **`MAX`:** Returns the largest value in a range.
*   **`MIN`:** Returns the smallest value in a range.
*   **`IF`:** Performs a logical test and returns one value if the test is true, and another value if the test is false.
*   **`VLOOKUP`:** Looks for a value in the first column of a table and returns a value in the same row from a specified column.
