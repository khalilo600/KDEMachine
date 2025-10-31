// This file introduces the fundamental concepts of classes and objects in C#, demonstrating how to define classes, create objects, and use properties and methods to encapsulate data and behavior.
using System;

public class ClassesAndObjects
{
    public static void ShowClassesAndObjects()
    {
        Console.WriteLine("\n--- C# Classes and Objects ---\n");

        // Create an object of the Person class
        Person person1 = new Person("Alice", 30);
        person1.Introduce();

        // Create another object
        Person person2 = new Person("Bob", 25);
        person2.Introduce();

        // Accessing properties
        Console.WriteLine($"\n{person1.Name} is {person1.Age} years old.");

        // Modifying properties
        person1.Age = 31;
        Console.WriteLine($"{person1.Name} is now {person1.Age} years old.");

        Console.WriteLine("\n--- End of Classes and Objects ---");
    }
}

public class Person
{
    // Fields
    private string _name;
    private int _age;

    // Properties
    public string Name
    {
        get { return _name; }
        set { _name = value; }
    }

    public int Age
    {
        get { return _age; }
        set
        {
            if (value > 0)
            {
                _age = value;
            }
        }
    }

    // Constructor
    public Person(string name, int age)
    {
        _name = name;
        _age = age;
    }

    // Method
    public void Introduce()
    {
        Console.WriteLine($"Hi, my name is {_name} and I am {_age} years old.");
    }
}