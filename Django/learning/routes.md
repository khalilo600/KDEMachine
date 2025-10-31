# Django URL Routing (Routes)

In Django, URL routing is the process of mapping URLs to views. It's handled by defining URL patterns in `urls.py` files, which tell Django which view function or class should handle a request for a given URL.

## 1. What are URL Patterns?

URL patterns are Python regular expressions or string patterns that Django matches against the requested URL. When a match is found, Django calls the associated view function or class, passing the `HttpRequest` object and any captured values from the URL.

## 2. Basic URL Mapping

Django provides two main functions for defining URL patterns: `path()` and `re_path()`.

### `path()` Function (Recommended for most cases)

The `path()` function is simpler and preferred for most URL patterns. It uses string-based matching with path converters.

```python
# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('articles/', views.article_list, name='article_list'),
    path('articles/new/', views.create_article, name='create_article'),
    path('about/', views.about_page, name='about'),
]
```

### `re_path()` Function (For Regular Expressions)

The `re_path()` function (formerly `url()`) allows you to use full regular expressions for more complex URL patterns.

```python
# myapp/urls.py

from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^articles/(?P<year>[0-9]{4})/', views.year_archive, name='year_archive'),
]
```

## 3. URL Dispatcher Flow

Django processes URLs in a hierarchical manner, starting from the project's root `urls.py`.

### Project-level `urls.py` (e.g., `myproject/urls.py`)

This is the main entry point for URL dispatching. It typically includes URL patterns from various apps.

```python
# myproject/urls.py

from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path('admin/', admin.site.urls),
    path('blog/', include('blog.urls')), # Includes URLs from the 'blog' app
    path('accounts/', include('django.contrib.auth.urls')), # Includes Django's auth URLs
    path('', include('myapp.urls')), # Root URL for your main app
]
```

### App-level `urls.py` (e.g., `myapp/urls.py`)

Each app typically has its own `urls.py` file to define patterns specific to that app.

```python
# myapp/urls.py

from django.urls import path
from . import views

app_name = 'myapp' # Used for URL namespacing
urlpatterns = [
    path('', views.index, name='index'),
    path('detail/<int:question_id>/', views.detail, name='detail'),
]
```

### `include()` Function

The `include()` function allows you to reference other URLconf modules. Whenever Django encounters `include()`, it chops off whatever part of the URL matched up to that point and sends the remaining string to the included URLconf for further processing.

## 4. Path Converters

`path()` uses path converters to capture values from the URL and convert them to specific Python types.

### Built-in Path Converters

*   `str`: Matches any non-empty string, excluding a path separator (`/`). This is the default.
*   `int`: Matches a zero or positive integer.
*   `slug`: Matches any slug string (ASCII letters or numbers, plus hyphens and underscores).
*   `uuid`: Matches a universally unique identifier.
*   `path`: Matches any non-empty string, including path separators. Useful for capturing entire URL paths.

```python
# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('articles/<int:year>/', views.year_archive, name='year_archive'),
    path('articles/<slug:slug>/', views.article_detail, name='article_detail'),
    path('files/<path:file_path>/', views.serve_file, name='serve_file'),
]
```

### Custom Path Converters

You can define your own path converters for more specific matching and type conversion.

```python
# myproject/urls.py (or a separate converters.py file)

from django.urls import register_converter

class FourDigitYearConverter:
    regex = '[0-9]{4}'

    def to_python(self, value):
        return int(value)

    def to_url(self, value):
        return str(value)

register_converter(FourDigitYearConverter, 'yyyy')

# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('articles/<yyyy:year>/', views.year_archive, name='year_archive'),
]
```

## 5. Named URLs

Naming your URLs allows you to refer to them unambiguously from anywhere in your Django project, even if you later change the URL pattern.

### `name` Argument in `path()`

```python
# myapp/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('home/', views.home_page, name='home'),
    path('products/<int:product_id>/', views.product_detail, name='product_detail'),
]
```

### `reverse()` Function (in Python code)

Used to dynamically retrieve the URL for a given named pattern.

```python
from django.urls import reverse

url = reverse('myapp:home') # If using namespacing
url_with_args = reverse('myapp:product_detail', args=[123])
url_with_kwargs = reverse('myapp:product_detail', kwargs={'product_id': 123})
```

### `{% url %}` Template Tag (in templates)

Used to dynamically retrieve URLs within Django templates.

```html
<a href="{% url 'myapp:home' %}">Home</a>
<a href="{% url 'myapp:product_detail' product_id=123 %}">Product 123</a>
```

## 6. Passing Data to Views

Data can be passed to views through URL parameters.

### Positional Arguments

```python
# myapp/urls.py
path('greet/<str:name>/', views.greet_user, name='greet_user'),

# myapp/views.py
def greet_user(request, name):
    return HttpResponse(f"Hello, {name}!")
```

### Keyword Arguments

Using path converters automatically passes captured values as keyword arguments to the view.

```python
# myapp/urls.py
path('items/<int:item_id>/', views.show_item, name='show_item'),

# myapp/views.py
def show_item(request, item_id):
    # item_id will be an integer
    return HttpResponse(f"Showing item {item_id}")
```

## 7. URL Namespacing

URL namespacing allows you to differentiate URL names between different applications, preventing name clashes.

### `app_name` in App-level `urls.py`

```python
# myapp/urls.py

app_name = 'myapp' # Define the namespace
urlpatterns = [
    path('', views.index, name='index'),
]
```

### Using Namespaces in `include()`

```python
# myproject/urls.py

from django.urls import include, path

urlpatterns = [
    path('my-app/', include('myapp.urls', namespace='myapp')), # Include with namespace
]
```

Now, to refer to the `index` URL of `myapp`, you would use `myapp:index`.

## 8. Redirecting URLs

Django provides ways to redirect users from one URL to another.

### `RedirectView` (Class-Based View)

```python
# myapp/urls.py

from django.views.generic.base import RedirectView

urlpatterns = [
    path('old-path/', RedirectView.as_view(url='/new-path/', permanent=True)),
]
```

### `redirect()` Shortcut (in views)

```python
# myapp/views.py

from django.shortcuts import redirect

def old_view(request):
    # Some logic...
    return redirect('myapp:new_view') # Redirect to a named URL
    # return redirect('/new-path/') # Redirect to a hardcoded URL
```

## 9. Advanced URL Patterns

### Optional Parameters (using `re_path`)

While `path` doesn't directly support optional parameters, `re_path` (with regular expressions) does.

```python
# myapp/urls.py

from django.urls import re_path
from . import views

urlpatterns = [
    re_path(r'^articles/(?:(?P<year>[0-9]{4})/)?$', views.article_year_archive, name='article_year_archive'),
]

# myapp/views.py
def article_year_archive(request, year=None):
    if year:
        return HttpResponse(f"Articles from {year}")
    return HttpResponse("All articles")
```

### Default Values for Parameters

You can provide default values for parameters in your view function, which works well with optional parameters.

```python
# myapp/urls.py
path('greet/', views.greet_user_default, name='greet_default'),
path('greet/<str:name>/', views.greet_user_default, name='greet_name'),

# myapp/views.py
def greet_user_default(request, name="Guest"):
    return HttpResponse(f"Hello, {name}!")
```
