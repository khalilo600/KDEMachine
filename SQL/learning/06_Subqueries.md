
# 6. Subqueries

A subquery or Inner query or Nested query is a query in a query. A subquery is usually added within the `WHERE` Clause of another SQL `SELECT` statement.

You can use a subquery in a `SELECT`, `INSERT`, `UPDATE`, or `DELETE` statement as well as inside another subquery.

A subquery is enclosed in parentheses.

## Subqueries with the `SELECT` Statement

Subqueries are most frequently used with the `SELECT` statement.

### Example

To find all users who have placed an order:

```sql
SELECT username
FROM users
WHERE user_id IN (SELECT user_id FROM orders);
```

## Subqueries with the `INSERT` Statement

Subqueries can also be used with the `INSERT` statement. The data returned from the subquery is used to insert into another table.

### Example

To create a backup of the `users` table:

```sql
INSERT INTO users_backup
SELECT * FROM users;
```

## Subqueries with the `UPDATE` Statement

The subquery can be used in conjunction with the `UPDATE` statement. Either single or multiple columns in a table can be updated when using a subquery with the `UPDATE` statement.

### Example

To give a 10% discount to all products in the 'Electronics' category:

```sql
UPDATE products
SET price = price * 0.9
WHERE category_id = (SELECT category_id FROM categories WHERE category_name = 'Electronics');
```

## Subqueries with the `DELETE` Statement

The subquery can be used in conjunction with the `DELETE` statement like with any other statements mentioned above.

### Example

To delete all orders placed by users from a specific country (e.g., 'USA'):

```sql
DELETE FROM orders
WHERE user_id IN (SELECT user_id FROM users WHERE country = 'USA');
```
