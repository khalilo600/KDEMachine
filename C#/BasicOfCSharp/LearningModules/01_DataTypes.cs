// This file demonstrates various data types in C#, including value types (integral, floating-point, char, bool) and reference types (string, object, dynamic).
using System;

public class DataTypes
{
    public static void ShowDataTypes()
    {
        Console.WriteLine("--- C# Data Types ---");

        // Value Types
        Console.WriteLine("\n--- Value Types ---");

        // Integral types
        byte myByte = 255;
        sbyte mySByte = -128;
        short myShort = -32768;
        ushort myUShort = 65535;
        int myInt = -2147483648;
        uint myUInt = 4294967295;
        long myLong = -9223372036854775808;
        ulong myULong = 18446744073709551615;

        Console.WriteLine($"byte: {myByte}");
        Console.WriteLine($"sbyte: {mySByte}");
        Console.WriteLine($"short: {myShort}");
        Console.WriteLine($"ushort: {myUShort}");
        Console.WriteLine($"int: {myInt}");
        Console.WriteLine($"uint: {myUInt}");
        Console.WriteLine($"long: {myLong}");
        Console.WriteLine($"ulong: {myULong}");

        // Floating-point types
        float myFloat = 3.14159f;
        double myDouble = 3.141592653589793;
        decimal myDecimal = 3.1415926535897932384626433832m;

        Console.WriteLine($"\nfloat: {myFloat}");
        Console.WriteLine($"double: {myDouble}");
        Console.WriteLine($"decimal: {myDecimal}");

        // char type
        char myChar = 'A';
        Console.WriteLine($"\nchar: {myChar}");

        // bool type
        bool myBool = true;
        Console.WriteLine($"\nbool: {myBool}");

        // Reference Types
        Console.WriteLine("\n--- Reference Types ---");

        // string type
        string myString = "Hello, C#!";
        Console.WriteLine($"\nstring: {myString}");

        // object type
        object myObject = "This is an object.";
        Console.WriteLine($"\nobject: {myObject}");
        myObject = 42;
        Console.WriteLine($"object can hold different types: {myObject}");

        // dynamic type
        dynamic myDynamic = "This is dynamic.";
        Console.WriteLine($"\ndynamic: {myDynamic}");
        myDynamic = 3.14;
        Console.WriteLine($"dynamic can also change type at runtime: {myDynamic}");

        Console.WriteLine("\n--- End of Data Types ---");
    }
}