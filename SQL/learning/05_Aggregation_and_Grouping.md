
# 5. Aggregation and Grouping

SQL aggregate functions return a single value, calculated from values in a column.

## Aggregate Functions

*   `COUNT()`: Counts the number of rows.
*   `SUM()`: Calculates the sum of values.
*   `AVG()`: Calculates the average of values.
*   `MIN()`: Returns the minimum value.
*   `MAX()`: Returns the maximum value.

### Examples

To count the number of users:

```sql
SELECT COUNT(user_id)
FROM users;
```

To calculate the total revenue from all orders:

```sql
SELECT SUM(quantity * price)
FROM orders
INNER JOIN products ON orders.product_id = products.product_id;
```

To find the average price of all products:

```sql
SELECT AVG(price)
FROM products;
```

To find the minimum and maximum price of all products:

```sql
SELECT MIN(price), MAX(price)
FROM products;
```

## The `GROUP BY` Statement

The `GROUP BY` statement groups rows that have the same values into summary rows, like "find the number of customers in each country".

The `GROUP BY` statement is often used with aggregate functions (`COUNT`, `MAX`, `MIN`, `SUM`, `AVG`) to group the result-set by one or more columns.

```sql
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
ORDER BY column_name(s);
```

### Example

To count the number of orders for each user:

```sql
SELECT user_id, COUNT(order_id)
FROM orders
GROUP BY user_id;
```

## The `HAVING` Clause

The `HAVING` clause was added to SQL because the `WHERE` keyword could not be used with aggregate functions.

```sql
SELECT column_name(s)
FROM table_name
WHERE condition
GROUP BY column_name(s)
HAVING condition
ORDER BY column_name(s);
```

### Example

To find users who have placed more than 5 orders:

```sql
SELECT user_id, COUNT(order_id)
FROM orders
GROUP BY user_id
HAVING COUNT(order_id) > 5;
```
