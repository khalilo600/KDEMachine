
# 2. The Power Query Editor

The **Power Query Editor** is the heart of Power Query. It is where you will spend most of your time when you are working with Power Query.

## Launching the Power Query Editor

You can launch the Power Query Editor in a few different ways:

*   When you connect to a data source, click the `Transform Data` button.
*   If you have already loaded a query into Excel, you can right-click on the query in the `Queries & Connections` pane and select `Edit`.
*   From the `Data` tab, click `Get Data` > `Launch Power Query Editor`.

## The Power Query Editor Interface

The Power Query Editor is made up of several key components:

*   **The Ribbon:** The ribbon at the top of the window contains the various transformation tools.
*   **The Queries Pane:** The Queries pane on the left side of the window shows a list of all the queries in the current workbook.
*   **The Data Preview:** The Data Preview in the center of the window shows a preview of the data in the selected query.
*   **The Applied Steps Pane:** The Applied Steps pane on the right side of the window shows a list of all the transformation steps that have been applied to the current query.
*   **The Formula Bar:** The Formula Bar shows the M code for the selected step.

## The Ribbon

The ribbon is organized into several tabs:

*   **Home:** Contains common transformation tasks, such as removing columns, splitting columns, and changing data types.
*   **Transform:** Contains more advanced transformation tasks, such as unpivoting columns, running R or Python scripts, and transposing data.
*   **Add Column:** Contains tools for adding new columns to your query, such as custom columns, conditional columns, and index columns.
*   **View:** Contains options for controlling the visibility of the different panes in the Power Query Editor.

## The Applied Steps Pane

Every transformation you apply in the Power Query Editor is recorded as a step in the **Applied Steps** pane. This is one of the most powerful features of Power Query.

You can:

*   **Select a step** to see what the data looked like at that point in the transformation process.
*   **Rename a step** to make it more descriptive.
*   **Delete a step** to undo a transformation.
*   **Reorder steps** to change the order in which the transformations are applied.

## The Advanced Editor

The **Advanced Editor** shows the M code that Power Query has generated for your transformations. You can edit this code directly to create more complex transformations.
