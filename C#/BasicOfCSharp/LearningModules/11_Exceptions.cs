// This file demonstrates exception handling in C# using try-catch-finally blocks to gracefully manage runtime errors and prevent application crashes.
using System;

public class Exceptions
{
    public static void ShowExceptions()
    {
        Console.WriteLine("\n--- C# Exceptions ---\n");

        try
        {
            // This will cause a DivideByZeroException
            int zero = 0;
            int result = 10 / zero;
            Console.WriteLine($"Result: {result}");
        }
        catch (DivideByZeroException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }
        finally
        {
            Console.WriteLine("This block is always executed.");
        }

        try
        {
            // This will cause a FormatException
            string notANumber = "abc";
            int number = int.Parse(notANumber);
            Console.WriteLine($"Parsed number: {number}");
        }
        catch (FormatException ex)
        {
            Console.WriteLine($"Error: {ex.Message}");
        }

        Console.WriteLine("\n--- End of Exceptions ---");
    }
}