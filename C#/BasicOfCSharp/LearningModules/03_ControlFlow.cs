// This file demonstrates various control flow statements in C#, including if-else, switch, for, foreach, while, and do-while loops, illustrating how to manage program execution logic.
using System;
using System.Collections.Generic;

public class ControlFlow
{
    public static void ShowControlFlow()
    {
        Console.WriteLine("\n--- C# Control Flow ---\n");

        // if-else statement
        Console.WriteLine("--- if-else statement ---");
        int number = 10;
        if (number > 5)
        {
            Console.WriteLine("Number is greater than 5.");
        }
        else if (number < 5)
        {
            Console.WriteLine("Number is less than 5.");
        }
        else
        {
            Console.WriteLine("Number is equal to 5.");
        }

        // switch statement
        Console.WriteLine("\n--- switch statement ---");
        char grade = 'B';
        switch (grade)
        {
            case 'A':
                Console.WriteLine("Excellent!");
                break;
            case 'B':
                Console.WriteLine("Good");
                break;
            case 'C':
                Console.WriteLine("Fair");
                break;
            case 'D':
                Console.WriteLine("Needs Improvement");
                break;
            default:
                Console.WriteLine("Invalid Grade");
                break;
        }

        // for loop
        Console.WriteLine("\n--- for loop ---");
        for (int i = 0; i < 5; i++)
        {
            Console.WriteLine($"Iteration {i}");
        }

        // foreach loop
        Console.WriteLine("\n--- foreach loop ---");
        List<string> fruits = new List<string> { "Apple", "Banana", "Cherry" };
        foreach (string fruit in fruits)
        {
            Console.WriteLine(fruit);
        }

        // while loop
        Console.WriteLine("\n--- while loop ---");
        int count = 0;
        while (count < 3)
        {
            Console.WriteLine($"Count is {count}");
            count++;
        }

        // do-while loop
        Console.WriteLine("\n--- do-while loop ---");
        int j = 0;
        do
        {
            Console.WriteLine($"j = {j}");
            j++;
        } while (j < 3);

        Console.WriteLine("\n--- End of Control Flow ---");
    }
}