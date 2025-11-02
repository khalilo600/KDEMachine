
# 7. Error Handling in Power Query

Errors can occur in Power Query for a variety of reasons, such as incorrect data types, missing data, or invalid transformations.

Power Query provides several tools for handling errors.

## Finding Errors

Power Query will automatically detect errors in your data and display them in the Data Preview. Errors are displayed with a yellow background.

You can also use the `Keep Errors` and `Remove Errors` buttons on the `Home` tab to filter your data to show only the rows that contain errors.

## Replacing Errors

You can replace errors with a specific value by right-clicking on a column header and selecting `Replace Errors`.

## The `try...otherwise` Expression

For more advanced error handling, you can use the `try...otherwise` expression in the M language.

The `try` expression attempts to evaluate an expression. If the expression evaluates to an error, the `otherwise` expression is evaluated instead.

### Example

To handle errors when converting a column to a number:

```m
let
    Source = ...,
    // ... other steps
    Custom = Table.AddColumn(Source, "Number", each try Number.From([ColumnA]) otherwise null)
in
    Custom
```

In this example, the `try` expression attempts to convert the `ColumnA` to a number. If the conversion fails, the `otherwise` expression returns `null`.

## Data Profiling

Power Query provides several data profiling tools that can help you to identify errors and other data quality issues.

*   **Column Quality:** Shows the percentage of valid, error, and empty values in each column.
*   **Column Distribution:** Shows a histogram of the values in each column.
*   **Column Profile:** Shows detailed statistics about each column.

You can enable these tools from the `View` tab.

## Best Practices for Error Handling

*   **Address errors as early as possible:** It is best to address errors as close to the source as possible.
*   **Don't just remove errors:** Removing errors can hide problems in your data. It is often better to replace errors with a specific value or to investigate the cause of the error.
*   **Use the data profiling tools:** The data profiling tools can help you to identify and understand the errors in your data.
