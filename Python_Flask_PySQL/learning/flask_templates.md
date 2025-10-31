# Flask Templates (Jinja2)

Flask uses the Jinja2 templating engine to render dynamic HTML content. Templates allow you to separate your application's logic from its presentation, making your code cleaner and more maintainable.

## 1. What are Templates?

Templates are files (typically HTML) that contain static parts of your desired output, as well as special placeholders and logic (variables, loops, conditionals) that Jinja2 processes to generate the final dynamic content. They are usually stored in a `templates` folder within your Flask application.

## 2. Jinja2 Templating Engine

### Introduction to Jinja2

Jinja2 is a fast, expressive, extensible templating engine. It's widely used in Python web frameworks, including Flask. It provides a syntax that is similar to Django's templating language.

### Syntax Overview

Jinja2 uses specific delimiters for different types of content:

*   `{% ... %}`: For **Statements** (e.g., `if` conditions, `for` loops, macros).
*   `{{ ... }}`: For **Expressions** to print output (e.g., variables, function calls, results of operations).
*   `{# ... #}`: For **Comments** (ignored by the template engine).

## 3. Rendering Templates

### `render_template()` Function

To render a template from your Flask view function, you use the `render_template()` function, which is imported from `flask`.

```python
# app.py

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', title="Homepage", user={'name': 'Alice', 'is_admin': True})

@app.route('/products')
def products():
    product_list = ['Apple', 'Banana', 'Orange']
    return render_template('products.html', products=product_list)
```

### Template Lookup Paths

By default, Flask looks for templates in a `templates` folder located in the same directory as your main application file (`app.py`). If you're using Blueprints, each Blueprint can have its own `templates` folder.

## 4. Variables

Variables allow you to display dynamic data passed from your Flask view to the template.

### Accessing Variables (`{{ variable }}`)

```html
<!-- templates/index.html -->

<h1>Welcome to the {{ title }}!</h1>
<p>Hello, {{ user.name }}!</p>
```

### Accessing Attributes and Dictionary Items

You can use dot notation (`.`) to access attributes of objects or items in dictionaries.

```html
<p>Is admin: {{ user.is_admin }}</p>
<p>User name from dict: {{ user['name'] }}</p>
```

### Default Values for Undefined Variables

If a variable might not always be defined, you can provide a default value using the `default` filter.

```html
<p>Hello, {{ username|default('Guest') }}!</p>
```

## 5. Control Structures

Jinja2 provides control structures for conditional logic and looping.

### `if`/`elif`/`else`

```html
{% if user.is_admin %}
    <p>Welcome, Administrator!</p>
{% elif user.name %}
    <p>Welcome, {{ user.name }}!</p>
{% else %}
    <p>Please log in.</p>
{% endif %}
```

### `for` Loops

Used to iterate over sequences (lists, tuples, dictionaries, strings).

```html
<!-- templates/products.html -->

<h1>Our Products</h1>
<ul>
    {% for product in products %}
        <li>{{ product }}</li>
    {% else %} {# Optional: runs if the iterable is empty #}
        <li>No products available.</li>
    {% endfor %}
</ul>
```

#### `loop` Variable

Inside a `for` loop, the special `loop` variable provides access to loop-specific information:

*   `loop.index`: Current iteration (1-based).
*   `loop.index0`: Current iteration (0-based).
*   `loop.first`: `True` if it's the first iteration.
*   `loop.last`: `True` if it's the last iteration.
*   `loop.length`: Total number of items.

```html
<ul>
    {% for product in products %}
        <li>{{ loop.index }}. {{ product }}</li>
    {% endfor %}
</ul>
```

### `{% macro %}` for Reusable Blocks

Macros are comparable to functions in regular programming languages. They are useful for creating reusable HTML snippets.

```html
{% macro render_field(field) %}
    <dt>{{ field.label }}</dt>
    <dd>{{ field() }}</dd>
    {% if field.errors %}
        <ul class="errors">
        {% for error in field.errors %}
            <li>{{ error }}</li>
        {% endfor %}
        </ul>
    {% endif %}
{% endmacro %}
```

## 6. Filters

Filters allow you to transform the value of variables before displaying them. They are applied using the pipe symbol (`|`).

### Applying Filters (`{{ variable | filter_name }}`)

```html
<p>Original: {{ message }}</p>
<p>Uppercase: {{ message|upper }}</p>
<p>Capitalized: {{ message|capitalize }}</p>
<p>Stripped tags: {{ html_content|striptags }}</p>
<p>Joined list: {{ my_list|join(", ") }}</p>
```

### Common Built-in Filters

*   `safe`: Marks a string as safe, preventing auto-escaping.
*   `escape`: Escapes HTML characters (default behavior).
*   `capitalize`: Capitalizes the first letter of the string.
*   `lower`, `upper`, `title`: Converts string to lowercase, uppercase, or title case.
*   `trim`: Removes leading/trailing whitespace.
*   `striptags`: Strips HTML tags from a string.
*   `length`: Returns the length of a string or list.
*   `default(value)`: Provides a default value if the variable is undefined or falsey.
*   `join(separator)`: Joins items of a list with a separator.
*   `sort(reverse=False, attribute=None)`: Sorts a list.

### Chaining Filters

You can apply multiple filters by chaining them.

```html
<p>{{ raw_text|striptags|truncate(50) }}</p>
```

## 7. Tests

Jinja2 tests allow you to check variables against common expressions. They are used with the `is` operator.

### Using Tests (`{% if variable is test_name %}`)

```html
{% if user.name is defined %}
    <p>User name is defined.</p>
{% endif %}

{% if user.email is none %}
    <p>User has no email.</p>
{% endif %}
```

### Common Built-in Tests

*   `defined`, `undefined`: Checks if a variable is defined.
*   `none`: Checks if a variable is `None`.
*   `true`, `false`: Checks if a variable is `True` or `False`.
*   `iterable`: Checks if a variable is iterable.
*   `string`, `number`: Checks the type of a variable.
*   `even`, `odd`: Checks if a number is even or odd.

## 8. Template Inheritance

Template inheritance is a powerful feature that allows you to build a base layout and reuse it across multiple pages.

### `{% extends %}`

Specifies the parent template from which the current template inherits.

```html
<!-- templates/base.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{% block title %}My Flask App{% endblock %}</title>
    <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
</head>
<body>
    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
    </nav>
    <div class="content">
        {% block content %}{% endblock %}
    </div>
    <footer>
        <p>&copy; 2023 My Flask App</p>
    </footer>
</body>
</html>

<!-- templates/index.html -->
{% extends "base.html" %}

{% block title %}Homepage{% endblock %}

{% block content %}
    <h1>Welcome to the homepage!</h1>
    <p>This is some content for the homepage.</p>
{% endblock %}
```

### `{% block %}`

Defines a section of content that can be overridden by child templates.

### `{{ super() }}`

Used within a child block to render the content of the parent block, allowing you to extend rather than completely replace parent content.

```html
{% block head %}
    {{ super() }} {# Include content from parent's head block #}
    <style>
        .custom-style { color: blue; }
    </style>
{% endblock %}
```

## 9. Including Other Templates

### `{% include %}`

Includes the contents of another template within the current one. Useful for small, reusable snippets.

```html
{% include '_header.html' %}
```

### `{% import %}` and `{% from ... import ... %}` for Macros

Used to import macros from other template files.

```html
{% from 'macros.html' import render_field %}

<form>
    {{ render_field(form.username) }}
</form>
```

## 10. Static Files in Templates

As seen in the template inheritance example, `url_for('static', filename='...')` is used to generate URLs for static files.

```html
<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
<img src="{{ url_for('static', filename='images/logo.png') }}" alt="Logo">
```

## 11. Context Processors

Context processors are functions that automatically inject variables into the context of all templates rendered by your Flask application. This is useful for making global data (like the current user, site name, or navigation items) available without explicitly passing them to every `render_template` call.

### Making Variables Available Globally to Templates

```python
# app.py

@app.context_processor
def inject_global_data():
    return dict(site_name='My Awesome Site', current_year=2023)
```

Now, `{{ site_name }}` and `{{ current_year }}` will be available in all your templates.
