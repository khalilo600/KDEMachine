// This file introduces Language Integrated Query (LINQ) in C#, demonstrating how to query and manipulate data from various sources using both query syntax and method syntax.
using System;
using System.Collections.Generic;
using System.Linq;

public class LINQ
{
    public static void ShowLINQ()
    {
        Console.WriteLine("\n--- C# LINQ ---\n");

        // Create a list of numbers
        List<int> numbers = new List<int> { 5, 10, 8, 3, 6, 12 };

        // Query syntax
        var querySyntax = from num in numbers
                          where num > 5
                          orderby num descending
                          select num;

        Console.WriteLine("Numbers greater than 5 (Query Syntax):");
        foreach (int num in querySyntax)
        {
            Console.WriteLine(num);
        }

        // Method syntax
        var methodSyntax = numbers.Where(num => num > 5).OrderByDescending(num => num);

        Console.WriteLine("\nNumbers greater than 5 (Method Syntax):");
        foreach (int num in methodSyntax)
        {
            Console.WriteLine(num);
        }

        Console.WriteLine("\n--- End of LINQ ---");
    }
}