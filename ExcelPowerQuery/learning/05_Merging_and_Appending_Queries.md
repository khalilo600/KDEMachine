
# 5. Merging and Appending Queries

Power Query allows you to combine data from multiple queries in two different ways: merging and appending.

## Merging Queries

Merging queries is similar to doing a `JOIN` in SQL. It allows you to combine two queries based on a common column.

To merge queries, click `Home` > `Merge Queries`. This will open the Merge dialog, where you can select the two queries you want to merge and the common column to merge on.

### Join Kinds

Power Query supports several different join kinds:

*   **Left Outer:** All rows from the first query, and the matching rows from the second query.
*   **Right Outer:** All rows from the second query, and the matching rows from the first query.
*   **Full Outer:** All rows from both queries.
*   **Inner:** Only the matching rows from both queries.
*   **Left Anti:** Only the rows from the first query that do not have a match in the second query.
*   **Right Anti:** Only the rows from the second query that do not have a match in the first query.

## Appending Queries

Appending queries is similar to doing a `UNION` in SQL. It allows you to stack two or more queries on top of each other to create a single query.

To append queries, click `Home` > `Append Queries`. This will open the Append dialog, where you can select the queries you want to append.

**Note:** When you append queries, the queries must have the same number of columns, and the columns must have the same data types.

## Merging vs. Appending

*   Use **merging** when you want to add more columns to a query.
*   Use **appending** when you want to add more rows to a query.

## Example

Let's say you have two queries:

*   `Sales_2023`: Contains sales data for the year 2023.
*   `Sales_2024`: Contains sales data for the year 2024.

You could **append** these two queries to create a single query with all the sales data.

Now, let's say you have another query:

*   `Customers`: Contains information about your customers.

You could **merge** the `Sales` query with the `Customers` query to add customer information to each sales transaction.
