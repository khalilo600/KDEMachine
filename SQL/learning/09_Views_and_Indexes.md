
# 9. Views and Indexes

## Views

A view is a virtual table based on the result-set of an SQL statement.

A view contains rows and columns, just like a real table. The fields in a view are fields from one or more real tables in the database.

You can add SQL functions, `WHERE`, and `JOIN` statements to a view and present the data as if the data were coming from one single table.

### Creating a View

A view is created with the `CREATE VIEW` statement.

```sql
CREATE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

### Example

To create a view that shows all products from the 'Electronics' category:

```sql
CREATE VIEW electronics_products AS
SELECT product_id, name, price
FROM products
WHERE category_id = (SELECT category_id FROM categories WHERE category_name = 'Electronics');
```

### Querying a View

You can query a view as you would query a regular table.

```sql
SELECT *
FROM electronics_products;
```

### Updating a View

A view can be updated with the `CREATE OR REPLACE VIEW` statement.

```sql
CREATE OR REPLACE VIEW view_name AS
SELECT column1, column2, ...
FROM table_name
WHERE condition;
```

### Dropping a View

A view is deleted with the `DROP VIEW` statement.

```sql
DROP VIEW view_name;
```

## Indexes

Indexes are used to retrieve data from the database more quickly than otherwise. The users cannot see the indexes, they are just used to speed up searches/queries.

**Note:** While indexes are intended to enhance a database's performance, there are performance overheads. So, you should create indexes only on the columns that will be frequently queried against.

### Creating an Index

An index is created with the `CREATE INDEX` statement.

```sql
CREATE INDEX index_name
ON table_name (column1, column2, ...);
```

### Example

To create an index on the `username` column of the `users` table:

```sql
CREATE INDEX idx_username
ON users (username);
```

### Dropping an Index

An index is deleted with the `DROP INDEX` statement.

```sql
DROP INDEX index_name;
```
