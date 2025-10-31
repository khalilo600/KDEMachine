# Java Object-Oriented Programming (OOP) Concepts

Java is fundamentally an object-oriented language. Understanding OOP principles is crucial for writing well-structured, maintainable, and scalable Java applications. This guide delves into the core OOP concepts in Java.

## 1. Introduction to OOP

### What is OOP?

Object-Oriented Programming (OOP) is a programming paradigm based on the concept of "objects", which can contain data (attributes or fields) and code (methods or procedures). The main goal of OOP is to bind together the data and the functions that operate on them so that no other part of the code can access this data except that function.

### Four Pillars of OOP

OOP is built upon four fundamental principles:

1.  **Encapsulation:** Bundling data and methods that operate on the data within a single unit (class), and restricting direct access to some of the object's components.
2.  **Inheritance:** A mechanism where one class acquires the properties and behaviors of another class.
3.  **Polymorphism:** The ability of an object to take on many forms. It allows objects of different classes to be treated as objects of a common superclass.
4.  **Abstraction:** Hiding the complex implementation details and showing only the essential features of the object.

## 2. Classes and Objects

### Review of Class Definition and Object Creation

*   **Class:** A blueprint or template for creating objects. It defines the state (attributes) and behavior (methods) that objects of its type will have.
*   **Object:** An instance of a class. When a class is defined, no memory is allocated until an object is created.

```java
public class Car {
    // Attributes (instance variables)
    String make;
    String model;
    int year;

    // Method (behavior)
    public void start() {
        System.out.println(make + " " + model + " starting...");
    }
}

// Creating objects:
// Car myCar = new Car(); // Creates an object of type Car
// myCar.make = "Toyota";
// myCar.model = "Camry";
// myCar.year = 2020;
// myCar.start();
```

### Constructors

Special methods used to initialize objects. They have the same name as the class and no return type.

*   **Default Constructor:** If you don't define any constructor, Java provides a public, no-argument constructor.
*   **Parameterized Constructor:** Takes arguments to initialize instance variables.
*   **Constructor Overloading:** A class can have multiple constructors with different parameter lists.

```java
public class Car {
    String make;
    String model;
    int year;

    // Parameterized Constructor
    public Car(String make, String model, int year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    // Constructor Overloading (e.g., for default year)
    public Car(String make, String model) {
        this(make, model, 2023); // Calls the other constructor
    }
}
```

### `this` Keyword

Refers to the current object. Used to:

*   Distinguish between instance variables and local parameters (as in the constructor above).
*   Call another constructor from within the same class (`this(...)`).
*   Pass the current object as an argument to a method.

### `static` Keyword

*   **`static` fields (Class Variables):** Belong to the class, not any specific object. All objects of the class share the same copy. Accessed using `ClassName.fieldName`.
*   **`static` methods (Class Methods):** Belong to the class. Can only access static fields and other static methods. Cannot use `this` keyword. Accessed using `ClassName.methodName()`.
*   **`static` blocks:** Executed once when the class is loaded into memory.

```java
public class Counter {
    static int count = 0; // Class variable

    public Counter() {
        count++;
    }

    public static int getCount() { // Class method
        return count;
    }
}
// Usage:
// Counter c1 = new Counter();
// Counter c2 = new Counter();
// System.out.println(Counter.getCount()); // 2
```

### `final` Keyword

*   **`final` variables:** Once assigned, their value cannot be changed (constant).
*   **`final` methods:** Cannot be overridden by subclasses.
*   **`final` classes:** Cannot be subclassed (inherited from).

```java
public class Constants {
    public static final double PI = 3.14159;
}

final class ImmutableClass { /* ... */ }

class Base {
    public final void cannotOverride() { /* ... */ }
}
```

## 3. Encapsulation

Encapsulation is the mechanism of wrapping the data (variables) and code acting on the data (methods) together as a single unit. It also allows for data hiding, where the internal state of an object is protected from direct external access.

### Making fields `private`

By declaring instance variables as `private`, they can only be accessed from within the class itself.

### Providing `public` Getters and Setters

To allow controlled access to `private` fields, `public` methods (getters and setters) are provided.

*   **Getter (Accessor):** Retrieves the value of a field.
*   **Setter (Mutator):** Sets the value of a field, often with validation logic.

```java
public class Person {
    private String name;
    private int age;

    public Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { // Getter
        return name;
    }

    public void setName(String name) { // Setter
        this.name = name;
    }

    public int getAge() { // Getter
        return age;
    }

    public void setAge(int age) { // Setter with validation
        if (age > 0 && age < 120) {
            this.age = age;
        } else {
            System.out.println("Invalid age.");
        }
    }
}
```

### Benefits of Encapsulation

*   **Data Hiding:** Protects the internal state of an object.
*   **Flexibility:** Allows changing the internal implementation without affecting external code.
*   **Maintainability:** Easier to debug and maintain.
*   **Control:** Provides control over data access and modification.

## 4. Inheritance

Inheritance is a mechanism in which one object acquires all the properties and behaviors of a parent object. It promotes code reusability and establishes an "is-a" relationship between classes.

### `extends` Keyword

Used to indicate that a class is inheriting from another class.

```java
class Animal {
    void eat() {
        System.out.println("Animal eats.");
    }
}

class Dog extends Animal { // Dog inherits from Animal
    void bark() {
        System.out.println("Dog barks.");
    }
}

// Usage:
// Dog myDog = new Dog();
// myDog.eat();  // Inherited method
// myDog.bark(); // Dog's own method
```

### `super` Keyword

Used to refer to the immediate parent class object. Can be used to:

*   Call the parent class's constructor (`super()`).
*   Access parent class's methods (`super.method()`).
*   Access parent class's fields (`super.field`).

```java
class Vehicle {
    String brand;
    Vehicle(String brand) { this.brand = brand; }
    void displayBrand() { System.out.println("Brand: " + brand); }
}

class Car extends Vehicle {
    String model;
    Car(String brand, String model) {
        super(brand); // Call parent constructor
        this.model = model;
    }
    @Override
    void displayBrand() {
        super.displayBrand(); // Call parent method
        System.out.println("Model: " + model);
    }
}
```

### Method Overriding (`@Override` annotation)

When a subclass provides a specific implementation for a method that is already defined in its superclass. The `@Override` annotation is optional but good practice for clarity and compiler checks.

### Types of Inheritance

*   **Single Inheritance:** A class inherits from one superclass.
*   **Multi-level Inheritance:** A class inherits from a class, which in turn inherits from another class (A -> B -> C).
*   **Hierarchical Inheritance:** Multiple subclasses inherit from a single superclass.

### Limitations (No Multiple Inheritance of Classes)

Java does not support multiple inheritance of classes (a class cannot `extend` more than one class) to avoid the "diamond problem." However, it achieves similar functionality through interfaces.

## 5. Polymorphism

Polymorphism means "many forms." It allows objects of different classes to be treated as objects of a common superclass. In Java, polymorphism is achieved through method overloading and method overriding.

### Method Overloading (Compile-time Polymorphism)

Multiple methods in the same class have the same name but different parameter lists.

```java
// Example from Java Basics: Calculator.add(int, int) and Calculator.add(double, double)
```

### Method Overriding (Runtime Polymorphism)

When a subclass provides a specific implementation for a method that is already defined in its superclass. The method to be called is determined at runtime based on the actual object type.

```java
class Animal {
    void makeSound() {
        System.out.println("Animal makes a sound.");
    }
}

class Dog extends Animal {
    @Override
    void makeSound() {
        System.out.println("Dog barks.");
    }
}

class Cat extends Animal {
    @Override
    void makeSound() {
        System.out.println("Cat meows.");
    }
}

// Usage:
// Animal myAnimal = new Dog(); // Upcasting
// myAnimal.makeSound(); // Output: Dog barks. (Runtime polymorphism)
// myAnimal = new Cat();
// myAnimal.makeSound(); // Output: Cat meows.
```

### Upcasting and Downcasting

*   **Upcasting:** Treating a subclass object as its superclass type (e.g., `Animal myAnimal = new Dog();`). Always safe.
*   **Downcasting:** Treating a superclass object as its subclass type. Requires an explicit cast and can lead to `ClassCastException` if the object is not actually of the target subclass type.

### `instanceof` Operator

Used to check if an object is an instance of a particular class or interface.

```java
if (myAnimal instanceof Dog) {
    Dog d = (Dog) myAnimal; // Safe downcasting
    d.bark();
}
```

## 6. Abstraction

Abstraction is the concept of hiding the complex implementation details and showing only the essential features of the object. In Java, abstraction is achieved using abstract classes and interfaces.

### Abstract Classes (`abstract` keyword)

*   A class declared with the `abstract` keyword. It cannot be instantiated directly.
*   Can have abstract methods (methods without a body) and concrete methods (methods with a body).
*   Subclasses must implement all abstract methods, or they must also be declared `abstract`.

```java
abstract class Shape {
    String color;

    Shape(String color) { this.color = color; }

    // Abstract method (no body)
    abstract double getArea();

    // Concrete method
    public String getColor() {
        return color;
    }
}

class Circle extends Shape {
    double radius;

    Circle(String color, double radius) {
        super(color);
        this.radius = radius;
    }

    @Override
    double getArea() {
        return Math.PI * radius * radius;
    }
}
```

### Interfaces (`interface` keyword)

*   A blueprint of a class. It can have only abstract methods (before Java 8) and constants.
*   From Java 8, interfaces can have `default` and `static` methods with implementations.
*   A class `implements` an interface.
*   A class can implement multiple interfaces, achieving a form of multiple inheritance of behavior.

```java
interface Drawable {
    void draw(); // Abstract method
    default void resize() { // Default method (Java 8+)
        System.out.println("Resizing drawable object.");
    }
}

interface Resizable {
    void resize(int factor);
}

class Rectangle implements Drawable, Resizable {
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle.");
    }

    @Override
    public void resize(int factor) {
        System.out.println("Resizing rectangle by factor " + factor);
    }
}
```

### Functional Interfaces (`@FunctionalInterface`)

An interface with exactly one abstract method. They can be implemented using lambda expressions (Java 8+).

```java
@FunctionalInterface
interface MyFunctionalInterface {
    void doSomething();
}

// Usage with lambda:
// MyFunctionalInterface func = () -> System.out.println("Doing something!");
// func.doSomething();
```

### Differences between Abstract Classes and Interfaces

| Feature             | Abstract Class                               | Interface                                    |
| :------------------ | :------------------------------------------- | :------------------------------------------- |
| Type                | Class                                        | Pure abstract class (before Java 8)          |
| Methods             | Abstract and non-abstract methods            | Abstract methods (Java 8+ can have default/static) |
| Variables           | Can have final, non-final, static, non-static| Only static and final variables (constants)  |
| Constructors        | Can have constructors                        | Cannot have constructors                     |
| Multiple Inheritance| No (a class can only extend one abstract class)| Yes (a class can implement multiple interfaces)|
| Access Modifiers    | Can have any access modifier for members     | Members are implicitly public and abstract (except default/static) |

## 7. Association, Aggregation, Composition

These terms describe different types of relationships between objects.

*   **Association:** A general term for a relationship between two classes. It's a "has-a" relationship.
    *   Example: A `Student` is associated with a `Course`.
*   **Aggregation:** A specialized form of association representing a "has-a" relationship where one object contains another, but the contained object can exist independently.
    *   Example: A `Department` has `Professors`. If the department is deleted, the professors still exist.
*   **Composition:** A specialized form of aggregation representing a strong "has-a" relationship where the contained object cannot exist independently of the container.
    *   Example: A `House` has `Rooms`. If the house is destroyed, the rooms are also destroyed.

## 8. Packages

Packages are used to organize classes and interfaces into logical groups. They help in preventing naming conflicts and provide a way to control access.

### Organizing Classes

```java
// com/example/myapp/model/User.java
package com.example.myapp.model;

public class User { /* ... */ }

// com/example/myapp/service/UserService.java
package com.example.myapp.service;

public class UserService { /* ... */ }
```

### `import` Statement

Used to bring classes from other packages into the current scope.

```java
package com.example.myapp.controller;

import com.example.myapp.model.User;
import com.example.myapp.service.UserService;

public class UserController {
    UserService userService = new UserService();
    public void createUser(User user) { /* ... */ }
}
```

## 9. Inner Classes

Inner classes (or nested classes) are classes defined within another class. They allow you to logically group classes that are only used in one place, increase encapsulation, and create more readable and maintainable code.

*   **Static Nested Class:** Behaves like a top-level class but is nested for packaging convenience. Can access static members of the outer class.
*   **Non-static Nested Class (Inner Class):** Associated with an instance of the outer class. Can access all members (static and non-static) of the outer class, including private ones.
*   **Local Class:** Defined inside a method or scope. Its scope is limited to that block.
*   **Anonymous Class:** An inner class without a name, typically used for implementing an interface or extending a class on the fly.

```java
public class OuterClass {
    private int outerX = 10;

    class InnerClass { // Non-static inner class
        public void display() {
            System.out.println("OuterX: " + outerX); // Can access outerX
        }
    }

    static class StaticNestedClass { // Static nested class
        public void display() {
            // System.out.println("OuterX: " + outerX); // Cannot access non-static outerX
            System.out.println("From static nested class.");
        }
    }

    public void methodWithLocalClass() {
        class LocalClass { // Local class
            public void display() {
                System.out.println("From local class.");
            }
        }
        LocalClass lc = new LocalClass();
        lc.display();
    }

    public void methodWithAnonymousClass() {
        Runnable r = new Runnable() { // Anonymous class implementing Runnable
            @Override
            public void run() {
                System.out.println("From anonymous class.");
            }
        };
        new Thread(r).start();
    }
}
```
