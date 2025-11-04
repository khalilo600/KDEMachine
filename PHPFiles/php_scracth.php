<?php

/**
 * PHP Scratchpad
 *
 * This file serves as a comprehensive scratchpad to demonstrate various PHP concepts,
 * including basic output, variables, data types, operators, control structures,
 * functions, arrays, classes, objects, interfaces, and more.
 *
 * Each section is commented to explain the concepts being demonstrated.
 */

// --- Section 1: Basic Output and Comments ---

echo "--- Section 1: Basic Output and Comments ---\n";

// Basic string output
echo "Hello Nasr\n";
echo "Hello World\n";

// Single-line comments
// This is a single-line comment using two forward slashes.
# This is another single-line comment using a hash symbol.

/*
 * Multi-line comment
 * This type of comment can span multiple lines.
 * It's often used for block comments or documentation.
 */

echo "\n"; // Add a newline for better readability between sections

// --- Section 2: Variables and Data Types ---

echo "--- Section 2: Variables and Data Types ---\n";

// String variable
$myName = "Nasr";
echo "My name is: " . $myName . "\n";

// Integer variable
$age = 25;
echo "I am " . $age . " years old.\n";

// Float (or Double) variable
$height = 5.9;
echo "I am " . $height . " feet tall.\n";

// Boolean variable
$isStudent = true;
if ($isStudent) {
    echo "I am a student.\n";
} else {
    echo "I am not a student.\n";
}

// Null variable
$nullVar = null;
if (is_null($nullVar)) {
    echo "The variable is null.\n";
} else {
    echo "The variable is not null.\n";
}

// Variable variables: Using the value of a variable as the name of another variable
$varName = "dynamicVar";
$$varName = "I am a dynamic variable."; // This creates a variable named $dynamicVar
echo "Variable variable content: " . $dynamicVar . "\n";

echo "\n"; // Add a newline for better readability between sections

// --- Section 3: String Operations ---

echo "--- Section 3: String Operations ---\n";

// String concatenation using the dot operator
echo "Hello " . $myName . "\n";

// String interpolation (embedding variables directly in double-quoted strings)
echo "Hello $myName\n";

// String functions
echo "Length of my name: " . strlen($myName) . "\n";
echo "Replacing 's' with 'z' in my name: " . str_replace("s", "z", $myName) . "\n";
echo "My name in uppercase: " . strtoupper($myName) . "\n";
echo "My name in lowercase: " . strtolower($myName) . "\n";

// Substring extraction
echo "Substring from index 1, length 2: " . substr($myName, 1, 2) . "\n"; // as
echo "Substring last 2 characters: " . substr($myName, -2) . "\n"; // sr
echo "Substring from index 1 to end: " . substr($myName, 1) . "\n"; // asr
echo "Substring from start, excluding last character: " . substr($myName, 0, -1) . "\n"; // Nas

// Finding position of a substring
echo "Position of 's' in my name: " . strpos($myName, "s") . "\n"; // 2 (0-indexed)

// Trimming whitespace
$paddedName = "  " . $myName . "  ";
echo "Original padded name: '" . $paddedName . "'\n";
echo "Trimmed (both sides): '" . trim($paddedName) . "'\n";
echo "Left trimmed: '" . ltrim($paddedName) . "'\n";
echo "Right trimmed: '" . rtrim($paddedName) . "'\n";

// Repeating a string
echo "Repeating my name 3 times: " . str_repeat($myName . " ", 3) . "\n";

echo "\n"; // Add a newline for better readability between sections

// --- Section 4: Constants ---

echo "--- Section 4: Constants ---\n";

// Defining a constant using define()
define("PI", 3.14159);
echo "Value of PI: " . PI . "\n";

// Another constant
define("APP_NAME", "My PHP Scratchpad App");
echo "Application Name: " . APP_NAME . "\n";

// Magic constants (predefined constants that change based on their usage)
echo "Current file: " . __FILE__ . "\n";
echo "Current line: " . __LINE__ . "\n";
echo "Current directory: " . __DIR__ . "\n";

// Note: __FUNCTION__, __CLASS__, __METHOD__ are typically used within functions, classes, and methods respectively.
// We'll see them in action in later sections.

echo "\n"; // Add a newline for better readability between sections

// --- Section 5: Operators ---

echo "--- Section 5: Operators ---\n";

$x = 10;
$y = 3;

// Arithmetic Operators
echo "Arithmetic Operators:\n";
echo "x + y = " . ($x + $y) . "\n"; // Addition
echo "x - y = " . ($x - $y) . "\n"; // Subtraction
echo "x * y = " . ($x * $y) . "\n"; // Multiplication
echo "x / y = " . ($x / $y) . "\n"; // Division
echo "x % y = " . ($x % $y) . "\n"; // Modulus (remainder)
echo "x ** y = " . ($x ** $y) . "\n"; // Exponentiation

// Assignment Operators
echo "\nAssignment Operators:\n";
$a = 5;
echo "Initial a: " . $a . "\n";
$a += 3; // $a = $a + 3;
echo "a after += 3: " . $a . "\n";
$a -= 2; // $a = $a - 2;
echo "a after -= 2: " . $a . "\n";
$a *= 4; // $a = $a * 4;
echo "a after *= 4: " . $a . "\n";

// Comparison Operators
echo "\nComparison Operators:\n";
$p = 10;
$q = "10";
echo "p == q (loose equality): " . (var_export($p == $q, true)) . "\n";   // true
echo "p === q (strict equality): " . (var_export($p === $q, true)) . "\n"; // false
echo "p != q (loose inequality): " . (var_export($p != $q, true)) . "\n";   // false
echo "p !== q (strict inequality): " . (var_export($p !== $q, true)) . "\n"; // true
echo "p > 5: " . (var_export($p > 5, true)) . "\n";     // true
echo "p < 5: " . (var_export($p < 5, true)) . "\n";     // false
echo "p >= 10: " . (var_export($p >= 10, true)) . "\n"; // true
echo "p <= 10: " . (var_export($p <= 10, true)) . "\n"; // true

// Logical Operators
echo "\nLogical Operators:\n";
$isLoggedIn = true;
$isAdmin = false;
echo "isLoggedIn && isAdmin: " . (var_export($isLoggedIn && $isAdmin, true)) . "\n"; // false
echo "isLoggedIn || isAdmin: " . (var_export($isLoggedIn || $isAdmin, true)) . "\n"; // true
echo "!isAdmin: " . (var_export(!$isAdmin, true)) . "\n"; // true

// Increment/Decrement Operators
echo "\nIncrement/Decrement Operators:\n";
$counter = 0;
echo "Pre-increment (++\$counter): " . (++$counter) . "\n"; // 1
echo "Post-increment (\$counter++): " . ($counter++) . "\n"; // 1 (then becomes 2)
echo "Current counter: " . $counter . "\n"; // 2
echo "Pre-decrement (--\$counter): " . (--$counter) . "\n"; // 1
echo "Post-decrement (\$counter--): " . ($counter--) . "\n"; // 1 (then becomes 0)
echo "Current counter: " . $counter . "\n"; // 0

// Ternary Operator
echo "\nTernary Operator:\n";
$status = ($age >= 18) ? "Adult" : "Minor";
echo "Status: " . $status . "\n";

// Null Coalescing Operator (PHP 7.0+)
echo "\nNull Coalescing Operator (??):\n";
$username = $_GET['user'] ?? 'Guest'; // If $_GET['user'] is not set or is null, use 'Guest'
echo "Welcome, " . $username . "!\n";

echo "\n"; // Add a newline for better readability between sections

// --- Section 6: Control Structures (Conditionals and Loops) ---

echo "--- Section 6: Control Structures ---\n";

// If-Elseif-Else
$score = 85;
if ($score >= 90) {
    echo "Grade: A\n";
} elseif ($score >= 80) {
    echo "Grade: B\n";
} elseif ($score >= 70) {
    echo "Grade: C\n";
} else {
    echo "Grade: F\n";
}

// Switch Statement
$dayOfWeek = "Wednesday";
switch ($dayOfWeek) {
    case "Monday":
        echo "It's the start of the week.\n";
        break;
    case "Wednesday":
        echo "It's hump day!\n";
        break;
    case "Friday":
        echo "Weekend is near!\n";
        break;
    default:
        echo "Just another day.\n";
}

// While Loop
echo "\nWhile Loop:\n";
$count = 1;
while ($count <= 3) {
    echo "Count: " . $count . "\n";
    $count++;
}

// Do-While Loop
echo "\nDo-While Loop:\n";
$i = 5;
do {
    echo "This will run at least once. i: " . $i . "\n";
    $i++;
} while ($i < 5);

// For Loop
echo "\nFor Loop:\n";
for ($j = 1; $j <= 3; $j++) {
    echo "Iteration: " . $j . "\n";
}

// Foreach Loop (for arrays, demonstrated in Array section)

echo "\n"; // Add a newline for better readability between sections

// --- Section 7: Arrays ---

echo "--- Section 7: Arrays ---\n";

// Indexed Arrays
$fruits = array("Apple", "Banana", "Cherry");
echo "First fruit: " . $fruits[0] . "\n";
$fruits[1] = "Orange"; // Modifying an element
echo "Modified second fruit: " . $fruits[1] . "\n";
$fruits[] = "Grapes"; // Adding an element to the end
echo "New last fruit: " . $fruits[3] . "\n";
echo "Total fruits: " . count($fruits) . "\n";

echo "All fruits:\n";
foreach ($fruits as $fruit) {
    echo "- " . $fruit . "\n";
}

// Associative Arrays (key-value pairs)
$person = array(
    "name" => "Nasr",
    "age" => 25,
    "city" => "Cairo"
);
echo "Person's name: " . $person["name"] . "\n";
echo "Person's age: " . $person["age"] . "\n";
echo "Person's city: " . $person["city"] . "\n";

echo "Person details:\n";
foreach ($person as $key => $value) {
    echo "- " . $key . ": " . $value . "\n";
}

// Array functions
$numbers = array(1, 2, 3, 4, 5);
echo "Sum of numbers: " . array_sum($numbers) . "\n";
echo "Maximum number: " . max($numbers) . "\n";
echo "Minimum number: " . min($numbers) . "\n";

sort($numbers); // Sorts the array in ascending order
echo "Sorted numbers: " . implode(", ", $numbers) . "\n";

rsort($numbers); // Sorts the array in descending order
echo "Reverse sorted numbers: " . implode(", ", $numbers) . "\n";

$keys = array_keys($person);
echo "Keys of person array: " . implode(", ", $keys) . "\n";

$values = array_values($person);
echo "Values of person array: " . implode(", ", $values) . "\n";

// Multidimensional Arrays
$matrix = array(
    array(1, 2, 3),
    array(4, 5, 6),
    array(7, 8, 9)
);
echo "Element at [0][0]: " . $matrix[0][0] . "\n";
echo "Element at [1][1]: " . $matrix[1][1] . "\n";
echo "Element at [2][2]: " . $matrix[2][2] . "\n";

// Nested Arrays
$nestedArray = array(
    "fruits" => array("Apple", "Banana", "Cherry"),
    "vegetables" => array("Carrot", "Lettuce", "Spinach")
);
echo "First nested fruit: " . $nestedArray["fruits"][0] . "\n";
echo "Second nested vegetable: " . $nestedArray["vegetables"][1] . "\n";

// Merging arrays
$allItems = array_merge($nestedArray["fruits"], $nestedArray["vegetables"]);
echo "All items (merged): " . implode(", ", $allItems) . "\n";

// Custom array flattening function (from original file)
function array_flatten($array) {
    $result = array();
    foreach ($array as $item) {
        if (is_array($item)) {
            $result = array_merge($result, array_flatten($item));
        } else {
            $result[] = $item;
        }
    }
    return $result;
}
$flattenedMatrix = array_flatten($matrix);
echo "Flattened matrix: " . implode(", ", $flattenedMatrix) . "\n";

echo "\n"; // Add a newline for better readability between sections

// --- Section 8: Functions ---

echo "--- Section 8: Functions ---\n";

// Simple function
function add($a, $b) {
    return $a + $b;
}
$sumResult = add(5, 10);
echo "Sum of 5 and 10: " . $sumResult . "\n";

// Function with default parameters
function greetUser($name = "Guest") {
    return "Hello, " . $name . "!";
}
echo greetUser("Nasr") . "\n";
echo greetUser() . "\n"; // Uses default parameter

// Function with variable number of arguments (variadic functions, PHP 5.6+)
function multiply(...$numbers) {
    $product = 1;
    foreach ($numbers as $number) {
        $product *= $number;
    }
    return $product;
}
echo "Product of 2, 3, 4: " . multiply(2, 3, 4) . "\n";
echo "Product of 5, 2: " . multiply(5, 2) . "\n";

// Recursive function (Factorial example)
function factorial($n) {
    if ($n <= 1) {
        return 1;
    } else {
        return $n * factorial($n - 1);
    }
}
echo "Factorial of 5: " . factorial(5) . "\n";

// Anonymous function (Closures)
$square = function($x) {
    return $x * $x;
};
echo "Square of 4: " . $square(4) . "\n";

// Arrow function (short closures, PHP 7.4+)
$cube = fn($x) => $x * $x * $x;
echo "Cube of 3: " . $cube(3) . "\n";

// Function with type hints for parameters and return type (PHP 7.0+)
function divide(float $a, float $b): float {
    if ($b == 0) {
        throw new InvalidArgumentException("Division by zero is not allowed.");
    }
    return $a / $b;
}
try {
    echo "Division 10 / 2: " . divide(10, 2) . "\n";
    // This will throw an exception
    // echo "Division 10 / 0: " . divide(10, 0) . "\n";
} catch (InvalidArgumentException $e) {
    echo "Caught InvalidArgumentException: " . $e->getMessage() . "\n";
} catch (Exception $e) {
    echo "Caught general Exception: " . $e->getMessage() . "\n";
} finally {
    echo "Error handling complete.\n";
}

// Optional function parameters with type hints (PHP 7.1+)
function greet_with_greeting(string $name, ?string $greeting = null): string {
    if ($greeting === null) {
        $greeting = "Hello";
    }
    return "$greeting, $name!";
}
echo greet_with_greeting("Nasr") . "\n";
echo greet_with_greeting("Nasr", "Hi") . "\n";

// Variable functions: Using a string variable to call a function
$funcName = "greetUser";
echo $funcName("Dynamic Call") . "\n";

// Variable scope (global keyword)
$globalVar = "I am a global variable.";
function testScope() {
    global $globalVar; // Access the global variable
    echo "Inside testScope: " . $globalVar . "\n";
}
testScope();
echo "Outside testScope: " . $globalVar . "\n";

echo "\n"; // Add a newline for better readability between sections

// --- Section 9: Superglobals ---

echo "--- Section 9: Superglobals ---\n";

// $_SERVER: Contains information about the server and execution environment
echo "Current script name: " . $_SERVER['PHP_SELF'] . "\n";
echo "Request method: " . ($_SERVER['REQUEST_METHOD'] ?? 'CLI') . "\n"; // 'CLI' for command line interface
echo "User agent: " . ($_SERVER['HTTP_USER_AGENT'] ?? 'N/A') . "\n";
echo "Client IP address: " . ($_SERVER['REMOTE_ADDR'] ?? 'N/A') . "\n";

// Note: Other superglobals like $_GET, $_POST, $_REQUEST, $_SESSION, $_COOKIE, $_FILES
// are typically used in web contexts and would require a web server to demonstrate fully.

echo "\n"; // Add a newline for better readability between sections

// --- Section 10: Classes and Objects ---

echo "--- Section 10: Classes and Objects ---\n";

// Basic Class and Object
class Person {
    // Properties (attributes)
    public $name;
    public $age;

    // Constructor method, called when a new object is created
    public function __construct($name, $age) {
        $this->name = $name;
        $this->age = $age;
    }

    // Method (behavior)
    public function introduce() {
        return "Hello, my name is " . $this->name . " and I am " . $this->age . " years old.";
    }
}

// Creating an object (instantiating the class)
$person1 = new Person("Nasr", 25);
echo $person1->introduce() . "\n";

// Accessing properties directly
echo "Person 1's name: " . $person1->name . "\n";

// Inheritance: Student class extends Person
class Student extends Person {
    public $studentId;

    public function __construct($name, $age, $studentId) {
        parent::__construct($name, $age); // Call parent constructor
        $this->studentId = $studentId;
    }

    // Overriding the parent method
    public function introduce() {
        return parent::introduce() . " My student ID is " . $this->studentId . ".";
    }
}

$student1 = new Student("Ali", 20, "S12345");
echo $student1->introduce() . "\n";

// Encapsulation: Using private properties and public methods (getters/setters)
class BankAccount {
    private $balance; // Private property, only accessible within the class

    public function __construct($initialBalance) {
        if ($initialBalance < 0) {
            throw new InvalidArgumentException("Initial balance cannot be negative.");
        }
        $this->balance = $initialBalance;
    }

    public function deposit($amount) {
        if ($amount > 0) {
            $this->balance += $amount;
            echo "Deposited $" . $amount . ". New balance: $" . $this->balance . "\n";
        } else {
            echo "Deposit amount must be positive.\n";
        }
    }

    public function withdraw($amount) {
        if ($amount > 0 && $amount <= $this->balance) {
            $this->balance -= $amount;
            echo "Withdrew $" . $amount . ". New balance: $" . $this->balance . "\n";
        } elseif ($amount > $this->balance) {
            echo "Insufficient funds. Current balance: $" . $this->balance . "\n";
        } else {
            echo "Withdrawal amount must be positive.\n";
        }
    }

    public function getBalance() {
        return $this->balance;
    }
}

$account = new BankAccount(1000);
$account->deposit(500);
$account->withdraw(200);
$account->withdraw(1500); // Insufficient funds
echo "Final account balance: $" . $account->getBalance() . "\n";

// Static methods and properties
class Calculator {
    public static $operationCount = 0; // Static property

    public static function add($a, $b) {
        self::$operationCount++; // Access static property using self::
        return $a + $b;
    }

    public static function subtract($a, $b) {
        self::$operationCount++;
        return $a - $b;
    }
}
echo "Addition: " . Calculator::add(10, 5) . "\n";
echo "Subtraction: " . Calculator::subtract(10, 5) . "\n";
echo "Total calculator operations: " . Calculator::$operationCount . "\n";

// Optional properties (PHP 8.0+)
class Car {
    public function __construct(public string $make, public ?string $model = null) {}
}
$car1 = new Car("Toyota", "Corolla");
$car2 = new Car("Honda"); // model is null
echo "Car 1: " . $car1->make . " " . ($car1->model ?? "N/A") . "\n";
echo "Car 2: " . $car2->make . " " . ($car2->model ?? "N/A") . "\n";

echo "\n"; // Add a newline for better readability between sections

// --- Section 11: Interfaces and Polymorphism ---

echo "--- Section 11: Interfaces and Polymorphism ---\n";

// Interface: Defines a contract that classes must adhere to
interface Shape {
    public function area();
    public function perimeter();
}

// Class implementing the Shape interface
class Circle implements Shape {
    private $radius;

    public function __construct($radius) {
        $this->radius = $radius;
    }

    public function area() {
        return PI * $this->radius * $this->radius;
    }

    public function perimeter() {
        return 2 * PI * $this->radius;
    }
}

// Class implementing the Shape interface
class Rectangle implements Shape {
    private $width;
    private $height;

    public function __construct($width, $height) {
        $this->width = $width;
        $this->height = $height;
    }

    public function area() {
        return $this->width * $this->height;
    }

    public function perimeter() {
        return 2 * ($this->width + $this->height);
    }
}

// Polymorphism: Treating objects of different classes that implement the same interface uniformly
$shapes = array(new Circle(5), new Rectangle(4, 6));

foreach ($shapes as $shape) {
    echo "Shape Area: " . $shape->area() . ", Perimeter: " . $shape->perimeter() . "\n";
}

echo "\n"; // Add a newline for better readability between sections

// --- Section 12: Traits (PHP 5.4+) ---

echo "--- Section 12: Traits ---\n";

// Trait: A mechanism for code reuse in single inheritance languages
trait Logger {
    public function log($message) {
        echo "LOG: " . $message . "\n";
    }
}

class UserService {
    use Logger; // Use the Logger trait

    public function createUser($username) {
        $this->log("User '" . $username . "' created.");
        // ... logic to create user
    }
}

$userService = new UserService();
$userService->createUser("JaneDoe");

echo "\n"; // Add a newline for better readability between sections

// --- Section 13: Abstract Classes ---

echo "--- Section 13: Abstract Classes ---\n";

// Abstract Class: Cannot be instantiated directly, must be extended
abstract class Vehicle {
    protected $make;
    protected $model;

    public function __construct($make, $model) {
        $this->make = $make;
        $this->model = $model;
    }

    // Abstract method: Must be implemented by child classes
    abstract public function start();

    public function getInfo() {
        return "Make: " . $this->make . ", Model: " . $this->model;
    }
}

class CarVehicle extends Vehicle {
    public function start() {
        return "Car engine started.\n";
    }
}

class Motorcycle extends Vehicle {
    public function start() {
        return "Motorcycle engine started.\n";
    }
}

$myCar = new CarVehicle("Toyota", "Camry");
echo $myCar->getInfo() . "\n";
echo $myCar->start();

$myMotorcycle = new Motorcycle("Honda", "CBR");
echo $myMotorcycle->getInfo() . "\n";
echo $myMotorcycle->start();

echo "\n"; // Add a newline for better readability between sections

// --- Section 14: Error Handling (Exceptions) ---

echo "--- Section 14: Error Handling (Exceptions) ---\n";

function checkAge($age) {
    if ($age < 0) {
        throw new Exception("Age cannot be negative.");
    } elseif ($age < 18) {
        throw new InvalidArgumentException("Must be 18 or older.");
    }
    return "Age is valid: " . $age . "\n";
}

try {
    echo checkAge(20);
    echo checkAge(16); // This will throw InvalidArgumentException
    echo checkAge(-5);  // This will not be reached
} catch (InvalidArgumentException $e) {
    echo "Caught InvalidArgumentException: " . $e->getMessage() . "\n";
} catch (Exception $e) {
    echo "Caught general Exception: " . $e->getMessage() . "\n";
} finally {
    echo "Error handling complete.\n";
}

try {
    echo checkAge(-10); // This will throw Exception
} catch (InvalidArgumentException $e) {
    echo "Caught InvalidArgumentException: " . $e->getMessage() . "\n";
} catch (Exception $e) {
    echo "Caught general Exception: " . $e->getMessage() . "\n";
} finally {
    echo "Second error handling complete.\n";
}

echo "\n"; // Add a newline for better readability between sections

// --- Section 15: Advanced Features (PHP 8.0+) ---

echo "--- Section 15: Advanced Features (PHP 8.0+) ---\n";

// Positional and Named Arguments
function createProduct(string $name, float $price, int $quantity = 1) {
    return "Product: $name, Price: $" . $price . ", Quantity: $quantity\n";
}
echo createProduct(name: "Laptop", price: 1200.50, quantity: 2);
echo createProduct(price: 50.00, name: "Mouse"); // Quantity uses default

// Nullsafe Operator (?->)
class OrderItem {
    public function __construct(public ?string $productName = null) {}
}
class Order {
    public function __construct(public ?OrderItem $item = null) {}
}

$order1 = new Order(new OrderItem("Book"));
$order2 = new Order(); // No item

echo "Order 1 Product: " . ($order1->item?->productName ?? "N/A") . "\n";
echo "Order 2 Product: " . ($order2->item?->productName ?? "N/A") . "\n";

echo "\n"; // Add a newline for better readability between sections

// --- End of PHP Scratchpad ---

?>
