using System;

// Implements a simple console-based "Guess the Number" game.
public class GuessTheNumberGame
{
    public static void Run()
    {
        Console.WriteLine("\n--- Guess the Number Game ---\n");

        // Initialize a Random object to generate a secret number.
        Random random = new Random();
        // Generate a random number between 1 and 100 (inclusive).
        int numberToGuess = random.Next(1, 101);
        int numberOfGuesses = 0;
        bool hasGuessedCorrectly = false;

        Console.WriteLine("I have selected a number between 1 and 100. Try to guess it!");

        // Game loop: continues until the user guesses the correct number.
        while (!hasGuessedCorrectly)
        {
            Console.Write("Enter your guess: ");
            // Read the user's guess. string? indicates it can be null.
            string? guessInput = Console.ReadLine();
            int userGuess;

            // Validate user input:
            // 1. Check if the input is null or empty.
            // 2. Try to parse the input string into an integer.
            if (string.IsNullOrEmpty(guessInput) || !int.TryParse(guessInput, out userGuess))
            {
                Console.WriteLine("Invalid input. Please enter a number.");
                continue; // Skip the rest of the loop and ask for input again.
            }

            numberOfGuesses++; // Increment the guess counter.

            // Compare the user's guess with the secret number and provide feedback.
            if (userGuess < numberToGuess)
            {
                Console.WriteLine("Too low!");
            }
            else if (userGuess > numberToGuess)
            {
                Console.WriteLine("Too high!");
            }
            else
            {
                // User guessed correctly.
                hasGuessedCorrectly = true;
                Console.WriteLine($"Congratulations! You guessed the number in {numberOfGuesses} tries.");
            }
        }
    }
}