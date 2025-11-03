
# Phase 1: Project Setup

This is the first step in building a Django application. A solid project setup is crucial for a smooth development process.

## Key Concepts

### 1. Python and Virtual Environments

*   **Python:** Django is a Python web framework. You'll need Python installed on your system.
*   **Virtual Environments:** A virtual environment is an isolated Python environment. It allows you to install packages for a specific project without affecting other projects or your system's global package installation. This is a best practice for any Python project.

    *   **Creating a virtual environment:**
        ```bash
        python -m venv venv
        ```
    *   **Activating the virtual environment:**
        *   **On macOS and Linux:**
            ```bash
            source venv/bin/activate
            ```
        *   **On Windows:**
            ```bash
            .\venv\Scripts\activate
            ```

### 2. `django-admin startproject/startapp`

*   **`django-admin`:** This is Django's command-line utility for administrative tasks.
*   **`startproject`:** This command creates a new Django project.
    ```bash
    django-admin startproject myproject
    ```
    This will create a `myproject` directory with the following structure:
    ```
    myproject/
        manage.py
        myproject/
            __init__.py
            settings.py
            urls.py
            asgi.py
            wsgi.py
    ```
*   **`startapp`:** This command creates a new Django application within your project. An application is a web application that does something – e.g., a blog system, a database of public records or a small poll app. A project is a collection of configuration and apps for a particular website.
    ```bash
    python manage.py startapp myapp
    ```
    This will create a `myapp` directory with the following structure:
    ```
    myapp/
        __init__.py
        admin.py
        apps.py
        migrations/
            __init__.py
        models.py
        tests.py
        views.py
    ```

### 3. `settings.py`

This file contains all the configuration for your Django project.

*   **`INSTALLED_APPS`:** A list of all the applications that are installed in your project. You need to add your newly created app here.
*   **`DATABASES`:** A dictionary containing the settings for all the databases to be used with this project. By default, it's configured to use SQLite3.

### 4. `urls.py`

This file is responsible for routing URLs to the appropriate views in your application.

*   **`urlpatterns`:** A list of `path()` and/or `re_path()` instances. Django will go through each URL pattern, in order, and stop at the first one that matches the requested URL.

## Bookstore Features to Implement

*   **Initialize project and a 'books' app:**
    1.  Create a virtual environment and activate it.
    2.  Install Django: `pip install Django`
    3.  Create a new project: `django-admin startproject bookstore_project`
    4.  Create a new app: `python manage.py startapp books`
    5.  Add the `books` app to the `INSTALLED_APPS` list in `bookstore_project/settings.py`.
