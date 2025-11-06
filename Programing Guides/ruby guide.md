# Ruby Guide: Comprehensive Learning Outline

This guide provides a structured overview of Ruby, a dynamic, open-source programming language with a focus on simplicity and productivity. It covers core concepts, control flow, data structures, object-oriented programming, modules, file I/O, advanced topics, and best practices for Ruby development.

---

## I. Getting Started and Core Concepts

### A. What is Ruby?

Ruby is an interpreted, high-level, general-purpose programming language designed and developed in the mid-1990s by Yukihiro "Matz" Matsumoto in Japan. It is a dynamic, open-source language with a focus on simplicity and productivity. It has an elegant syntax that is natural to read and easy to write.

*   **Interpreted:** Code is executed line by line, not compiled beforehand.
*   **Object-Oriented:** Everything in Ruby is an object.
*   **Dynamic:** Supports dynamic typing and metaprogramming.
*   **Open-source:** Freely available and maintained by a large community.

### B. Why Use Ruby?

*   **Developer Happiness:** Designed to be a joy to use, with a focus on developer productivity and elegant syntax.
*   **Readability:** Code is often described as being close to natural language.
*   **Powerful Frameworks:** Powers the popular Ruby on Rails web framework.
*   **Large Ecosystem:** Rich set of libraries (gems) for various tasks.
*   **Metaprogramming:** Allows programs to write and modify other programs, leading to highly flexible code.
*   **Cross-Platform:** Runs on Windows, macOS, Linux, and other operating systems.

### C. Installation and Setup (Ruby Interpreter, Bundler, RVM/rbenv)

1.  **Ruby Interpreter:**
    *   **macOS:** Ruby is often pre-installed.
    *   **Linux:** Use your distribution's package manager (e.g., `sudo apt install ruby-full`).
    *   **Windows:** Use RubyInstaller.
2.  **Ruby Version Managers (Recommended):**
    *   **RVM (Ruby Version Manager):** `\curl -sSL https://get.rvm.io | bash`
    *   **rbenv:** `git clone https://github.com/rbenv/rbenv.git ~/.rbenv`
    These allow you to install and manage multiple Ruby versions.
3.  **Bundler:** A dependency manager for Ruby projects.

    ```bash
    # Install a Ruby version (e.g., with rbenv)
    rbenv install 3.2.2
    rbenv global 3.2.2

    # Install Bundler
    gem install bundler

    # Verify Ruby installation
    ruby -v
    gem -v
    bundle -v
    ```

### D. Basic Syntax (Comments, Semicolons, `puts`, `print`)

*   **Comments:**
    *   Single-line: `# This is a single-line comment`
    *   Multi-line: `=begin ... =end` (less common)

*   **Semicolons:** Semicolons are generally optional in Ruby, used to separate multiple statements on a single line.
*   **`puts`:** Prints data to the console, followed by a new line.
*   **`print`:** Prints data to the console, without a new line.

    ```ruby
    # This is a single-line comment

    =begin
    This is a multi-line comment
    that can span across several lines.
    =end

    puts "Hello, Ruby!"
    print "This is on one line."
    print " This is also on one line.\n"
    ```

### E. Variables and Data Types (Numbers, Strings, Booleans, Arrays, Hashes, Symbols)

Variables are used to store data. Ruby is dynamically typed.

1.  **Numbers:**
    *   `Integer`: `10`, `-5`, `0`
    *   `Float`: `3.14`, `-0.5`, `2.0`

2.  **Strings (`String`):** Sequences of characters, enclosed in single or double quotes. Double quotes allow string interpolation.

    ```ruby
    name = "Alice"
    message = 'Hello, World!'
    puts "My name is #{name}." # String interpolation
    ```

3.  **Booleans (`TrueClass`, `FalseClass`):** `true` or `false`. Only `false` and `nil` are falsy in Ruby; everything else is truthy.

    ```ruby
    is_active = true
    has_permission = false
    ```

4.  **Arrays (`Array`):** Ordered, mutable collections of items. Enclosed in square brackets.

    ```ruby
    fruits = ["apple", "banana", "cherry"]
    ```

5.  **Hashes (`Hash`):** Unordered, mutable collections of key-value pairs. Enclosed in curly braces. Keys can be any object, but Symbols are common.

    ```ruby
    person = {"name" => "Bob", "age" => 30}
    # Modern syntax with symbols as keys:
    person = {name: "Bob", age: 30}
    ```

6.  **Symbols (`Symbol`):** Immutable, unique identifiers. Often used as hash keys or for method names.

    ```ruby
    my_symbol = :my_key
    ```

7.  **`nil` (`NilClass`):** Represents the absence of a value.

### F. Operators (Arithmetic, Assignment, Comparison, Logical)

*   **Arithmetic:** `+`, `-`, `*`, `/`, `%`, `**` (exponentiation).
*   **Assignment:** `=`, `+=`, `-=`, `*=`, `/=`, `%=`.
*   **Comparison:** `==`, `!=`, `<`, `>`, `<=`, `>=`, `<=>` (spaceship operator).
*   **Logical:** `and`, `or`, `not` (lower precedence); `&&`, `||`, `!` (higher precedence).

    ```ruby
    x = 10
    y = 3
    puts x + y   # 13
    puts x / y   # 3 (integer division if both are integers)
    puts x == y  # false
    puts x > y && x != y # true
    ```

### G. Input and Output (`gets`, `puts`)

*   **`puts`:** Outputs data to the console, followed by a new line.
*   **`gets`:** Reads a line of input from the user (returns a string, including the newline character).

    ```ruby
    puts "Hello, Ruby!"
    print "Enter your name: "
    name = gets.chomp # chomp removes the trailing newline
    puts "Nice to meet you, #{name}!"
    ```

---

## II. Control Flow and Methods

### A. Conditional Statements (`if`, `elsif`, `else`, `unless`, `case`)

Execute different blocks of code based on conditions.

```ruby
age = 20
if age < 13
  puts "Child"
elsif age < 18
  puts "Teenager"
else
  puts "Adult"
end

# unless is the opposite of if
unless age < 18
  puts "Adult (using unless)"
end

# case statement (similar to switch)
grade_char = "B"
case grade_char
when "A"
  puts "Excellent!"
when "B"
  puts "Good!"
else
  puts "Pass."
end
```

### B. Looping Constructs (`while`, `until`, `for`, `each`, `loop`)

1.  **`while` loop:** Repeats a block of code as long as a condition is true.

    ```ruby
    count = 0
    while count < 3
      puts "While count: #{count}"
      count += 1
    end
    ```

2.  **`until` loop:** Repeats a block of code until a condition becomes true.

    ```ruby
    count = 0
    until count >= 3
      puts "Until count: #{count}"
      count += 1
    end
    ```

3.  **`for` loop:** Iterates over a range or collection.

    ```ruby
    for i in 0..4 # Inclusive range
      puts "For count: #{i}"
    end
    ```

4.  **`each` iterator:** Common for iterating over collections (Arrays, Hashes).

    ```ruby
    fruits = ["apple", "banana", "cherry"]
    fruits.each do |fruit|
      puts fruit
    end

    person = {name: "Jane", age: 28}
    person.each do |key, value|
      puts "#{key}: #{value}"
    end
    ```

5.  **`loop`:** An infinite loop that can be exited with `break`.

    ```ruby
    i = 0
    loop do
      puts "Loop count: #{i}"
      i += 1
      break if i >= 3
    end
    ```

    *   `break`: Exits the loop immediately.
    *   `next`: Skips the rest of the current iteration and moves to the next.

### C. Methods

Methods are reusable blocks of code that perform a specific task.

1.  **Defining and Calling Methods:**

    ```ruby
    def greet(name) # Method definition
      puts "Hello, #{name}!"
    end

    def add(a, b)
      return a + b # return is optional for the last expression
    end

    greet("Alice") # Calling a method
    sum = add(5, 3)
    puts "Sum: #{sum}"
    ```

2.  **Parameters and Arguments:**
    *   **Default Parameters:** Have a default value if not provided.
    *   **Variable-length Arguments (`*args`):** Collects multiple arguments into an array.

    ```ruby
    def describe_pet(animal_type, pet_name = "Buddy") # Default parameter
      puts "I have a #{animal_type} named #{pet_name}."
    end

    describe_pet("dog") # Positional
    describe_pet("cat", "Max")

    def sum_all(*numbers) # *numbers collects arguments into an array
      numbers.sum
    end
    puts sum_all(1, 2, 3, 4) # 10
    ```

3.  **Return Values:** The last expression evaluated in a method is implicitly returned. `return` can be used explicitly.

4.  **Blocks, Procs, and Lambdas:**
    *   **Blocks:** Anonymous functions that can be passed to methods.
    *   **Procs:** Block converted into an object.
    *   **Lambdas:** A type of Proc with stricter argument checking and different return behavior.

    ```ruby
    # Block
    [1, 2, 3].map { |n| n * 2 } # => [2, 4, 6]

    # Proc
    my_proc = Proc.new { |name| puts "Hello, #{name} from Proc!" }
    my_proc.call("Charlie")

    # Lambda
    my_lambda = ->(name) { puts "Hello, #{name} from Lambda!" }
    my_lambda.call("David")
    ```

### D. Exception Handling (`begin`, `rescue`, `ensure`, `raise`)

Use `begin-rescue` blocks to handle potential errors gracefully.

```ruby
def divide(a, b)
  raise ArgumentError, "Cannot divide by zero" if b == 0
  a / b
end

begin
  result = divide(10, 2)
  puts "Result: #{result}"
  result = divide(5, 0) # This will raise an exception
  puts "This line will not be executed."
rescue ArgumentError => e
  puts "Caught exception: #{e.message}"
rescue StandardError => e # Catch any other standard error
  puts "An unexpected error occurred: #{e.message}"
ensure
  puts "This block always executes."
end
```

---

## III. Data Structures

### A. Arrays (Creation, Access, Methods)

*   **Creation:** `my_array = [1, "hello", 3.14]`
*   **Access:** `my_array[0]` (first element), `my_array[-1]` (last element)
*   **Methods:** `push`, `pop`, `shift`, `unshift`, `delete_at`, `sort`, `reverse`, `map`, `select`, `reduce`.

    ```ruby
    fruits = ["apple", "banana", "cherry"]
    fruits.push("date") # ["apple", "banana", "cherry", "date"]
    fruits.insert(1, "grape") # ["apple", "grape", "banana", "cherry", "date"]
    puts fruits[1..3].inspect # ["grape", "banana", "cherry"]
    ```

### B. Hashes (Creation, Access, Methods)

*   **Creation:** `my_hash = {"key1" => "value1", :key2 => "value2"}` or `my_hash = {key1: "value1", key2: "value2"}`
*   **Access:** `my_hash["key1"]`, `my_hash[:key2]`, `my_hash.fetch(:key3, "default_value")`
*   **Methods:** `keys`, `values`, `each`, `merge`, `delete`.

    ```ruby
    person = {name: "Alice", age: 30}
    person[:city] = "New York" # Add new key-value pair
    puts person.keys.inspect # [:name, :age, :city]
    ```

### C. Ranges

Represent a sequence of numbers or characters.

```ruby
(1..5)    # Inclusive range: 1, 2, 3, 4, 5
(1...5)   # Exclusive range: 1, 2, 3, 4
('a'..'d') # 'a', 'b', 'c', 'd'
```

### D. Symbols

Immutable, unique identifiers.

```ruby
:my_symbol.object_id == :my_symbol.object_id # true
"my_string".object_id == "my_string".object_id # false (new string object each time)
```

---

## IV. Object-Oriented Programming (OOP)

Ruby is a pure object-oriented language; everything is an object.

### A. Classes and Objects

*   **Class:** A blueprint for creating objects.
*   **Object:** An instance of a class.

    ```ruby
    class Dog
      # Class attribute
      @@species = "Canis familiaris"

      # Constructor
      def initialize(name, age)
        @name = name # Instance variables
        @age = age
      end

      # Instance method
      def bark
        "#{@name} says Woof!"
      end

      # Class method
      def self.species_info
        "All dogs are #{@@species}."
      end
    end

    # Create objects
    my_dog = Dog.new("Buddy", 3)
    your_dog = Dog.new("Lucy", 5)

    puts my_dog.name # Buddy (using attr_reader or direct access)
    puts my_dog.bark # Buddy says Woof!
    puts Dog.species_info # All dogs are Canis familiaris.
    ```

### B. Attributes (Instance Variables, Class Variables)

*   **Instance Variables (`@variable`):** Belong to a specific object.
*   **Class Variables (`@@variable`):** Belong to the class itself and are shared by all instances.
*   **Accessor Methods (`attr_reader`, `attr_writer`, `attr_accessor`):** Provide convenient ways to create getter and setter methods for instance variables.

    ```ruby
    class Person
      attr_accessor :name, :age # Creates getter and setter for name and age

      def initialize(name, age)
        @name = name
        @age = age
      end
    end

    p = Person.new("Eve", 22)
    puts p.name # Eve (using getter)
    p.age = 23  # (using setter)
    ```

### C. Methods (Instance Methods, Class Methods)

*   **Instance Methods:** Operate on specific objects.
*   **Class Methods:** Operate on the class itself, defined with `self.method_name` or `ClassName.method_name`.

### D. Constructors (`initialize`)

The `initialize` method is a special method that is automatically called when a new object is created using `ClassName.new`. It's used to set up the object's initial state.

### E. Access Control (Public, Private, Protected)

*   **`public`:** Methods are public by default. Can be called from anywhere.
*   **`private`:** Can only be called without an explicit receiver (i.e., `self` is the implicit receiver).
*   **`protected`:** Can be called by `self` or by other instances of the same class or its subclasses.

### F. Inheritance (`<` operator)

A class can inherit properties and methods from another class (superclass). The subclass extends the functionality of the superclass.

```ruby
class Animal
  def initialize(name)
    @name = name
  end

  def eat
    "#{@name} is eating."
  end
end

class Cat < Animal # Cat inherits from Animal
  def initialize(name, color)
    super(name) # Call superclass constructor
    @color = color
  end

  def meow
    "#{@name} says Meow!"
  end
end

my_cat = Cat.new("Whiskers", "black")
puts my_cat.eat # Whiskers is eating. (inherited)
puts my_cat.meow # Whiskers says Meow!
```

### G. Polymorphism

Objects of different classes can be treated as objects of a common type, responding to the same method call in their own way.

```ruby
class Dog
  def speak
    "Woof!"
  end
end

class Cat
  def speak
    "Meow!"
  end
end

def make_sound(animal)
  puts animal.speak
end

make_sound(Dog.new) # Woof!
make_sound(Cat.new) # Meow!
```

### H. Modules (Mixins)

Modules are collections of methods and constants. They cannot be instantiated. When a module is `include`d in a class, its methods become instance methods of that class (mixin).

```ruby
module Greetable
  def greet
    "Hello, I am #{name}."
  end
end

class Person
  include Greetable # Mixin the Greetable module
  attr_reader :name

  def initialize(name)
    @name = name
  end
end

p = Person.new("Frank")
puts p.greet # Hello, I am Frank.
```

### I. `self` Keyword

Refers to the current object. Its meaning changes based on the context (inside an instance method, it refers to the instance; inside a class method, it refers to the class).

---

## V. Modules and Gems

### A. Creating and Using Modules

(See Section IV.H for example)

### B. Ruby Standard Library

Ruby comes with a rich standard library for various tasks (e.g., `Math`, `Time`, `File`, `JSON`, `Net::HTTP`).

### C. Gems (Installation, `Gemfile`, Bundler)

Gems are Ruby's way of packaging libraries and applications.

1.  **Installation:**

    ```bash
    gem install <gem_name>
    ```

2.  **`Gemfile`:** A file in your project root that lists all dependencies.

    ```ruby
    # Gemfile
    source "https://rubygems.org"

    gem "rails", "~> 7.0"
    gem "pry"
    ```

3.  **Bundler:** Reads the `Gemfile` and installs/manages dependencies.

    ```bash
    bundle install # Installs gems listed in Gemfile
    bundle exec rails server # Runs command in context of bundled gems
    ```

---

## VI. File I/O

### A. Reading from Files (`File.open`, `File.read`, `IO.readlines`)

```ruby
# Read entire file
content = File.read("example.txt")
puts content

# Read line by line
File.open("example.txt", "r") do |file|
  file.each_line do |line|
    puts line
  end
end

# Read all lines into an array
lines = IO.readlines("example.txt")
puts lines.inspect
```

### B. Writing to Files (`File.open`, `File.write`)

```ruby
# Overwrite file
File.write("output.txt", "Hello from Ruby!\n")

# Append to file
File.open("output.txt", "a") do |file|
  file.puts "Appended line."
end
```

---

## VII. Advanced Topics

### A. Iterators and Enumerators

Ruby's `Enumerable` module provides powerful iteration methods (`each`, `map`, `select`, `reduce`).

### B. Regular Expressions

For pattern matching in strings.

```ruby
text = "The quick brown fox jumps over the lazy dog."
if text =~ /fox/
  puts "Found fox!"
end

matches = text.scan(/\b\w{4}\b/) # Find all 4-letter words
puts matches.inspect # ["lazy", "dog"]
```

### C. Metaprogramming

Ruby's ability to write code that writes code.

*   `define_method`: Dynamically define methods.
*   `method_missing`: Handle calls to undefined methods.

### D. Concurrency (Threads, Fibers)

*   **Threads:** Ruby has native threads, but due to the Global Interpreter Lock (GIL) in MRI (Matz's Ruby Interpreter), true parallelism for CPU-bound tasks is limited. Good for I/O-bound tasks.
*   **Fibers:** Lightweight concurrency primitives that allow you to pause and resume execution.

---

## VIII. Best Practices and Tools

### A. Ruby Style Guide

Follow community-accepted style guides (e.g., [Ruby Style Guide by Airbnb](https://github.com/airbnb/ruby)) for consistency.

### B. Rake (Build Tool)

A Ruby build program similar to Make. Used for defining and running tasks.

```ruby
# Rakefile
task :hello do
  puts "Hello from Rake!"
end
```

```bash
rake hello
```

### C. Unit Testing (Minitest, RSpec)

*   **Minitest:** Ruby's built-in testing framework.
*   **RSpec:** A popular BDD (Behavior-Driven Development) framework.

    ```ruby
    # Example Minitest
    require 'minitest/autorun'

    class Calculator
      def add(a, b)
        a + b
      end
    end

    class TestCalculator < Minitest::Test
      def test_add_method
        calc = Calculator.new
        assert_equal 5, calc.add(2, 3)
      end
    end
    ```

### D. Debugging (Pry)

Pry is a powerful runtime developer console and debugger for Ruby.

```bash
gem install pry
```

```ruby
require 'pry'

def my_method
  x = 10
  binding.pry # Execution will pause here
  y = 20
  puts x + y
end

my_method
```

### E. Version Control (Git)

Use Git for version control to track changes, collaborate with others, and manage different versions of your codebase.
