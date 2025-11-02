
# 2. Basic Queries

The `SELECT` statement is used to query the database and retrieve data that matches criteria that you specify.

## The `SELECT` Statement

The basic syntax of the `SELECT` statement is as follows:

```sql
SELECT column1, column2, ...
FROM table_name;
```

Here, `column1`, `column2`, ... are the fields of a table whose values you want to fetch. If you want to fetch all the fields available in the field, then you can use the following syntax:

```sql
SELECT *
FROM table_name;
```

### Examples

To select all columns from the `users` table:

```sql
SELECT *
FROM users;
```

To select only the `username` and `email` columns from the `users` table:

```sql
SELECT username, email
FROM users;
```

## The `DISTINCT` Keyword

The `DISTINCT` keyword is used in conjunction with the `SELECT` statement to eliminate all the duplicate records and fetching only unique records.

```sql
SELECT DISTINCT column1, column2, ...
FROM table_name;
```

### Example

To select only the unique `department_id` from the `employees` table:

```sql
SELECT DISTINCT department_id
FROM employees;
```

## The `WHERE` Clause

The `WHERE` clause is used to extract only those records that fulfill a specified condition.

```sql
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

### Example

To select all users from the `users` table with `user_id` less than 100:

```sql
SELECT *
FROM users
WHERE user_id < 100;
```

## The `AND`, `OR`, and `NOT` Operators

The `WHERE` clause can be combined with `AND`, `OR`, and `NOT` operators.

*   The `AND` operator displays a record if all the conditions separated by `AND` are TRUE.
*   The `OR` operator displays a record if any of the conditions separated by `OR` is TRUE.
*   The `NOT` operator displays a record if the condition(s) is NOT TRUE.

### Examples

To select all products with a price between 50 and 100:

```sql
SELECT *
FROM products
WHERE price >= 50 AND price <= 100;
```

To select all products that are either in the 'Electronics' or 'Clothing' category:

```sql
SELECT *
FROM products
WHERE category = 'Electronics' OR category = 'Clothing';
```

To select all products that are not in the 'Electronics' category:

```sql
SELECT *
FROM products
WHERE NOT category = 'Electronics';
```
