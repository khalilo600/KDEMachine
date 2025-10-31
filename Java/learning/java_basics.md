# Java Basics Guide

This guide covers the fundamental concepts of Java programming, from initial setup and basic syntax to an introduction to Object-Oriented Programming (OOP) principles. It's designed for beginners or as a quick refresher.

## 1. Introduction to Java

### What is Java?

Java is a high-level, class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It's one of the most popular programming languages in the world.

*   **Platform Independence (WORA - Write Once, Run Anywhere):** Java code is compiled into an intermediate bytecode (`.class` files), which can then be executed on any device that has a Java Virtual Machine (JVM).
*   **JVM (Java Virtual Machine):** An abstract machine that provides a runtime environment in which Java bytecode can be executed.
*   **JRE (Java Runtime Environment):** The minimum set of tools required to run a Java application. It includes the JVM and Java class libraries.
*   **JDK (Java Development Kit):** A software development environment used for developing Java applications. It includes the JRE plus tools like the Java compiler (`javac`) and debugger.

### Features of Java

*   **Simple:** Relatively easy to learn compared to C++.
*   **Object-Oriented:** Everything in Java is an object (almost).
*   **Platform Independent:** Runs on various operating systems.
*   **Secure:** Features like memory management, exception handling, and bytecode verifier enhance security.
*   **Robust:** Strong memory management, automatic garbage collection, and exception handling.
*   **Multithreaded:** Supports concurrent execution of multiple parts of a program.
*   **High Performance:** Just-In-Time (JIT) compilers optimize bytecode to native machine code.

### Setting up Java

1.  **JDK Installation:** Download and install the latest Java Development Kit (JDK) from Oracle's website or Adoptium (Eclipse Temurin).
2.  **Environment Variables:** Set the `JAVA_HOME` environment variable to the JDK installation directory and add `%JAVA_HOME%\bin` (Windows) or `$JAVA_HOME/bin` (Linux/macOS) to your system's `PATH` variable.
3.  **Verify Installation:** Open your terminal or command prompt and type:
    ```bash
    java -version
    javac -version
    ```

## 2. Basic Syntax

### Hello World Program Structure

Every Java application starts with a `main` method.

```java
// HelloWorld.java
public class HelloWorld {
    public static void main(String[] args) {
        // This is the main method, the entry point for the program
        System.out.println("Hello, World!"); // Prints "Hello, World!" to the console
    }
}
```

To compile and run:

```bash
javac HelloWorld.java  # Compiles the Java source code into bytecode (HelloWorld.class)
java HelloWorld      # Executes the bytecode using the JVM
```

### Comments

Comments are used to explain code and are ignored by the Java compiler.

```java
// This is a single-line comment

/*
 * This is a multi-line comment.
 * It can span multiple lines.
 */

/**
 * This is a Javadoc comment.
 * Used for generating API documentation.
 * @param args command line arguments
 */
public static void main(String[] args) {
    // ...
}
```

### Variables and Data Types

Java is a strongly, statically typed language, meaning you must declare the type of a variable before using it.

#### Primitive Data Types

*   **`byte`**: 8-bit integer (-128 to 127)
*   **`short`**: 16-bit integer (-32,768 to 32,767)
*   **`int`**: 32-bit integer (-2^31 to 2^31-1). Most common integer type.
*   **`long`**: 64-bit integer.
*   **`float`**: 32-bit floating-point number (single precision).
*   **`double`**: 64-bit floating-point number (double precision). Most common floating-point type.
*   **`boolean`**: Represents `true` or `false`.
*   **`char`**: 16-bit Unicode character (single character in single quotes, e.g., `'A'`).

```java
int age = 30;
double price = 19.99;
boolean isActive = true;
char grade = 'A';
long population = 8000000000L; // 'L' suffix for long literals
```

#### Reference Data Types

Objects (instances of classes) are reference types. `String` is the most common built-in reference type.

```java
String name = "Alice";
String message = new String("Hello, Java!"); // Generally just use literals
```

### Operators

*   **Arithmetic:** `+`, `-`, `*`, `/` (division), `%` (modulo).
*   **Relational:** `==` (equal to), `!=` (not equal to), `>` (greater than), `<` (less than), `>=` (greater than or equal to), `<=` (less than or equal to).
*   **Logical:** `&&` (AND), `||` (OR), `!` (NOT).
*   **Assignment:** `=`, `+=`, `-=`, `*=`, `/=`, `%=`.
*   **Unary:** `+` (unary plus), `-` (unary minus), `++` (increment), `--` (decrement), `!` (logical NOT).

```java
int a = 10, b = 3;
System.out.println(a / b);   // 3 (integer division)
System.out.println(a % b);   // 1
System.out.println(a == b);  // false
System.out.println(a > b);   // true

boolean x = true, y = false;
System.out.println(x && y);  // false
System.out.println(x || y);  // true

int count = 0;
count++; // count is now 1
```

## 3. Control Flow

### `if`/`else if`/`else` Statements

Used for conditional execution.

```java
int score = 85;

if (score >= 90) {
    System.out.println("Grade A");
} else if (score >= 80) {
    System.out.println("Grade B");
} else if (score >= 70) {
    System.out.println("Grade C");
} else {
    System.out.println("Grade F");
}
```

### `switch` Statements

Provides a way to execute different blocks of code based on the value of a variable or expression.

```java
int day = 3;
String dayName;

switch (day) {
    case 1:
        dayName = "Monday";
        break;
    case 2:
        dayName = "Tuesday";
        break;
    case 3:
        dayName = "Wednesday";
        break;
    default:
        dayName = "Unknown";
}
System.out.println("Day: " + dayName);
```

### `for` Loops

Used for iterating a specific number of times or over collections.

#### Traditional `for` loop

```java
for (int i = 0; i < 5; i++) {
    System.out.println("Iteration: " + i);
}
```

#### Enhanced `for-each` loop (for arrays and collections)

```java
String[] fruits = {"apple", "banana", "cherry"};
for (String fruit : fruits) {
    System.out.println("Fruit: " + fruit);
}
```

### `while` Loops

Executes a block of code repeatedly as long as a condition is true.

```java
int count = 0;
while (count < 3) {
    System.out.println("Count: " + count);
    count++;
}
```

### `do-while` Loops

Similar to `while` loop, but the block of code is executed at least once before the condition is checked.

```java
int i = 0;
do {
    System.out.println("Value of i: " + i);
    i++;
} while (i < 3);
```

### `break`, `continue`

*   `break`: Terminates the loop entirely.
*   `continue`: Skips the rest of the current iteration and moves to the next.

```java
for (int k = 0; k < 10; k++) {
    if (k == 3) {
        continue; // Skip 3
    }
    if (k == 7) {
        break;    // Exit loop at 7
    }
    System.out.println(k);
}
```

## 4. Arrays

Arrays are used to store multiple values of the same type in a single variable.

### Declaring and Initializing Arrays

```java
// Declare and initialize an array of integers
int[] numbers = {10, 20, 30, 40, 50};

// Declare an array and then allocate memory (size 5)
String[] names = new String[5];
names[0] = "Alice";
names[1] = "Bob";
// ...
```

### Accessing Array Elements

Array elements are accessed using their index (0-based).

```java
System.out.println(numbers[0]);    // 10
System.out.println(names.length); // 5 (length of the array)
```

### Multi-dimensional Arrays

Arrays of arrays.

```java
int[][] matrix = {
    {1, 2, 3},
    {4, 5, 6},
    {7, 8, 9}
};
System.out.println(matrix[0][0]); // 1
```

## 5. Methods (Functions)

Methods are blocks of code that perform a specific task and are part of a class. In Java, all functions are part of classes.

### Defining Methods

```java
// Syntax:
// access_modifier static_optional return_type method_name(parameters) {
//     // method body
//     return value; // if return_type is not void
// }

public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public void displayMessage(String message) {
        System.out.println(message);
    }
}
```

### Method Overloading

When a class has multiple methods with the same name but different parameters (different number of parameters, different data types of parameters, or different order of parameters).

```java
public class Calculator {
    public int add(int a, int b) {
        return a + b;
    }

    public double add(double a, double b) {
        return a + b;
    }

    public int add(int a, int b, int c) {
        return a + b + c;
    }
}
```

### `main` Method

The entry point for any Java application.

```java
public static void main(String[] args) {
    // ... program starts here ...
}
```

## 6. Classes and Objects (Introduction to OOP)

### Defining a Class

A class is a blueprint for creating objects. It defines the structure and behavior that objects of that class will have.

```java
public class Dog {
    // Instance variables (attributes)
    String name;
    int age;

    // Constructor
    public Dog(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Instance method (behavior)
    public void bark() {
        System.out.println(name + " says Woof!");
    }

    // Getter method
    public String getName() {
        return name;
    }

    // Setter method
    public void setAge(int newAge) {
        if (newAge > 0) {
            age = newAge;
        }
    }
}
```

### Creating Objects

Objects are instances of a class.

```java
// In main method or another class:
Dog myDog = new Dog("Buddy", 3); // Calls the constructor to create an object
Dog anotherDog = new Dog("Lucy", 5);

myDog.bark(); // Buddy says Woof!
System.out.println(anotherDog.getName()); // Lucy
```

### Constructors

Special methods used to initialize objects. They have the same name as the class and no return type. If you don't define one, Java provides a default no-argument constructor.

### `this` Keyword

Refers to the current object. Often used to distinguish between instance variables and local parameters with the same name (as seen in the `Dog` constructor).

### Instance Variables vs. Class Variables (`static`)

*   **Instance variables:** Each object has its own copy (e.g., `name`, `age` in `Dog`).
*   **Class/Static variables:** Belong to the class, not any specific object. All objects of the class share the same copy.

```java
public class Car {
    String model; // Instance variable
    static int numberOfCarsCreated = 0; // Class variable

    public Car(String model) {
        this.model = model;
        numberOfCarsCreated++; // Increment class variable
    }
}
// Usage:
// Car c1 = new Car("Toyota");
// Car c2 = new Car("Honda");
// System.out.println(Car.numberOfCarsCreated); // 2
```

### Instance Methods vs. Class Methods (`static`)

*   **Instance methods:** Operate on an object's instance variables (e.g., `bark()` in `Dog`).
*   **Class/Static methods:** Belong to the class. Cannot access instance variables directly, only static variables and other static methods.

```java
public class MathUtils {
    public static int multiply(int a, int b) {
        return a * b;
    }
}
// Usage: System.out.println(MathUtils.multiply(5, 10)); // 50
```

## 7. Access Modifiers

Access modifiers control the visibility (accessibility) of classes, fields, methods, and constructors.

*   **`public`**: Accessible from anywhere.
*   **`private`**: Accessible only within the declaring class.
*   **`protected`**: Accessible within the declaring class, by subclasses, and by classes in the same package.
*   **Default (no keyword)**: Accessible only within the same package (package-private).

## 8. Encapsulation

Encapsulation is one of the four fundamental OOP principles. It refers to the bundling of data (attributes) and methods (functions) that operate on the data into a single unit (class), and restricting direct access to some of the object's components.

### Getters and Setters

Typically, instance variables are made `private`, and `public` getter and setter methods are provided to access and modify them. This allows control over how data is accessed and modified.

```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    // Getter for name
    public String getName() {
        return name;
    }

    // Setter for age with validation
    public void setAge(int age) {
        if (age > 0 && age < 120) {
            this.age = age;
        } else {
            System.out.println("Invalid age.");
        }
    }

    // Getter for age
    public int getAge() {
        return age;
    }
}
```
