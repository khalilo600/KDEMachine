// This file covers string manipulation and formatting in C#, including common operations like concatenation, substrings, and case conversion, as well as various formatting options for dates, currencies, and numbers.
using System;

public class Strings
{
    public static void ShowStrings()
    {
        Console.WriteLine("\n--- C# Strings and Formatting ---\n");

        string message = "Hello, World!";

        // String length
        Console.WriteLine($"Length of the string: {message.Length}");

        // ToUpper and ToLower
        Console.WriteLine($"Uppercase: {message.ToUpper()}");
        Console.WriteLine($"Lowercase: {message.ToLower()}");

        // Substring
        Console.WriteLine($"Substring (from index 7): {message.Substring(7)}");

        // IndexOf
        Console.WriteLine($"Index of 'W': {message.IndexOf('W')}");

        // Concatenation
        string name = "John";
        string greeting = "Hello, " + name;
        Console.WriteLine(greeting);

        // String interpolation
        string interpolatedGreeting = $"Hello, {name}!";
        Console.WriteLine(interpolatedGreeting);

        // --- Formatting ---

        Console.WriteLine("\n--- Formatting ---\n");

        // Date and Time Formatting
        Console.WriteLine("--- Date and Time Formatting ---");
        DateTime now = DateTime.Now;
        Console.WriteLine($"Default date format: {now}");
        Console.WriteLine($"Short date format: {now:d}");
        Console.WriteLine($"Long date format: {now:D}");
        Console.WriteLine($"Short time format: {now:t}");
        Console.WriteLine($"Long time format: {now:T}");
        Console.WriteLine($"Custom format (yyyy-MM-dd HH:mm:ss): {now:yyyy-MM-dd HH:mm:ss}");

        // Currency Formatting
        Console.WriteLine("\n--- Currency Formatting ---");
        double price = 123.45;
        Console.WriteLine($"Default currency format: {price:C}");
        Console.WriteLine($"Currency format with 3 decimal places: {price:C3}");

        // Number Formatting
        Console.WriteLine("\n--- Number Formatting ---");
        int number = 1234567;
        Console.WriteLine($"Default number format: {number:N}");
        Console.WriteLine($"Number format with 0 decimal places: {number:N0}");
        double percentage = 0.87;
        Console.WriteLine($"Percentage format: {percentage:P}");
        Console.WriteLine($"Percentage format with 1 decimal place: {percentage:P1}");

        Console.WriteLine("\n--- End of Strings and Formatting ---");
    }
}
