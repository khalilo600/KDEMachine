
# 4. Joins

A `JOIN` clause is used to combine rows from two or more tables, based on a related column between them.

## The `INNER JOIN` Keyword

The `INNER JOIN` keyword selects records that have matching values in both tables.

```sql
SELECT column_name(s)
FROM table1
INNER JOIN table2
ON table1.column_name = table2.column_name;
```

### Example

To select all orders with user information:

```sql
SELECT orders.order_id, users.username
FROM orders
INNER JOIN users ON orders.user_id = users.user_id;
```

## The `LEFT JOIN` Keyword

The `LEFT JOIN` keyword returns all records from the left table (table1), and the matched records from the right table (table2). The result is NULL from the right side, if there is no match.

```sql
SELECT column_name(s)
FROM table1
LEFT JOIN table2
ON table1.column_name = table2.column_name;
```

### Example

To select all users and any orders they might have:

```sql
SELECT users.username, orders.order_id
FROM users
LEFT JOIN orders ON users.user_id = orders.user_id;
```

## The `RIGHT JOIN` Keyword

The `RIGHT JOIN` keyword returns all records from the right table (table2), and the matched records from the left table (table1). The result is NULL from the left side, when there is no match.

```sql
SELECT column_name(s)
FROM table1
RIGHT JOIN table2
ON table1.column_name = table2.column_name;
```

### Example

To select all orders and the users who made them:

```sql
SELECT orders.order_id, users.username
FROM orders
RIGHT JOIN users ON orders.user_id = users.user_id;
```

## The `FULL OUTER JOIN` Keyword

The `FULL OUTER JOIN` keyword returns all records when there is a match in either left or right table.

**Note:** `FULL OUTER JOIN` can potentially return very large result-sets!

```sql
SELECT column_name(s)
FROM table1
FULL OUTER JOIN table2
ON table1.column_name = table2.column_name;
```

### Example

To select all users and all orders:

```sql
SELECT users.username, orders.order_id
FROM users
FULL OUTER JOIN orders ON users.user_id = orders.user_id;
```

## The `SELF JOIN`

A self join is a regular join, but the table is joined with itself.

```sql
SELECT column_name(s)
FROM table1 T1, table1 T2
WHERE condition;
```

### Example

To match customers that are from the same city:

```sql
SELECT A.CustomerName AS CustomerName1, B.CustomerName AS CustomerName2, A.City
FROM Customers A, Customers B
WHERE A.CustomerID <> B.CustomerID
AND A.City = B.City
ORDER BY A.City;
```
