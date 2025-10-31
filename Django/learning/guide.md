# Django Application Development Guide

This guide will walk you through the process of creating a new Django application, from initial setup to database interaction, views, templates, and basic administration.

## 1. Project Setup

### 1.1 Install Django

It's recommended to use a virtual environment for your Python projects.

```bash
python3 -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate
pip install Django
```

### 1.2 Create a New Django Project

A Django "project" is a collection of settings and apps, including database configuration, Django-specific options, and application-specific settings.

```bash
django-admin startproject myproject .
```

This command creates a `myproject` directory (or uses the current directory if `.` is used) with the basic project structure:

```
myproject/
├── manage.py
└── myproject/
    ├── __init__.py
    ├── asgi.py
    ├── settings.py
    ├── urls.py
    └── wsgi.py
```

### 1.3 Create a Django App

In Django, an "app" is a web application that does something – e.g., a blog app, a polls app, or a contact form app. A project can contain multiple apps.

```bash
python manage.py startapp myapp
```

This creates a `myapp` directory:

```
myapp/
├── migrations/
├── __init__.py
├── admin.py
├── apps.py
├── models.py
├── tests.py
└── views.py
```

### 1.4 Register Your App

Open `myproject/settings.py` and add your new app to the `INSTALLED_APPS` list:

```python
# myproject/settings.py

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myapp', # Your new app
]
```

### 1.5 Run the Development Server

```bash
python manage.py runserver
```

Open your browser and go to `http://127.0.0.1:8000`. You should see a success page indicating Django is working.

## 2. Database Configuration & Migrations

Django uses an ORM (Object-Relational Mapper) to interact with your database. By default, it uses SQLite, which is great for development.

### 2.1 Configure `settings.py`

For development, the default SQLite configuration in `myproject/settings.py` is usually sufficient:

```python
# myproject/settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
```

For other databases (PostgreSQL, MySQL), you would change the `ENGINE` and add `NAME`, `USER`, `PASSWORD`, `HOST`, `PORT`.

### 2.2 Run Initial Migrations

Django comes with several built-in apps (like admin, auth) that need database tables. Run these initial migrations:

```bash
python manage.py migrate
```

## 3. Models: Defining Your Data Structure

Models are Python classes that define the structure of your data, mapping to database tables. Django's ORM handles the database interactions.

### 3.1 Define a Simple Model

Open `myapp/models.py` and define a `Post` model:

```python
# myapp/models.py

from django.db import models

class Post(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    pub_date = models.DateTimeField('date published', auto_now_add=True)

    def __str__(self):
        return self.title
```

### 3.2 Make and Run Migrations for Your Model

```bash
python manage.py makemigrations myapp
python manage.py migrate
```

`makemigrations` creates a migration file (e.g., `0001_initial.py`) in `myapp/migrations` that describes the changes to be made to the database schema. `migrate` applies these changes.

### 3.3 Basic CRUD in Django Shell

```bash
python manage.py shell
```

```python
# Inside the shell
from myapp.models import Post

# Create
post = Post(title="My First Post", content="This is the content.")
post.save()

# Read all
all_posts = Post.objects.all()
print(all_posts)

# Read by filter
first_post = Post.objects.get(pk=1)
print(first_post.title)

# Update
first_post.title = "Updated Title"
first_post.save()

# Delete
first_post.delete()
```

## 4. Django Admin: A Built-in Interface

Django provides a powerful, automatically generated admin interface for managing your models.

### 4.1 Create a Superuser

```bash
python manage.py createsuperuser
```

Follow the prompts to create a username, email, and password.

### 4.2 Register Your Model in Admin

Open `myapp/admin.py` and register your `Post` model:

```python
# myapp/admin.py

from django.contrib import admin
from .models import Post

admin.site.register(Post)
```

### 4.3 Accessing Django Admin

Run the development server (`python manage.py runserver`) and go to `http://127.0.0.1:8000/admin/`. Log in with your superuser credentials. You should now see your `Post` model listed and be able to add, edit, and delete posts.

## 5. Views & URLs: Handling Requests and Responses

Views are Python functions or classes that take a web request and return a web response. URLs map web addresses to these views.

### 5.1 Create a Simple View Function

Open `myapp/views.py` and add a simple view:

```python
# myapp/views.py

from django.shortcuts import render
from django.http import HttpResponse
from .models import Post

def index(request):
    return HttpResponse("Hello, world. You're at the myapp index.")

def post_list(request):
    posts = Post.objects.all().order_by('-pub_date')
    context = {'posts': posts}
    return render(request, 'myapp/post_list.html', context)
```

### 5.2 Map URLs to Views

#### Project-level `urls.py` (`myproject/urls.py`)

Include your app's URLs:

```python
# myproject/urls.py

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('myapp/', include('myapp.urls')), # Include your app's URLs
]
```

#### App-level `urls.py` (`myapp/urls.py`)

Create this file if it doesn't exist and define your app's URL patterns:

```python
# myapp/urls.py

from django.urls import path

from . import views

app_name = 'myapp' # Namespace for your app's URLs
urlpatterns = [
    path('', views.index, name='index'),
    path('posts/', views.post_list, name='post_list'),
]
```

Now, `http://127.0.0.1:8000/myapp/` will show "Hello, world..." and `http://127.0.0.1:8000/myapp/posts/` will try to render `post_list.html`.

## 6. Templates: Displaying Content

Templates are HTML files with Django template language syntax that allow you to dynamically display data from your views.

### 6.1 Configure Template Directory

Open `myproject/settings.py` and ensure `TEMPLATES` is configured to find your app's templates:

```python
# myproject/settings.py

TEMPLATES = [
    {
        # ...
        'DIRS': [], # You can add project-wide template directories here
        'APP_DIRS': True, # This tells Django to look for a 'templates' directory inside each app
        # ...
    },
]
```

### 6.2 Create a Template

Create a `templates` directory inside your `myapp` folder, and then `myapp/templates/myapp/post_list.html`:

```html
<!-- myapp/templates/myapp/post_list.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Posts</title>
</head>
<body>
    <h1>All Posts</h1>

    {% if posts %}
        <ul>
            {% for post in posts %}
                <li>
                    <h2>{{ post.title }}</h2>
                    <p>{{ post.content|truncatechars:100 }}</p>
                    <small>Published on {{ post.pub_date }}</small>
                </li>
            {% endfor %}
        </ul>
    {% else %}
        <p>No posts are available.</p>
    {% endif %}
</body>
</html>
```

### 6.3 Template Inheritance

Create a base template (`myapp/templates/myapp/base.html`):

```html
<!-- myapp/templates/myapp/base.html -->

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}My App{% endblock %}</title>
</head>
<body>
    <header>
        <h1>My Awesome Django App</h1>
    </header>

    <main>
        {% block content %}
        {% endblock %}
    </main>

    <footer>
        <p>&copy; 2023 My App</p>
    </footer>
</body>
</html>
```

Then, modify `post_list.html` to extend `base.html`:

```html
<!-- myapp/templates/myapp/post_list.html -->

{% extends 'myapp/base.html' %}

{% block title %}Posts List{% endblock %}

{% block content %}
    <h1>All Posts</h1>

    {% if posts %}
        <ul>
            {% for post in posts %}
                <li>
                    <h2>{{ post.title }}</h2>
                    <p>{{ post.content|truncatechars:100 }}</p>
                    <small>Published on {{ post.pub_date }}</small>
                </li>
            {% endfor %}
        </ul>
    {% else %}
        <p>No posts are available.</p>
    {% endif %}
{% endblock %}
```

## 7. Forms: Handling User Input

Django's form handling simplifies processing user input.

### 7.1 Define a Simple Form

Create `myapp/forms.py`:

```python
# myapp/forms.py

from django import forms

class PostForm(forms.Form):
    title = forms.CharField(label='Post Title', max_length=200)
    content = forms.CharField(label='Content', widget=forms.Textarea)
```

### 7.2 Process Form Submission in a View

Modify `myapp/views.py`:

```python
# myapp/views.py

from django.shortcuts import render, redirect
from .forms import PostForm
from .models import Post

def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            # Process the data in form.cleaned_data
            Post.objects.create(
                title=form.cleaned_data['title'],
                content=form.cleaned_data['content']
            )
            return redirect('myapp:post_list') # Redirect to post list after success
    else:
        form = PostForm()
    return render(request, 'myapp/create_post.html', {'form': form})
```

### 7.3 Create a Form Template

Create `myapp/templates/myapp/create_post.html`:

```html
<!-- myapp/templates/myapp/create_post.html -->

{% extends 'myapp/base.html' %}

{% block title %}Create New Post{% endblock %}

{% block content %}
    <h1>Create New Post</h1>
    <form method="post">
        {% csrf_token %} {# Important for security #}
        {{ form.as_p }} {# Renders form fields as paragraphs #}
        <button type="submit">Submit</button>
    </form>
{% endblock %}
```

### 7.4 Add URL for Form View

Modify `myapp/urls.py`:

```python
# myapp/urls.py

from django.urls import path
from . import views

app_name = 'myapp'
urlpatterns = [
    path('', views.index, name='index'),
    path('posts/', views.post_list, name='post_list'),
    path('posts/new/', views.create_post, name='create_post'),
]
```

## 8. Static Files: CSS, JavaScript, Images

Django needs to know where to find your static files.

### 8.1 Configure `settings.py`

```python
# myproject/settings.py

import os

STATIC_URL = 'static/'

# Add this to tell Django where to find static files in your apps
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'), # Project-wide static files
]

# For production, where collected static files will be stored
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')
```

### 8.2 Create Static Files

Create a `static` directory inside your `myapp` folder, and then `myapp/static/myapp/style.css`:

```css
/* myapp/static/myapp/style.css */

body {
    font-family: sans-serif;
    margin: 20px;
    background-color: #f4f4f4;
}

h1 {
    color: #333;
}

ul {
    list-style: none;
    padding: 0;
}

li {
    background-color: #fff;
    margin-bottom: 10px;
    padding: 15px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
```

### 8.3 Link Static Files in Templates

Modify `myapp/templates/myapp/base.html`:

```html
<!-- myapp/templates/myapp/base.html -->

{% load static %}
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{% block title %}My App{% endblock %}</title>
    <link rel="stylesheet" href="{% static 'myapp/style.css' %}">
</head>
<body>
    <!-- ... -->
</body>
</html>
```

### 8.4 Collect Static Files (for production)

```bash
python manage.py collectstatic
```

## 9. Next Steps

*   **User Authentication:** Implement user login, logout, and registration.
*   **Class-Based Views:** Use `ListView`, `DetailView`, `CreateView`, etc., for more organized views.
*   **Testing:** Write unit and integration tests for your app.
*   **Deployment:** Learn how to deploy your Django application to a production server.
