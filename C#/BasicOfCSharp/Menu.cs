using System;
using System.Threading.Tasks;
using BasicOfCSharp.LearningModules; // Added for learning modules

public class Menu
{
    public static async Task Run()
    {
        while (true)
        {
            Console.WriteLine("\n--- C# Learning Platform ---\n");
            Console.WriteLine("1. Run all learning examples");
            Console.WriteLine("2. Run Simple Calculator");
            Console.WriteLine("3. Run Guess the Number Game");
            Console.WriteLine("4. Run To-Do List");
            Console.WriteLine("5. Run Text Adventure Game");
            Console.WriteLine("6. Run Contact Book");
            Console.WriteLine("7. Exit");
            Console.Write("Enter your choice: ");

            string choice = Console.ReadLine();
            switch (choice)
            {
                case "1":
                    DataTypes.ShowDataTypes();
                    Variables.ShowVariables();
                    ControlFlow.ShowControlFlow();
                    Methods.ShowMethods();
                    ClassesAndObjects.ShowClassesAndObjects();
                    Inheritance.ShowInheritance();
                    Polymorphism.ShowPolymorphism();
                    Interfaces.ShowInterfaces();
                    ArraysAndCollections.ShowArraysAndCollections();
                    Strings.ShowStrings();
                    Exceptions.ShowExceptions();
                    LINQ.ShowLINQ();
                    await AsyncAwait.ShowAsyncAwait();
                    DelegatesAndEvents.ShowDelegatesAndEvents();
                    Generics.ShowGenerics();
                    FileIO.ShowFileIO();
                    Reflection.ShowReflection();
                    Attributes.ShowAttributes();
                    break;
                case "2":
                    SimpleCalculator.Run();
                    break;
                case "3":
                    GuessTheNumberGame.Run();
                    break;
                case "4":
                    TodoList.Run();
                    break;
                case "5":
                    TextAdventureGame.Run();
                    break;
                case "6":
                    ContactBook.Run();
                    break;
                case "7":
                    return;
                default:
                    Console.WriteLine("Invalid choice. Please try again.");
                    break;
            }
        }
    }
}