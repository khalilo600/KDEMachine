using System;
internal class Program
{
    private static void Main(string[] args)
    {
        Console.WriteLine("Hello, World!");

        Console.WriteLine("This is a test program.");
        Console.WriteLine("It demonstrates a simple C# application.");
        Console.WriteLine("Goodbye!");
        // data types in C#
        int myInt = 42;
        double myDouble = 3.14;
        string myString = "Hello, C#";
        bool myBool = true;
        char myChar = 'A';
        Console.WriteLine($"Integer: {myInt}, Double: {myDouble}, String: {myString}, Boolean: {myBool}, Char: {myChar}");

        //user input
        string? userName;
        do
        {
            Console.Write("Enter your name: ");
            userName = Console.ReadLine();
            if (string.IsNullOrWhiteSpace(userName))
            {
                Console.WriteLine("Name cannot be empty. Please try again.");
            }
        } while (string.IsNullOrWhiteSpace(userName));

        Console.WriteLine("Enter your age: ");
        string? ageInput = Console.ReadLine();
        int userAge;
        if (int.TryParse(ageInput, out userAge))
        {
            Console.WriteLine($"You are {userAge} years old.");
            Console.WriteLine($"Hello, {userName}!");

            Console.Write("Enter your favorite number (can be a decimal): ");
            string? favoriteNumberInput = Console.ReadLine();
            double favoriteNumber;
            if (double.TryParse(favoriteNumberInput, out favoriteNumber))
            {
                Console.WriteLine($"Your favorite number is {favoriteNumber}.");
            }
            else
            {
                Console.WriteLine("Invalid number format.");
            }

            Console.Write("Are you a student? (true/false): ");
            string? isStudentInput = Console.ReadLine();
            bool isStudent;
            if (bool.TryParse(isStudentInput, out isStudent))
            {
                Console.WriteLine(isStudent ? "You are a student." : "You are not a student.");
            }
            else
            {
                Console.WriteLine("Invalid input for student status.");
            }

            Console.Write("Enter your initial: ");
            string? initialInput = Console.ReadLine();
            char initial;
            if (char.TryParse(initialInput, out initial))
            {
                Console.WriteLine($"Your initial is {initial}.");
            }
            else
            {
                Console.WriteLine("Invalid input for initial.");
            }
            //basic arithmetic
            int a = 5;
            int b = 10;
            int c = a + b;
            Console.WriteLine($"Sum: {c}");

            //math in C#.
            int sums = myInt + 10;
            double product = myDouble * 2;
            double power = Math.Pow(myDouble, 2);
            double squareRoot = Math.Sqrt(myInt);
            Console.WriteLine($"Sum: {sums}, Product: {product}, Power: {power}, Square Root: {squareRoot}");
            //trigonometric functions
            double angle = 45; // degrees
            double radians = angle * (Math.PI / 180); // convert to radians
            double sine = Math.Sin(radians);
            double cosine = Math.Cos(radians);
            double tangent = Math.Tan(radians);
            Console.WriteLine($"Sine: {sine}, Cosine: {cosine}, Tangent: {tangent}");
            //strings and their functions
            string upperString = myString.ToUpper();
            string lowerString = myString.ToLower();
            int stringLength = myString.Length;
            string substring = myString.Substring(0, 5);
            // string indexes
            int firstIndex = myString.IndexOf('C');
            int lastIndex = myString.LastIndexOf('C');
            Console.WriteLine($"First Index: {firstIndex}, Last Index: {lastIndex}");
            //loop strings
            foreach (char k in myString)
            {
                Console.WriteLine(k);
            }
            //string to array
            char[] charArray = myString.ToCharArray();
            Console.WriteLine("Character Array:");
            foreach (char w in charArray)
            {
                Console.WriteLine(w);
            }
            Console.WriteLine($"Upper: {upperString}, Lower: {lowerString}, Length: {stringLength}, Substring: {substring}");
            // string interpolation
            Console.WriteLine($"String Interpolation: {myString}");
            //string concatenation
            string concatenatedString = myString + " - Concatenated";
            Console.WriteLine(concatenatedString);
            //date formating
            DateTime now = DateTime.Now;
            string formattedDate = now.ToString("yyyy-MM-dd HH:mm:ss");
            Console.WriteLine($"Current Date and Time: {formattedDate}");
            //more date functions
            DateTime tomorrow = now.AddDays(1);
            TimeSpan difference = tomorrow - now;
            Console.WriteLine($"Tomorrow: {tomorrow}, Difference in hours: {difference.TotalHours}");
            // type conversion
            string intString = "100";
            int convertedInt = int.Parse(intString);
            string doubleString = "99.99";
            double convertedDouble = Convert.ToDouble(doubleString);
            Console.WriteLine($"Converted Int: {convertedInt}, Converted Double: {convertedDouble}");
            //casting
            double castedDouble = myInt; // implicit casting
            int castedInt = (int)myDouble; // explicit casting
            Console.WriteLine($"Casted Double: {castedDouble}, Casted Int: {castedInt}");
            // arrays
            int[] myArray = { 1, 2, 3, 4, 5 };
            Console.WriteLine("Array elements:");
            foreach (int element in myArray)
            {
                Console.WriteLine(element);
            }

            //nested arrays
            int[,] my2DArray = { { 1, 2 }, { 3, 4 } };
            Console.WriteLine("2D Array elements:");
            for (int i = 0; i < my2DArray.GetLength(0); i++)
            {
                for (int j = 0; j < my2DArray.GetLength(1); j++)
                {
                    Console.WriteLine(my2DArray[i, j]);
                }
            }

            //collections
            List<string> myList = new List<string> { "Apple", "Banana", "Cherry" };
            Console.WriteLine("List elements:");
            foreach (string fruit in myList)
            {
                Console.WriteLine(fruit);
            }
            // dictionaries
            Dictionary<string, int> myDict = new Dictionary<string, int>
            { { "One", 1 }, { "Two", 2 }, { "Three", 3 } };
            Console.WriteLine("Dictionary elements:");
            foreach (var kvp in myDict)
            {
                Console.WriteLine($"{kvp.Key}: {kvp.Value}");
            }
            //functions of collections
            myList.Add("Date");
            myDict["Four"] = 4;
            Console.WriteLine("Updated List and Dictionary:");
            foreach (string fruit in myList)
            {
                Console.WriteLine(fruit);
            }
            foreach (var kvp in myDict)
            {
                Console.WriteLine($"{kvp.Key}: {kvp.Value}");
            }
            // LINQ queries
            var filteredList = myList.Where(f => f.StartsWith("A"));
            Console.WriteLine("Filtered List (Starts with A):");
            foreach (string fruit in filteredList)
            {
                Console.WriteLine(fruit);
            }

            // control structures
            if (myInt > 0)
            {
                Console.WriteLine("myInt is positive.");
            }
            else
            {
                Console.WriteLine("myInt is not positive.");
            }

            for (int i = 0; i < 5; i++)
            {
                Console.WriteLine($"Iteration {i}");
            }
            int count = 0;
            while (count < 3)
            {
                Console.WriteLine($"Count is {count}");
                count++;
            }
            // functions
            int Add(int a, int b)
            {
                return a + b;
            }
            int sumz = Add(5, 7);
            Console.WriteLine($"Sum of 5 and 7 is {sumz}");

            Person person = new Person();
            person.Name = "Alice";
            person.Age = 30;
            Console.WriteLine($"Person Name: {person.Name}, Age: {person.Age}");
        }
    }

    // classes and objects
    class Person
    {
        public string? Name { get; set; }
        public int Age { get; set; }
    }
}