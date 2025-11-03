
# Phase 1: Admin Interface

The Django admin is a powerful and convenient feature that provides a ready-to-use interface for managing your application's data.

## Key Concepts

### 1. Django Admin

The Django admin is one of the most popular features of Django. It reads metadata from your models to provide a quick, model-centric interface where trusted users can manage content on your site.

*   The admin is highly customizable.
*   It's a great tool for managing data during development and for trusted users to manage content in production.

### 2. Registering Models in `admin.py`

To make your models available in the admin interface, you need to register them in the `admin.py` file of your application.

*   Import your models and the `admin` module.
*   Use `admin.site.register()` to register your models.

```python
from django.contrib import admin
from .models import Book, Category

admin.site.register(Book)
admin.site.register(Category)
```

## Bookstore Features to Implement

*   **CRUD (Create, Read, Update, Delete) functionality for books via the Admin:**
    1.  Create a superuser account to access the admin:
        ```bash
        python manage.py createsuperuser
        ```
    2.  Start the development server:
        ```bash
        python manage.py runserver
        ```
    3.  Go to `http://127.0.0.1:8000/admin/` in your browser and log in with the superuser account.
    4.  You should see the `Books` and `Categories` models in the admin.
    5.  You can now add, edit, and delete books and categories using the admin interface.
