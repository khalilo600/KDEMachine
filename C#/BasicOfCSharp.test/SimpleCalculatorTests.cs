using Xunit;
using System;
using System.IO;

public class SimpleCalculatorTests
{
    [Fact]
    public void Add_ReturnsCorrectSum()
    {
        // Arrange
        string input = "10\n+\n5\n";
        StringReader sr = new StringReader(input);
        Console.SetIn(sr);
        StringWriter sw = new StringWriter();
        Console.SetOut(sw);

        // Act
        SimpleCalculator.Run();

        // Assert
        string expected = "\n--- Simple Calculator ---\n\nSupported operations: +, -, *, /, ^ (power), sqrt (square root)\nEnter the first number: Enter the operator (+, -, *, /, ^, sqrt): Enter the second number: Result: 10 + 5 = 15\n";
        Assert.Contains("Result: 10 + 5 = 15", sw.ToString());
    }

    [Fact]
    public void Subtract_ReturnsCorrectDifference()
    {
        // Arrange
        string input = "10\n-\n5\n";
        StringReader sr = new StringReader(input);
        Console.SetIn(sr);
        StringWriter sw = new StringWriter();
        Console.SetOut(sw);

        // Act
        SimpleCalculator.Run();

        // Assert
        Assert.Contains("Result: 10 - 5 = 5", sw.ToString());
    }

    [Fact]
    public void Multiply_ReturnsCorrectProduct()
    {
        // Arrange
        string input = "10\n*\n5\n";
        StringReader sr = new StringReader(input);
        Console.SetIn(sr);
        StringWriter sw = new StringWriter();
        Console.SetOut(sw);

        // Act
        SimpleCalculator.Run();

        // Assert
        Assert.Contains("Result: 10 * 5 = 50", sw.ToString());
    }

    [Fact]
    public void Divide_ReturnsCorrectQuotient()
    {
        // Arrange
        string input = "10\n/\n5\n";
        StringReader sr = new StringReader(input);
        Console.SetIn(sr);
        StringWriter sw = new StringWriter();
        Console.SetOut(sw);

        // Act
        SimpleCalculator.Run();

        // Assert
        Assert.Contains("Result: 10 / 5 = 2", sw.ToString());
    }

    [Fact]
    public void DivideByZero_ReturnsErrorMessage()
    {
        // Arrange
        string input = "10\n/\n0\n";
        StringReader sr = new StringReader(input);
        Console.SetIn(sr);
        StringWriter sw = new StringWriter();
        Console.SetOut(sw);

        // Act
        SimpleCalculator.Run();

        // Assert
        Assert.Contains("Error: Cannot divide by zero.", sw.ToString());
    }

    [Fact]
    public void Power_ReturnsCorrectResult()
    {
        // Arrange
        string input = "2\n^\n3\n";
        StringReader sr = new StringReader(input);
        Console.SetIn(sr);
        StringWriter sw = new StringWriter();
        Console.SetOut(sw);

        // Act
        SimpleCalculator.Run();

        // Assert
        Assert.Contains("Result: 2 ^ 3 = 8", sw.ToString());
    }

    [Fact]
    public void SquareRoot_ReturnsCorrectResult()
    {
        // Arrange
        string input = "9\nsqrt\n"; // Only one number needed for sqrt
        StringReader sr = new StringReader(input);
        Console.SetIn(sr);
        StringWriter sw = new StringWriter();
        Console.SetOut(sw);

        // Act
        SimpleCalculator.Run();

        // Assert
        Assert.Contains("Result: sqrt(9) = 3", sw.ToString());
    }

    [Fact]
    public void SquareRoot_NegativeNumber_ReturnsErrorMessage()
    {
        // Arrange
        string input = "-9\nsqrt\n"; // Only one number needed for sqrt
        StringReader sr = new StringReader(input);
        Console.SetIn(sr);
        StringWriter sw = new StringWriter();
        Console.SetOut(sw);

        // Act
        SimpleCalculator.Run();

        // Assert
        Assert.Contains("Error: Cannot calculate square root of a negative number.", sw.ToString());
    }
}
