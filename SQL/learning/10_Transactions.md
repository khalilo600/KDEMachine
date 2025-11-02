
# 10. Transactions

A transaction is a sequence of operations performed as a single logical unit of work.

A transaction has four properties, often referred to as ACID:

*   **Atomicity:** Ensures that all operations within a work unit are completed successfully. Otherwise, the transaction is aborted at the point of failure, and all the previous operations are rolled back to their former state.
*   **Consistency:** Ensures that the database properly changes states upon a successfully committed transaction.
*   **Isolation:** Enables transactions to operate independently of and transparent to each other.
*   **Durability:** Ensures that the result or effect of a committed transaction persists in case of a system failure.

## Transaction Control Language (TCL)

Transaction Control Language (TCL) commands are used to manage transactions in the database.

*   `COMMIT`: Saves the work done.
*   `ROLLBACK`: Restores the database to the last committed state.
*   `SAVEPOINT`: Creates points within groups of transactions in which to `ROLLBACK`.

## Starting a Transaction

Transactions are started with the `BEGIN TRANSACTION` or `START TRANSACTION` command.

```sql
BEGIN TRANSACTION;
-- SQL statements
COMMIT;
```

## The `COMMIT` Command

The `COMMIT` command is the transactional command used to save changes invoked by a transaction to the database.

### Example

```sql
BEGIN TRANSACTION;

UPDATE users
SET email = 'new.email@example.com'
WHERE user_id = 1;

COMMIT;
```

## The `ROLLBACK` Command

The `ROLLBACK` command is the transactional command used to undo transactions that have not already been saved to the database.

### Example

```sql
BEGIN TRANSACTION;

UPDATE users
SET email = 'new.email@example.com'
WHERE user_id = 1;

ROLLBACK;
```

## The `SAVEPOINT` Command

A `SAVEPOINT` is a point in a transaction when you can roll the transaction back to a certain point without rolling back the entire transaction.

### Example

```sql
BEGIN TRANSACTION;

-- SQL statements

SAVEPOINT my_savepoint;

-- More SQL statements

ROLLBACK TO my_savepoint;

COMMIT;
```
