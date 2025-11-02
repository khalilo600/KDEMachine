
# 5. DAX Fundamentals

**DAX (Data Analysis Expressions)** is a library of functions and operators that can be used to build formulas and expressions in Power BI, Analysis Services, and Power Pivot in Excel.

DAX formulas are used to create **calculated columns**, **calculated tables**, and **measures**.

## Calculated Columns

A calculated column is a new column that you add to a table in your model. The values in a calculated column are calculated based on a DAX formula.

Calculated columns are calculated row by row, and they are stored in the model, which means they consume memory.

### Example

To create a `Revenue` column in our `sales_data` table:

```dax
Revenue = sales_data[Quantity] * sales_data[Price]
```

## Measures

A measure is a formula that is created specifically for use in a report visualization. Measures are calculated on the fly, based on the context of the visualization.

Measures are not stored in the model, so they do not consume memory in the same way that calculated columns do.

### Example

To create a `Total Revenue` measure:

```dax
Total Revenue = SUM(sales_data[Revenue])
```

## Calculated Tables

A calculated table is a new table that you add to your model. The values in a calculated table are calculated based on a DAX formula.

Calculated tables are useful for creating new tables on the fly, such as a date table.

### Example

To create a `Dates` table:

```dax
Dates = CALENDAR(MIN(sales_data[OrderDate]), MAX(sales_data[OrderDate]))
```

## Common DAX Functions

DAX has a large library of functions that you can use to perform calculations.

*   **Aggregate Functions:** `SUM`, `AVERAGE`, `MIN`, `MAX`, `COUNT`
*   **Filter Functions:** `CALCULATE`, `FILTER`, `ALL`
*   **Time Intelligence Functions:** `TOTALYTD`, `SAMEPERIODLASTYEAR`, `DATESBETWEEN`
*   **Logical Functions:** `IF`, `AND`, `OR`, `SWITCH`
*   **Text Functions:** `CONCATENATE`, `LEFT`, `RIGHT`, `LEN`

## The `CALCULATE` Function

The `CALCULATE` function is one of the most important functions in DAX. It allows you to modify the filter context of a calculation.

### Example

To calculate the total revenue for the USA:

```dax
USA Revenue = CALCULATE([Total Revenue], sales_data[Country] = "USA")
```
