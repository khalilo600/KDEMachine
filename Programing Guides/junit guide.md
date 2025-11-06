# JUnit Guide: Comprehensive Learning Outline

This guide provides a structured overview of JUnit, the most popular unit testing framework for Java. It covers core concepts, various assertion methods, setup and teardown procedures, test organization, parameterized testing, mocking with Mockito, advanced features, and best practices for writing effective and maintainable tests.

---

## I. Getting Started and Core Concepts

### A. What is JUnit?

JUnit is an open-source unit testing framework for Java. It is part of the xUnit family of testing frameworks and is widely used by Java developers to write and run repeatable tests. JUnit 5 is the latest major version, designed for modern Java development.

*   **Unit Testing:** Testing individual units (methods, classes) of source code in isolation.
*   **Open-Source:** Free to use and widely adopted.
*   **Framework:** Provides annotations, assertions, and a test runner.

### B. Why Use JUnit?

*   **Improved Code Quality:** Helps identify and fix bugs early in the development cycle.
*   **Regression Prevention:** Ensures that new code changes don't break existing functionality.
*   **Facilitates Refactoring:** Provides confidence when making changes to the codebase.
*   **Documentation:** Tests serve as living documentation for the code.
*   **Test-Driven Development (TDD):** Essential for TDD methodology.
*   **Integration with Build Tools:** Seamlessly integrates with Maven, Gradle, and IDEs.

### C. Installation and Setup (Maven/Gradle)

JUnit is typically added as a dependency in your project's build file.

1.  **Maven (`pom.xml`):

    ```xml
    <dependencies>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-api</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.junit.jupiter</groupId>
            <artifactId>junit-jupiter-engine</artifactId>
            <version>5.10.0</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
    ```

2.  **Gradle (`build.gradle`):

    ```gradle
    dependencies {
        testImplementation 'org.junit.jupiter:junit-jupiter-api:5.10.0'
        testRuntimeOnly 'org.junit.jupiter:junit-jupiter-engine:5.10.0'
    }

    test {
        useJUnitPlatform()
    }
    ```

### D. Basic Test Structure (Test Class, Test Method, Assertions)

*   **Test Class:** A regular Java class, often named `*Test` (e.g., `CalculatorTest`).
*   **Test Method:** A public `void` method annotated with `@Test`.
*   **Assertions:** Methods from `org.junit.jupiter.api.Assertions` to verify expected outcomes.

    ```java
    // src/main/java/com/example/Calculator.java
    package com.example;

    public class Calculator {
        public int add(int a, int b) {
            return a + b;
        }

        public int subtract(int a, int b) {
            return a - b;
        }
    }

    // src/test/java/com/example/CalculatorTest.java
    package com.example;

    import org.junit.jupiter.api.Test;
    import static org.junit.jupiter.api.Assertions.assertEquals;
    import static org.junit.jupiter.api.Assertions.assertTrue;

    class CalculatorTest {

        @Test
        void testAdd() {
            Calculator calculator = new Calculator();
            assertEquals(5, calculator.add(2, 3), "2 + 3 should be 5");
        }

        @Test
        void testSubtract() {
            Calculator calculator = new Calculator();
            assertTrue(calculator.subtract(5, 2) == 3, "5 - 2 should be 3");
        }
    }
    ```

### E. Running Tests (IDE, Build Tools)

*   **IDE:** Most IDEs (IntelliJ IDEA, Eclipse) have built-in support to run JUnit tests.
*   **Maven:** `mvn test`
*   **Gradle:** `gradle test`

---

## II. Assertions

Assertions are methods used to verify that the actual result of a test matches the expected result.

### A. `assertEquals`, `assertNotEquals`

*   `assertEquals(expected, actual, [message])`: Asserts that two values are equal.
*   `assertNotEquals(unexpected, actual, [message])`: Asserts that two values are not equal.

    ```java
    assertEquals(10, calculator.add(5, 5));
    assertNotEquals(0, calculator.add(1, 1));
    ```

### B. `assertTrue`, `assertFalse`

*   `assertTrue(condition, [message])`: Asserts that a condition is true.
*   `assertFalse(condition, [message])`: Asserts that a condition is false.

    ```java
    assertTrue(calculator.isEven(4));
    assertFalse(calculator.isEven(5));
    ```

### C. `assertNull`, `assertNotNull`

*   `assertNull(object, [message])`: Asserts that an object is null.
*   `assertNotNull(object, [message])`: Asserts that an object is not null.

    ```java
    Object obj = null;
    assertNull(obj);
    assertNotNull(new Object());
    ```

### D. `assertSame`, `assertNotSame`

*   `assertSame(expected, actual, [message])`: Asserts that two object references refer to the same object.
*   `assertNotSame(unexpected, actual, [message])`: Asserts that two object references do not refer to the same object.

    ```java
    String s1 = new String("hello");
    String s2 = new String("hello");
    assertEquals(s1, s2); // True (values are equal)
    assertNotSame(s1, s2); // True (references are different objects)
    ```

### E. `assertArrayEquals`

*   `assertArrayEquals(expectedArray, actualArray, [message])`: Asserts that two object arrays are deeply equal.

    ```java
    int[] expected = {1, 2, 3};
    int[] actual = {1, 2, 3};
    assertArrayEquals(expected, actual);
    ```

### F. `assertThrows`

*   `assertThrows(expectedType, executable, [message])`: Asserts that executing the `executable` throws an exception of `expectedType`.

    ```java
    import static org.junit.jupiter.api.Assertions.assertThrows;

    void testDivideByZeroThrowsException() {
        Calculator calculator = new Calculator();
        assertThrows(ArithmeticException.class, () -> calculator.divide(10, 0));
    }
    ```

---

## III. Setup and Teardown

JUnit provides annotations to run code before and after tests.

### A. `@BeforeEach`, `@AfterEach`

*   **`@BeforeEach`:** Runs before each test method.
*   **`@AfterEach`:** Runs after each test method.

    ```java
    import org.junit.jupiter.api.AfterEach;
    import org.junit.jupiter.api.BeforeEach;
    import org.junit.jupiter.api.Test;

    class MyTestClass {
        private Calculator calculator;

        @BeforeEach
        void setUp() {
            calculator = new Calculator();
            System.out.println("Before each test: Calculator initialized.");
        }

        @AfterEach
        void tearDown() {
            calculator = null;
            System.out.println("After each test: Calculator reset.");
        }

        @Test
        void testAdd() {
            assertEquals(5, calculator.add(2, 3));
        }
    }
    ```

### B. `@BeforeAll`, `@AfterAll`

*   **`@BeforeAll`:** Runs once before all test methods in the class. Must be a static method.
*   **`@AfterAll`:** Runs once after all test methods in the class. Must be a static method.

    ```java
    import org.junit.jupiter.api.AfterAll;
    import org.junit.jupiter.api.BeforeAll;
    import org.junit.jupiter.api.Test;

    class DatabaseTest {
        @BeforeAll
        static void connectToDatabase() {
            System.out.println("Connecting to database once for all tests.");
            // Establish database connection
        }

        @AfterAll
        static void disconnectFromDatabase() {
            System.out.println("Disconnecting from database after all tests.");
            // Close database connection
        }

        @Test
        void testQuery1() { /* ... */ }
        @Test
        void testQuery2() { /* ... */ }
    }
    ```

### C. `@DisplayName`

Provides a custom display name for a test class or test method.

```java
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("Calculator Operations Test Suite")
class CalculatorTest {

    @Test
    @DisplayName("Addition of two positive numbers")
    void testAddPositiveNumbers() {
        // ...
    }
}
```

---

## IV. Test Organization and Execution

### A. `@Test`

Marks a method as a test method.

### B. `@Disabled`

Disables a test class or test method.

```java
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;

@Disabled("Disabled until bug #123 is fixed")
class BuggyFeatureTest {
    @Test
    void testSomething() { /* ... */ }
}
```

### C. `@Tag`

Assigns tags to test classes or test methods for filtering.

```java
import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;

class FastTests {
    @Test
    @Tag("fast")
    void testFastMethod() { /* ... */ }
}

class SlowTests {
    @Test
    @Tag("slow")
    void testSlowMethod() { /* ... */ }
}
// Run only fast tests: mvn test -Dgroups=fast
```

### D. Test Suites (`@Suite`)

Group multiple test classes together to run them as a single unit.

```java
import org.junit.platform.suite.api.SelectClasses;
import org.junit.platform.suite.api.Suite;

@Suite
@SelectClasses({ CalculatorTest.class, MyTestClass.class })
class AllTestsSuite {
}
```

### E. Parameterized Tests (`@ParameterizedTest`, `@ValueSource`, `@MethodSource`)

Run the same test method multiple times with different arguments.

```java
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.junit.jupiter.params.provider.MethodSource;
import static org.junit.jupiter.api.Assertions.assertTrue;

class PalindromeChecker {
    boolean isPalindrome(String word) {
        String reversedWord = new StringBuilder(word).reverse().toString();
        return word.equalsIgnoreCase(reversedWord);
    }
}

class ParameterizedTests {

    @ParameterizedTest
    @ValueSource(strings = {"racecar", "madam", "level"})
    void testIsPalindrome(String word) {
        PalindromeChecker checker = new PalindromeChecker();
        assertTrue(checker.isPalindrome(word));
    }

    // Example with MethodSource
    // private static Stream<Arguments> provideStringsForIsBlank() {
    //     return Stream.of(
    //         Arguments.of(null, true),
    //         Arguments.of("", true),
    //         Arguments.of("  ", true),
    //         Arguments.of("not blank", false)
    //     );
    // }
    // @ParameterizedTest
    // @MethodSource("provideStringsForIsBlank")
    // void isBlank_ShouldReturnTrueForNullEmptyAndBlankStrings(String input, boolean expected) {
    //     assertEquals(expected, StringUtils.isBlank(input));
    // }
}
```

---

## V. Mocking (Mockito)

Mockito is a popular mocking framework for Java unit tests.

### A. What is Mockito?

Mockito is a Java mocking framework that lets you create test doubles (mocks, stubs, spies) for dependencies in your code. This allows you to test a class in isolation without relying on its real dependencies.

### B. Installation

Add Mockito as a test dependency in your `pom.xml` or `build.gradle`.

```xml
<!-- Maven -->
<dependency>
    <groupId>org.mockito</groupId>
    <artifactId>mockito-junit-jupiter</artifactId>
    <version>5.6.0</version>
    <scope>test</scope>
</dependency>
```

```gradle
// Gradle
testImplementation 'org.mockito:mockito-junit-jupiter:5.6.0'
```

### C. Creating Mocks (`Mockito.mock()`, `@Mock`)

*   `Mockito.mock(ClassToMock.class)`: Programmatically creates a mock object.
*   `@Mock`: Annotation to create a mock object (requires `MockitoExtension`).

    ```java
    import org.junit.jupiter.api.Test;
    import org.junit.jupiter.api.extension.ExtendWith;
    import org.mockito.Mock;
    import org.mockito.junit.jupiter.MockitoExtension;

    import static org.mockito.Mockito.*;

    interface MyService {
        String getData();
        void doSomething(String arg);
    }

    @ExtendWith(MockitoExtension.class) // Enable Mockito annotations
    class MyServiceTest {

        @Mock // Creates a mock instance of MyService
        MyService mockService;

        @Test
        void testGetData() {
            // Stubbing: Define behavior of the mock
            when(mockService.getData()).thenReturn("Mocked Data");

            // Use the mock
            String result = mockService.getData();
            assertEquals("Mocked Data", result);

            // Verification: Check if method was called
            verify(mockService).getData();
        }
    }
    ```

### D. Stubbing Methods (`when().thenReturn()`)

Define the behavior of mock methods when they are called.

### E. Verifying Interactions (`verify()`)

Check if methods on mock objects were called, and with what arguments.

### F. Argument Matchers (`any()`, `eq()`)

Use argument matchers (e.g., `any(String.class)`, `eq("expected")`) when verifying or stubbing methods with specific arguments.

---

## VI. Advanced Features

### A. Test Instances (`@TestInstance`)

Controls the lifecycle of test instances.

*   `@TestInstance(Lifecycle.PER_CLASS)`: Creates a single test instance for all tests in the class (allows `@BeforeAll`/`@AfterAll` on non-static methods).
*   `@TestInstance(Lifecycle.PER_METHOD)` (default): Creates a new test instance for each test method.

### B. Test Order (`@TestMethodOrder`)

Specifies the order in which test methods are executed.

### C. Dynamic Tests (`@TestFactory`)

Allows you to generate tests at runtime.

### D. Assumptions (`Assumptions.assumeTrue()`)

Used to conditionally execute tests. If an assumption fails, the test is skipped, not failed.

```java
import org.junit.jupiter.api.Assumptions;
import org.junit.jupiter.api.Test;

class AssumptionTest {
    @Test
    void testOnlyOnDevelopmentEnvironment() {
        Assumptions.assumeTrue("DEV".equals(System.getenv("ENV")));
        // This test will only run if ENV is "DEV"
        System.out.println("Running test for DEV environment.");
    }
}
```

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

*   Place test files in `src/test/java` (Maven/Gradle convention).
*   Mirror the package structure of your main source code.
*   Group related tests into classes.

### D. Integration with CI/CD

Integrate JUnit tests into your Continuous Integration/Continuous Deployment pipelines to ensure code quality.

### E. Code Coverage (JaCoCo)

Use tools like JaCoCo (Java Code Coverage) to measure and report on code coverage, ensuring your tests cover a significant portion of your codebase.
