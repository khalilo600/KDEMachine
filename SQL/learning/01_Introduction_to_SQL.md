
# 1. Introduction to SQL

**SQL (Structured Query Language)** is a standard language for accessing and manipulating databases. It is used to manage data in relational database management systems (RDBMS).

## What is a Database?

A database is an organized collection of data, generally stored and accessed electronically from a computer system. Databases can be very large and complex, and they are used in a wide variety of applications.

## What is a Relational Database?

A relational database is a type of database that stores and provides access to data points that are related to one another. Relational databases are based on the relational model, an intuitive, straightforward way of representing data in tables.

In a relational database, each row in a table is a record with a unique ID called the key. The columns of the table hold attributes of the data, and each record usually has a value for each attribute, making it easy to establish the relationships among data points.

## Basic SQL Commands

SQL commands are divided into several categories:

*   **Data Query Language (DQL):** Used to query the database for information.
    *   `SELECT`: Extracts data from a database.
*   **Data Definition Language (DDL):** Used to define the database schema.
    *   `CREATE`: Creates a new table, a view of a table, or other object in the database.
    *   `ALTER`: Modifies an existing database object, such as a table.
    *   `DROP`: Deletes an entire table, a view of a table or other object in the database.
*   **Data Manipulation Language (DML):** Used for adding, deleting, and modifying data in a database.
    *   `INSERT`: Adds new rows of data into a table.
    *   `UPDATE`: Modifies existing data within a table.
    *   `DELETE`: Deletes existing rows from a table.
*   **Data Control Language (DCL):** Used to control access to data in the database.
    *   `GRANT`: Gives a user access privileges to the database.
    *   `REVOKE`: Withdraws the user's access privileges.
*   **Transaction Control Language (TCL):** Used to manage transactions in the database.
    *   `COMMIT`: Saves all the work done.
    *   `ROLLBACK`: Restores the database to the last committed state.

## SQL Process

When you want to execute an SQL command, you need to use a database management system (DBMS). The DBMS processes the SQL command, and the result is returned to the client application.

## Our Sample Database

For this tutorial, we will be using a sample database with the following tables:

*   `users`: Contains user information.
*   `products`: Contains product information.
*   `orders`: Contains order information.
*   `employees`: Contains employee information.
*   `departments`: Contains department information.
*   `locations`: Contains location information.

These tables are provided as CSV files in the `SQL/data` directory.
