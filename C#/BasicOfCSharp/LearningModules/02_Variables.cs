// This file explores different types of variables in C#, including local, constant, static, instance, and readonly variables, demonstrating their declaration and usage.
using System;

public class Variables
{
    // A constant variable
    public const double PI = 3.14159;

    // A static variable
    public static int classCounter = 0;

    // An instance variable
    public string instanceVariable = "I am an instance variable.";

    // A static readonly variable
    public static readonly int ReadOnlyVariable = 20;

    public static void ShowVariables()
    {
        Console.WriteLine("\n--- C# Variables ---\n");

        // Local variable
        int localVariable = 10;
        Console.WriteLine($"Local variable: {localVariable}");

        // Using the constant variable
        Console.WriteLine($"Constant variable (PI): {PI}");

        // Using the static variable
        Variables.classCounter++;
        Console.WriteLine($"Static variable (classCounter): {Variables.classCounter}");

        // Using the instance variable
        Variables instance1 = new Variables();
        Variables instance2 = new Variables();
        Console.WriteLine($"Instance 1 variable: {instance1.instanceVariable}");
        instance1.instanceVariable = "Modified instance variable.";
        Console.WriteLine($"Instance 1 variable (modified): {instance1.instanceVariable}");
        Console.WriteLine($"Instance 2 variable: {instance2.instanceVariable}");


        // Using the static readonly variable
        Console.WriteLine($"Read-only variable: {ReadOnlyVariable}");
        // The following line would cause a compilation error:
        // ReadOnlyVariable = 30;

        Console.WriteLine("\n--- End of Variables ---");
    }
}
