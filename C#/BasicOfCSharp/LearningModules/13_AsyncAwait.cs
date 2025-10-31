// This file demonstrates asynchronous programming in C# using the async and await keywords, enabling non-blocking operations and improving application responsiveness.
using System;
using System.Threading.Tasks;

public class AsyncAwait
{
    public static async Task ShowAsyncAwait()
    {
        Console.WriteLine("\n--- C# Async/Await ---\n");

        Console.WriteLine("Starting asynchronous operation...");
        string result = await LongRunningOperation();
        Console.WriteLine($"Asynchronous operation completed with result: {result}");

        Console.WriteLine("\n--- End of Async/Await ---");
    }

    static async Task<string> LongRunningOperation()
    {
        Console.WriteLine("Long running operation started...");
        await Task.Delay(2000); // Simulate a 2-second delay
        Console.WriteLine("Long running operation finished.");
        return "Success";
    }
}