using System;
using System.Collections.Generic;
using System.IO; // Required for file operations (reading and writing to files).

// Implements a simple console-based To-Do List application with file persistence.
public class TodoList
{
    // Static field to define the file path where tasks will be stored.
    private static string _filePath = "tasks.txt";

    public static void Run()
    {
        Console.WriteLine("\n--- To-Do List ---\n");

        // Load existing tasks from the file when the application starts.
        List<string> tasks = LoadTasks();

        // Main application loop for the To-Do List.
        while (true)
        {
            // Display menu options to the user.
            Console.WriteLine("\n1. Add a task");
            Console.WriteLine("2. View all tasks");
            Console.WriteLine("3. Remove a task");
            Console.WriteLine("4. Exit To-Do List");
            Console.Write("Enter your choice: ");

            // Read user input for menu choice.
            string? choice = Console.ReadLine();
            switch (choice)
            {
                case "1":
                    // Option to add a new task.
                    Console.Write("Enter the task: ");
                    string? taskInput = Console.ReadLine();
                    // Validate that the task input is not empty or just whitespace.
                    if (!string.IsNullOrWhiteSpace(taskInput))
                    {
                        tasks.Add(taskInput); // Add the task to the list.
                        SaveTasks(tasks); // Save the updated list to the file.
                        Console.WriteLine("Task added.");
                    }
                    else
                    {
                        Console.WriteLine("Task cannot be empty.");
                    }
                    break;
                case "2":
                    // Option to view all tasks.
                    Console.WriteLine("\n--- Tasks ---");
                    if (tasks.Count == 0)
                    {
                        Console.WriteLine("No tasks to show.");
                    }
                    else
                    {
                        // Iterate through the tasks and display them with a number.
                        for (int i = 0; i < tasks.Count; i++)
                        {
                            Console.WriteLine($"{i + 1}. {tasks[i]}");
                        }
                    }
                    break;
                case "3":
                    // Option to remove a task.
                    Console.Write("Enter the number of the task to remove: ");
                    string? taskNumberInput = Console.ReadLine();
                    // Try to parse the input as an integer and validate its range.
                    if (int.TryParse(taskNumberInput, out int taskNumber) && taskNumber > 0 && taskNumber <= tasks.Count)
                    {
                        tasks.RemoveAt(taskNumber - 1); // Remove the task (adjust for 0-based index).
                        SaveTasks(tasks); // Save the updated list to the file.
                        Console.WriteLine("Task removed.");
                    }
                    else
                    {
                        Console.WriteLine("Invalid task number.");
                    }
                    break;
                case "4":
                    // Exit the To-Do List application.
                    return; // Exit the Run method.
                default:
                    // Handle invalid menu choices.
                    Console.WriteLine("Invalid choice. Please try again.");
                    break;
            }
        }
    }

    // Loads tasks from the specified file.
    private static List<string> LoadTasks()
    {
        // Check if the task file exists.
        if (File.Exists(_filePath))
        {
            try
            {
                // Read all lines from the file and return them as a new List of strings.
                return new List<string>(File.ReadAllLines(_filePath));
            }
            catch (Exception ex)
            {
                // Handle potential errors during file reading.
                Console.WriteLine($"Error loading tasks: {ex.Message}");
                return new List<string>(); // Return an empty list on error.
            }
        }
        return new List<string>(); // Return an empty list if the file does not exist.
    }

    // Saves the current list of tasks to the specified file.
    private static void SaveTasks(List<string> tasks)
    {
        try
        {
            // Write all tasks (each as a new line) to the file.
            File.WriteAllLines(_filePath, tasks);
        }
        catch (Exception ex)
        {
            // Handle potential errors during file writing.
            Console.WriteLine($"Error saving tasks: {ex.Message}");
        }
    }
}