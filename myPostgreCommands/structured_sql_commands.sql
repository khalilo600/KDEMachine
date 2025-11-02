
-- =============================================================================
-- SQL Keys Explained
-- Keys are crucial for establishing relationships between tables, ensuring data
-- integrity, and uniquely identifying records within a database.
-- =============================================================================

-- 1. Primary Key (PK)
--    Purpose: Uniquely identifies each record (row) in a table.
--    Characteristics:
--      - Must contain unique values for each row.
--      - Cannot contain NULL values (enforces NOT NULL constraint).
--      - A table can have only one primary key.
--    Example: `customer_id` in the `customers` table.

-- 2. Foreign Key (FK)
--    Purpose: Establishes a link between two tables, enforcing referential integrity.
--             It refers to the primary key of another table (the parent table).
--    Characteristics:
--      - Can contain duplicate values.
--      - Can contain NULL values (unless a NOT NULL constraint is also applied).
--      - Ensures that a value in the foreign key column of the referencing table
--        exists in the primary key column of the referenced table.
--    Example: `customer_id` in the `shipments` table, which references
--             `customer_id` in the `customers` table.

-- 3. Candidate Key
--    Purpose: A set of one or more columns that can uniquely identify a record
--             in a table without containing any unnecessary columns (minimal superkey).
--    Characteristics:
--      - Must contain unique values.
--      - Cannot contain NULL values.
--      - A table can have multiple candidate keys, and one of them is chosen
--        as the primary key.
--    Example: In a `students` table, both `user_id` and `email` (if unique and not null)
--             could be candidate keys.

-- 4. Super Key
--    Purpose: A set of one or more columns that, taken collectively, can uniquely
--             identify a record in a table.
--    Characteristics:
--      - A super key can contain redundant attributes.
--      - Every candidate key is a super key, but not every super key is a candidate key.
--    Example: In a `students` table, `(user_id, first_name)` would be a super key
--             if `user_id` alone is unique.

-- 5. Unique Key
--    Purpose: Uniquely identifies each record in a table, similar to a primary key,
--             but with some differences.
--    Characteristics:
--      - Must contain unique values.
--      - Can contain one NULL value (unlike a primary key).
--      - A table can have multiple unique keys.
--    Example: `email` in the `customers` table (if defined as `UNIQUE`).

-- 6. Composite Key
--    Purpose: A primary key that consists of two or more columns whose values,
--             when combined, uniquely identify each record in a table.
--    Characteristics:
--      - Used when a single column is not sufficient to uniquely identify a record.
--    Example: In a table tracking `enrollments` for `students` in `courses`,
--
-- =============================================================================
-- SQL JOINs Explained
-- JOIN clauses are used to combine rows from two or more tables based on a
-- related column between them. Different types of JOINs retrieve different
-- subsets of data based on matching conditions.
-- =============================================================================

-- 1. INNER JOIN (or simply JOIN)
--    Purpose: Returns only the rows that have matching values in both tables.
--    Example: Retrieve shipments along with the customer details for matching customer IDs.
SELECT
    s.shipment_id,
    c.first_name,
    c.last_name,
    s.shipment_date
FROM
    shipments s
INNER JOIN
    customers c ON s.customer_id = c.customer_id
LIMIT 10;

-- 2. LEFT JOIN (or LEFT OUTER JOIN)
--    Purpose: Returns all rows from the left table, and the matching rows from the right table.
--             If there is no match, NULL is returned for columns from the right table.
--    Example: Retrieve all customers and any shipments they might have. Customers without
--             shipments will still appear with NULLs for shipment details.
SELECT
    c.first_name,
    c.last_name,
    s.shipment_id,
    s.status
FROM
    customers c
LEFT JOIN
    shipments s ON c.customer_id = s.customer_id
LIMIT 15;

-- 3. RIGHT JOIN (or RIGHT OUTER JOIN)
--    Purpose: Returns all rows from the right table, and the matching rows from the left table.
--             If there is no match, NULL is returned for columns from the left table.
--    Example: Retrieve all shippers and any shipments they have handled. Shippers without
--             shipments will still appear with NULLs for shipment details.
SELECT
    sh.company_name,
    s.shipment_id,
    s.shipment_date
FROM
    shipments s
RIGHT JOIN
    shippers sh ON s.shipper_id = sh.shipper_id
LIMIT 15;

-- 4. FULL JOIN (or FULL OUTER JOIN)
--    Purpose: Returns all rows when there is a match in either the left or the right table.
--             If there is no match, NULL is returned for columns from the non-matching side.
--    Example: Retrieve all customers and all shipments, showing matches where they exist,
--             and NULLs where there are no matches on either side.
--             (Note: PostgreSQL requires a specific syntax for FULL JOIN)
SELECT
    c.first_name,
    c.last_name,
    s.shipment_id,
    s.status
FROM
    customers c
FULL OUTER JOIN
    shipments s ON c.customer_id = s.customer_id
LIMIT 20;

-- 5. CROSS JOIN
--    Purpose: Returns the Cartesian product of the two tables, meaning it combines
--             each row from the first table with every row from the second table.
--             It does not require a join condition.
--    Example: Combine every shipper with every service rate. This can result in a very large result set.
SELECT
    sh.company_name,
    sr.service_name,
    sr.rate_per_kg
FROM
    shippers sh
CROSS JOIN
    service_rates sr
LIMIT 10;

-- =============================================================================
-- Data Manipulation Language (DML) - Update and Delete Examples
