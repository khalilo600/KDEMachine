
# Phase 2: Form Handling

Forms are a fundamental part of web applications. They are used to collect data from users. Django provides a powerful form handling framework.

## Key Concepts

### 1. Django Forms

Django's form framework simplifies and automates the process of creating and handling forms.

*   **`Form` class:** A class that represents a form.
*   **`ModelForm`:** A helper class that lets you create a `Form` class from a Django model.

### 2. Form Validation

Form validation is the process of checking if the data submitted by the user is valid.

*   Django's form framework provides automatic validation for many field types.
*   You can also write your own custom validation rules.

### 3. Handling `GET` and `POST` Requests

*   **`GET`:** The `GET` method is used to request data from a specified resource.
*   **`POST`:** The `POST` method is used to send data to a server to create/update a resource.

In a Django view, you can check the request method using `request.method`.

## Bookstore Features to Implement

*   **Search bar implementation:**
    1.  Create a search form.
    2.  Create a view to handle the search query.
    3.  Use `Q` objects to perform a complex database lookup (e.g., search for books by title or author).
*   **Forms for adding/editing books and handling image uploads:**
    1.  Create a `ModelForm` for the `Book` model.
    2.  Create views to handle the form submission for adding and editing books.
    3.  Make sure to handle image uploads correctly. This requires the `Pillow` library to be installed.
