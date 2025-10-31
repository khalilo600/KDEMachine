// This file demonstrates the use of attributes in C#, showing how to define custom attributes and apply them to code elements (classes, methods) to add metadata, which can then be retrieved and processed at runtime using reflection.
using System;
using System.Reflection;

// Define a custom attribute
[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class MyCustomAttribute : Attribute
{
    public string Description { get; }

    public MyCustomAttribute(string description)
    {
        Description = description;
    }
}

[MyCustom("This is a sample class.")]
public class MyClass
{
    [MyCustom("This is a sample method.")]
    public void MyMethod()
    {
    }
}

public class Attributes
{
    public static void ShowAttributes()
    {
        Console.WriteLine("\n--- C# Attributes ---\n");

        // Get the type of the MyClass
        Type myClassType = typeof(MyClass);

        // Get the custom attributes of the class
        object[] classAttributes = myClassType.GetCustomAttributes(true);
        Console.WriteLine("Attributes for MyClass:");
        foreach (object attribute in classAttributes)
        {
            if (attribute is MyCustomAttribute myAttribute)
            {
                Console.WriteLine($"- {myAttribute.Description}");
            }
        }

        // Get the custom attributes of the method
        MethodInfo myMethodInfo = myClassType.GetMethod("MyMethod");
        object[] methodAttributes = myMethodInfo.GetCustomAttributes(true);
        Console.WriteLine("\nAttributes for MyMethod:");
        foreach (object attribute in methodAttributes)
        {
            if (attribute is MyCustomAttribute myAttribute)
            {
                Console.WriteLine($"- {myAttribute.Description}");
            }
        }

        Console.WriteLine("\n--- End of Attributes ---");
    }
}
