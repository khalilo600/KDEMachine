# Java Exception Handling and File I/O

This guide covers two critical aspects of Java programming: robust error management through Exception Handling and efficient interaction with files and streams using Java's I/O capabilities.

## 1. Exception Handling

Exception handling is a mechanism to handle runtime errors gracefully, allowing the program to continue execution instead of crashing. It helps maintain the normal flow of the application.

### What are Exceptions?

An exception is an event that disrupts the normal flow of a program. It's an object that is thrown at runtime.

### `Error` vs `Exception`

*   **`Error`**: Represents serious problems that a reasonable application should not try to catch (e.g., `OutOfMemoryError`, `StackOverflowError`). These are typically unrecoverable.
*   **`Exception`**: Represents conditions that an application might want to catch (e.g., `IOException`, `SQLException`, `NullPointerException`).

### Checked vs Unchecked Exceptions

*   **Checked Exceptions:** Exceptions that are checked at compile time. The compiler forces you to either handle them (using `try-catch`) or declare them (using `throws`). Examples: `IOException`, `SQLException`.
*   **Unchecked Exceptions (Runtime Exceptions):** Exceptions that are not checked at compile time. They occur due to programming errors and are not required to be handled or declared. Examples: `NullPointerException`, `ArrayIndexOutOfBoundsException`, `ArithmeticException`.

### `try`/`catch`/`finally` Block

*   **`try`**: Contains the code that might throw an exception.
*   **`catch`**: Catches and handles the exception if one is thrown in the `try` block.
*   **`finally`**: Contains code that will always be executed, regardless of whether an exception occurred or was caught.

```java
public class ExceptionExample {
    public static void main(String[] args) {
        try {
            int result = 10 / 0; // This will throw an ArithmeticException
            System.out.println(result);
        } catch (ArithmeticException e) {
            System.out.println("Caught an ArithmeticException: " + e.getMessage());
        } catch (Exception e) { // Generic catch block for any other exception
            System.out.println("Caught a general Exception: " + e.getMessage());
        } finally {
            System.out.println("Finally block always executes.");
        }

        System.out.println("Program continues after exception handling.");
    }
}
```

### `throw` Keyword

Used to explicitly throw an exception from a method or any block of code.

```java
public class AgeValidator {
    public static void validateAge(int age) {
        if (age < 18) {
            throw new IllegalArgumentException("Age must be 18 or older.");
        }
        System.out.println("Age is valid.");
    }

    public static void main(String[] args) {
        try {
            validateAge(15);
        } catch (IllegalArgumentException e) {
            System.out.println("Validation Error: " + e.getMessage());
        }
    }
}
```

### `throws` Keyword

Used in a method signature to declare that a method might throw one or more checked exceptions. This forces the caller of the method to either handle or re-declare the exception.

```java
import java.io.IOException;

public class FileProcessor {
    public void readFile(String filePath) throws IOException {
        // Code that might throw IOException
        // For example, if the file doesn't exist or cannot be read
        throw new IOException("File not found or cannot be read.");
    }

    public static void main(String[] args) {
        FileProcessor processor = new FileProcessor();
        try {
            processor.readFile("nonexistent.txt");
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        }
    }
}
```

### Custom Exceptions

You can create your own custom exception classes by extending `Exception` (for checked exceptions) or `RuntimeException` (for unchecked exceptions).

```java
class InsufficientFundsException extends Exception {
    public InsufficientFundsException(String message) {
        super(message);
    }
}

public class BankAccount {
    private double balance;

    public BankAccount(double initialBalance) {
        this.balance = initialBalance;
    }

    public void withdraw(double amount) throws InsufficientFundsException {
        if (amount > balance) {
            throw new InsufficientFundsException("Insufficient funds. Current balance: " + balance);
        }
        balance -= amount;
        System.out.println("Withdrawal successful. New balance: " + balance);
    }

    public static void main(String[] args) {
        BankAccount account = new BankAccount(500);
        try {
            account.withdraw(700);
        } catch (InsufficientFundsException e) {
            System.out.println("Transaction failed: " + e.getMessage());
        }
    }
}
```

### `try-with-resources` (Automatic Resource Management)

Introduced in Java 7, this construct ensures that any resource (an object that implements `java.lang.AutoCloseable`) opened in the `try` statement is automatically closed when the `try` block exits, regardless of whether an exception occurred.

```java
import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;

public class TryWithResourcesExample {
    public static void main(String[] args) {
        String line;
        try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
            while ((line = br.readLine()) != null) {
                System.out.println(line);
            }
        } catch (IOException e) {
            System.out.println("Error reading file: " + e.getMessage());
        } // No need for a finally block to close br
    }
}
```

## 2. File I/O (Input/Output)

Java provides robust mechanisms for reading from and writing to files and other I/O sources.

### `java.io` Package

This package provides classes for input and output operations using streams.

#### `File` Class

Represents a file or directory path. Used for creating, deleting, renaming files/directories, checking existence, etc.

```java
import java.io.File;

public class FileClassExample {
    public static void main(String[] args) {
        File file = new File("my_file.txt");

        try {
            if (file.createNewFile()) {
                System.out.println("File created: " + file.getName());
            } else {
                System.out.println("File already exists.");
            }

            System.out.println("Absolute path: " + file.getAbsolutePath());
            System.out.println("File size: " + file.length() + " bytes");

            if (file.delete()) {
                System.out.println("File deleted: " + file.getName());
            }
        } catch (IOException e) {
            System.out.println("An error occurred: " + e.getMessage());
        }
    }
}
```

#### `InputStream` and `OutputStream` (Byte Streams)

Used for reading/writing raw bytes. Suitable for binary data (images, audio, etc.).

*   **`FileInputStream`**: Reads bytes from a file.
*   **`FileOutputStream`**: Writes bytes to a file.

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class ByteStreamExample {
    public static void main(String[] args) {
        try (FileInputStream fis = new FileInputStream("input.txt");
             FileOutputStream fos = new FileOutputStream("output.txt")) {

            int byteRead;
            while ((byteRead = fis.read()) != -1) {
                fos.write(byteRead);
            }
            System.out.println("File copied using byte streams.");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### `Reader` and `Writer` (Character Streams)

Used for reading/writing characters. Suitable for text data. Automatically handles character encoding.

*   **`FileReader`**: Reads characters from a file.
*   **`FileWriter`**: Writes characters to a file.
*   **`BufferedReader`**: Buffers input from a `Reader` for efficiency, provides `readLine()`.
*   **`BufferedWriter`**: Buffers output to a `Writer` for efficiency.

```java
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;

public class CharStreamExample {
    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader("input.txt"));
             BufferedWriter writer = new BufferedWriter(new FileWriter("output_char.txt"))) {

            String line;
            while ((line = reader.readLine()) != null) {
                writer.write(line);
                writer.newLine(); // Add a new line after each line read
            }
            System.out.println("File copied using character streams.");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### `Scanner` for Input

Used for parsing primitive types and strings using regular expressions. Very convenient for reading user input from the console or data from files.

```java
import java.io.File;
import java.io.FileNotFoundException;
import java.util.Scanner;

public class ScannerExample {
    public static void main(String[] args) {
        // Reading from console
        Scanner consoleScanner = new Scanner(System.in);
        System.out.print("Enter your name: ");
        String name = consoleScanner.nextLine();
        System.out.println("Hello, " + name);
        consoleScanner.close();

        // Reading from a file
        try (Scanner fileScanner = new Scanner(new File("numbers.txt"))) {
            while (fileScanner.hasNextInt()) {
                int number = fileScanner.nextInt();
                System.out.println("Number from file: " + number);
            }
        } catch (FileNotFoundException e) {
            System.out.println("File not found: " + e.getMessage());
        }
    }
}
```

#### `PrintWriter` for Output

Writes formatted representations of objects to a text-output stream. Very useful for writing text to files or console.

```java
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class PrintWriterExample {
    public static void main(String[] args) {
        try (PrintWriter writer = new PrintWriter(new FileWriter("report.txt"))) {
            writer.println("Sales Report");
            writer.printf("Product: %s, Quantity: %d, Price: %.2f%n", "Laptop", 5, 1200.50);
            writer.println("End of Report.");
            System.out.println("Report written to file.");
        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

### `java.nio` Package (NIO.2 - New I/O)

Introduced in Java 7, NIO.2 provides a new file system API that is more flexible and efficient, especially for handling large files and asynchronous I/O.

#### `Path` and `Paths`

`Path` represents a path to a file or directory. `Paths` is a utility class to get `Path` instances.

```java
import java.nio.file.Path;
import java.nio.file.Paths;

public class PathExample {
    public static void main(String[] args) {
        Path path = Paths.get("C:", "users", "documents", "my_document.txt");
        // Or for current directory:
        // Path path = Paths.get("my_document.txt");

        System.out.println("File Name: " + path.getFileName());
        System.out.println("Parent Directory: " + path.getParent());
        System.out.println("Is Absolute: " + path.isAbsolute());
    }
}
```

#### `Files` Class (Utility Methods for File Operations)

Provides static methods for common file operations, making them simpler and more robust.

*   `Files.exists()`, `Files.createFile()`, `Files.delete()`, `Files.copy()`, `Files.move()`
*   `Files.readAllLines()`, `Files.write()`

```java
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

public class FilesClassExample {
    public static void main(String[] args) {
        Path source = Paths.get("source.txt");
        Path destination = Paths.get("destination.txt");

        try {
            // Create a file and write content
            Files.write(source, "Hello NIO.2\nAnother line".getBytes());
            System.out.println("Source file created.");

            // Read all lines
            List<String> lines = Files.readAllLines(source);
            System.out.println("Content of source.txt:");
            for (String line : lines) {
                System.out.println(line);
            }

            // Copy file
            Files.copy(source, destination, java.nio.file.StandardCopyOption.REPLACE_EXISTING);
            System.out.println("File copied.");

            // Delete file
            Files.delete(source);
            System.out.println("Source file deleted.");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

#### Directory Operations

```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.io.IOException;

public class DirectoryExample {
    public static void main(String[] args) {
        Path dir = Paths.get("my_directory");

        try {
            if (Files.notExists(dir)) {
                Files.createDirectory(dir);
                System.out.println("Directory created: " + dir.getFileName());
            }

            // Create a file inside the new directory
            Path fileInDir = dir.resolve("file_in_dir.txt");
            Files.createFile(fileInDir);
            System.out.println("File created in directory: " + fileInDir.getFileName());

            // List directory contents
            Files.list(dir).forEach(System.out::println);

            // Delete directory (must be empty)
            Files.delete(fileInDir);
            Files.delete(dir);
            System.out.println("Directory and file deleted.");

        } catch (IOException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }
}
```

## 3. Serialization

Serialization is the process of converting an object into a byte stream to store the object or transmit it to memory, a database, or a file. The byte stream can then be deserialized back into a copy of the object.

### `Serializable` Interface

To make an object serializable, its class must implement the `java.io.Serializable` marker interface. This interface has no methods.

### `ObjectOutputStream`/`ObjectInputStream`

Used to write/read objects to/from a stream.

```java
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.io.Serializable;

class User implements Serializable {
    private static final long serialVersionUID = 1L; // Recommended for version control
    String username;
    transient String password; // 'transient' fields are not serialized
    int age;

    public User(String username, String password, int age) {
        this.username = username;
        this.password = password;
        this.age = age;
    }

    @Override
    public String toString() {
        return "User{username='" + username + "', password='" + password + "', age=" + age + "}";
    }
}

public class SerializationExample {
    public static void main(String[] args) {
        User user = new User("john_doe", "secret123", 30);
        String filename = "user.ser";

        // Serialization
        try (FileOutputStream fileOut = new FileOutputStream(filename);
             ObjectOutputStream out = new ObjectOutputStream(fileOut)) {
            out.writeObject(user);
            System.out.println("User object serialized to " + filename);
        } catch (IOException i) {
            i.printStackTrace();
        }

        // Deserialization
        User deserializedUser = null;
        try (FileInputStream fileIn = new FileInputStream(filename);
             ObjectInputStream in = new ObjectInputStream(fileIn)) {
            deserializedUser = (User) in.readObject();
            System.out.println("User object deserialized: " + deserializedUser);
        } catch (IOException i) {
            i.printStackTrace();
        } catch (ClassNotFoundException c) {
            System.out.println("User class not found");
            c.printStackTrace();
        }
    }
}
```

### `transient` Keyword

If you don't want a particular field to be serialized, you can mark it with the `transient` keyword. When the object is deserialized, `transient` fields will be initialized to their default values (e.g., `null` for objects, `0` for `int`, `false` for `boolean`).

```