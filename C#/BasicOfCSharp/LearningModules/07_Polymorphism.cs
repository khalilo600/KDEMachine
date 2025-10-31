// This file illustrates polymorphism in C#, demonstrating how objects of different classes can be treated as objects of a common base class, allowing for flexible and extensible code through method overriding.
using System;
using System.Collections.Generic;

public class Polymorphism
{
    public static void ShowPolymorphism()
    {
        Console.WriteLine("\n--- C# Polymorphism ---\n");

        List<Shape> shapes = new List<Shape>();
        shapes.Add(new Circle());
        shapes.Add(new Square());

        foreach (Shape shape in shapes)
        {
            shape.Draw();
        }

        Console.WriteLine("\n--- End of Polymorphism ---");
    }
}

public class Shape
{
    public virtual void Draw()
    {
        Console.WriteLine("Drawing a shape");
    }
}

public class Circle : Shape
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a circle");
    }
}

public class Square : Shape
{
    public override void Draw()
    {
        Console.WriteLine("Drawing a square");
    }
}