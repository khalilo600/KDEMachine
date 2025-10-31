// This file explores arrays and various collection types in C#, such as Lists and Dictionaries, demonstrating how to store, access, and manipulate groups of data efficiently.
using System;
using System.Collections.Generic;

public class ArraysAndCollections
{
    public static void ShowArraysAndCollections()
    {
        Console.WriteLine("\n--- C# Arrays and Collections ---\n");

        // Arrays
        Console.WriteLine("--- Arrays ---");
        int[] numbers = { 1, 2, 3, 4, 5 };
        Console.WriteLine("Array elements:");
        for (int i = 0; i < numbers.Length; i++)
        {
            Console.WriteLine(numbers[i]);
        }

        // Lists
        Console.WriteLine("\n--- Lists ---");
        List<string> names = new List<string>();
        names.Add("Alice");
        names.Add("Bob");
        names.Add("Charlie");
        Console.WriteLine("List elements:");
        foreach (string name in names)
        {
            Console.WriteLine(name);
        }

        // Dictionaries
        Console.WriteLine("\n--- Dictionaries ---");
        Dictionary<string, int> ages = new Dictionary<string, int>();
        ages.Add("Alice", 30);
        ages.Add("Bob", 25);
        ages.Add("Charlie", 35);
        Console.WriteLine("Dictionary elements:");
        foreach (KeyValuePair<string, int> entry in ages)
        {
            Console.WriteLine($"{entry.Key}: {entry.Value}");
        }

        Console.WriteLine("\n--- End of Arrays and Collections ---");
    }
}