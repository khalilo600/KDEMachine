
# 4. Data Modeling in Power BI

Data modeling is the process of connecting multiple data sources together in a way that makes sense for analysis. In Power BI, data modeling is done in the **Model view**.

## The Model View

The Model view in Power BI Desktop allows you to see and manage the relationships between the tables in your model. You can create, edit, and delete relationships in this view.

## Relationships

A relationship defines how two tables are related to each other. In Power BI, relationships are based on a common column between the two tables.

When you create a relationship between two tables, you are telling Power BI how to join the tables together when you create visualizations.

### Cardinality

Cardinality refers to the uniqueness of values in a column. Power BI supports the following cardinality types:

*   **Many-to-one (\*:1):** This is the most common type of relationship. It means that one table can have many matching rows in the other table, but the other table has only one matching row in the first table.
*   **One-to-one (1:1):** This means that for each row in one table, there is only one matching row in the other table.
*   **One-to-many (1:\*):** This is the same as many-to-one, but from the other direction.
*   **Many-to-many (\*:\*):** This means that both tables can have many matching rows in the other table.

### Cross-filter Direction

Cross-filter direction determines how filters are propagated between tables. You can set the cross-filter direction to either **Single** or **Both**.

*   **Single:** Filters propagate from the "one" side of the relationship to the "many" side.
*   **Both:** Filters propagate in both directions.

## Creating a Star Schema

A common data modeling practice is to create a **star schema**. A star schema consists of a central **fact table** and several **dimension tables**.

*   **Fact Table:** A fact table contains the quantitative data for your analysis (e.g., sales, revenue, quantities). Our `sales_data` table is a fact table.
*   **Dimension Tables:** Dimension tables contain the descriptive data that you use to slice and dice the data in your fact table (e.g., customers, products, dates).

In our data model, we might create dimension tables for `Customers`, `Products`, and `Dates`.

## Creating a Date Table

It is a best practice to create a dedicated date table in your data model. A date table allows you to perform time-based calculations, such as year-to-date, quarter-to-date, and month-over-month.

You can create a date table in Power Query using M code, or you can use DAX to create a calculated table.
