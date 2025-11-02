
# 12. Advanced SQL

In this section, we will cover some advanced SQL topics.

## Common Table Expressions (CTEs)

A Common Table Expression (CTE) is a temporary named result set that you can reference within a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement.

CTEs are defined using the `WITH` clause.

### Example

To find the total number of orders for each customer:

```sql
WITH OrderCounts AS (
    SELECT
        user_id,
        COUNT(order_id) as total_orders
    FROM
        orders
    GROUP BY
        user_id
)
SELECT
    u.username,
    oc.total_orders
FROM
    users u
JOIN
    OrderCounts oc ON u.user_id = oc.user_id;
```

## Pivot and Unpivot

`PIVOT` and `UNPIVOT` are relational operators that are used to transform one table into another in order to get a more simplified view of the table.

### `PIVOT`

The `PIVOT` operator converts the row data of the table into the column data.

### `UNPIVOT`

The `UNPIVOT` operator does the opposite of the `PIVOT` operator. It transforms the column-based data into rows.

**Note:** The syntax for `PIVOT` and `UNPIVOT` can vary between different database systems (e.g., SQL Server, Oracle, PostgreSQL).

## Stored Procedures

A stored procedure is a prepared SQL code that you can save, so the code can be reused over and over again.

So if you have an SQL query that you write over and over again, save it as a stored procedure, and then just call it to execute it.

### Example (SQL Server)

```sql
CREATE PROCEDURE SelectAllCustomers @City nvarchar(30)
AS
SELECT * FROM Customers WHERE City = @City;
```

To execute the stored procedure:

```sql
EXEC SelectAllCustomers @City = 'London';
```

## Triggers

A trigger is a special type of stored procedure that automatically runs when an event occurs in the database server.

DML triggers run when a user tries to modify data through a data manipulation language (DML) event. DML events are `INSERT`, `UPDATE`, or `DELETE` statements on a table or view.

### Example (SQL Server)

To create a trigger that automatically updates a `last_modified` timestamp on a table:

```sql
CREATE TRIGGER trg_update_last_modified
ON products
AFTER UPDATE
AS
BEGIN
    UPDATE products
    SET last_modified = GETDATE()
    WHERE product_id IN (SELECT i.product_id FROM inserted i);
END;
```
