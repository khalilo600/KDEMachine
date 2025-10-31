using System;

// This is the main entry point for the C# Applications project.
// It provides a menu-driven interface to access various small applications.
public class Program
{
    public static void Main(string[] args)
    {
        // The main application loop, continues until the user chooses to exit.
        while (true)
        {
            // Display the main menu options to the user.
            Console.WriteLine("\n--- C# Applications Menu ---");
            Console.WriteLine("1. Contact Book");
            Console.WriteLine("2. Guess the Number Game");
            Console.WriteLine("3. Simple Calculator");
            Console.WriteLine("4. Text Adventure Game");
            Console.WriteLine("5. To-Do List");
            Console.WriteLine("6. Exit");
            Console.Write("Enter your choice: ");

            // Read the user's input.
            string? choice = Console.ReadLine();

            // Validate the input to ensure it's not null or empty.
            if (string.IsNullOrEmpty(choice))
            {
                Console.WriteLine("Invalid choice. Please try again.");
                continue; // Continue to the next iteration of the loop, redisplaying the menu.
            }

            // Use a switch statement to perform actions based on the user's choice.
            switch (choice)
            {
                case "1":
                    // Call the Run method of the ContactBook application.
                    ContactBook.Run();
                    break;
                case "2":
                    // Call the Run method of the GuessTheNumberGame application.
                    GuessTheNumberGame.Run();
                    break;
                case "3":
                    // Call the Run method of the SimpleCalculator application.
                    SimpleCalculator.Run();
                    break;
                case "4":
                    // Call the Run method of the TextAdventureGame application.
                    TextAdventureGame.Run();
                    break;
                case "5":
                    // Call the Run method of the TodoList application.
                    TodoList.Run();
                    break;
                case "6":
                    // Exit the application.
                    Console.WriteLine("Exiting C# Applications. Goodbye!");
                    return; // Terminate the Main method and thus the application.
                default:
                    // Handle invalid menu choices.
                    Console.WriteLine("Invalid choice. Please try again.");
                    break;
            }
        }
    }
}
