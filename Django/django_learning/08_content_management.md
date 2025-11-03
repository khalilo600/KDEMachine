
# Phase 2: Content Management

Content management is the process of creating, editing, and publishing content. In the context of our bookstore application, this means giving users or staff the ability to add and edit books through the front-end of the website.

## Key Concepts

### 1. CRUD in the Front-End

CRUD stands for Create, Read, Update, and Delete. We have already implemented CRUD functionality for books via the Django admin. Now, we will implement it in the front-end of our application.

*   **Create:** A form for adding new books.
*   **Read:** The book list and detail pages.
*   **Update:** A form for editing existing books.
*   **Delete:** A way to delete books from the database.

## Bookstore Features to Implement

*   **Forms for adding/editing books:**
    1.  Create a `ModelForm` for the `Book` model.
    2.  Create a view for adding new books. This view will display the form and handle the form submission.
    3.  Create a view for editing existing books. This view will display the form with the existing book data and handle the form submission.
*   **Handling image uploads:**
    *   Make sure your form is set up to handle file uploads (`enctype="multipart/form-data"`).
    *   In your view, you can access the uploaded file from `request.FILES`.
