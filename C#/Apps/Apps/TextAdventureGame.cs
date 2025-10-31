using System;

// Implements a very simple console-based text adventure game.
public class TextAdventureGame
{
    public static void Run()
    {
        Console.WriteLine("\n--- Text Adventure Game ---\n");
        Console.WriteLine("Welcome to the adventure!");
        Console.WriteLine("You are in a dark forest. You can go 'north' or 'south'.");

        // Read the user's choice for direction.
        string? choice = Console.ReadLine();

        // Validate user input.
        if (string.IsNullOrEmpty(choice))
        {
            Console.WriteLine("Invalid choice. You are lost in the forest forever.");
            return; // Exit if input is invalid.
        }

        // Convert choice to lowercase for case-insensitive comparison.
        if (choice.ToLower() == "north")
        {
            Console.WriteLine("You encounter a friendly squirrel. You win!");
        }
        else if (choice.ToLower() == "south")
        {
            Console.WriteLine("You fall into a pit. You lose!");
        }
        else
        {
            // Handle unrecognized choices.
            Console.WriteLine("Invalid choice. You are lost in the forest forever.");
        }
    }
}