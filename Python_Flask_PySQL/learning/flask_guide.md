# Flask Application Development Guide

This guide provides a comprehensive introduction to building web applications with Flask, a lightweight Python web framework. It covers everything from setting up your project to handling requests, rendering templates, and basic deployment considerations.

## 1. Introduction to Flask

### What is Flask?

Flask is a micro web framework for Python. It's called a "microframework" because it does not require particular tools or libraries. It has no database abstraction layer, form validation, or any other components where pre-existing third-party libraries provide common functions. Instead, Flask supports extensions that add application features as if they were implemented in Flask itself.

### Why choose Flask?

*   **Lightweight and Flexible:** Provides the essentials without imposing rigid structures, allowing developers to choose their preferred tools and libraries.
*   **Easy to Learn:** Simple API and clear documentation make it accessible for beginners.
*   **Scalable:** Suitable for both small projects and complex web applications.
*   **Extensible:** A rich ecosystem of Flask extensions for databases, forms, authentication, etc.
*   **Pythonic:** Embraces Python's philosophy, making code clean and readable.

### Microframework Concept

Being a microframework means Flask aims to keep the core simple but extensible. It doesn't make many decisions for you, giving you freedom but also requiring you to make more choices about components like ORMs, form libraries, and authentication systems.

## 2. Project Setup

### 2.1 Installation

It's highly recommended to use a virtual environment for your Flask projects.

```bash
python3 -m venv venv
source venv/bin/activate # On Windows: .\venv\Scripts\activate
pip install Flask
```

### 2.2 Basic App Structure

A typical Flask project structure might look like this:

```
my_flask_app/
├── venv/
├── app.py
├── static/
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── script.js
└── templates/
    └── index.html
```

### 2.3 Running the Development Server

Create a file named `app.py` (or `wsgi.py`) in your project root.

```python
# app.py

from flask import Flask

app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True) # debug=True enables debug mode and auto-reloader
```

To run the app:

```bash
# Ensure your virtual environment is active
python app.py
```

Alternatively, you can set the `FLASK_APP` environment variable and use `flask run`:

```bash
export FLASK_APP=app.py # On Windows: set FLASK_APP=app.py
flask run
# For debug mode:
export FLASK_DEBUG=1 # On Windows: set FLASK_DEBUG=1
flask run
```

Open your browser and go to `http://127.0.0.1:5000` (or the address shown in your terminal). You should see "Hello, World!".

## 3. Basic Application

### `app = Flask(__name__)`

This line creates your Flask application instance. `__name__` is a special Python variable that gets the name of the current module. Flask uses this to know where to look for resources like templates and static files.

### `@app.route()` Decorator

The `@app.route()` decorator associates a URL path with a Python function. When a user navigates to that URL, the decorated function is executed, and its return value is sent back as the response.

```python
from flask import Flask

app = Flask(__name__)

@app.route('/') # Route for the homepage
def index():
    return 'Welcome to the homepage!'

@app.route('/about') # Route for the about page
def about():
    return 'This is the about page.'

@app.route('/user/<username>') # Route with a variable part
def show_user_profile(username):
    # username is passed as an argument to the function
    return f'User: {username}'

@app.route('/post/<int:post_id>') # Route with a type-hinted variable (integer)
def show_post(post_id):
    return f'Post ID: {post_id}'
```

### Returning Simple Strings

As shown above, functions decorated with `@app.route()` can simply return a string, which Flask will wrap in an `HTTPResponse` object.

## 4. Templates (Jinja2)

Flask uses the Jinja2 templating engine to render dynamic HTML content. Templates are typically stored in a `templates` folder in your application's root directory.

### 4.1 Rendering Templates (`render_template`)

```python
# app.py

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/hello/<name>')
def hello(name):
    return render_template('hello.html', name=name, title="Greeting")
```

### 4.2 Passing Data to Templates

Variables passed as keyword arguments to `render_template` become available in the template context.

```html
<!-- templates/index.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Homepage</title>
</head>
<body>
    <h1>Welcome!</h1>
</body>
</html>

<!-- templates/hello.html -->
<!DOCTYPE html>
<html>
<head>
    <title>{{ title }}</title>
</head>
<body>
    <h1>Hello, {{ name }}!</h1>
</body>
</html>
```

### 4.3 Template Inheritance

Jinja2 supports template inheritance, allowing you to define a base layout and extend it in child templates.

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

<!-- templates/index.html (extending base.html) -->
{% extends "base.html" %}

{% block title %}Homepage{% endblock %}

{% block content %}
    <h1>Welcome to the homepage!</h1>
    <p>This is some content for the homepage.</p>
{% endblock %}
```

## 5. Static Files

Static files (CSS, JavaScript, images) are typically stored in a `static` folder in your application's root directory.

### 5.1 Serving CSS, JS, Images

Flask automatically serves files from the `static` folder. You can link to them in your templates using `url_for()`.

```html
<!-- templates/base.html (as seen above) -->
<link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
<script src="{{ url_for('static', filename='js/script.js') }}"></script>
<img src="{{ url_for('static', filename='images/logo.png') }}" alt="Logo">
```

### 5.2 Example `static/css/style.css`

```css
/* static/css/style.css */

body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #f4f4f4;
    color: #333;
}

nav {
    background-color: #333;
    color: #fff;
    padding: 10px;
}

nav a {
    color: #fff;
    margin-right: 15px;
    text-decoration: none;
}

.content {
    padding: 20px;
}
```

## 6. Forms

Handling forms in Flask involves processing `GET` and `POST` requests and accessing submitted data.

### 6.1 Handling Form Submissions (GET/POST)

```python
# app.py

from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # Basic validation and authentication logic here
        if username == 'admin' and password == 'password':
            return redirect(url_for('dashboard'))
        else:
            return render_template('login.html', error='Invalid credentials')
    return render_template('login.html')

@app.route('/dashboard')
def dashboard():
    return 'Welcome to the dashboard!'
```

### 6.2 Accessing Form Data (`request.form`)

When a form is submitted via `POST`, the data is available in `request.form`, which is a dictionary-like object.

### 6.3 Basic Validation

Basic validation can be done manually in the view function. For more complex validation, Flask-WTF (covered later) is commonly used.

```python
# Inside the login POST block
if not username or not password:
    return render_template('login.html', error='Both fields are required')
```

## 7. Database Integration (Conceptual)

Flask itself does not come with a built-in ORM or database abstraction layer. You are free to choose any Python database library.

### Brief mention of ORMs (SQLAlchemy) or raw SQL

*   **SQLAlchemy:** A powerful and flexible SQL toolkit and Object Relational Mapper (ORM). Flask-SQLAlchemy is a popular extension that integrates SQLAlchemy with Flask.
*   **Raw SQL:** You can use Python's built-in database connectors (e.g., `psycopg2` for PostgreSQL, `mysql-connector-python` for MySQL) to execute raw SQL queries.

### Connecting to a Database

Typically, you would configure your database connection details in `app.config` and initialize your ORM or database connector.

```python
# app.py (conceptual with Flask-SQLAlchemy)

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return f'<User {self.username}>'

# To create tables (run once in Python shell):
# >>> from app import db, app
# >>> with app.app_context():
# ...     db.create_all()
```

## 8. Blueprints

Blueprints provide a way to organize your Flask application into smaller, reusable components. They are useful for larger applications, allowing you to modularize your code into separate files or even separate packages.

### Organizing Larger Applications

```
my_flask_app/
├── venv/
├── app.py
├── auth/
│   ├── __init__.py
│   └── routes.py
├── blog/
│   ├── __init__.py
│   └── routes.py
├── static/
└── templates/
```

### Registering Blueprints

```python
# auth/routes.py

from flask import Blueprint, render_template

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login')
def login():
    return render_template('auth/login.html')

# app.py

from flask import Flask
from auth.routes import auth_bp

app = Flask(__name__)
app.register_blueprint(auth_bp)

# Now, /auth/login will be handled by auth_bp.login
```

## 9. Error Handling

Flask allows you to define custom error pages for different HTTP error codes.

### `@app.errorhandler()`

```python
# app.py

from flask import render_template

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(error):
    return render_template('500.html'), 500
```

### Custom Error Pages

Create `templates/404.html` and `templates/500.html`.

## 10. Configuration

Flask applications can be configured in several ways.

### `app.config`

`app.config` is a dictionary-like object that stores configuration variables.

```python
# app.py

app.config['SECRET_KEY'] = 'a_very_secret_key'
app.config['DEBUG'] = True

# Or from a config file
app.config.from_pyfile('config.py')
```

### Environment Variables

It's common to load sensitive configurations from environment variables.

```python
# config.py

import os

SECRET_KEY = os.environ.get('SECRET_KEY') or 'default-secret-key'
DATABASE_URL = os.environ.get('DATABASE_URL')
```

## 11. Debugging

### Debug Mode

Setting `app.debug = True` (or `FLASK_DEBUG=1`) enables debug mode, which provides:

*   An interactive debugger in the browser for unhandled exceptions.
*   Automatic reloader for code changes.

### Werkzeug Debugger

Flask uses the Werkzeug debugger, which is automatically enabled in debug mode. It allows you to inspect the stack trace and execute Python code in the browser when an error occurs.

## 12. Deployment (Basic)

For production, you should not use Flask's built-in development server. Instead, use a production-ready WSGI server.

### WSGI Servers (Gunicorn, uWSGI)

*   **Gunicorn:** A Python WSGI HTTP Server for UNIX.
    ```bash
    pip install gunicorn
    gunicorn -w 4 app:app # -w for number of worker processes
    ```
*   **uWSGI:** Another popular WSGI server.

### Web Servers (Nginx, Apache)

These servers act as reverse proxies, forwarding requests to your WSGI server and serving static files directly.

```nginx
# Nginx configuration example

server {
    listen 80;
    server_name your_domain.com;

    location /static {
        alias /path/to/your/flask_app/static;
    }

    location / {
        proxy_pass http://127.0.0.1:8000; # Address of your Gunicorn/uWSGI server
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```
