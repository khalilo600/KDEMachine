// This file explains delegates and events in C#, demonstrating how delegates enable type-safe function pointers and how events provide a mechanism for objects to notify other objects of occurrences.
using System;

public class DelegatesAndEvents
{
    // Delegate declaration
    public delegate void MyDelegate(string message);

    // Event declaration
    public event MyDelegate MyEvent;

    public void RaiseEvent(string message)
    {
        MyEvent?.Invoke(message);
    }

    public static void ShowDelegatesAndEvents()
    {
        Console.WriteLine("
--- C# Delegates and Events ---
");

        // --- Delegates ---
        Console.WriteLine("--- Delegates ---");

        // Create an instance of the delegate and point it to a method
        MyDelegate delegateInstance = new MyDelegate(Method1);
        delegateInstance("Hello from Method1");

        // Another way to create a delegate instance
        MyDelegate delegateInstance2 = Method2;
        delegateInstance2("Hello from Method2");

        // Multicast delegate
        MyDelegate multicastDelegate = delegateInstance + delegateInstance2;
        multicastDelegate("Hello from both methods");

        // --- Events ---
        Console.WriteLine("
--- Events ---");

        DelegatesAndEvents instance = new DelegatesAndEvents();

        // Subscribe to the event
        instance.MyEvent += EventHandler1;
        instance.MyEvent += EventHandler2;

        // Raise the event
        instance.RaiseEvent("The event was raised!");

        // Unsubscribe from the event
        instance.MyEvent -= EventHandler1;
        instance.RaiseEvent("The event was raised again!");


        Console.WriteLine("
--- End of Delegates and Events ---");
    }

    static void Method1(string message)
    {
        Console.WriteLine($"Method1 received: {message}");
    }

    static void Method2(string message)
    {
        Console.WriteLine($"Method2 received: {message}");
    }

    static void EventHandler1(string message)
    {
        Console.WriteLine($"EventHandler1 received: {message}");
    }

    static void EventHandler2(string message)
    {
        Console.WriteLine($"EventHandler2 received: {message}");
    }
}