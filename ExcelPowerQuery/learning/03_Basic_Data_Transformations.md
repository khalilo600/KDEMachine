
# 3. Basic Data Transformations in Power Query

Power Query provides a wide range of tools for performing basic data transformations. In this section, we will cover some of the most common transformations you will use.

## Removing Columns

You can remove one or more columns from your query by selecting the columns you want to remove and then clicking `Remove Columns` on the `Home` tab.

## Changing Data Types

Power Query will automatically try to detect the data type of each column, but sometimes it gets it wrong. You can change the data type of a column by clicking the data type icon in the column header or by using the `Data Type` dropdown on the `Home` tab.

## Filtering Data

You can filter the rows in your query by clicking the filter icon in the column header. This will open the filter menu, which allows you to filter by specific values, text filters, number filters, and date filters.

## Replacing Values

You can replace values in a column by right-clicking on a value and selecting `Replace Values`, or by using the `Replace Values` button on the `Transform` tab.

## Splitting Columns

You can split a column into multiple columns by using the `Split Column` button on the `Home` tab. You can split a column by a delimiter (such as a space or a comma), by the number of characters, or by a change in character type.

## Merging Columns

You can merge multiple columns into a single column by selecting the columns you want to merge and then clicking `Merge Columns` on the `Add Column` tab.

## Handling Missing Values

You can handle missing values (nulls) in your data in a few different ways:

*   **Remove rows with missing values:** You can filter out rows with missing values using the filter menu.
*   **Fill missing values:** You can fill missing values with a specific value, or with the value from the previous or next row, using the `Fill` button on the `Transform` tab.

## Removing Duplicates

You can remove duplicate rows from your query by clicking `Remove Rows` > `Remove Duplicates` on the `Home` tab.

## Transforming our Sample Data

We will apply these basic transformations to our `sales_data.csv` dataset to clean it up.
