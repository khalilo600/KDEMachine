# Java JDBC and Database Interaction

This guide provides a comprehensive overview of Java Database Connectivity (JDBC), the standard Java API for connecting Java applications to relational databases. It covers everything from setting up connections and executing SQL queries to handling transactions and processing results.

## 1. Introduction to JDBC

### What is JDBC?

JDBC (Java Database Connectivity) is a Java API that defines how a Java client can connect to and interact with a database. It provides a standard way for Java applications to perform database operations (CRUD - Create, Read, Update, Delete) regardless of the underlying database system.

### JDBC Architecture

The JDBC architecture consists of four main components:

1.  **Java Application:** Your Java program that uses the JDBC API.
2.  **JDBC API:** Provides the interfaces and classes for database connectivity (e.g., `DriverManager`, `Connection`, `Statement`, `ResultSet`).
3.  **JDBC Driver Manager:** Manages the JDBC drivers. It loads the appropriate driver for a given database connection request.
4.  **JDBC Driver:** A software component that enables the JDBC API to interact with a specific database. Each database (MySQL, PostgreSQL, Oracle, SQL Server) requires its own JDBC driver.
5.  **Database:** The actual database system (e.g., MySQL, PostgreSQL, Oracle).

```
+-------------------+     +------------------+     +------------------+     +------------------+     +----------+
| Java Application  | <-> |    JDBC API      | <-> | JDBC Driver Mgr. | <-> |   JDBC Driver    | <-> | Database |
+-------------------+     +------------------+     +------------------+     +------------------+     +----------+
```

### Types of JDBC Drivers

*   **Type 1 (JDBC-ODBC Bridge Driver):** Converts JDBC calls into ODBC calls. Deprecated and not recommended for production.
*   **Type 2 (Native-API Driver / Partially Java Driver):** Converts JDBC calls into the native API calls of the database. Requires native libraries.
*   **Type 3 (Network Protocol Driver / All-Java Driver):** Uses a middleware (application server) to convert JDBC calls into a database-specific network protocol. All-Java.
*   **Type 4 (Native Protocol Driver / Thin Driver):** Converts JDBC calls directly into the database-specific network protocol. Most common and preferred type. All-Java.

## 2. Setting up JDBC

### Adding JDBC Driver to Classpath

Before you can connect to a database, you need to download the appropriate JDBC driver (usually a `.jar` file) for your database and add it to your project's classpath.

*   **Maven/Gradle:** Add the driver as a dependency in your `pom.xml` or `build.gradle`.
*   **Manual:** Place the `.jar` file in your project's `lib` directory and include it when compiling/running.

Example (Maven `pom.xml` for MySQL Connector/J):

```xml
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>8.0.33</version> <!-- Use your desired version -->
</dependency>
```

### Database URL Format

The database URL (connection string) specifies the location and type of the database. The format is `jdbc:<subprotocol>:<subname>`.

*   **MySQL:** `jdbc:mysql://localhost:3306/mydatabase`
*   **PostgreSQL:** `jdbc:postgresql://localhost:5432/mydatabase`
*   **SQLite:** `jdbc:sqlite:mydatabase.db`
*   **Oracle:** `jdbc:oracle:thin:@localhost:1521:xe`

## 3. Connecting to a Database

### `DriverManager.getConnection()`

This static method is used to establish a connection to the database.

```java
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DbConnection {
    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydatabase";
    private static final String USER = "root";
    private static final String PASS = "password";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, USER, PASS);
    }

    public static void main(String[] args) {
        try (Connection conn = getConnection()) {
            System.out.println("Connected to the database!");
        } catch (SQLException e) {
            System.err.println("Database connection failed: " + e.getMessage());
        }
    }
}
```

### `Connection` Interface

Represents a connection to a specific database. It provides methods for creating `Statement` objects, managing transactions, and getting database metadata.

## 4. Executing SQL Queries

JDBC provides three interfaces for executing SQL statements:

### `Statement` Interface (for static SQL)

Used for executing simple, static SQL statements without parameters. Vulnerable to SQL injection if user input is directly concatenated.

```java
import java.sql.Connection;
import java.sql.Statement;
import java.sql.SQLException;

public class StatementExample {
    public static void main(String[] args) {
        try (Connection conn = DbConnection.getConnection();
             Statement stmt = conn.createStatement()) {

            // Execute an UPDATE statement
            String sql = "UPDATE users SET email = 'new@example.com' WHERE id = 1";
            int rowsAffected = stmt.executeUpdate(sql);
            System.out.println(rowsAffected + " row(s) updated.");

            // Execute a SELECT statement
            String selectSql = "SELECT id, name FROM users";
            // Results processed by executeQuery() below

        } catch (SQLException e) {
            System.err.println("SQL Error: " + e.getMessage());
        }
    }
}
```

### `PreparedStatement` Interface (for parameterized SQL)

**Highly recommended** for executing SQL statements with parameters. It pre-compiles the SQL statement, making it more efficient for repeated execution and, crucially, **prevents SQL injection** by properly escaping parameter values.

```java
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class PreparedStatementExample {
    public static void main(String[] args) {
        try (Connection conn = DbConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement("INSERT INTO users (name, email) VALUES (?, ?)")) {

            pstmt.setString(1, "Alice"); // Set first parameter
            pstmt.setString(2, "alice@example.com"); // Set second parameter
            int rowsAffected = pstmt.executeUpdate();
            System.out.println(rowsAffected + " row(s) inserted.");

            pstmt.setString(1, "Bob");
            pstmt.setString(2, "bob@example.com");
            rowsAffected = pstmt.executeUpdate();
            System.out.println(rowsAffected + " row(s) inserted.");

        } catch (SQLException e) {
            System.err.println("SQL Error: " + e.getMessage());
        }
    }
}
```

### `CallableStatement` Interface (for stored procedures)

Used for executing stored procedures in the database.

### `executeQuery()` (for SELECT statements)

Returns a `ResultSet` object, which contains the data retrieved from the database.

### `executeUpdate()` (for INSERT, UPDATE, DELETE statements)

Returns an `int` representing the number of rows affected by the SQL statement.

## 5. Processing Results

### `ResultSet` Interface

Represents a table of data generated by executing a SQL query. It maintains a cursor pointing to its current row of data.

*   `next()`: Moves the cursor to the next row. Returns `false` if there are no more rows.
*   `getString(columnName)`, `getInt(columnName)`, `getDate(columnName)`, etc.: Retrieves the value of the designated column in the current row as a Java type.
*   `getString(columnIndex)`, `getInt(columnIndex)`, etc.: Retrieves the value by column index (1-based).

```java
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class ResultSetExample {
    public static void main(String[] args) {
        try (Connection conn = DbConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement("SELECT id, name, email FROM users WHERE id > ?");) {

            pstmt.setInt(1, 0);
            ResultSet rs = pstmt.executeQuery();

            while (rs.next()) {
                int id = rs.getInt("id");
                String name = rs.getString("name");
                String email = rs.getString("email");
                System.out.println("ID: " + id + ", Name: " + name + ", Email: " + email);
            }

            rs.close(); // Close ResultSet when done

        } catch (SQLException e) {
            System.err.println("SQL Error: " + e.getMessage());
        }
    }
}
```

## 6. Transactions

Transactions ensure that a series of database operations are treated as a single, atomic unit of work. Either all operations succeed and are committed, or if any fail, all are rolled back.

### `setAutoCommit(false)`

Disables auto-commit mode, allowing you to manually control transactions.

### `commit()`

Makes all changes performed since the last commit (or start of transaction) permanent.

### `rollback()`

Undoes all changes performed since the last commit (or start of transaction).

```java
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class TransactionExample {
    public static void main(String[] args) {
        try (Connection conn = DbConnection.getConnection()) {
            conn.setAutoCommit(false); // Start transaction

            try (
                PreparedStatement pstmt1 = conn.prepareStatement("UPDATE accounts SET balance = balance - ? WHERE id = ?");
                PreparedStatement pstmt2 = conn.prepareStatement("UPDATE accounts SET balance = balance + ? WHERE id = ?");
            ) {
                // Deduct from account 1
                pstmt1.setDouble(1, 100.00);
                pstmt1.setInt(2, 1);
                pstmt1.executeUpdate();

                // Simulate an error
                // int x = 1 / 0;

                // Add to account 2
                pstmt2.setDouble(1, 100.00);
                pstmt2.setInt(2, 2);
                pstmt2.executeUpdate();

                conn.commit(); // Commit transaction if all successful
                System.out.println("Transaction committed successfully.");

            } catch (SQLException e) {
                conn.rollback(); // Rollback on error
                System.err.println("Transaction rolled back: " + e.getMessage());
            } catch (Exception e) {
                conn.rollback(); // Rollback on other errors
                System.err.println("An unexpected error occurred, transaction rolled back: " + e.getMessage());
            }

        } catch (SQLException e) {
            System.err.println("Database connection failed: " + e.getMessage());
        }
    }
}
```

### Savepoints

Allow you to set a point within a transaction to which you can roll back without rolling back the entire transaction.

## 7. Connection Pooling

### Why Connection Pooling?

Establishing a database connection is an expensive and time-consuming operation. Connection pooling manages a pool of open database connections that can be reused by applications, significantly improving performance and scalability.

### Basic Concept

Instead of creating a new connection for each request, applications request a connection from the pool. After use, the connection is returned to the pool for reuse. Popular Java connection pooling libraries include:

*   **HikariCP:** Known for its high performance and small footprint.
*   **c3p0:** A robust and feature-rich connection pool.
*   **Apache DBCP:** Another widely used connection pool.

## 8. Metadata

JDBC allows you to retrieve metadata (information about the database or `ResultSet`).

### `DatabaseMetaData`

Provides information about the database as a whole (e.g., database product name, version, tables, columns, stored procedures).

```java
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;

public class MetadataExample {
    public static void main(String[] args) {
        try (Connection conn = DbConnection.getConnection()) {
            DatabaseMetaData dbmd = conn.getMetaData();
            System.out.println("Database Product Name: " + dbmd.getDatabaseProductName());
            System.out.println("Database Product Version: " + dbmd.getDatabaseProductVersion());

            ResultSet tables = dbmd.getTables(null, null, "%", new String[]{"TABLE"});
            while (tables.next()) {
                System.out.println("Table: " + tables.getString("TABLE_NAME"));
            }
            tables.close();

        } catch (SQLException e) {
            System.err.println("SQL Error: " + e.getMessage());
        }
    }
}
```

### `ResultSetMetaData`

Provides information about the columns in a `ResultSet` (e.g., column count, column names, types).

```java
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;

public class ResultSetMetadataExample {
    public static void main(String[] args) {
        try (Connection conn = DbConnection.getConnection();
             PreparedStatement pstmt = conn.prepareStatement("SELECT id, name, email FROM users");
             ResultSet rs = pstmt.executeQuery()) {

            ResultSetMetaData rsmd = rs.getMetaData();
            int columnCount = rsmd.getColumnCount();

            for (int i = 1; i <= columnCount; i++) {
                System.out.print(rsmd.getColumnName(i) + "\t");
            }
            System.out.println();

            while (rs.next()) {
                for (int i = 1; i <= columnCount; i++) {
                    System.out.print(rs.getString(i) + "\t");
                }
                System.out.println();
            }

        } catch (SQLException e) {
            System.err.println("SQL Error: " + e.getMessage());
        }
    }
}
```

## 9. Error Handling in JDBC

### `SQLException`

All JDBC errors are reported via `SQLException`. It provides information about the database error, including a SQL state string and a vendor-specific error code.

### Closing Resources (`try-with-resources`)

Always ensure that JDBC resources (`Connection`, `Statement`, `ResultSet`) are closed to prevent resource leaks. The `try-with-resources` statement (Java 7+) is the safest and most convenient way to do this.

## 10. Example: CRUD Operations with JDBC

This example assumes a `users` table with `id (INT PRIMARY KEY AUTO_INCREMENT)`, `name (VARCHAR(255))`, `email (VARCHAR(255))`.

```java
import java.sql.*;

public class JdbcCrudExample {

    private static final String DB_URL = "jdbc:mysql://localhost:3306/mydatabase";
    private static final String USER = "root";
    private static final String PASS = "password";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(DB_URL, USER, PASS);
    }

    public static void createTable() {
        String sql = "CREATE TABLE IF NOT EXISTS users (" +
                     "id INT AUTO_INCREMENT PRIMARY KEY,"
                     "name VARCHAR(255) NOT NULL,"
                     "email VARCHAR(255) UNIQUE NOT NULL)";
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement()) {
            stmt.executeUpdate(sql);
            System.out.println("Table 'users' created or already exists.");
        } catch (SQLException e) {
            System.err.println("Error creating table: " + e.getMessage());
        }
    }

    public static void insertUser(String name, String email) {
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {
            pstmt.setString(1, name);
            pstmt.setString(2, email);
            int rowsAffected = pstmt.executeUpdate();
            if (rowsAffected > 0) {
                try (ResultSet rs = pstmt.getGeneratedKeys()) {
                    if (rs.next()) {
                        System.out.println("User inserted with ID: " + rs.getInt(1));
                    }
                }
            }
        } catch (SQLException e) {
            System.err.println("Error inserting user: " + e.getMessage());
        }
    }

    public static void selectUsers() {
        String sql = "SELECT id, name, email FROM users";
        try (Connection conn = getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            System.out.println("\n--- All Users ---");
            while (rs.next()) {
                System.out.println("ID: " + rs.getInt("id") +
                                   ", Name: " + rs.getString("name") +
                                   ", Email: " + rs.getString("email"));
            }
        } catch (SQLException e) {
            System.err.println("Error selecting users: " + e.getMessage());
        }
    }

    public static void updateUserEmail(int id, String newEmail) {
        String sql = "UPDATE users SET email = ? WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setString(1, newEmail);
            pstmt.setInt(2, id);
            int rowsAffected = pstmt.executeUpdate();
            System.out.println(rowsAffected + " row(s) updated for user ID " + id);
        } catch (SQLException e) {
            System.err.println("Error updating user: " + e.getMessage());
        }
    }

    public static void deleteUser(int id) {
        String sql = "DELETE FROM users WHERE id = ?";
        try (Connection conn = getConnection();
             PreparedStatement pstmt = conn.prepareStatement(sql)) {
            pstmt.setInt(1, id);
            int rowsAffected = pstmt.executeUpdate();
            System.out.println(rowsAffected + " row(s) deleted for user ID " + id);
        } catch (SQLException e) {
            System.err.println("Error deleting user: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        createTable();
        insertUser("John Doe", "john@example.com");
        insertUser("Jane Smith", "jane@example.com");
        selectUsers();
        updateUserEmail(1, "john.new@example.com");
        selectUsers();
        deleteUser(2);
        selectUsers();
    }
}
```