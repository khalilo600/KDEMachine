
# 6. Introduction to the M Language

**M** is the formula language of Power Query. Every transformation you perform in the Power Query Editor is written in M.

## What is M?

M is a functional, case-sensitive language. It is similar to F#.

You don't need to know M to use Power Query, but learning the basics of M can help you to create more complex transformations and to troubleshoot your queries.

## The Advanced Editor

The best way to learn M is to look at the code that Power Query generates for you in the **Advanced Editor**. You can open the Advanced Editor by clicking `View` > `Advanced Editor`.

## The `let` Expression

An M query is a single `let` expression.

A `let` expression is a block of code that contains a series of steps. Each step is a variable that is assigned a value. The result of the `let` expression is the value of the last variable.

### Example

Here is an example of a simple M query:

```m
let
    Source = Csv.Document(File.Contents("C:\Users\...\sales_data.csv"),[Delimiter=",", Columns=10, Encoding=1252, QuoteStyle=QuoteStyle.None]),
    #"Promoted Headers" = Table.PromoteHeaders(Source, [PromoteAllScalars=true]),
    #"Changed Type" = Table.TransformColumnTypes(#"Promoted Headers",{{"OrderID", Int64.Type}, {"Product", type text}, {"Category", type text}, {"Price", type number}, {"Quantity", Int64.Type}, {"OrderDate", type date}, {"CustomerID", type text}, {"Country", type text}, {"Region", type text}, {"Salesperson", type text}})
in
    #"Changed Type"
```

In this example:

*   `Source` is a variable that is assigned the result of the `Csv.Document` function.
*   `#"Promoted Headers"` is a variable that is assigned the result of the `Table.PromoteHeaders` function.
*   `#"Changed Type"` is a variable that is assigned the result of the `Table.TransformColumnTypes` function.
*   The result of the `let` expression is the value of the `#"Changed Type"` variable.

## Common M Functions

M has a large library of functions that you can use to perform transformations.

*   **Table Functions:** `Table.SelectRows`, `Table.AddColumn`, `Table.Group`, `Table.Sort`
*   **List Functions:** `List.Sum`, `List.Average`, `List.Distinct`, `List.Transform`
*   **Text Functions:** `Text.Start`, `Text.End`, `Text.Split`, `Text.Combine`
*   **Date Functions:** `Date.Year`, `Date.Month`, `Date.Day`, `Date.AddDays`

## Learning More

The best way to learn M is to experiment with it in the Advanced Editor. You can also find a complete list of M functions in the [Power Query M formula language reference](https://learn.microsoft.com/en-us/powerquery-m/).
