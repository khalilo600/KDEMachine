
# 8. Introduction to VBA in Excel

**Visual Basic for Applications (VBA)** is the programming language of Excel and other Office programs.

## What is VBA?

VBA is a programming language that you can use to automate tasks in Excel. With VBA, you can create **macros** that can perform a wide range of tasks, from simple formatting to complex calculations.

## The Visual Basic Editor

The **Visual Basic Editor (VBE)** is where you write and edit your VBA code. To open the VBE, press `Alt+F11` or click `Developer` > `Visual Basic`.

**Note:** The `Developer` tab is not enabled by default. To enable it, go to `File` > `Options` > `Customize Ribbon` and check the box next to `Developer`.

## Recording a Macro

The easiest way to get started with VBA is to record a macro. When you record a macro, Excel will record your actions and convert them into VBA code.

To record a macro:

1.  Click `Developer` > `Record Macro`.
2.  Give the macro a name and a shortcut key.
3.  Perform the actions that you want to automate.
4.  Click `Developer` > `Stop Recording`.

## The VBA Object Model

VBA uses an object model to represent the different elements of Excel.

The top-level object is the `Application` object, which represents the Excel application itself. The `Application` object contains other objects, such as `Workbooks`, `Worksheets`, and `Ranges`.

### Example

To change the value of cell A1 on Sheet1, you would use the following VBA code:

```vba
Sub ChangeCellValue()
    Worksheets("Sheet1").Range("A1").Value = 10
End Sub
```

## Writing Your Own Macros

Once you have recorded a few macros and have a basic understanding of the VBA object model, you can start writing your own macros from scratch.

### Creating a Subroutine

A **subroutine** is a block of code that performs a specific task. All macros in VBA are subroutines.

To create a subroutine, you use the `Sub` keyword, followed by the name of the subroutine and a pair of parentheses.

```vba
Sub MyMacro()
    ' Your code goes here
End Sub
```

### Creating a Function

A **function** is a block of code that returns a value. You can use functions to create your own custom formulas in Excel.

To create a function, you use the `Function` keyword, followed by the name of the function and a list of arguments in parentheses.

```vba
Function AddTwoNumbers(num1 As Integer, num2 As Integer) As Integer
    AddTwoNumbers = num1 + num2
End Function
```
