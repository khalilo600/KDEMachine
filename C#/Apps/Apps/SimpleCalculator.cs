using System;

// Implements a simple console-based calculator that supports basic arithmetic operations
// and square root.
public class SimpleCalculator
{
    public static void Run()
    {
        Console.WriteLine("\n--- Simple Calculator ---\n");
        Console.WriteLine("Supported operations: +, -, *, /, ^ (power), sqrt (square root)");

        // Get the first number from the user.
        Console.Write("Enter the first number: ");
        string? num1Input = Console.ReadLine();
        double num1;
        // Validate and parse the first number.
        if (string.IsNullOrEmpty(num1Input) || !double.TryParse(num1Input, out num1))
        {
            Console.WriteLine("Invalid input for the first number.");
            return; // Exit if input is invalid.
        }

        // Get the operator from the user.
        Console.Write("Enter the operator (+, -, *, /, ^, sqrt): ");
        string? opInput = Console.ReadLine();

        // Validate the operator input.
        if (string.IsNullOrEmpty(opInput))
        {
            Console.WriteLine("Invalid input for the operator.");
            return; // Exit if input is invalid.
        }

        double result = 0;

        // Handle the special case of square root, which only requires one operand.
        if (opInput.ToLower() == "sqrt")
        {
            if (num1 >= 0)
            {
                result = Math.Sqrt(num1);
                Console.WriteLine($"Result: sqrt({num1}) = {result}");
            }
            else
            {
                Console.WriteLine("Error: Cannot calculate square root of a negative number.");
            }
            return; // Exit after calculating square root.
        }

        // Get the second number from the user for binary operations.
        Console.Write("Enter the second number: ");
        string? num2Input = Console.ReadLine();
        double num2;
        // Validate and parse the second number.
        if (string.IsNullOrEmpty(num2Input) || !double.TryParse(num2Input, out num2))
        {
            Console.WriteLine("Invalid input for the second number.");
            return; // Exit if input is invalid.
        }

        // Perform the calculation based on the operator using a switch statement.
        switch (opInput)
        {
            case "+":
                result = num1 + num2;
                break;
            case "-":
                result = num1 - num2;
                break;
            case "*":
                result = num1 * num2;
                break;
            case "/":
                // Handle division by zero.
                if (num2 != 0)
                {
                    result = num1 / num2;
                }
                else
                {
                    Console.WriteLine("Error: Cannot divide by zero.");
                    return; // Exit if division by zero occurs.
                }
                break;
            case "^":
                result = Math.Pow(num1, num2); // Math.Pow for power calculation.
                break;
            default:
                Console.WriteLine("Error: Invalid operator.");
                return; // Exit if an unknown operator is entered.
        }

        // Display the result of the operation.
        Console.WriteLine($"Result: {num1} {opInput} {num2} = {result}");
    }
}