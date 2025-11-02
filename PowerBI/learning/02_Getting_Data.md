
# 2. Getting Data in Power BI

Power BI can connect to a wide range of data sources, including files, databases, and online services.

## The `Get Data` Experience

The primary way to connect to data in Power BI Desktop is through the `Get Data` window. To open it, click the `Get Data` button on the Home ribbon.

## Common Data Sources

Power BI supports a large number of data sources, which are organized into the following categories:

*   **File:** Excel, Text/CSV, XML, JSON, PDF, SharePoint folder.
*   **Database:** SQL Server, Oracle, IBM Db2, MySQL, PostgreSQL, SAP HANA, and many more.
*   **Power Platform:** Power BI datasets, Power BI dataflows.
*   **Azure:** Azure SQL Database, Azure Synapse Analytics, Azure Analysis Services, Azure Blob Storage, and more.
*   **Online Services:** Salesforce, Google Analytics, Adobe Analytics, GitHub, and more.
*   **Other:** Web, OData Feed, Active Directory, and more.

## Connecting to our Sample Data

For our tutorial, we will be using the `sales_data.csv` file located in the `data` directory.

To connect to this data, follow these steps:

1.  Open Power BI Desktop.
2.  On the Home ribbon, click `Get Data`.
3.  Select `Text/CSV` from the list of data sources.
4.  Navigate to the `data` directory and select `sales_data.csv`.
5.  Click `Open`.

## The Data Preview Window

After you select a data source, Power BI will show you a preview of the data. This window allows you to see the data before you load it, and it gives you the option to either `Load` the data directly or `Transform Data`.

*   **Load:** This option will load the data directly into your Power BI model.
*   **Transform Data:** This option will open the Power Query Editor, where you can clean and transform the data before loading it.

Since our data is messy, we will choose `Transform Data` to open the Power Query Editor.
