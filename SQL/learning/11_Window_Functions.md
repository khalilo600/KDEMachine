
# 11. Window Functions

A window function performs a calculation across a set of table rows that are somehow related to the current row. This is comparable to the type of calculation that can be done with an aggregate function. However, window functions do not cause rows to become grouped into a single output row like aggregate functions do.

## The `OVER()` Clause

The `OVER()` clause is what distinguishes window functions from other analytical and aggregate functions. The `OVER()` clause determines the set of rows the window function is applied to.

## Common Window Functions

*   `ROW_NUMBER()`: Assigns a unique number to each row.
*   `RANK()`: Assigns a rank to each row based on a specified value.
*   `DENSE_RANK()`: Similar to `RANK()`, but assigns consecutive ranks.
*   `LEAD()`: Accesses data from a subsequent row.
*   `LAG()`: Accesses data from a previous row.
*   `NTILE(n)`: Divides rows into `n` groups and assigns a group number to each row.

## Examples

### `ROW_NUMBER()`

To assign a unique number to each employee based on their salary:

```sql
SELECT
    employee_id,
    first_name,
    last_name,
    salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) as salary_rank
FROM
    employees;
```

### `RANK()` and `DENSE_RANK()`

To rank employees by salary within each department:

```sql
SELECT
    employee_id,
    first_name,
    last_name,
    salary,
    department_id,
    RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as dept_rank,
    DENSE_RANK() OVER (PARTITION BY department_id ORDER BY salary DESC) as dept_dense_rank
FROM
    employees;
```

### `LEAD()` and `LAG()`

To compare the salary of an employee to the next and previous employee:

```sql
SELECT
    employee_id,
    first_name,
    last_name,
    salary,
    LEAD(salary, 1) OVER (ORDER BY salary DESC) as next_highest_salary,
    LAG(salary, 1) OVER (ORDER BY salary DESC) as previous_highest_salary
FROM
    employees;
```

### `NTILE()`

To divide employees into 4 quartiles based on their salary:

```sql
SELECT
    employee_id,
    first_name,
    last_name,
    salary,
    NTILE(4) OVER (ORDER BY salary DESC) as salary_quartile
FROM
    employees;
```
