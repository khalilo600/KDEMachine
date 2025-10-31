// This file introduces generics in C#, demonstrating how to create flexible, reusable code components (classes, methods) that can work with different data types while maintaining type safety.
using System;

public class Generics
{
    public static void ShowGenerics()
    {
        Console.WriteLine("\n--- C# Generics ---\n");

        // --- Generic Class ---
        Console.WriteLine("--- Generic Class ---");
        MyGenericClass<int> intGenericClass = new MyGenericClass<int>(10);
        Console.WriteLine($"Value from int generic class: {intGenericClass.GetValue()}");

        MyGenericClass<string> stringGenericClass = new MyGenericClass<string>("Hello from generic class");
        Console.WriteLine($"Value from string generic class: {stringGenericClass.GetValue()}");

        // --- Generic Method ---
        Console.WriteLine("\n--- Generic Method ---");
        DisplayData<int>(100);
        DisplayData<string>("Hello from generic method");
        DisplayData<double>(123.45);

        Console.WriteLine("\n--- End of Generics ---");
    }

    // Generic method
    static void DisplayData<T>(T data)
    {
        Console.WriteLine($"Data: {data}");
    }
}

// Generic class
public class MyGenericClass<T>
{
    private T _genericField;

    public MyGenericClass(T value)
    {
        _genericField = value;
    }

    public T GetValue()
    {
        return _genericField;
    }
}