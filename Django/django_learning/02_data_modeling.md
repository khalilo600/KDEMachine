
# Phase 1: Data Modeling

Data modeling is the process of creating a conceptual model of the data that will be stored in the database. In Django, this is done using models.

## Key Concepts

### 1. Django Models

A model is the single, definitive source of information about your data. It contains the essential fields and behaviors of the data you’re storing. Each model maps to a single database table.

*   Each model is a Python class that subclasses `django.db.models.Model`.
*   Each attribute of the model represents a database field.
*   Django provides a automatically-generated database-access API.

### 2. Model Fields

Django provides a wide variety of model fields to represent different types of data.

*   **`CharField`:** For short-to-mid-sized strings. You must specify a `max_length`.
*   **`IntegerField`:** For integers.
*   **`TextField`:** For large text fields.
*   **`ForeignKey`:** To define a many-to-one relationship. It requires a positional argument: the class to which the model is related.
*   **`ImageField`:** For storing image files. It requires the `Pillow` library to be installed.

### 3. Migrations

Migrations are Django’s way of propagating changes you make to your models (adding a field, deleting a model, etc.) into your database schema.

*   **`makemigrations`:** This command creates new migrations based on the changes you have made to your models.
    ```bash
    python manage.py makemigrations
    ```
*   **`migrate`:** This command applies the migrations to the database.
    ```bash
    python manage.py migrate
    ```

## Bookstore Features to Implement

*   **`Book` Model:**
    *   Create a `Book` model in `books/models.py`.
    *   Add the following fields:
        *   `title` (`CharField`)
        *   `author` (`CharField`)
        *   `isbn` (`CharField`)
        *   `price` (`DecimalField`)
        *   `cover_image` (`ImageField`)
*   **`Category` Model:**
    *   Create a `Category` model in `books/models.py`.
    *   Add a `name` field (`CharField`).
    *   Add a `ForeignKey` to the `Book` model to establish a one-to-many relationship between categories and books (one category can have multiple books, but each book belongs to one category).
