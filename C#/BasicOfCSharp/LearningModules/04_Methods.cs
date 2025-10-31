// This file covers the definition and usage of methods in C#, including method overloading, named arguments, optional parameters, and recursion, to organize and reuse code.
using System;

public class Methods
{
    public static void ShowMethods()
    {
        Console.WriteLine("\n--- C# Methods ---\n");

        // Simple method call
        SayHello();

        // Method with parameters
        int sum = Add(5, 7);
        Console.WriteLine($"Sum of 5 and 7 is {sum}");

        // Method overloading
        Console.WriteLine($"Sum of 5 and 7 is {Add(5, 7)}");
        Console.WriteLine($"Sum of 5.5 and 7.5 is {Add(5.5, 7.5)}");

        // Named arguments
        PrintPersonDetails(name: "John", age: 30);

        // Optional parameters
        PrintMessage("This is a message.");
        PrintMessage("This is a message with a prefix.", "Info");

        // Recursive method
        int factorial = Factorial(5);
        Console.WriteLine($"Factorial of 5 is {factorial}");

        Console.WriteLine("\n--- End of Methods ---");
    }

    // Simple method
    static void SayHello()
    {
        Console.WriteLine("Hello, World!");
    }

    // Method with parameters and return value
    static int Add(int a, int b)
    {
        return a + b;
    }

    // Method overloading
    static double Add(double a, double b)
    {
        return a + b;
    }

    // Method with named arguments
    static void PrintPersonDetails(string name, int age)
    {
        Console.WriteLine($"Name: {name}, Age: {age}");
    }

    // Method with optional parameters
    static void PrintMessage(string message, string prefix = "Log")
    {
        Console.WriteLine($"[{prefix}] {message}");
    }

    // Recursive method
    static int Factorial(int n)
    {
        if (n == 0)
        {
            return 1;
        }
        else
        {
            return n * Factorial(n - 1);
        }
    }
}