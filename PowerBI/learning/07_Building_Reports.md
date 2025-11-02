
# 7. Building Reports in Power BI

A report is a collection of visualizations that appear together on one or more pages. Reports are the primary way to present data in Power BI.

## The Report View

The Report view in Power BI Desktop is where you build your reports. You can add, arrange, and format visualizations on the report canvas.

## Report Pages

A report can have multiple pages. You can add new pages to your report by clicking the `+` button at the bottom of the screen.

You can also rename, duplicate, and delete pages.

## Report Interactivity

One of the key features of Power BI reports is their interactivity. When you select a value in one visualization, it will automatically filter the other visualizations on the page.

You can also use **slicers** and **filters** to allow users to filter the data in the report.

### Slicers

A slicer is a type of visualization that allows users to filter the data on the report page. You can create slicers for any field in your model.

### Filters

The Filters pane allows you to apply filters to your report. You can apply filters at three different levels:

*   **Visual-level filters:** Apply to a single visualization.
*   **Page-level filters:** Apply to all the visualizations on a single page.
*   **Report-level filters:** Apply to all the visualizations in the entire report.

## Bookmarks

Bookmarks allow you to save the current state of a report page, including the filters and the visibility of objects. You can use bookmarks to create a guided tour of your report or to create different views of your data.

## Themes

You can use themes to apply a consistent look and feel to your reports. A theme defines the colors, fonts, and other design elements of your report.

Power BI comes with a number of built-in themes, and you can also create your own custom themes.

## Building our Sample Report

We will build a multi-page report using our `sales_data` dataset. The report will include:

*   An **overview page** with key metrics and high-level charts.
*   A **details page** with a more detailed breakdown of the data.
*   **Slicers** to filter the report by date, country, and salesperson.
*   **Bookmarks** to switch between different views of the data.
