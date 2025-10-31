// This file demonstrates the use of interfaces in C#, defining a contract for classes to implement, thereby enabling a form of polymorphism and promoting loose coupling in software design.
using System;

public class Interfaces
{
    public static void ShowInterfaces()
    {
        Console.WriteLine("\n--- C# Interfaces ---\n");

        // Create an object of the Car class
        Car myCar = new Car();
        myCar.Start();
        myCar.Drive();
        myCar.Stop();

        Console.WriteLine("\n--- End of Interfaces ---");
    }
}

// Interface
public interface IDrivable
{
    void Start();
    void Stop();
    void Drive();
}

// Class that implements the interface
public class Car : IDrivable
{
    public void Start()
    {
        Console.WriteLine("Car started.");
    }

    public void Stop()
    {
        Console.WriteLine("Car stopped.");
    }

    public void Drive()
    {
        Console.WriteLine("Car is driving.");
    }
}
