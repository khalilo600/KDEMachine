using System;
using System.Collections.Generic;

// Represents a single contact with a Name and Phone Number.
// The '?' after string indicates that these properties can be null (nullable reference types).
public class Contact
{
    public string? Name { get; set; }
    public string? PhoneNumber { get; set; }
}

// Implements a simple console-based Contact Book application.
public class ContactBook
{
    public static void Run()
    {
        Console.WriteLine("\n--- Contact Book ---\n");

        // A List to store multiple Contact objects. This acts as our in-memory database.
        List<Contact> contacts = new List<Contact>();

        // Main loop for the Contact Book application.
        while (true)
        {
            // Display menu options to the user.
            Console.WriteLine("\n1. Add a contact");
            Console.WriteLine("2. View all contacts");
            Console.WriteLine("3. Exit Contact Book");
            Console.Write("Enter your choice: ");

            // Read user input for menu choice.
            string? choice = Console.ReadLine();
            switch (choice)
            {
                case "1":
                    // Option to add a new contact.
                    Console.Write("Enter the contact name: ");
                    string? nameInput = Console.ReadLine();
                    Console.Write("Enter the contact phone number: ");
                    string? phoneNumberInput = Console.ReadLine();
                    // Create a new Contact object and add it to the list.
                    // The ?? operator provides a default empty string if input is null.
                    contacts.Add(new Contact { Name = nameInput ?? string.Empty, PhoneNumber = phoneNumberInput ?? string.Empty });
                    Console.WriteLine("Contact added.");
                    break;
                case "2":
                    // Option to view all existing contacts.
                    Console.WriteLine("\n--- Contacts ---");
                    if (contacts.Count == 0)
                    {
                        Console.WriteLine("No contacts to show.");
                    }
                    else
                    {
                        // Iterate through the list and display each contact's details.
                        foreach (var contact in contacts)
                        {
                            Console.WriteLine($"Name: {contact.Name}, Phone: {contact.PhoneNumber}");
                        }
                    }
                    break;
                case "3":
                    // Exit the Contact Book application.
                    return; // Exit the Run method.
                default:
                    // Handle invalid menu choices.
                    Console.WriteLine("Invalid choice. Please try again.");
                    break;
            }
        }
    }
}