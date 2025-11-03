
# Phase 1: Displaying Data

Now that you have your models and some data in the database, it's time to display it to the users of your application.

## Key Concepts

### 1. Function-Based Views (FBVs) and Class-Based Views (CBVs)

Views are Python functions or classes that take a web request and return a web response. This response can be the HTML contents of a web page, or a redirect, or a 404 error, or an XML document, or an image . . . or anything, really.

*   **Function-Based Views (FBVs):** Views written as Python functions. They are simple and easy to understand for beginners.
*   **Class-Based Views (CBVs):** Views written as Python classes. They provide more structure and reusability. Django provides a set of generic CBVs for common tasks.
    *   **`ListView`:** A view that displays a list of objects.
    *   **`DetailView`:** A view that displays a single object.

### 2. Django Templates

Django's template language is designed to feel comfortable to those used to HTML. It allows you to embed dynamic content in your HTML files.

*   **`{% extends %}`:** Specifies that this template extends another template.
*   **`{% block %}`:** Defines a block that can be overridden by child templates.
*   **Template variables:** Variables are surrounded by `{{` and `}}`.

## Bookstore Features to Implement

*   **Book List Page:**
    1.  Create a view in `books/views.py` to get all the books from the database.
    2.  Create a template to display the list of books.
    3.  Create a URL pattern in `books/urls.py` to map a URL to the view.
*   **Book Detail Page:**
    1.  Create a view in `books/views.py` to get a single book from the database based on its ID.
    2.  Create a template to display the details of the book.
    3.  Create a URL pattern in `books/urls.py` to map a URL to the view.
