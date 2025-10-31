# Python Basics Guide

This guide covers the fundamental concepts of Python programming, from basic syntax to object-oriented principles and file handling. It's designed for beginners or as a quick refresher.

## 1. Introduction to Python

### What is Python?

Python is a high-level, interpreted, interactive, and object-oriented scripting language. It was created by Guido van Rossum and first released in 1991. Python is known for its readability and simple syntax, making it an excellent language for beginners.

### Why Python?

*   **Simple and Readable:** Easy to learn and use, with a clear, concise syntax.
*   **Versatile:** Used in web development (Django, Flask), data science, AI/ML, automation, scripting, desktop applications, and more.
*   **Large Community & Ecosystem:** Extensive libraries, frameworks, and community support.
*   **Cross-platform:** Runs on Windows, macOS, Linux, and other operating systems.
*   **Interpreted:** Code can be executed line by line, facilitating rapid prototyping and testing.

### Setting up Python

1.  **Installation:** Download the latest version from [python.org](https://www.python.org/downloads/). Follow the installation instructions for your operating system. Ensure you check "Add Python to PATH" during installation on Windows.
2.  **Verify Installation:** Open your terminal or command prompt and type:
    ```bash
    python --version
    # or
    python3 --version
    ```
3.  **Virtual Environments:** It's best practice to use virtual environments to manage dependencies for different projects. This prevents conflicts between package versions.
    ```bash
    python3 -m venv myenv         # Create a virtual environment named 'myenv'
    source myenv/bin/activate     # Activate on macOS/Linux
    # myenv\Scripts\activate      # Activate on Windows
    (myenv) pip install requests  # Install packages within the virtual environment
    deactivate                    # Deactivate the virtual environment
    ```

## 2. Basic Syntax

### Comments

Comments are used to explain code and are ignored by the Python interpreter.

```python
# This is a single-line comment

"""
This is a multi-line comment
(also known as a docstring if placed at the start of a module, function, or class)
"""
```

### Variables and Data Types

Python is dynamically typed, meaning you don't need to declare the type of a variable explicitly.

*   **Numbers:** `int` (integers), `float` (floating-point numbers), `complex`.
    ```python
    age = 30          # int
    price = 19.99     # float
    ```
*   **Strings (`str`):** Sequences of characters, enclosed in single or double quotes.
    ```python
    name = "Alice"
    message = 'Hello, world!'
    multiline_string = """This is
a multi-line
string."""
    ```
*   **Booleans (`bool`):** `True` or `False`.
    ```python
    is_active = True
    has_permission = False
    ```
*   **NoneType (`None`):** Represents the absence of a value.
    ```python
    result = None
    ```

### Operators

*   **Arithmetic:** `+`, `-`, `*`, `/` (float division), `//` (integer division), `%` (modulo), `**` (exponentiation).
    ```python
    a = 10
    b = 3
    print(a / b)  # 3.333...
    print(a // b) # 3
    print(a % b)  # 1
    print(a ** b) # 1000
    ```
*   **Comparison:** `==` (equal to), `!=` (not equal to), `>` (greater than), `<` (less than), `>=` (greater than or equal to), `<=` (less than or equal to).
    ```python
    print(a == b) # False
    print(a > b)  # True
    ```
*   **Logical:** `and`, `or`, `not`.
    ```python
    x = True
    y = False
    print(x and y) # False
    print(x or y)  # True
    print(not x)   # False
    ```
*   **Assignment:** `=`, `+=`, `-=`, `*=`, `/=`, etc.
    ```python
    count = 0
    count += 1 # count is now 1
    ```

## 3. Control Flow

### `if`/`elif`/`else` Statements

Used for conditional execution.

```python
score = 85

if score >= 90:
    print("Grade A")
elif score >= 80:
    print("Grade B")
elif score >= 70:
    print("Grade C")
else:
    print("Grade F")
```

### `for` Loops

Used for iterating over sequences (lists, tuples, strings, dictionaries, etc.) or other iterable objects.

```python
# Using range()
for i in range(5): # 0, 1, 2, 3, 4
    print(i)

# Iterating over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit)

# Iterating over a dictionary
person = {"name": "Bob", "age": 25}
for key, value in person.items():
    print(f"{key}: {value}")
```

### `while` Loops

Executes a block of code repeatedly as long as a condition is true.

```python
count = 0
while count < 3:
    print(f"Count: {count}")
    count += 1
```

### `break`, `continue`, `pass`

*   `break`: Terminates the loop entirely.
*   `continue`: Skips the rest of the current iteration and moves to the next.
*   `pass`: A null operation; nothing happens when it executes. Used as a placeholder.

```python
for i in range(10):
    if i == 3:
        continue # Skip 3
    if i == 7:
        break    # Exit loop at 7
    print(i)

def my_function():
    pass # TODO: Implement this function later
```

## 4. Data Structures

### Lists

Ordered, mutable (changeable) collections of items. Enclosed in square brackets `[]`.

```python
my_list = [1, 2, "hello", True]
print(my_list[0])      # Access: 1
my_list.append(3)      # Add: [1, 2, "hello", True, 3]
my_list[0] = 10        # Modify: [10, 2, "hello", True, 3]
my_list.remove("hello") # Remove: [10, 2, True, 3]
print(len(my_list))    # Length: 4
```

### Tuples

Ordered, immutable (unchangeable) collections of items. Enclosed in parentheses `()`.

```python
my_tuple = (1, 2, "world")
print(my_tuple[0])     # Access: 1
# my_tuple[0] = 10     # Error: Tuples are immutable
```

### Dictionaries

Unordered, mutable collections of key-value pairs. Enclosed in curly braces `{}`.

```python
my_dict = {"name": "Alice", "age": 30}
print(my_dict["name"])    # Access: Alice
my_dict["age"] = 31      # Modify: {"name": "Alice", "age": 31}
my_dict["city"] = "NY"    # Add: {"name": "Alice", "age": 31, "city": "NY"}
del my_dict["age"]       # Remove: {"name": "Alice", "city": "NY"}
print(my_dict.keys())    # Get keys
print(my_dict.values())  # Get values
print(my_dict.items())   # Get key-value pairs
```

### Sets

Unordered collections of unique items. Enclosed in curly braces `{}` or created with `set()`.

```python
my_set = {1, 2, 3, 2}
print(my_set)          # {1, 2, 3} (duplicates removed)
my_set.add(4)          # Add: {1, 2, 3, 4}
my_set.remove(1)       # Remove: {2, 3, 4}

set1 = {1, 2, 3}
set2 = {3, 4, 5}
print(set1.union(set2))        # {1, 2, 3, 4, 5}
print(set1.intersection(set2)) # {3}
```

## 5. Functions

Functions are blocks of reusable code that perform a specific task.

### Defining Functions (`def`)

```python
def greet(name):
    """This function greets the person passed in as a parameter."""
    return f"Hello, {name}!"

message = greet("Charlie")
print(message) # Hello, Charlie!
```

### Parameters and Arguments

*   **Positional Arguments:** Passed in order.
*   **Keyword Arguments:** Passed by name.
*   **Default Arguments:** Parameters with default values.
*   `*args`: Allows a function to accept an arbitrary number of positional arguments.
*   `**kwargs`: Allows a function to accept an arbitrary number of keyword arguments.

```python
def add(a, b=0):
    return a + b

print(add(5))      # 5 (b uses default 0)
print(add(5, 3))   # 8
print(add(b=2, a=7)) # 9 (keyword arguments)

def func_with_args(*args, **kwargs):
    print(f"Positional args: {args}")
    print(f"Keyword args: {kwargs}")

func_with_args(1, 2, x=10, y=20)
# Positional args: (1, 2)
# Keyword args: {'x': 10, 'y': 20}
```

### Return Values

Functions can return one or more values using the `return` statement. If no `return` is specified, the function implicitly returns `None`.

### Lambda Functions

Small, anonymous functions defined with the `lambda` keyword. They can take any number of arguments but can only have one expression.

```python
multiply = lambda x, y: x * y
print(multiply(4, 5)) # 20
```

## 6. Object-Oriented Programming (OOP)

Python is an object-oriented language. OOP allows you to structure your programs by creating objects that combine data (attributes) and behavior (methods).

### Classes and Objects

*   **Class:** A blueprint for creating objects.
*   **Object (Instance):** A specific instance of a class.

```python
class Dog:
    # Class attribute
    species = "Canis familiaris"

    def __init__(self, name, age):
        # Instance attributes
        self.name = name
        self.age = age

    # Instance method
    def bark(self):
        return f"{self.name} says Woof!"

# Create objects (instances) of the Dog class
my_dog = Dog("Buddy", 3)
your_dog = Dog("Lucy", 5)

print(my_dog.name)      # Buddy
print(my_dog.species)   # Canis familiaris
print(my_dog.bark())    # Buddy says Woof!
```

### `__init__` Method (Constructor)

The `__init__` method is a special method that gets called automatically when a new object is created. It's used to initialize the object's attributes.

### Inheritance

Allows a class (child/derived class) to inherit attributes and methods from another class (parent/base class).

```python
class Labrador(Dog):
    def __init__(self, name, age, color):
        super().__init__(name, age) # Call parent's constructor
        self.color = color

    def swim(self):
        return f"{self.name} loves to swim!"

my_lab = Labrador("Max", 2, "golden")
print(my_lab.name)  # Max
print(my_lab.bark()) # Max says Woof!
print(my_lab.swim()) # Max loves to swim!
```

### Encapsulation (Public, Protected, Private Conventions)

Python doesn't have strict access modifiers like `public`, `private`, `protected`. Instead, it uses conventions:

*   **Public:** `attribute_name` (accessible from anywhere).
*   **Protected:** `_attribute_name` (convention to indicate it should not be accessed directly from outside the class or its subclasses).
*   **Private:** `__attribute_name` (name mangling occurs, making it harder to access directly from outside the class).

### Polymorphism

Allows objects of different classes to be treated as objects of a common superclass. It's often achieved through method overriding or interfaces (abstract base classes).

```python
class Cat:
    def speak(self):
        return "Meow"

class Duck:
    def speak(self):
        return "Quack"

def make_sound(animal):
    print(animal.speak())

make_sound(Cat())  # Meow
make_sound(Duck()) # Quack
```

## 7. Modules and Packages

### Modules

A module is a Python file (`.py`) containing Python definitions and statements. It allows you to logically organize your Python code.

```python
# my_module.py
def greet(name):
    return f"Hello, {name}"

PI = 3.14159

# main.py
import my_module
print(my_module.greet("Alice"))
print(my_module.PI)

from my_module import greet, PI
print(greet("Bob"))
print(PI)
```

### Packages

A package is a collection of modules in directories. A directory must contain an `__init__.py` file to be considered a Python package.

```
my_package/
├── __init__.py
├── module_a.py
└── sub_package/
    ├── __init__.py
    └── module_b.py
```

```python
# main.py
from my_package import module_a
from my_package.sub_package import module_b

# Or
import my_package.module_a
```

### `__name__ == "__main__"`

This common idiom allows you to write code that only runs when the script is executed directly, not when it's imported as a module.

```python
# my_script.py

def main():
    print("This runs when my_script.py is executed directly.")

if __name__ == "__main__":
    main()
```

## 8. File I/O

Python provides built-in functions for reading from and writing to files.

### Opening and Closing Files (`open()`, `with open()`)

It's best practice to use the `with` statement, which ensures the file is automatically closed even if errors occur.

```python
# Writing to a file
with open("example.txt", "w") as file: # 'w' for write (creates/overwrites)
    file.write("Hello, file!\n")
    file.write("This is a new line.")

# Reading from a file
with open("example.txt", "r") as file: # 'r' for read
    content = file.read()
    print(content)

# Appending to a file
with open("example.txt", "a") as file: # 'a' for append
    file.write("\nAppended line.")

# Reading line by line
with open("example.txt", "r") as file:
    for line in file:
        print(line.strip()) # .strip() removes leading/trailing whitespace, including newline
```

## 9. Error Handling

Python uses exceptions to handle errors that occur during program execution.

### `try`/`except`/`finally`

*   `try`: The code that might raise an exception.
*   `except`: Handles specific exceptions.
*   `finally`: Code that always executes, regardless of whether an exception occurred.

```python
def divide(a, b):
    try:
        result = a / b
    except ZeroDivisionError:
        print("Error: Cannot divide by zero!")
        return None
    except TypeError:
        print("Error: Invalid types for division!")
        return None
    else: # Optional: runs if no exception occurred in try block
        print("Division successful.")
        return result
    finally: # Optional: always runs
        print("Division attempt finished.")

print(divide(10, 2)) # Division successful. 5.0
print(divide(10, 0)) # Error: Cannot divide by zero! None
print(divide(10, "a")) # Error: Invalid types for division! None
```

### Raising Exceptions (`raise`)

You can explicitly raise exceptions using the `raise` statement.

```python
def validate_age(age):
    if not isinstance(age, (int, float)) or age < 0:
        raise ValueError("Age must be a non-negative number.")
    return age

try:
    validate_age(-5)
except ValueError as e:
    print(f"Validation Error: {e}")
```
