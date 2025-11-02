
# 4. Advanced Data Transformations in Power Query

In addition to the basic transformations, Power Query also provides a number of more advanced transformation tools.

## Unpivoting Columns

Unpivoting columns is a powerful technique for transforming data from a wide format to a long format. This is useful when you have data that is stored in a crosstab format, and you want to convert it to a tabular format.

To unpivot columns, select the columns you want to unpivot and then click `Unpivot Columns` on the `Transform` tab.

## Grouping Data

You can group the rows in your query by one or more columns and then calculate aggregate values for each group. This is similar to using a `GROUP BY` clause in SQL.

To group data, click the `Group By` button on the `Home` tab.

## Creating Custom Columns

You can add new columns to your query based on a formula. This is a powerful way to create new features in your data.

To create a custom column, click `Add Column` > `Custom Column`. This will open the Custom Column dialog, where you can enter a formula using the M language.

## Creating Conditional Columns

A conditional column is a type of custom column that allows you to define a set of `if/then/else` rules to create the values in the column.

To create a conditional column, click `Add Column` > `Conditional Column`.

## Creating an Index Column

An index column is a column that contains a sequential list of numbers. You can use an index column to add a unique identifier to each row in your query.

To add an index column, click `Add Column` > `Index Column`.

## Running R and Python Scripts

If you have R or Python installed on your computer, you can run R and Python scripts directly within Power Query to perform advanced analytics and data transformations.

To run an R or Python script, click `Transform` > `Run R Script` or `Run Python Script`.

## The Advanced Editor

For the most advanced transformations, you can use the **Advanced Editor**. The Advanced Editor shows the M code that Power Query has generated for your transformations. You can edit this code directly to create more complex transformations.
