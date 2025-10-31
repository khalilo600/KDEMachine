// This file demonstrates reflection in C#, allowing inspection of metadata of types, assemblies, and modules at runtime, and dynamically invoking members.
using System;
using System.Reflection;

public class Reflection
{
    public static void ShowReflection()
    {
        Console.WriteLine("\n--- C# Reflection ---\n");

        // Get the type of a class
        Type personType = typeof(Person);
        Console.WriteLine($"Type Name: {personType.Name}");

        // Get all public properties of the Person class
        PropertyInfo[] properties = personType.GetProperties();
        Console.WriteLine("\nProperties:");
        foreach (PropertyInfo property in properties)
        {
            Console.WriteLine(property.Name);
        }

        // Get all public methods of the Person class
        MethodInfo[] methods = personType.GetMethods();
        Console.WriteLine("\nMethods:");
        foreach (MethodInfo method in methods)
        {
            Console.WriteLine(method.Name);
        }

        // Create an instance of the Person class and invoke a method
        object personInstance = Activator.CreateInstance(typeof(Person), "John", 30);
        MethodInfo introduceMethod = personType.GetMethod("Introduce");
        introduceMethod.Invoke(personInstance, null);


        Console.WriteLine("\n--- End of Reflection ---");
    }
}
