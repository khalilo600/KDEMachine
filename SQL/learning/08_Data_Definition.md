
# 8. Data Definition

Data Definition Language (DDL) is a standard for commands that define the different structures in a database. DDL statements create, modify, and remove database objects such as tables, indexes, and users.

## The `CREATE TABLE` Statement

The `CREATE TABLE` statement is used to create a new table in a database.

```sql
CREATE TABLE table_name (
    column1 datatype,
    column2 datatype,
    column3 datatype,
   ....
);
```

### Example

To create a `categories` table:

```sql
CREATE TABLE categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL
);
```

## The `ALTER TABLE` Statement

The `ALTER TABLE` statement is used to add, delete, or modify columns in an existing table.

The `ALTER TABLE` statement is also used to add and drop various constraints on an existing table.

### Examples

To add a new column to the `products` table:

```sql
ALTER TABLE products
ADD COLUMN category_id INT;
```

To add a foreign key constraint to the `products` table:

```sql
ALTER TABLE products
ADD FOREIGN KEY (category_id) REFERENCES categories(category_id);
```

To drop a column from the `products` table:

```sql
ALTER TABLE products
DROP COLUMN description;
```

## The `DROP TABLE` Statement

The `DROP TABLE` statement is used to drop an existing table in a database.

```sql
DROP TABLE table_name;
```

### Example

To drop the `categories` table:

```sql
DROP TABLE categories;
```

## The `TRUNCATE TABLE` Statement

The `TRUNCATE TABLE` statement is used to delete the data inside a table, but not the table itself.

```sql
TRUNCATE TABLE table_name;
```

### Example

To truncate the `orders` table:

```sql
TRUNCATE TABLE orders;
```
