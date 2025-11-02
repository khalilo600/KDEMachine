
# 7. Data Manipulation

Data Manipulation Language (DML) is a vocabulary used to retrieve and work with data in databases.

## The `INSERT INTO` Statement

The `INSERT INTO` statement is used to insert new records in a table.

It is possible to write the `INSERT INTO` statement in two ways:

1.  Specify both the column names and the values to be inserted:

    ```sql
    INSERT INTO table_name (column1, column2, column3, ...)
    VALUES (value1, value2, value3, ...);
    ```

2.  If you are adding values for all the columns of the table, you do not need to specify the column names in the SQL query. However, make sure the order of the values is in the same order as the columns in the table.

    ```sql
    INSERT INTO table_name
    VALUES (value1, value2, value3, ...);
    ```

### Example

To insert a new user into the `users` table:

```sql
INSERT INTO users (username, email, password)
VALUES ('johndoe', 'johndoe@example.com', 'password123');
```

## The `UPDATE` Statement

The `UPDATE` statement is used to modify the existing records in a table.

```sql
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition;
```

### Example

To update the email address for a user with `user_id` 1:

```sql
UPDATE users
SET email = 'new.email@example.com'
WHERE user_id = 1;
```

## The `DELETE` Statement

The `DELETE` statement is used to delete existing records in a table.

```sql
DELETE FROM table_name WHERE condition;
```

### Example

To delete a user with `user_id` 1 from the `users` table:

```sql
DELETE FROM users
WHERE user_id = 1;
```

It is possible to delete all rows in a table without deleting the table. This means that the table structure, attributes, and indexes will be intact:

```sql
DELETE FROM table_name;
```
