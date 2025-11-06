# Pytest Guide: Comprehensive Learning Outline

This guide provides a structured overview of Pytest, a popular and powerful testing framework for Python. It covers core concepts, basic assertions, fixtures for setup/teardown, parameterized testing, markers, mocking, asynchronous testing, advanced features, and best practices for writing effective and maintainable tests.

---

## I. Getting Started and Core Concepts

### A. What is Pytest?

Pytest is a mature, full-featured Python testing framework that helps you write simple, scalable, and readable tests. It's known for its minimal boilerplate, powerful fixtures, and extensive plugin ecosystem.

*   **Minimal Boilerplate:** Write tests as simple functions.
*   **Extensible:** Rich plugin architecture.
*   **Readable:** Clear and concise test syntax.

### B. Why Use Pytest?

*   **Simplicity:** Easy to get started with, especially for small projects.
*   **Powerful Fixtures:** Provides a robust mechanism for managing test setup and teardown.
*   **Rich Assertions:** Uses standard Python `assert` statements, making tests more readable.
*   **Extensive Plugin Ecosystem:** Many plugins for mocking, coverage, reporting, and more.
*   **Automatic Test Discovery:** Automatically finds tests based on naming conventions.
*   **Detailed Reporting:** Provides clear and informative test reports.

### C. Installation and Setup

1.  **Create a Virtual Environment:** Recommended to isolate project dependencies.

    ```bash
    python3 -m venv venv
    source venv/bin/activate # On macOS/Linux
    # venv\Scripts\activate   # On Windows
    ```

2.  **Install Pytest:**

    ```bash
    pip install pytest
    ```

### D. Basic Test Structure (Test Functions, Assertions)

*   **Test Functions:** Functions whose names start with `test_`.
*   **Assertions:** Use the standard Python `assert` statement.

    ```python
    # calculator.py
    def add(a, b):
        return a + b

    def subtract(a, b):
        return a - b

    # test_calculator.py
    from calculator import add, subtract

    def test_add():
        assert add(1, 2) == 3
        assert add(0, 0) == 0
        assert add(-1, 1) == 0

    def test_subtract():
        assert subtract(5, 2) == 3
        assert subtract(10, 5) == 5
        assert subtract(0, 0) == 0
    ```

### E. Running Tests (`pytest` CLI)

```bash
pytest # Runs all tests in the current directory and subdirectories
pytest test_calculator.py # Run tests in a specific file
pytest -k "add" # Run tests whose names contain "add"
pytest -v # Verbose output
pytest -s # Show print statements during tests
```

---

## II. Assertions and Fixtures

### A. Basic Assertions (`assert`)

Pytest uses the standard Python `assert` statement, which is automatically rewritten to provide detailed failure information.

```python
def test_list_contains_element():
    my_list = [1, 2, 3, 4, 5]
    assert 3 in my_list
    assert 6 not in my_list

def test_dictionary_values():
    my_dict = {"a": 1, "b": 2}
    assert my_dict["a"] == 1
    assert "c" not in my_dict
```

### B. Asserting Exceptions (`pytest.raises`)

Use `pytest.raises` to assert that a specific exception is raised.

```python
import pytest

def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

def test_divide_by_zero():
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)
```

### C. Fixtures (Setup and Teardown)

Fixtures are functions that Pytest runs before (and sometimes after) your test functions. They are used to set up a test environment and clean it up.

```python
import pytest

@pytest.fixture
def setup_database():
    print("\nSetting up database...")
    db_connection = "mock_db_connection"
    yield db_connection # Code before yield is setup, after is teardown
    print("\nClosing database connection.")

def test_data_retrieval(setup_database):
    conn = setup_database
    print(f"Using connection: {conn}")
    assert conn == "mock_db_connection"

def test_data_insertion(setup_database):
    conn = setup_database
    print(f"Using connection: {conn}")
    assert conn == "mock_db_connection"
```

*   **Module-scoped:** Runs once per module.
*   **Function-scoped (default):** Runs once per test function.
*   **Class-scoped:** Runs once per test class.
*   **Session-scoped:** Runs once per test session.

*   **`conftest.py`:** A special file where you can define fixtures that are automatically discovered and shared across multiple test files.

### D. Parameterized Testing (`pytest.mark.parametrize`)

Run the same test function multiple times with different sets of arguments.

```python
import pytest

@pytest.mark.parametrize("input_a, input_b, expected_sum", [
    (1, 2, 3),
    (0, 0, 0),
    (-1, 1, 0),
    (10, -5, 5),
])
def test_add_multiple_cases(input_a, input_b, expected_sum):
    from calculator import add
    assert add(input_a, input_b) == expected_sum
```

---

## III. Markers and Plugins

### A. Custom Markers (`pytest.mark.skip`, `pytest.mark.xfail`)

*   **`pytest.mark.skip`:** Skips a test function.
*   **`pytest.mark.skipif(condition, reason)`:** Skips a test if a condition is true.
*   **`pytest.mark.xfail(reason)`:** Marks a test as expected to fail.

    ```python
    import pytest

    @pytest.mark.skip(reason="This test is currently broken")
    def test_broken_feature():
        assert False

    @pytest.mark.xfail(reason="Known bug #123")
    def test_known_bug():
        assert 1 == 2 # This test will fail, but won't mark the suite as failed
    ```

### B. Built-in Plugins (e.g., `pytest-html`, `pytest-cov`)

Pytest has a rich plugin ecosystem.

*   **`pytest-html`:** Generates HTML reports for test results.
*   **`pytest-cov`:** Integrates `coverage.py` to measure code coverage.

    ```bash
    pip install pytest-html pytest-cov
    pytest --html=report.html --self-contained-html --cov=calculator --cov-report=term-missing
    ```

### C. Writing Custom Plugins

You can write your own Pytest plugins to extend its functionality.

---

## IV. Mocking

Mocking is used to replace parts of your system under test with mock objects that simulate the behavior of real objects.

### A. `unittest.mock` (Built-in Python)

Python's standard library includes the `unittest.mock` module, which can be used with Pytest.

```python
from unittest.mock import Mock

def fetch_user_data(api_client):
    response = api_client.get("/users/1")
    return response.json()

def test_fetch_user_data():
    mock_api_client = Mock()
    mock_api_client.get.return_value.json.return_value = {"id": 1, "name": "Alice"}

    data = fetch_user_data(mock_api_client)
    assert data["name"] == "Alice"
    mock_api_client.get.assert_called_once_with("/users/1")
```

### B. `pytest-mock` Plugin (`mocker` fixture)

The `pytest-mock` plugin provides a convenient `mocker` fixture that wraps `unittest.mock`.

```bash
pip install pytest-mock
```

```python
import pytest

def get_user_from_db(db_client):
    return db_client.fetch_user(1)

def test_get_user_from_db(mocker):
    mock_db_client = mocker.Mock()
    mock_db_client.fetch_user.return_value = {"id": 1, "name": "Bob"}

    user = get_user_from_db(mock_db_client)
    assert user["name"] == "Bob"
    mock_db_client.fetch_user.assert_called_once_with(1)
```

*   **`mocker.patch()`:** Replaces an object with a mock.
*   **`mocker.spy()`:** Wraps a function or method, allowing you to inspect its calls without changing its behavior.
*   **`mocker.stub()`:** Creates a simple mock object.

---

## V. Asynchronous Testing

### A. `pytest-asyncio` Plugin

For testing asynchronous code (functions defined with `async def`).

```bash
pip install pytest-asyncio
```

```python
import pytest
import asyncio

async def async_add(a, b):
    await asyncio.sleep(0.01) # Simulate async operation
    return a + b

@pytest.mark.asyncio
async def test_async_add():
    result = await async_add(1, 2)
    assert result == 3
```

### B. Testing `async def` functions

(See example in Section V.A)

---

## VI. Advanced Features

### A. Test Discovery

Pytest automatically discovers tests in files named `test_*.py` or `*_test.py`, and functions/methods named `test_*`.

### B. Skipping Tests (`pytest.mark.skip`, `pytest.mark.skipif`)

(See Section III.A)

### C. XFAIL (`pytest.mark.xfail`)

(See Section III.A)

### D. Customizing Test Collection

You can customize how Pytest discovers tests using `pytest_collect_file` hooks in `conftest.py`.

### E. Test Reporting

Pytest provides detailed console output. Plugins like `pytest-html` can generate rich reports.

---

## VII. Best Practices and Tools

### A. Test Organization

*   Place test files in a `tests/` directory at the root of your project.
*   Use `test_*.py` or `*_test.py` naming conventions.
*   Group related tests into classes or `describe` blocks.

### B. Clear Test Names

Test names should be descriptive and indicate what is being tested.

### C. Integration with CI/CD

Integrate Pytest into your Continuous Integration/Continuous Deployment pipelines to ensure code quality.

### D. Code Coverage (`pytest-cov`)

Use `pytest-cov` to measure and report on code coverage, ensuring your tests cover a significant portion of your codebase.

```