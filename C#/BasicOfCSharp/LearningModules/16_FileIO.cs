// This file demonstrates basic file input/output (I/O) operations in C#, including reading from, writing to, appending to, and deleting files using the System.IO namespace.
using System;
using System.IO;

public class FileIO
{
    public static void ShowFileIO()
    {
        Console.WriteLine("\n--- C# File I/O ---\n");

        string filePath = "test.txt";

        // Write to a file
        try
        {
            File.WriteAllText(filePath, "Hello, File I/O!");
            Console.WriteLine("Successfully wrote to the file.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error writing to file: {ex.Message}");
        }

        // Read from a file
        try
        {
            string content = File.ReadAllText(filePath);
            Console.WriteLine($"File content: {content}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error reading from file: {ex.Message}");
        }

        // Append to a file
        try
        {
            File.AppendAllText(filePath, "\nThis is a new line.");
            Console.WriteLine("Successfully appended to the file.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error appending to file: {ex.Message}");
        }

        // Read the updated content
        try
        {
            string content = File.ReadAllText(filePath);
            Console.WriteLine($"Updated file content: {content}");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error reading from file: {ex.Message}");
        }

        // Delete the file
        try
        {
            File.Delete(filePath);
            Console.WriteLine("Successfully deleted the file.");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error deleting file: {ex.Message}");
        }


        Console.WriteLine("\n--- End of File I/O ---");
    }
}