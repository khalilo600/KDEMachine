-- =============================================================================
-- Comprehensive PostgreSQL Tutorial Script
-- =============================================================================
-- This script provides a structured overview of SQL commands in PostgreSQL,
-- from basic schema creation to advanced database programming.
-- =============================================================================


-- =============================================================================
-- Section 1: Schema Definition
-- =============================================================================
-- All tables used throughout the examples are defined here.

-- Main tables for a simple e-commerce system
CREATE TABLE product_categories (
    category_id SERIAL PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE suppliers (
    supplier_id SERIAL PRIMARY KEY,
    supplier_name VARCHAR(150) NOT NULL,
    contact_email VARCHAR(150) UNIQUE,
    phone_number VARCHAR(25)
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(150) NOT NULL,
    category_id INT REFERENCES product_categories(category_id),
    supplier_id INT REFERENCES suppliers(supplier_id),
    unit_price NUMERIC(10, 2) CHECK (unit_price > 0),
    units_in_stock INT DEFAULT 0
);

-- Tables for demonstrating ON DELETE and other concepts
CREATE TABLE employees (
    employee_id SERIAL PRIMARY KEY,
    employee_name VARCHAR(100)
);

CREATE TABLE projects (
    project_id SERIAL PRIMARY KEY,
    project_name VARCHAR(100),
    -- If the lead employee is deleted, the project's lead is set to NULL
    lead_employee_id INT REFERENCES employees(employee_id) ON DELETE SET NULL,
    -- If the critical employee is deleted, the project is also deleted (hypothetical)
    critical_employee_id INT REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- Table for the Trigger example
CREATE TABLE product_audit (
    audit_id SERIAL PRIMARY KEY,
    product_id INT,
    old_unit_price NUMERIC(10, 2),
    new_unit_price NUMERIC(10, 2),
    change_timestamp TIMESTAMP WITH TIME ZONE DEFAULT now(),
    operation_type VARCHAR(10) NOT NULL
);


-- =============================================================================
-- Section 2: Data Insertion (DML - Data Manipulation Language)
-- =============================================================================

INSERT INTO product_categories (category_name, description) VALUES
('Electronics', 'Gadgets and electronic devices'),
('Books', 'Printed and electronic books'),
('Clothing', 'Apparel and accessories'),
('Home Goods', 'Items for household use');

INSERT INTO suppliers (supplier_name, contact_email, phone_number) VALUES
('Tech Supplies Inc.', 'contact@techsupplies.com', '123-456-7890'),
('Global Books Ltd.', 'support@globalbooks.com', '987-654-3210'),
('Fashion Forward', 'hello@fashionforward.com', '555-123-4567'),
('Home Essentials Co.', 'info@homeessentials.com', '555-987-6543');

INSERT INTO products (product_name, category_id, supplier_id, unit_price, units_in_stock) VALUES
('Laptop Pro', 1, 1, 1200.00, 50), ('The Great Gatsby', 2, 2, 15.00, 200),
('Classic T-Shirt', 3, 3, 25.00, 500), ('Coffee Maker', 4, 4, 75.00, 100),
('Smartphone X', 1, 1, 800.00, 150), ('A Tale of Two Cities', 2, 2, 12.00, 300),
('Jeans', 3, 3, 60.00, 400), ('Blender', 4, 4, 45.00, 120),
('Tablet', 1, 1, 500.00, 80), ('1984', 2, 2, 10.00, 250),
('Jacket', 3, 3, 120.00, 150), ('Toaster', 4, 4, 30.00, 200),
('Wireless Mouse', 1, 1, 35.00, 300), ('Pride and Prejudice', 2, 2, 14.00, 180),
('Sneakers', 3, 3, 90.00, 250), ('Microwave Oven', 4, 4, 150.00, 70);


-- =============================================================================
-- Section 3: Basic Queries and Column Operators
-- =============================================================================

-- 1. Arithmetic Operators (+, -, *, /)
-- Calculate the total value of the stock for each product.
SELECT
    product_name,
    unit_price * units_in_stock AS total_stock_value
FROM
    products
WHERE
    units_in_stock > 0;

-- 2. Comparison (>, =, <) and Logical (AND, OR) Operators
-- Find all electronic products that are either expensive (over 500) or have low stock (under 50).
SELECT
    product_name, unit_price, units_in_stock
FROM
    products
WHERE
    category_id = 1 AND (unit_price > 500 OR units_in_stock < 50);

-- 3. LIKE Operator (for pattern matching)
-- Find all products with 'Maker' in their name. The '%' is a wildcard.
SELECT product_name FROM products WHERE product_name LIKE '%Maker%';

-- 4. IN Operator (to specify multiple possible values)
-- Find all products that are in the 'Books' or 'Clothing' categories.
SELECT product_name, category_id FROM products WHERE category_id IN (2, 3);

-- 5. BETWEEN Operator (to select values within a given range)
-- Find products with a price between 50 and 100.
SELECT product_name, unit_price FROM products WHERE unit_price BETWEEN 50 AND 100;

-- 6. CASE Statement
-- Categorize products by price.
SELECT
    product_name, unit_price,
    CASE
        WHEN unit_price < 50 THEN 'Inexpensive'
        WHEN unit_price >= 50 AND unit_price < 200 THEN 'Moderate'
        ELSE 'Expensive'
    END as price_category
FROM products;


-- =============================================================================
-- Section 4: JOIN Operations
-- =============================================================================
-- JOINs are used for "data enrichment" - combining columns from multiple tables.

-- To illustrate different join outputs, let's add a temporary supplier who has no products.
INSERT INTO suppliers (supplier_name, contact_email, phone_number)
VALUES ('Niche Parts Co.', 'parts@niche.com', '555-555-5555');

-- 1. INNER JOIN (Matching Data)
-- Returns only rows where the join condition is met in both tables.
SELECT p.product_name, s.supplier_name FROM products p
INNER JOIN suppliers s ON p.supplier_id = s.supplier_id;

-- 2. LEFT JOIN (All from Left, Matching from Right)
-- Returns all rows from the left table (products), and matched rows from the right (suppliers).
SELECT p.product_name, s.supplier_name FROM products p
LEFT JOIN suppliers s ON p.supplier_id = s.supplier_id;

-- 3. RIGHT JOIN (All from Right, Matching from Left)
-- Returns all rows from the right table (suppliers). 'Niche Parts Co.' will appear with a NULL product_name.
SELECT p.product_name, s.supplier_name FROM products p
RIGHT JOIN suppliers s ON p.supplier_id = s.supplier_id;

-- 4. FULL OUTER JOIN (All Data from Both Tables)
-- Returns all rows from both tables, filling in NULLs for non-matches on either side.
SELECT p.product_name, s.supplier_name FROM products p
FULL OUTER JOIN suppliers s ON p.supplier_id = s.supplier_id;

-- 5. Finding ONLY Unmatched Data
-- Finds all suppliers who do not have any products.
SELECT s.supplier_name FROM suppliers s
LEFT JOIN products p ON s.supplier_id = p.supplier_id
WHERE p.product_id IS NULL;

-- 6. SELF JOIN
-- Find pairs of products that are in the same category.
SELECT
    p1.product_name AS product1, p2.product_name AS product2, pc.category_name
FROM
    products p1
JOIN products p2 ON p1.category_id = p2.category_id AND p1.product_id < p2.product_id
JOIN product_categories pc ON p1.category_id = pc.category_id;

-- 7. CROSS JOIN (Cartesian Product)
-- Combines every row from the first table with every row from the second.
SELECT pc.category_name, s.supplier_name FROM product_categories pc
CROSS JOIN suppliers s;

-- Clean up the temporary supplier
DELETE FROM suppliers WHERE supplier_name = 'Niche Parts Co.';


-- =============================================================================
-- Section 5: Aggregation and Set Operators
-- =============================================================================

-- 1. GROUP BY with Aggregation (COUNT, AVG, SUM)
-- Count products and find average price per category.
SELECT
    pc.category_name, COUNT(p.product_id) AS number_of_products, AVG(p.unit_price) AS average_price
FROM product_categories pc
LEFT JOIN products p ON pc.category_id = p.category_id
GROUP BY pc.category_name
ORDER BY number_of_products DESC;

-- 2. ROLLUP for Sub-totals and Grand-totals
-- Get the total stock for each category, with a grand total for all products.
SELECT
    pc.category_name, SUM(p.units_in_stock) AS total_stock
FROM products p
JOIN product_categories pc ON p.category_id = pc.category_id
GROUP BY ROLLUP(pc.category_name)
ORDER BY pc.category_name NULLS LAST;

-- 3. Set Operators (UNION, INTERSECT, EXCEPT)
-- These combine the results of two queries into a single result set.
CREATE TABLE set_a (id INT); CREATE TABLE set_b (id INT);
INSERT INTO set_a VALUES (1), (2), (3);
INSERT INTO set_b VALUES (2), (3), (4);

-- UNION: All unique rows from both sets.
SELECT * FROM set_a UNION SELECT * FROM set_b;

-- INTERSECT: Only rows that appear in both sets.
SELECT * FROM set_a INTERSECT SELECT * FROM set_b;

-- EXCEPT: Rows from the first set that are not in the second.
SELECT * FROM set_a EXCEPT SELECT * FROM set_b;

DROP TABLE set_a; DROP TABLE set_b;


-- =============================================================================
-- Section 6: Advanced Structures and Database Programming
-- =============================================================================

-- 1. Subqueries and Common Table Expressions (CTEs)
-- Find products with a price higher than the average.
SELECT product_name, unit_price FROM products
WHERE unit_price > (SELECT AVG(unit_price) FROM products);

-- Find the top 5 most expensive products using a CTE.
WITH TopProducts AS (
    SELECT product_name, unit_price, DENSE_RANK() OVER (ORDER BY unit_price DESC) as price_rank
    FROM products
)
SELECT product_name, unit_price FROM TopProducts WHERE price_rank <= 5;

-- 2. Stored Procedure
-- A reusable routine to perform an action. Here, we update product stock.
CREATE OR REPLACE PROCEDURE update_stock(p_product_id INT, p_quantity_change INT)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE products
    SET units_in_stock = units_in_stock + p_quantity_change
    WHERE product_id = p_product_id;
    COMMIT;
END;
$$;
-- How to call: CALL update_stock(1, -5);

-- 3. Trigger
-- A procedure that automatically runs when an event (INSERT, UPDATE, DELETE) occurs.
-- This trigger will log any changes to the product_audit table.

-- The trigger function
CREATE OR REPLACE FUNCTION log_product_changes()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    IF (TG_OP = 'UPDATE') THEN
        INSERT INTO product_audit(product_id, old_unit_price, new_unit_price, operation_type)
        VALUES(OLD.product_id, OLD.unit_price, NEW.unit_price, 'UPDATE');
        RETURN NEW;
    ELSIF (TG_OP = 'DELETE') THEN
        INSERT INTO product_audit(product_id, old_unit_price, new_unit_price, operation_type)
        VALUES(OLD.product_id, OLD.unit_price, NULL, 'DELETE');
        RETURN OLD;
    ELSIF (TG_OP = 'INSERT') THEN
        INSERT INTO product_audit(product_id, old_unit_price, new_unit_price, operation_type)
        VALUES(NEW.product_id, NULL, NEW.unit_price, 'INSERT');
        RETURN NEW;
    END IF;
END;
$$;

-- Attaching the trigger to the products table
CREATE TRIGGER products_audit_trigger
AFTER INSERT OR UPDATE OR DELETE ON products
FOR EACH ROW
EXECUTE FUNCTION log_product_changes();

-- This action would fire the trigger:
-- UPDATE products SET unit_price = 1250.00 WHERE product_id = 1;
