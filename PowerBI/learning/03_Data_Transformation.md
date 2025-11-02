
# 3. Data Transformation in Power BI

Data transformation is the process of cleaning, shaping, and enriching data to prepare it for analysis. In Power BI, data transformation is done in the **Power Query Editor**.

## The Power Query Editor

The Power Query Editor is a powerful tool for transforming data. It has a user-friendly interface that allows you to perform a wide range of transformations without writing any code.

When you perform transformations in the Power Query Editor, you are not changing the original source data. Instead, Power Query records each step of the transformation process and applies it to the data every time you refresh.

## Common Data Transformation Tasks

Here are some common data transformation tasks you will perform on our `sales_data.csv` dataset:

*   **Removing Columns:** Remove unnecessary columns.
*   **Changing Data Types:** Correct the data types of columns (e.g., from text to number).
*   **Filtering Data:** Remove rows with errors or unwanted values.
*   **Replacing Values:** Replace incorrect or inconsistent values.
*   **Splitting Columns:** Split a column into multiple columns.
*   **Merging Columns:** Merge multiple columns into a single column.
*   **Creating Custom Columns:** Add new columns based on calculations or other columns.
*   **Handling Missing Values:** Fill or remove missing values.
*   **Removing Duplicates:** Remove duplicate rows.
*   **Unpivoting Columns:** Transform columns into rows.

## Applied Steps

The Power Query Editor records each transformation step in the **Applied Steps** pane on the right side of the screen. You can select a step to see what the data looked like at that point in the transformation process. You can also reorder, edit, or delete steps.

## The Advanced Editor

For more advanced transformations, you can use the **Advanced Editor**. The Advanced Editor shows the M code that Power Query has generated for your transformations. You can edit this code directly to create more complex transformations.

## Transforming our Sample Data

Here are some of the transformations we will apply to our `sales_data.csv` dataset:

1.  **Correct Data Types:** Change the `Price` and `Quantity` columns to numeric types.
2.  **Clean `Country` Column:** Standardize the values in the `Country` column (e.g., change "usa" and "United States" to "USA").
3.  **Parse `OrderDate` Column:** Convert the `OrderDate` column to a consistent date format.
4.  **Handle Missing Values:** Fill or remove rows with missing values.
5.  **Remove Duplicates:** Remove any duplicate rows.
6.  **Filter Outliers:** Remove rows with extreme values in the `Price` or `Quantity` columns.
