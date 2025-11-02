
# 3. Filtering and Sorting

In this section, we will cover more advanced filtering techniques and how to sort the results of your queries.

## The `ORDER BY` Clause

The `ORDER BY` keyword is used to sort the result-set in ascending or descending order.

The `ORDER BY` keyword sorts the records in ascending order by default. To sort the records in descending order, use the `DESC` keyword.

```sql
SELECT column1, column2, ...
FROM table_name
ORDER BY column1, column2, ... ASC|DESC;
```

### Examples

To select all products from the `products` table, sorted by price in ascending order:

```sql
SELECT *
FROM products
ORDER BY price;
```

To select all products from the `products` table, sorted by price in descending order:

```sql
SELECT *
FROM products
ORDER BY price DESC;
```

## The `LIMIT` Clause

The `LIMIT` clause is used to specify the number of records to return.

The `LIMIT` clause is useful on large tables with thousands of records. Returning a large number of records can impact performance.

```sql
SELECT column1, column2, ...
FROM table_name
LIMIT number;
```

### Example

To select the first 10 records from the `users` table:

```sql
SELECT *
FROM users
LIMIT 10;
```

## The `LIKE` Operator

The `LIKE` operator is used in a `WHERE` clause to search for a specified pattern in a column.

There are two wildcards used in conjunction with the `LIKE` operator:

*   The percent sign (`%`) represents zero, one, or multiple characters
*   The underscore sign (`_`) represents one, single character

### Examples

To select all users whose username starts with 'j':

```sql
SELECT *
FROM users
WHERE username LIKE 'j%';
```

To select all users whose username ends with 'n':

```sql
SELECT *
FROM users
WHERE username LIKE '%n';
```

To select all users whose username contains the pattern 'er':

```sql
SELECT *
FROM users
WHERE username LIKE '%er%';
```

## The `IN` Operator

The `IN` operator allows you to specify multiple values in a `WHERE` clause.

The `IN` operator is a shorthand for multiple `OR` conditions.

### Example

To select all products that are in the categories 'Electronics', 'Clothing', or 'Books':

```sql
SELECT *
FROM products
WHERE category IN ('Electronics', 'Clothing', 'Books');
```

## The `BETWEEN` Operator

The `BETWEEN` operator selects values within a given range. The values can be numbers, text, or dates.

The `BETWEEN` operator is inclusive: begin and end values are included.

### Example

To select all products with a price between 50 and 100:

```sql
SELECT *
FROM products
WHERE price BETWEEN 50 AND 100;
```
