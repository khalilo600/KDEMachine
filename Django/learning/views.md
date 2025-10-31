# Django Views and Templates

In Django, views handle the logic for processing web requests and returning responses, while templates define the structure and presentation of the content returned to the user. Together, they form the core of how Django generates dynamic web pages.

## 1. What are Views?

A view is a Python function or class that takes a web request and returns a web response. This response can be the HTML contents of a Web page, a redirect, an HTTP error, or an image. The view itself contains the logic necessary to determine what response to return.

## 2. Function-Based Views (FBVs)

Function-based views are simple Python functions that receive an `HttpRequest` object as their first argument and return an `HttpResponse` object.

### Basic Structure

```python
# myapp/views.py

from django.http import HttpResponse

def hello_world(request):
    return HttpResponse("Hello, World!")
```

### `HttpRequest` Object

The `HttpRequest` object contains metadata about the request, such as:

*   `request.method`: The HTTP method used (e.g., 'GET', 'POST').
*   `request.GET`: A dictionary-like object containing all GET parameters.
*   `request.POST`: A dictionary-like object containing all POST parameters.
*   `request.user`: The currently logged-in `User` instance (if `django.contrib.auth` is enabled).
*   `request.path`: The full path to the requested page.

### `HttpResponse` Object

The `HttpResponse` object is what Django sends back to the user. You can pass a string as the first argument, which will be the content of the response.

```python
from django.http import HttpResponse

def current_time(request):
    import datetime
    now = datetime.datetime.now()
    html = f"<html><body>It is now {now}.</body></html>"
    return HttpResponse(html)
```

### `render()` Shortcut

The `render()` shortcut is the most common way to return an `HttpResponse` with a rendered template. It takes the `request` object, the template name, and an optional dictionary of context variables.

```python
# myapp/views.py

from django.shortcuts import render
from .models import Post

def post_list(request):
    posts = Post.objects.all().order_by('-pub_date')
    context = {'posts': posts, 'title': 'Latest Posts'}
    return render(request, 'myapp/post_list.html', context)
```

### Handling GET and POST Requests

```python
# myapp/views.py

from django.shortcuts import render, redirect
from .forms import MyForm

def contact_form(request):
    if request.method == 'POST':
        form = MyForm(request.POST) # Bind POST data to the form
        if form.is_valid():
            # Process the data in form.cleaned_data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            # ... do something with the data ...
            return redirect('success_page') # Redirect after successful POST
    else:
        form = MyForm() # An unbound form for GET request
    return render(request, 'myapp/contact.html', {'form': form})
```

## 3. Class-Based Views (CBVs)

Class-based views provide an alternative way to implement views as Python objects instead of functions. They offer advantages like code reusability, extensibility through inheritance and mixins, and better organization.

### Advantages of CBVs

*   **Code Reusability:** Common patterns (like displaying a list of objects) are encapsulated in generic views.
*   **Extensibility:** You can inherit from existing CBVs and override specific methods.
*   **Organization:** Related logic can be grouped within a class.

### `View` Base Class

All CBVs inherit from `django.views.View`.

```python
# myapp/views.py

from django.views import View
from django.http import HttpResponse

class MyView(View):
    def get(self, request, *args, **kwargs):
        return HttpResponse("This is a GET request.")

    def post(self, request, *args, **kwargs):
        return HttpResponse("This is a POST request.")

# myapp/urls.py
from django.urls import path
from .views import MyView

urlpatterns = [
    path('myview/', MyView.as_view()),
]
```

### Generic Display Views

Django provides a set of generic class-based views for common patterns.

*   **`TemplateView`**: Renders a given template.
    ```python
    # myapp/views.py
    from django.views.generic import TemplateView

    class AboutView(TemplateView):
        template_name = "myapp/about.html"
    ```

*   **`DetailView`**: Displays a single object.
    ```python
    # myapp/views.py
    from django.views.generic import DetailView
    from .models import Post

    class PostDetailView(DetailView):
        model = Post
        template_name = "myapp/post_detail.html"
        context_object_name = 'post' # Name of the variable in the template
    ```

*   **`ListView`**: Displays a list of objects.
    ```python
    # myapp/views.py
    from django.views.generic import ListView
    from .models import Post

    class PostListView(ListView):
        model = Post
        template_name = "myapp/post_list.html"
        context_object_name = 'posts'
        paginate_by = 10 # Optional: for pagination
    ```

### Generic Edit Views

*   **`FormView`**: Displays a form and handles its submission.
*   **`CreateView`**: Displays a form for creating an object, and saves it.
*   **`UpdateView`**: Displays a form for editing an existing object, and saves it.
*   **`DeleteView`**: Displays a confirmation page and deletes an object.

```python
# myapp/views.py

from django.views.generic.edit import CreateView, UpdateView, DeleteView
from .models import Post
from django.urls import reverse_lazy

class PostCreateView(CreateView):
    model = Post
    fields = ['title', 'content']
    template_name = 'myapp/post_form.html'
    success_url = reverse_lazy('myapp:post_list')

class PostUpdateView(UpdateView):
    model = Post
    fields = ['title', 'content']
    template_name = 'myapp/post_form.html'
    success_url = reverse_lazy('myapp:post_list')

class PostDeleteView(DeleteView):
    model = Post
    template_name = 'myapp/post_confirm_delete.html'
    success_url = reverse_lazy('myapp:post_list')
```

### Mixins

Mixins are classes that provide specific functionality to other classes through multiple inheritance. They are commonly used with CBVs to add features like authentication (`LoginRequiredMixin`), permission checks (`PermissionRequiredMixin`), or form validation.

```python
# myapp/views.py

from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView
from .models import Post

class MyPostsView(LoginRequiredMixin, ListView):
    model = Post
    template_name = "myapp/my_posts.html"
    context_object_name = 'posts'

    def get_queryset(self):
        return Post.objects.filter(author=self.request.user)
```

## 4. Templates

Django's template language is designed to be a powerful yet easy-to-use tool for separating presentation logic from business logic.

### Configuration (`settings.py` - `TEMPLATES`)

```python
# myproject/settings.py

import os

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')], # Project-wide template directory
        'APP_DIRS': True, # Look for 'templates' directory inside each app
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]
```

### Template Loading

Django looks for templates in the order specified by `TEMPLATES` settings. If `APP_DIRS` is `True`, it looks in the `templates` subdirectory of each installed app.

### Template Syntax

#### Variables (`{{ var }}`)

Variables output a value from the context. You can access attributes and dictionary keys using dot notation.

```html
<p>Hello, {{ user.username }}!</p>
<p>Your email is {{ user.email }}.</p>
```

#### Tags (`{% tag %}`)

Tags provide arbitrary logic in the rendering process. They can output content, serve as a control structure (e.g., an "if" statement or a "for" loop), or retrieve information from the database.

*   `{% for %}` / `{% endfor %}`
*   `{% if %}` / `{% endif %}`
*   `{% csrf_token %}` (for forms)
*   `{% url 'name' arg1 arg2 %}`
*   `{% static 'path/to/file.css' %}`

```html
{% if user.is_authenticated %}
    <p>Welcome, {{ user.username }}!</p>
{% else %}
    <p>Please log in.</p>
{% endif %}

<ul>
    {% for item in item_list %}
        <li>{{ item.name }}</li>
    {% empty %}
        <li>No items found.</li>
    {% endfor %}
</ul>
```

#### Filters (`{{ var|filter }}`)

Filters transform the value of variables. They are separated from the variable by a vertical bar (`|`).

*   `{{ value|length }}`
*   `{{ value|date:"F j, Y" }}`
*   `{{ value|lower }}`
*   `{{ value|truncatewords:30 }}`

```html
<p>Published: {{ post.pub_date|date:"M d, Y" }}</p>
<p>{{ post.content|truncatechars:100 }}</p>
```

### Template Inheritance

Template inheritance allows you to build a base "skeleton" template that contains all the common elements of your site and defines **blocks** that child templates can override.

*   **`{% extends "base.html" %}`**: Specifies the parent template.
*   **`{% block name %}` / `{% endblock name %}`**: Defines a block of content that can be overridden by child templates.
*   **`{{ block.super }}`**: Used in a child block to render the content of the parent block.

`base.html`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}My Site{% endblock %}</title>
</head>
<body>
    <div id="content">{% block content %}{% endblock %}</div>
    {% block footer %}
        <p>Copyright 2023</p>
    {% endblock %}
</body>
</html>
```

`child.html`:
```html
{% extends "base.html" %}

{% block title %}My Child Page{% endblock %}

{% block content %}
    <h1>Welcome to my child page!</h1>
    <p>This is specific content.</p>
{% endblock %}
```

### Including Other Templates (`include`)

The `{% include %}` tag allows you to include the contents of another template within the current one.

```html
{% include 'snippets/header.html' %}
```

### Static Files in Templates

To use static files (CSS, JS, images) in your templates, you need to load the `static` tag and use the `{% static %}` tag.

```html
{% load static %}
<link rel="stylesheet" href="{% static 'css/style.css' %}">
<img src="{% static 'images/logo.png' %}" alt="Logo">
```

## 5. Context Processors

Context processors are Python functions that receive the `HttpRequest` object as an argument and return a dictionary of items to be merged into the template context. They are useful for making certain variables available to all templates without explicitly passing them in every `render()` call.

### How They Work

They are listed in the `OPTIONS` of your `TEMPLATES` setting in `settings.py`.

### Built-in Context Processors

*   `django.template.context_processors.debug`: Adds debug variables.
*   `django.template.context_processors.request`: Adds the `request` object to the context.
*   `django.contrib.auth.context_processors.auth`: Adds `user` and `perms` to the context.
*   `django.contrib.messages.context_processors.messages`: Adds the messages framework messages.

### Custom Context Processors

```python
# myapp/context_processors.py

def my_custom_processor(request):
    return {'app_name': 'My Awesome App', 'current_year': 2023}

# myproject/settings.py
TEMPLATES = [
    {
        # ...
        'OPTIONS': {
            'context_processors': [
                # ... other processors
                'myapp.context_processors.my_custom_processor',
            ],
        },
    },
]
```

Now, `{{ app_name }}` and `{{ current_year }}` will be available in all your templates.

## 6. Rendering Strategies

Views can return various types of `HttpResponse` objects.

*   **`render(request, template_name, context)`**: The most common, renders a template with context.
*   **`HttpResponse(content, content_type="text/html", status=200)`**: Returns raw content.
*   **`JsonResponse(data, encoder=DjangoJSONEncoder, safe=True, json_dumps_params=None, **kwargs)`**: Returns JSON data. Automatically sets `Content-Type` header to `application/json`.

    ```python
    from django.http import JsonResponse

    def api_data(request):
        data = {'name': 'Alice', 'age': 30}
        return JsonResponse(data)
    ```

*   **`redirect(to, permanent=False, *args, **kwargs)`**: Returns an `HttpResponseRedirect` to the given URL.

    ```python
    from django.shortcuts import redirect

    def old_page(request):
        return redirect('new_page_name')
    ```
