# Java Collections Framework and Generics

This guide explores two fundamental and powerful features of Java: the Collections Framework for managing groups of objects, and Generics for creating type-safe and reusable code.

## 1. Java Collections Framework (JCF)

The Java Collections Framework (JCF) is a set of interfaces and classes that provide a unified architecture for representing and manipulating collections of objects. It offers various data structures and algorithms to store and process data efficiently.

### What is JCF?

JCF is a standardized way to handle groups of objects. It includes interfaces (like `List`, `Set`, `Map`), concrete implementations of these interfaces (like `ArrayList`, `HashSet`, `HashMap`), and algorithms (like sorting and searching).

### Benefits of JCF

*   **Reduced Programming Effort:** Provides ready-to-use data structures and algorithms.
*   **Increased Performance:** Highly optimized implementations.
*   **Interoperability:** Standardized interfaces allow different collection implementations to work together.
*   **Code Reusability:** Write generic algorithms that work with any collection type.

### Core Interfaces

#### `Collection` Interface

The root interface in the collection hierarchy. It defines common operations applicable to all collections (e.g., `add()`, `remove()`, `contains()`, `size()`).

#### `List` Interface

An ordered collection (sequence) that allows duplicate elements. Elements can be accessed by their integer index.

*   **`ArrayList`**: Resizable array implementation. Good for fast random access, slower for insertions/deletions in the middle.
*   **`LinkedList`**: Doubly-linked list implementation. Good for fast insertions/deletions, slower for random access.
*   **`Vector`**: Legacy class, similar to `ArrayList` but synchronized (thread-safe), generally slower than `ArrayList`.

```java
import java.util.ArrayList;
import java.util.List;

List<String> names = new ArrayList<>();
names.add("Alice");
names.add("Bob");
names.add("Alice"); // Allows duplicates
System.out.println(names.get(0)); // Alice
names.remove("Bob");
System.out.println(names); // [Alice, Alice]
```

#### `Set` Interface

A collection that cannot contain duplicate elements. It models the mathematical set abstraction.

*   **`HashSet`**: Stores elements in a hash table. Offers constant-time performance for basic operations (add, remove, contains) but provides no ordering guarantee.
*   **`LinkedHashSet`**: Hash table and linked list implementation. Maintains insertion order.
*   **`TreeSet`**: Stores elements in a red-black tree. Elements are sorted according to their natural ordering or by a `Comparator`. Offers guaranteed log(n) time cost for basic operations.

```java
import java.util.HashSet;
import java.util.Set;

Set<String> uniqueNames = new HashSet<>();
uniqueNames.add("Alice");
uniqueNames.add("Bob");
uniqueNames.add("Alice"); // Duplicate, will not be added
System.out.println(uniqueNames); // [Bob, Alice] (order not guaranteed)
```

#### `Queue` Interface

A collection designed for holding elements prior to processing. Typically, elements are added at one end (the "tail") and removed from the other end (the "head"). Follows FIFO (First-In, First-Out) principle.

*   **`LinkedList`**: Can also be used as a `Queue`.
*   **`PriorityQueue`**: Elements are ordered according to their natural ordering or by a `Comparator`.
*   **`ArrayDeque`**: A resizable-array implementation of the `Deque` (double-ended queue) interface.

```java
import java.util.LinkedList;
import java.util.Queue;

Queue<String> queue = new LinkedList<>();
queue.offer("Task1"); // Add to tail
queue.offer("Task2");
System.out.println(queue.peek()); // Task1 (view head)
System.out.println(queue.poll()); // Task1 (remove head)
System.out.println(queue); // [Task2]
```

#### `Map` Interface

An object that maps keys to values. A `Map` cannot contain duplicate keys; each key can map to at most one value.

*   **`HashMap`**: Stores key-value pairs in a hash table. Provides constant-time performance for basic operations. No ordering guarantee.
*   **`LinkedHashMap`**: Hash table and linked list implementation. Maintains insertion order.
*   **`TreeMap`**: Stores key-value pairs in a red-black tree. Keys are sorted according to their natural ordering or by a `Comparator`.
*   **`Hashtable`**: Legacy class, similar to `HashMap` but synchronized and does not allow null keys or values.

```java
import java.util.HashMap;
import java.util.Map;

Map<String, Integer> ages = new HashMap<>();
ages.put("Alice", 30);
ages.put("Bob", 25);
ages.put("Charlie", 30);
System.out.println(ages.get("Alice")); // 30
for (Map.Entry<String, Integer> entry : ages.entrySet()) {
    System.out.println(entry.getKey() + ": " + entry.getValue());
}
```

### `Iterator` Interface

Provides a way to traverse elements in a collection sequentially.

```java
import java.util.Iterator;
import java.util.List;
import java.util.ArrayList;

List<String> list = new ArrayList<>();
list.add("A");
list.add("B");

Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
    String element = iterator.next();
    System.out.println(element);
    if (element.equals("A")) {
        iterator.remove(); // Safely remove element during iteration
    }
}
System.out.println(list); // [B]
```

### `Collections` Class (Utility Methods)

A utility class that consists exclusively of static methods that operate on or return collections. It provides methods for sorting, searching, shuffling, reversing, etc.

```java
import java.util.Collections;
import java.util.List;
import java.util.ArrayList;

List<Integer> numbers = new ArrayList<>();
numbers.add(5);
numbers.add(2);
numbers.add(8);

Collections.sort(numbers); // Sorts the list
System.out.println(numbers); // [2, 5, 8]

int index = Collections.binarySearch(numbers, 5); // Binary search (list must be sorted)
System.out.println("Index of 5: " + index); // 1

Collections.reverse(numbers); // Reverses the order
System.out.println(numbers); // [8, 5, 2]
```

## 2. Generics

Generics enable you to write classes, interfaces, and methods that operate on objects of various types while providing compile-time type safety.

### What are Generics?

Generics allow you to define classes, interfaces, and methods with type parameters. These type parameters act as placeholders for the actual types that will be used when the class, interface, or method is instantiated or called.

### Benefits of Generics

*   **Type Safety:** Catches type-related errors at compile time rather than runtime.
*   **Code Reusability:** Write algorithms that work on different types without code duplication.
*   **Elimination of Casts:** Reduces the need for explicit type casting, making code cleaner and less error-prone.

### Generic Classes

```java
// A generic class that can hold any type of data
public class Box<T> {
    private T data;

    public Box(T data) {
        this.data = data;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}

// Usage:
// Box<Integer> integerBox = new Box<>(123);
// Box<String> stringBox = new Box<>("Hello Generics");
// Integer value = integerBox.getData(); // No cast needed
```

### Generic Methods

Methods can also be generic, allowing them to operate on different types.

```java
public class GenericMethods {
    public static <T> void printArray(T[] array) {
        for (T element : array) {
            System.out.print(element + " ");
        }
        System.out.println();
    }

    // Usage:
    // Integer[] intArray = {1, 2, 3};
    // String[] stringArray = {"A", "B", "C"};
    // printArray(intArray);
    // printArray(stringArray);
}
```

### Bounded Type Parameters

Sometimes you want to restrict the types that can be used as type arguments. This is done using bounded type parameters.

*   **`<T extends ClassName>`**: `T` can be `ClassName` or any subclass of `ClassName`.
*   **`<T extends InterfaceName>`**: `T` can be `InterfaceName` or any class that implements `InterfaceName`.
*   **`<T extends ClassName & InterfaceName>`**: `T` must be a subclass of `ClassName` and implement `InterfaceName`.

```java
public class Calculator<T extends Number> {
    private T value;

    public Calculator(T value) {
        this.value = value;
    }

    public double square() {
        return value.doubleValue() * value.doubleValue();
    }
}

// Usage:
// Calculator<Integer> intCalc = new Calculator<>(5);
// System.out.println(intCalc.square()); // 25.0
// Calculator<Double> doubleCalc = new Calculator<>(3.5);
// System.out.println(doubleCalc.square()); // 12.25
// Calculator<String> stringCalc = new Calculator<>("test"); // Compile-time error
```

### Wildcards (`?`)

Wildcards are used in generic code to increase its flexibility. They represent an unknown type.

*   **`?` (Unbounded Wildcard):** Represents any type.
*   **`? extends Type` (Upper Bounded Wildcard):** Represents an unknown type that is a `Type` or a subclass of `Type`. Used for reading from a generic collection (PECS: Producer `extends`).
*   **`? super Type` (Lower Bounded Wildcard):** Represents an unknown type that is a `Type` or a superclass of `Type`. Used for writing to a generic collection (PECS: Consumer `super`).

```java
import java.util.List;
import java.util.ArrayList;

public class WildcardExample {
    // Unbounded wildcard: can print any list
    public static void printList(List<?> list) {
        for (Object elem : list) {
            System.out.print(elem + " ");
        }
        System.out.println();
    }

    // Upper bounded wildcard: can process list of Numbers or its subclasses
    public static double sumOfList(List<? extends Number> list) {
        double sum = 0.0;
        for (Number num : list) {
            sum += num.doubleValue();
        }
        return sum;
    }

    // Lower bounded wildcard: can add Integers or its supertypes to the list
    public static void addIntegers(List<? super Integer> list) {
        for (int i = 1; i <= 5; i++) {
            list.add(i); // Can add Integer or its supertypes
        }
    }

    // Usage:
    // List<Integer> intList = new ArrayList<>();
    // intList.add(10);
    // intList.add(20);
    // printList(intList);
    // System.out.println(sumOfList(intList));

    // List<Number> numList = new ArrayList<>();
    // addIntegers(numList);
    // printList(numList);
}
```

### Type Erasure

Generics in Java are implemented using type erasure. This means that generic type information is only present at compile time and is removed during compilation. At runtime, all generic types are replaced with their bounds or with `Object` if the type parameters are unbounded.

### Restrictions on Generics

*   Cannot instantiate generic types with primitive types (e.g., `List<int>` is invalid, use `List<Integer>`).
*   Cannot create instances of type parameters (e.g., `new T()`).
*   Cannot create arrays of parameterized types (e.g., `new List<String>[10]`).
*   Cannot use `instanceof` with generic types (due to type erasure).
*   Cannot create static fields of type parameters.

## 3. Comparable and Comparator Interfaces

These interfaces are used to define the sorting order of objects.

### `Comparable` (Natural Ordering)

*   Implemented by a class whose objects are to be sorted based on their "natural ordering" (e.g., alphabetical for strings, numerical for numbers).
*   Has a single method: `compareTo(Object obj)`.

```java
public class Student implements Comparable<Student> {
    private String name;
    private int age;

    public Student(String name, int age) { this.name = name; this.age = age; }

    public String getName() { return name; }
    public int getAge() { return age; }

    @Override
    public int compareTo(Student other) {
        // Sort by name alphabetically
        return this.name.compareTo(other.name);
        // To sort by age:
        // return Integer.compare(this.age, other.age);
    }

    @Override
    public String toString() { return name + " (" + age + ")"; }
}

// Usage:
// List<Student> students = new ArrayList<>();
// students.add(new Student("Bob", 20));
// students.add(new Student("Alice", 22));
// Collections.sort(students); // Sorts using Student's compareTo method
// System.out.println(students); // [Alice (22), Bob (20)]
```

### `Comparator` (Custom Ordering)

*   Implemented by a separate class (or lambda expression) to define an alternative or custom sorting order.
*   Has a single method: `compare(Object obj1, Object obj2)`.

```java
import java.util.Comparator;

public class StudentAgeComparator implements Comparator<Student> {
    @Override
    public int compare(Student s1, Student s2) {
        return Integer.compare(s1.getAge(), s2.getAge());
    }
}

// Usage:
// List<Student> students = new ArrayList<>(); // Same list as above
// Collections.sort(students, new StudentAgeComparator()); // Sorts using the custom comparator
// System.out.println(students); // [Bob (20), Alice (22)]

// Using lambda (Java 8+):
// Collections.sort(students, (s1, s2) -> Integer.compare(s1.getAge(), s2.getAge()));
```

## 4. Concurrency Utilities in Collections

Java provides several thread-safe (concurrent) collection implementations for use in multi-threaded environments.

*   **`ConcurrentHashMap`**: A thread-safe version of `HashMap`. It allows concurrent reads and concurrent updates to different parts of the map without locking the entire map.
*   **`CopyOnWriteArrayList`**: A thread-safe variant of `ArrayList` where all mutative operations (add, set, remove, etc.) are implemented by making a fresh copy of the underlying array. Reads do not require locking.
*   **`BlockingQueue`**: An interface that represents a queue that additionally supports operations that wait for the queue to become non-empty when retrieving an element, and wait for space to become available in the queue when storing an element. Useful for producer-consumer patterns.
    *   Implementations: `ArrayBlockingQueue`, `LinkedBlockingQueue`, `PriorityBlockingQueue`.

```java
import java.util.concurrent.ConcurrentHashMap;
import java.util.Map;

Map<String, Integer> concurrentMap = new ConcurrentHashMap<>();
concurrentMap.put("Key1", 1);
concurrentMap.put("Key2", 2);
// Can be safely accessed and modified by multiple threads concurrently
```
