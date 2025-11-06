# PHPUnit Guide: Comprehensive Learning Outline

This guide provides a structured overview of PHPUnit, the most popular unit testing framework for PHP. It covers core concepts, various assertion methods, setup and teardown procedures, test organization, data providers, mocking, advanced features like code coverage, and best practices for writing effective and maintainable tests.

---

## I. Getting Started and Core Concepts

### A. What is PHPUnit?

PHPUnit is an open-source unit testing framework for PHP. It is part of the xUnit family of testing frameworks and is widely used by PHP developers to write and run repeatable tests.

*   **Unit Testing:** Testing individual units (methods, classes) of source code in isolation.
*   **Open-Source:** Free to use and widely adopted.
*   **Framework:** Provides annotations, assertions, and a test runner.

### B. Why Use PHPUnit?

*   **Improved Code Quality:** Helps identify and fix bugs early in the development cycle.
*   **Regression Prevention:** Ensures that new code changes don't break existing functionality.
*   **Facilitates Refactoring:** Provides confidence when making changes to the codebase.
*   **Documentation:** Tests serve as living documentation for the code.
*   **Test-Driven Development (TDD):** Essential for TDD methodology.
*   **Integration with Build Tools:** Seamlessly integrates with Composer and IDEs.

### C. Installation and Setup (Composer)

PHPUnit is typically installed as a development dependency using Composer.

1.  **Initialize Project:**

    ```bash
    mkdir my-php-project
    cd my-php-project
    composer init -n # -n for non-interactive
    ```

2.  **Install PHPUnit:**

    ```bash
    composer require --dev phpunit/phpunit
    ```

3.  **Create `phpunit.xml` (Optional but Recommended):** Configuration file for PHPUnit.

    ```xml
    <!-- phpunit.xml -->
    <?xml version="1.0" encoding="UTF-8"?>
    <phpunit xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
             xsi:noNamespaceSchemaLocation="https://schema.phpunit.de/10.4/phpunit.xsd"
             bootstrap="vendor/autoload.php"
             colors="true"
             cacheDirectory=".phpunit.cache"
             displayDetailsOnIncomplete="true"
             displayDetailsOnSkipped="true"
             displayDetailsOnTestsThatTriggerWarnings="true"
             failOnRisky="true"
             failOnWarning="true">
        <testsuites>
            <testsuite name="Application">
                <directory>tests</directory>
            </testsuite>
        </testsuites>

        <source>
            <include>
                <directory>src</directory>
            </include>
        </source>
    </phpunit>
    ```

### D. Basic Test Structure (Test Class, Test Method, Assertions)

*   **Test Class:** A class that extends `PHPUnit\Framework\TestCase`. Often named `*Test`.
*   **Test Method:** A public method whose name starts with `test`.
*   **Assertions:** Methods from `PHPUnit\Framework\Assert` to verify expected outcomes.

    ```php
    // src/Calculator.php
    <?php
    namespace App;

    class Calculator
    {
        public function add(int $a, int $b): int
        {
            return $a + $b;
        }

        public function subtract(int $a, int $b): int
        {
            return $a - $b;
        }
    }

    // tests/CalculatorTest.php
    <?php
    namespace Tests;

    use App\Calculator;
    use PHPUnit\Framework\TestCase;

    class CalculatorTest extends TestCase
    {
        public function testAdd(): void
        {
            $calculator = new Calculator();
            $this->assertEquals(5, $calculator->add(2, 3));
        }

        public function testSubtract(): void
        {
            $calculator = new Calculator();
            $this->assertTrue($calculator->subtract(5, 2) === 3);
        }
    }
    ```

### E. Running Tests (`phpunit` CLI)

```bash
# From project root
vendor/bin/phpunit

# Run tests in a specific file
vendor/bin/phpunit tests/CalculatorTest.php

# Run a specific test method
vendor/bin/phpunit tests/CalculatorTest.php --filter testAdd
```

---

## II. Assertions

Assertions are methods used to verify that the actual result of a test matches the expected result.

### A. Equality (`assertEquals`, `assertNotEquals`, `assertSame`, `assertNotSame`)

*   `assertEquals(expected, actual, [message])`: Asserts that two values are equal (loose comparison).
*   `assertNotEquals(unexpected, actual, [message])`: Asserts that two values are not equal.
*   `assertSame(expected, actual, [message])`: Asserts that two variables refer to the same object (strict comparison).
*   `assertNotSame(unexpected, actual, [message])`: Asserts that two variables do not refer to the same object.

    ```php
    $this->assertEquals(10, $calculator->add(5, 5));
    $this->assertNotEquals(0, $calculator->add(1, 1));

    $obj1 = new \stdClass();
    $obj2 = $obj1;
    $obj3 = new \stdClass();
    $this->assertSame($obj1, $obj2);
    $this->assertNotSame($obj1, $obj3);
    ```

### B. Truthiness (`assertTrue`, `assertFalse`, `assertNull`, `assertNotNull`)

*   `assertTrue(condition, [message])`: Asserts that a condition is true.
*   `assertFalse(condition, [message])`: Asserts that a condition is false.
*   `assertNull(variable, [message])`: Asserts that a variable is null.
*   `assertNotNull(variable, [message])`: Asserts that a variable is not null.

    ```php
    $this->assertTrue($calculator->isEven(4));
    $this->assertFalse($calculator->isEven(5));
    $this->assertNull($variableThatIsNull);
    $this->assertNotNull($variableThatIsNotNull);
    ```

### C. Comparisons (`assertGreaterThan`, `assertLessThan`, etc.)

*   `assertGreaterThan(expected, actual)`
*   `assertGreaterThanOrEqual(expected, actual)`
*   `assertLessThan(expected, actual)`
*   `assertLessThanOrEqual(expected, actual)`

    ```php
    $this->assertGreaterThan(5, 10);
    $this->assertLessThan(10, 5);
    ```

### D. Strings (`assertStringContainsString`, `assertStringStartsNotWith`)

*   `assertStringContainsString(needle, haystack)`
*   `assertStringNotContainsString(needle, haystack)`
*   `assertStringStartsWith(prefix, string)`
*   `assertStringEndsWith(suffix, string)`
*   `assertMatchesRegularExpression(pattern, string)`

    ```php
    $this->assertStringContainsString("world", "hello world");
    $this->assertStringStartsWith("hello", "hello world");
    ```

### E. Arrays (`assertContains`, `assertCount`, `assertArrayHasKey`)

*   `assertContains(needle, haystack)`: Asserts that an array contains a specific element.
*   `assertNotContains(needle, haystack)`
*   `assertCount(expectedCount, array)`: Asserts the number of elements in an array.
*   `assertArrayHasKey(key, array)`: Asserts that an array has a specific key.

    ```php
    $this->assertContains("apple", ["apple", "banana"]);
    $this->assertCount(2, ["apple", "banana"]);
    $this->assertArrayHasKey("name", ["name" => "Alice"]);
    ```

### F. Exceptions (`expectException`)

Asserts that a specific exception is thrown.

```php
use PHPUnit\Framework\TestCase;

class ExceptionTest extends TestCase
{
    public function testDivideByZeroThrowsException(): void
    {
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('Cannot divide by zero');
        $this->divide(10, 0);
    }

    private function divide(int $a, int $b): int
    {
        if ($b === 0) {
            throw new \InvalidArgumentException('Cannot divide by zero');
        }
        return $a / $b;
    }
}
```

### G. Types (`assertInstanceOf`, `assertIsArray`)

*   `assertInstanceOf(expectedClass, actualObject)`
*   `assertNotInstanceOf(unexpectedClass, actualObject)`
*   `assertIsArray(variable)`
*   `assertIsString(variable)`
*   `assertIsInt(variable)`
*   `assertIsBool(variable)`

    ```php
    $this->assertInstanceOf("\App\User"::class, $userObject);
    $this->assertIsArray($data);
    ```

---

## III. Setup and Teardown

PHPUnit provides methods to run code before and after tests.

### A. `setUp()`, `tearDown()`

*   **`setUp()`:** Runs before each test method.
*   **`tearDown()`:** Runs after each test method.

    ```php
    use PHPUnit\Framework\TestCase;

    class MyTestClass extends TestCase
    {
        protected $calculator;

        protected function setUp(): void
        {
            $this->calculator = new Calculator();
            echo "\nSetting up for test.";
        }

        protected function tearDown(): void
        {
            $this->calculator = null;
            echo "\nTearing down after test.";
        }

        public function testAdd(): void
        {
            $this->assertEquals(5, $this->calculator->add(2, 3));
        }
    }
    ```

### B. `setUpBeforeClass()`, `tearDownAfterClass()`

*   **`setUpBeforeClass()`:** Runs once before all test methods in the class. Must be a static method.
*   **`tearDownAfterClass()`:** Runs once after all test methods in the class. Must be a static method.

    ```php
    use PHPUnit\Framework\TestCase;

    class DatabaseTest extends TestCase
    {
        protected static $dbConnection;

        public static function setUpBeforeClass(): void
        {
            echo "\nConnecting to database once for all tests.";
            // Establish database connection
            self::$dbConnection = "mock_db_connection";
        }

        public static function tearDownAfterClass(): void
        {
            echo "\nDisconnecting from database after all tests.";
            // Close database connection
            self::$dbConnection = null;
        }

        public function testQuery1(): void
        {
            $this->assertNotNull(self::$dbConnection);
        }
    }
    ```

### C. `@before`, `@after`, `@beforeClass`, `@afterClass` (Annotations)

These annotations are deprecated in PHPUnit 9+ in favor of the method names.

---

## IV. Test Organization and Execution

### A. Test Suites (`phpunit.xml`)

You can define test suites in `phpunit.xml` to group tests and run them together.

(See `phpunit.xml` example in Section I.C)

### B. Test Doubles (Mocks, Stubs, Spies)

*   **Mocks:** Objects that record calls made to them, allowing you to verify interactions.
*   **Stubs:** Objects that provide canned answers to method calls.
*   **Spies:** Partial mocks that call the real method unless explicitly stubbed.

### C. Data Providers (`@dataProvider`)

Run the same test method multiple times with different sets of arguments.

```php
use PHPUnit\Framework\TestCase;

class DataProviderTest extends TestCase
{
    /**
     * @dataProvider additionProvider
     */
    public function testAdd(int $a, int $b, int $expected): void
    {
        $calculator = new Calculator();
        $this->assertEquals($expected, $calculator->add($a, $b));
    }

    public static function additionProvider(): array
    {
        return [
            [0, 0, 0],
            [1, 1, 2],
            [1, 2, 3],
            [10, 5, 15],
            [-1, -1, -2],
        ];
    }
}
```

### D. Skipping Tests (`@markTestSkipped`, `markTestIncomplete`)

*   `@markTestSkipped`: Skips a test method.
*   `markTestIncomplete()`: Marks a test as incomplete.

    ```php
    use PHPUnit\Framework\TestCase;

    class SkipTest extends TestCase
    {
        public function testSomething(): void
        {
            $this->markTestSkipped('This test is not yet implemented.');
        }
    }
    ```

### E. Expected Exceptions (`@expectedException` - deprecated, use `expectException`)

(See `expectException` example in Section II.F)

---

## V. Mocking (Built-in PHPUnit Mock Objects)

PHPUnit has built-in support for creating test doubles.

### A. Creating Mocks (`createMock()`)

```php
use PHPUnit\Framework\TestCase;

interface UserRepository {
    public function findById(int $id): ?User;
}

class UserService {
    private $userRepository;

    public function __construct(UserRepository $userRepository) {
        $this->userRepository = $userRepository;
    }

    public function getUserName(int $id): string {
        $user = $this->userRepository->findById($id);
        return $user ? $user->getName() : "Unknown";
    }
}

class User {
    private $name;
    public function __construct(string $name) { $this->name = $name; }
    public function getName(): string { return $this->name; }
}

class UserServiceTest extends TestCase
{
    public function testGetUserNameReturnsCorrectName(): void
    {
        // Create a mock for UserRepository
        $userRepositoryMock = $this->createMock(UserRepository::class);

        // Configure the mock's behavior (stubbing)
        $userRepositoryMock->method('findById')
                           ->with(1)
                           ->willReturn(new User('Alice'));

        $userService = new UserService($userRepositoryMock);

        $this->assertEquals('Alice', $userService->getUserName(1));
    }

    public function testGetUserNameReturnsUnknownForNonExistentUser(): void
    {
        $userRepositoryMock = $this->createMock(UserRepository::class);
        $userRepositoryMock->method('findById')
                           ->with(2)
                           ->willReturn(null); // Return null for non-existent user

        $userService = new UserService($userRepositoryMock);

        $this->assertEquals('Unknown', $userService->getUserName(2));
    }
}
```

### B. Stubbing Methods (`method()->willReturn()`)

Define the behavior of mock methods when they are called.

### C. Verifying Interactions (`method()->once()`)

Check if methods on mock objects were called, and with what arguments.

```php
// In testGetUserNameReturnsCorrectName example, we could add:
// $userRepositoryMock->expects($this->once()) // Expect findById to be called once
//                    ->method('findById')
//                    ->with(1);
```

---

## VI. Advanced Features

### A. Code Coverage (`--coverage-html`, `--coverage-clover`)

Measures how much of your code is covered by tests. Requires Xdebug or PCOV PHP extensions.

```bash
vendor/bin/phpunit --coverage-html build/coverage # Generates HTML report
vendor/bin/phpunit --coverage-clover build/clover.xml # Generates Clover XML report
```

### B. Test Dependencies (`@depends`)

Specifies that one test method depends on the successful completion of another test method.

```php
class DependencyTest extends TestCase
{
    public function testEmpty(): array
    {
        $stack = [];
        $this->assertEmpty($stack);

        return $stack;
    }

    /**
     * @depends testEmpty
     */
    public function testPush(array $stack): array
    {
        array_push($stack, 'foo');
        $this->assertContains('foo', $stack);

        return $stack;
    }
}
```

### C. Test Groups (`@group`)

Group tests together for selective execution.

```php
use PHPUnit\Framework\TestCase;

class GroupTest extends TestCase
{
    /**
     * @group database
     */
    public function testDatabaseConnection(): void
    {
        // ...
    }

    /**
     * @group slow
     */
    public function testLongRunningProcess(): void
    {
        // ...
    }
}
// Run only tests in the 'database' group:
// vendor/bin/phpunit --group database
```

### D. Custom Assertions

You can create your own custom assertion methods by extending `PHPUnit\Framework\Assert`.

---

## VII. Best Practices and Tools

### A. Clear Test Names

Write descriptive test names that explain what the test is doing and what scenario it covers.

### B. Arrange-Act-Assert Pattern

Organize your tests into three distinct sections:
*   **Arrange:** Set up the test data and environment.
*   **Act:** Perform the action being tested.
*   **Assert:** Verify the outcome.

### C. Test Organization

*   Place test files in a `tests/` directory at the root of your project.
*   Mirror the directory structure of your source code (`src/`).
*   Group related tests into classes.

### D. Integration with CI/CD

Integrate PHPUnit into your Continuous Integration/Continuous Deployment pipelines to ensure code quality.

```