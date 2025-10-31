# Other Important Java Concepts

This guide covers a selection of other crucial Java concepts that enhance code quality, readability, and functionality, especially with modern Java versions (Java 8 and beyond).

## 1. Annotations

Annotations are metadata that can be added to Java source code. They provide information to the compiler, runtime, or other tools without directly affecting the program's execution.

### What are Annotations?

Annotations are a form of metadata that can be attached to classes, methods, fields, parameters, and other program elements. They start with an `@` symbol.

### Built-in Annotations

*   **`@Override`**: Indicates that a method in a subclass is overriding a method in its superclass. Helps the compiler catch errors if the method signature doesn't match.
*   **`@Deprecated`**: Marks a program element as deprecated, meaning it should no longer be used. Compilers issue a warning when deprecated elements are used.
*   **`@SuppressWarnings`**: Suppresses compiler warnings for a specific code section.

```java
public class MyClass {
    @Override
    public String toString() {
        return "MyClass object";
    }

    @Deprecated
    public void oldMethod() {
        System.out.println("This method is deprecated.");
    }

    @SuppressWarnings("unchecked")
    public void useLegacyCode() {
        // Code that might generate unchecked warnings
        // List list = new ArrayList();
    }
}
```

### Meta-Annotations

Annotations that are applied to other annotations to define their behavior.

*   **`@Target`**: Specifies where the annotation can be applied (e.g., `ElementType.TYPE`, `ElementType.METHOD`, `ElementType.FIELD`).
*   **`@Retention`**: Specifies how long the annotation should be retained (e.g., `RetentionPolicy.SOURCE`, `RetentionPolicy.CLASS`, `RetentionPolicy.RUNTIME`).
*   **`@Documented`**: Indicates that the annotation should be included in Javadoc documentation.
*   **`@Inherited`**: Indicates that an annotation type is automatically inherited by subclasses.

### Custom Annotations

You can define your own annotations.

```java
import java.lang.annotation.*;

@Retention(RetentionPolicy.RUNTIME) // Retain at runtime
@Target(ElementType.METHOD)       // Can be applied to methods
public @interface CustomMethodInfo {
    String author() default "Unknown";
    String date();
    int version() default 1;
}

public class AnnotatedClass {
    @CustomMethodInfo(author = "Alice", date = "2023-10-26", version = 2)
    public void myAnnotatedMethod() {
        System.out.println("This method has custom annotation info.");
    }
}
```

## 2. Reflection API

Reflection is a powerful feature in Java that allows an executing Java program to examine or modify its own structure (classes, methods, fields) at runtime.

### What is Reflection?

Reflection provides the ability to:

*   Inspect classes, interfaces, fields, and methods at runtime.
*   Create new objects and invoke methods dynamically.
*   Access and modify fields, even private ones.

### `Class` class

The `java.lang.Class` class is the entry point for the Reflection API. Every object in Java has a `getClass()` method that returns a `Class` object.

```java
// Getting a Class object
Class<?> stringClass = String.class;
Class<?> myObjectClass = myObject.getClass();
Class<?> forNameClass = Class.forName("java.util.ArrayList");
```

### Accessing fields, methods, constructors at runtime

```java
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Constructor;

public class ReflectionExample {
    public static void main(String[] args) throws Exception {
        Class<?> personClass = Class.forName("com.example.demo.Person");

        // Accessing fields
        Field nameField = personClass.getDeclaredField("name");
        nameField.setAccessible(true); // Allow access to private field

        // Accessing methods
        Method setNameMethod = personClass.getMethod("setName", String.class);
        Method getNameMethod = personClass.getMethod("getName");

        // Accessing constructors
        Constructor<?> constructor = personClass.getConstructor(String.class, int.class);

        // Dynamic object creation
        Object person = constructor.newInstance("Bob", 30);

        // Dynamic method invocation
        setNameMethod.invoke(person, "Robert");
        String name = (String) getNameMethod.invoke(person);
        System.out.println("Name: " + name);

        // Dynamic field modification
        nameField.set(person, "Charlie");
        System.out.println("Name after field set: " + getNameMethod.invoke(person));
    }
}

// Assuming a Person class exists:
// package com.example.demo;
// class Person { private String name; private int age; /* ... getters/setters ... */ }
```

### Use cases and drawbacks

*   **Use Cases:** Frameworks (Spring, Hibernate), IDEs, debugging tools, dynamic proxies, unit testing.
*   **Drawbacks:** Performance overhead, security risks (bypassing access control), increased code complexity, breaks encapsulation.

## 3. Lambda Expressions (Java 8+)

Lambda expressions provide a concise way to represent an anonymous function. They are a key feature of functional programming introduced in Java 8.

### What are Lambda Expressions?

A short block of code that takes parameters and returns a value. They are used to implement functional interfaces.

### Syntax

`(parameters) -> expression` or `(parameters) -> { statements; }`

```java
// No parameters
() -> System.out.println("Hello!")

// One parameter
s -> System.out.println(s)

// Multiple parameters
(a, b) -> a + b

// With block of statements
(a, b) -> {
    int sum = a + b;
    return sum;
}
```

### Functional Interfaces

An interface with exactly one abstract method. Lambda expressions are used to provide the implementation for this single abstract method.

*   `@FunctionalInterface` annotation is optional but good practice.
*   Examples: `Runnable`, `Callable`, `Comparator`, `Consumer`, `Supplier`, `Function`, `Predicate`.

```java
@FunctionalInterface
interface MyConverter<F, T> {
    T convert(F from);
}

// Usage:
// MyConverter<String, Integer> stringToInt = (from) -> Integer.valueOf(from);
// Integer converted = stringToInt.convert("123"); // 123
```

### Method References

A shorthand for lambda expressions that refer to an existing method. They can be used when the lambda expression simply calls an existing method.

*   **Static method:** `ClassName::staticMethodName`
*   **Instance method of a particular object:** `object::instanceMethodName`
*   **Instance method of an arbitrary object of a particular type:** `ClassName::instanceMethodName`
*   **Constructor:** `ClassName::new`

```java
List<String> names = Arrays.asList("Alice", "Bob", "Charlie");
names.forEach(System.out::println); // Method reference to System.out.println

// Equivalent lambda:
// names.forEach(name -> System.out.println(name));
```

## 4. Stream API (Java 8+)

The Stream API provides a powerful and functional way to process collections of objects. It allows for declarative data processing, enabling you to express *what* you want to do rather than *how* to do it.

### What is the Stream API?

A sequence of elements supporting sequential and parallel aggregate operations. Streams do not store data; they operate on a source (like a `List` or `Array`) and produce a result.

### Sources of Streams

*   From `Collection` via `stream()` or `parallelStream()`.
*   From `Arrays` via `Arrays.stream()`.
*   From `Stream.of()`.
*   From `BufferedReader.lines()`.

### Intermediate Operations

Return a new stream. They are lazy, meaning they are not executed until a terminal operation is invoked.

*   `filter(Predicate<T>)`: Selects elements matching a condition.
*   `map(Function<T, R>)`: Transforms each element into another form.
*   `sorted()`: Sorts elements.
*   `distinct()`: Removes duplicate elements.
*   `limit(long maxSize)`: Truncates the stream to at most `maxSize` elements.
*   `skip(long n)`: Skips the first `n` elements.

### Terminal Operations

Produce a result or a side-effect. They are eager, meaning they trigger the processing of the stream pipeline.

*   `forEach(Consumer<T>)`: Performs an action for each element.
*   `collect(Collector<T, A, R>)`: Accumulates elements into a collection (e.g., `toList()`, `toSet()`, `toMap()`).
*   `reduce(BinaryOperator<T>)`: Combines elements into a single result.
*   `count()`: Returns the number of elements.
*   `min(Comparator<T>)`, `max(Comparator<T>)`: Returns the minimum/maximum element.
*   `findFirst()`, `findAny()`: Returns an `Optional` containing the first/any element.
*   `anyMatch(Predicate<T>)`, `allMatch(Predicate<T>)`, `noneMatch(Predicate<T>)`: Checks if elements match a condition.

```java
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public class StreamExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);

        // Filter even numbers, double them, and collect into a new list
        List<Integer> evenDoubled = numbers.stream()
                                        .filter(n -> n % 2 == 0) // Intermediate: filter
                                        .map(n -> n * 2)       // Intermediate: transform
                                        .collect(Collectors.toList()); // Terminal: collect
        System.out.println("Even Doubled: " + evenDoubled); // [4, 8, 12, 16, 20]

        // Sum of all numbers
        int sum = numbers.stream().reduce(0, (a, b) -> a + b);
        System.out.println("Sum: " + sum); // 55

        // Find the first even number greater than 5
        numbers.stream()
               .filter(n -> n > 5)
               .filter(n -> n % 2 == 0)
               .findFirst()
               .ifPresent(n -> System.out.println("First even > 5: " + n)); // 6
    }
}
```

### Parallel Streams

Streams can be processed in parallel, leveraging multiple CPU cores for faster execution on large datasets. Simply call `parallelStream()` instead of `stream()`.

```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6, 7, 8, 9, 10);
long count = numbers.parallelStream()
                    .filter(n -> n > 5)
                    .count();
System.out.println("Count > 5 (parallel): " + count); // 5
```

## 5. Optional Class (Java 8+)

`Optional<T>` is a container object that may or may not contain a non-null value. It's designed to prevent `NullPointerException`s and to provide a more expressive way to handle potentially absent values.

### What is `Optional`?

A wrapper for a value that can be present or absent. It forces you to explicitly handle the case where a value might not exist.

### Preventing `NullPointerException`

By using `Optional`, you avoid returning `null` from methods, which often leads to `NullPointerException`s if not checked by the caller.

### Creating `Optional` Instances

*   `Optional.of(value)`: Creates an `Optional` with the specified non-null value. Throws `NullPointerException` if `value` is `null`.
*   `Optional.ofNullable(value)`: Creates an `Optional` with the specified value, or an empty `Optional` if `value` is `null`.
*   `Optional.empty()`: Creates an empty `Optional` instance.

### Checking for Presence and Retrieving Values

*   `isPresent()`: Returns `true` if a value is present, `false` otherwise.
*   `isEmpty()`: Returns `true` if a value is not present, `false` otherwise (Java 11+).
*   `get()`: Returns the value if present, otherwise throws `NoSuchElementException`. **Use with caution, only after checking `isPresent()`**.

### Handling Absent Values Gracefully

*   `orElse(other)`: Returns the value if present, otherwise returns `other`.
*   `orElseGet(Supplier<? extends T> other)`: Returns the value if present, otherwise invokes the `Supplier` and returns the result.
*   `orElseThrow(Supplier<? extends X> exceptionSupplier)`: Returns the value if present, otherwise throws the exception produced by the `Supplier`.

```java
import java.util.Optional;

public class OptionalExample {
    public static Optional<String> findUsernameById(int id) {
        if (id == 1) {
            return Optional.of("Alice");
        } else {
            return Optional.empty();
        }
    }

    public static void main(String[] args) {
        Optional<String> user1 = findUsernameById(1);
        Optional<String> user2 = findUsernameById(2);

        // Using isPresent() and get()
        if (user1.isPresent()) {
            System.out.println("User 1: " + user1.get());
        }

        // Using orElse()
        String name2 = user2.orElse("Guest");
        System.out.println("User 2: " + name2);

        // Using orElseThrow()
        try {
            String name3 = findUsernameById(3).orElseThrow(() -> new IllegalArgumentException("User not found"));
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }

        // Using ifPresent()
        user1.ifPresent(name -> System.out.println("Found user with ifPresent: " + name));
    }
}
```

### `map()`, `flatMap()`, `filter()`

These methods allow you to chain operations on `Optional` instances, similar to Streams.

## 6. Date and Time API (`java.time` - Java 8+)

Java 8 introduced a new, immutable, and thread-safe Date and Time API (`java.time` package) to address the shortcomings of the old `java.util.Date` and `java.util.Calendar` classes.

### Core Classes

*   **`LocalDate`**: Represents a date (year, month, day) without time or time zone.
*   **`LocalTime`**: Represents a time (hour, minute, second, nanosecond) without date or time zone.
*   **`LocalDateTime`**: Represents both date and time without time zone.
*   **`Instant`**: Represents a point in time on the timeline in UTC.
*   **`Duration`**: Measures time in seconds and nanoseconds (between two `Instant`s or `LocalTime`s).
*   **`Period`**: Measures time in years, months, and days (between two `LocalDate`s).
*   **`ZonedDateTime`**: Represents a date and time with a time zone.

```java
import java.time.LocalDate;
import java.time.LocalTime;
import java.time.LocalDateTime;
import java.time.Period;
import java.time.Duration;
import java.time.format.DateTimeFormatter;

public class DateTimeExample {
    public static void main(String[] args) {
        // Current date, time, datetime
        LocalDate today = LocalDate.now();
        LocalTime now = LocalTime.now();
        LocalDateTime currentDateTime = LocalDateTime.now();
        System.out.println("Today: " + today);
        System.out.println("Now: " + now);
        System.out.println("Current DateTime: " + currentDateTime);

        // Specific date, time, datetime
        LocalDate birthday = LocalDate.of(1990, 5, 15);
        LocalTime meetingTime = LocalTime.of(14, 30);
        LocalDateTime eventDateTime = LocalDateTime.of(2024, 1, 20, 10, 0);

        // Adding/Subtracting
        LocalDate nextWeek = today.plusWeeks(1);
        LocalTime fiveHoursLater = now.plusHours(5);

        // Period and Duration
        Period age = Period.between(birthday, today);
        System.out.println("Age: " + age.getYears() + " years, " + age.getMonths() + " months, " + age.getDays() + " days.");

        Duration duration = Duration.between(LocalTime.of(9, 0), LocalTime.of(17, 0));
        System.out.println("Work duration: " + duration.toHours() + " hours.");

        // Formatting
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        String formattedDateTime = currentDateTime.format(formatter);
        System.out.println("Formatted DateTime: " + formattedDateTime);
    }
}
```

## 7. Garbage Collection

### Automatic Memory Management

Java features automatic memory management through its Garbage Collector (GC). Developers don't explicitly deallocate memory; the GC automatically reclaims memory occupied by objects that are no longer referenced by the program.

### Generational Garbage Collection

Most modern JVMs use generational garbage collection, which divides the heap into different generations (Young Generation, Old Generation, Permanent Generation/Metaspace). This is based on the observation that most objects are short-lived.

### Garbage Collectors (Conceptual)

Different GC algorithms are available, each with its own characteristics regarding throughput, latency, and memory footprint:

*   **Serial GC:** Single-threaded, suitable for small applications.
*   **Parallel GC:** Multi-threaded version of Serial GC, for throughput-oriented applications.
*   **G1 GC (Garbage-First):** Designed for large heaps, aims to meet user-defined pause time goals.
*   **ZGC, Shenandoah:** Low-latency garbage collectors for very large heaps.

## 8. JVM Architecture (Brief Overview)

### Class Loader Subsystem

Responsible for loading, linking, and initializing classes.

### Runtime Data Areas

Memory areas used by the JVM during program execution:

*   **Method Area:** Stores class-level data (metadata, static variables, method code).
*   **Heap:** Runtime data area where objects are allocated.
*   **Stack:** Stores local variables, partial results, and data for method calls (one stack frame per method call).
*   **PC Registers:** Stores the address of the next instruction to be executed.
*   **Native Method Stack:** Stores native method information.

### Execution Engine

Executes the bytecode.

*   **Interpreter:** Reads and executes bytecode instruction by instruction.
*   **JIT (Just-In-Time) Compiler:** Compiles frequently executed bytecode into native machine code for faster execution.
*   **Garbage Collector:** Manages heap memory.
