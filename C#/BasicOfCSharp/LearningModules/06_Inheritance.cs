// This file demonstrates the concept of inheritance in C#, showing how derived classes can inherit properties and methods from a base class, promoting code reusability and establishing 'is-a' relationships.
using System;

public class Inheritance
{
    public static void ShowInheritance()
    {
        Console.WriteLine("\n--- C# Inheritance ---\n");

        // Create an object of the Dog class
        Dog myDog = new Dog();
        myDog.Name = "Buddy";
        myDog.Eat();
        myDog.Bark();

        // Create an object of the Cat class
        Cat myCat = new Cat();
        myCat.Name = "Whiskers";
        myCat.Eat();
        myCat.Meow();

        Console.WriteLine("\n--- End of Inheritance ---");
    }
}

// Base class
public class Animal
{
    public string Name { get; set; }

    public void Eat()
    {
        Console.WriteLine($"{Name} is eating.");
    }
}

// Derived class (inherits from Animal)
public class Dog : Animal
{
    public void Bark()
    {
        Console.WriteLine($"{Name} is barking.");
    }
}

// Derived class (inherits from Animal)
public class Cat : Animal
{
    public void Meow()
    {
        Console.WriteLine($"{Name} is meowing.");
    }
}