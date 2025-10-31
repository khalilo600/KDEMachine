# Flask Extensions and Other Advanced Concepts

This guide delves into more advanced features and common extensions within the Flask ecosystem, helping you build more organized, robust, and scalable applications.

## 1. Blueprints

Blueprints provide a way to organize your Flask application into smaller, reusable components. They are like mini-applications that can be registered with a main application. Blueprints are ideal for structuring larger applications, creating reusable components, or building Flask extensions.

### What are Blueprints?

*   **Modularization:** Break down a large application into smaller, manageable parts.
*   **Reusability:** Package functionality (routes, templates, static files) that can be registered with different Flask applications.
*   **URL Prefixing:** Easily add a URL prefix to all routes within a Blueprint.
*   **Subdomains:** Map a Blueprint to a subdomain.

### Creating a Blueprint

```python
# my_app/auth/routes.py

from flask import Blueprint, render_template, request, redirect, url_for, flash

# Create a Blueprint instance
# 'auth' is the name of the blueprint
# __name__ is the import name, used to locate resources
# url_prefix='/auth' means all routes in this blueprint will be prefixed with /auth
auth_bp = Blueprint('auth', __name__, url_prefix='/auth',
                        template_folder='templates', # Optional: specify template folder
                        static_folder='static')     # Optional: specify static folder

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        if username == 'user' and password == 'pass':
            flash('Logged in successfully!', 'success')
            return redirect(url_for('main.dashboard')) # Referencing a route in another blueprint
        else:
            flash('Invalid credentials', 'danger')
    return render_template('auth/login.html') # Templates are relative to blueprint's template_folder

@auth_bp.route('/logout')
def logout():
    flash('You have been logged out.', 'info')
    return redirect(url_for('main.index'))
```

### Registering a Blueprint

Blueprints must be registered with the main Flask application instance.

```python
# app.py (main application file)

from flask import Flask, render_template
from my_app.auth.routes import auth_bp # Import your blueprint

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecretkey'

# Register the blueprint
app.register_blueprint(auth_bp)

# Example of another blueprint (e.g., for main routes)
main_bp = Blueprint('main', __name__)

@main_bp.route('/')
def index():
    return render_template('index.html')

@main_bp.route('/dashboard')
def dashboard():
    return 'Welcome to the Dashboard!'

app.register_blueprint(main_bp)

if __name__ == '__main__':
    app.run(debug=True)
```

### Template and Static File Handling with Blueprints

*   **Templates:** By default, Flask looks for templates in `templates` folders within the Blueprint's directory. You can specify `template_folder` when creating the Blueprint.
*   **Static Files:** Similar to templates, Blueprints can have their own `static` folders. Use `url_for('blueprint_name.static', filename='...')` to link to them.

### URL Prefixing and Subdomains

*   **`url_prefix`**: As shown above, all routes in `auth_bp` will be accessible under `/auth/login`, `/auth/logout`.
*   **`subdomain`**: You can also associate a Blueprint with a subdomain.

    ```python
    admin_bp = Blueprint('admin', __name__, subdomain='admin')
    @admin_bp.route('/')
    def admin_index():
        return 'Admin Dashboard'
    # In app.py: app.register_blueprint(admin_bp)
    # Access at http://admin.yourdomain.com/
    ```

## 2. Application Context and Request Context

Flask manages two contexts: the application context and the request context. These contexts make certain objects (like `current_app`, `g`, `request`, `session`) globally available during a request or within an application's lifecycle.

### Understanding Contexts

*   **Application Context:** Active when Flask needs to know which application is the target for a certain operation (e.g., accessing `current_app`, `app.config`).
*   **Request Context:** Active when Flask is handling a request. It makes `request`, `session`, and `g` available.

### `current_app`, `g` object

*   **`current_app`**: Refers to the active Flask application instance. Useful when you don't have direct access to the `app` object.
*   **`g` (global):** An object provided by Flask for storing data during a single request. It's a simple namespace object that is reset with each new request.

### `request`, `session`

*   **`request`**: The incoming request object, containing data like form submissions, query parameters, headers, etc.
*   **`session`**: The user's session object, used to store data across multiple requests.

### `app_context()`, `test_request_context()`

These methods allow you to manually push contexts, which is useful for running code outside of a request (e.g., in a script or during testing).

```python
from flask import Flask, current_app, g

app = Flask(__name__)

with app.app_context():
    # current_app is available here
    print(current_app.name)

with app.test_request_context('/hello', method='POST'):
    # request, session, g are available here
    print(request.path)
    g.user = 'test_user'
    print(g.user)
```

## 3. Configuration

Flask applications can be configured in various ways, from direct assignment to loading from files or environment variables.

### `app.config` object

`app.config` is a dictionary-like object that stores configuration variables. It's typically accessed after the `app` object is created.

```python
app = Flask(__name__)
app.config['SECRET_KEY'] = 'my_super_secret_key'
app.config['DEBUG'] = True
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
```

### Loading Configuration from Files

*   **`app.config.from_pyfile('config.py')`**: Loads configuration from a Python file.
*   **`app.config.from_envvar('APP_SETTINGS')`**: Loads configuration from a file specified by an environment variable.

```python
# config.py
DEBUG = False
SECRET_KEY = 'production_secret'

# app.py
app.config.from_pyfile('config.py')
```

### Environment Variables

*   `FLASK_ENV`: Sets the environment (e.g., `development`, `production`).
*   `FLASK_DEBUG`: Set to `1` to enable debug mode.

It's common to use environment variables for sensitive data or environment-specific settings.

## 4. Logging

Flask integrates with Python's standard `logging` module, allowing you to log events, errors, and debug information.

### Basic Logging Setup

By default, Flask logs to `stderr` when `DEBUG` is `True`.

```python
import logging

app = Flask(__name__)

# Basic configuration
app.logger.setLevel(logging.INFO)

@app.route('/log_test')
def log_test():
    app.logger.info('An INFO message')
    app.logger.warning('A WARNING message')
    app.logger.error('An ERROR message')
    return 'Logged!'
```

### Integrating with Python's `logging` module

You can configure more advanced logging handlers (e.g., file handlers, rotating handlers) using Python's `logging` module.

```python
from logging.handlers import RotatingFileHandler
import os

if not app.debug:
    if not os.path.exists('logs'):
        os.mkdir('logs')
    file_handler = RotatingFileHandler('logs/my_app.log', maxBytes=10240, backupCount=10)
    file_handler.setFormatter(logging.Formatter(
        '%(asctime)s %(levelname)s: %(message)s [in %(pathname)s:%(lineno)d]'))
    file_handler.setLevel(logging.INFO)
    app.logger.addHandler(file_handler)

    app.logger.setLevel(logging.INFO)
    app.logger.info('My App startup')
```

## 5. Testing Flask Applications

Flask provides a test client that allows you to simulate requests to your application without running a live server.

### Flask's Test Client

```python
# tests/test_app.py

import unittest
from app import app

class FlaskTestCase(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        self.app = app.test_client() # Create a test client

    def tearDown(self):
        pass

    def test_index_page(self):
        response = self.app.get('/')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b'Hello, World!', response.data)

    def test_login_page(self):
        response = self.app.post('/login', data=dict(
            username='user',
            password='pass'
        ), follow_redirects=True)
        self.assertIn(b'Logged in successfully!', response.data)
```

### Setting up a Test Environment

For database-driven applications, it's common to use an in-memory SQLite database or a separate test database to ensure tests are isolated and fast.

### Assertions

Use standard `unittest` assertions (`assertEqual`, `assertTrue`, `assertIn`, etc.) to verify responses.

## 6. Deployment

For production, you should not use Flask's built-in development server. Instead, use a production-ready WSGI server and a web server.

### WSGI Servers (Gunicorn, uWSGI)

*   **Gunicorn:** `gunicorn -w 4 my_app:app` (where `my_app` is your Python module and `app` is your Flask instance).
*   **uWSGI:** `uwsgi --http :8000 --module my_app:app`.

### Web Servers (Nginx, Apache) as Reverse Proxies

These servers sit in front of your WSGI server, handling incoming requests, serving static files, and forwarding dynamic requests to the WSGI server.

### Environment Variables in Production

Use environment variables for sensitive data (e.g., `SECRET_KEY`, database credentials) and environment-specific settings.

### Handling Static Files in Production

Configure your web server (Nginx/Apache) to serve static files directly from your `static` directory, bypassing the Flask application for performance.

## 7. Common Flask Extensions

Flask's extensibility is one of its greatest strengths. Here are some popular extensions:

*   **Flask-SQLAlchemy:** Integrates SQLAlchemy ORM with Flask (covered in `pysql_basics.md`).
*   **Flask-Login:** Provides user session management, handling user logins, logouts, and remembering authenticated users.
*   **Flask-Migrate:** Integrates Alembic with Flask for database migrations.
*   **Flask-Mail:** Adds email sending capabilities to your Flask application.
*   **Flask-RESTful:** A simple framework for building REST APIs with Flask.
*   **Flask-CORS:** A Flask extension for handling Cross-Origin Resource Sharing (CORS), making cross-domain AJAX possible.
*   **Flask-WTF:** Integrates WTForms for form handling and CSRF protection (covered in `flask_forms_validation.md`).

## 8. Signals

Flask provides a signaling system that allows different parts of your application to send and receive notifications. This helps in decoupling components.

### `blinker` Library

Flask's signaling system is provided by the `blinker` library.

### Built-in Signals

Flask provides several built-in signals:

*   `before_request`: Sent before a request is processed.
*   `after_request`: Sent after a request is processed.
*   `request_started`: Sent when a request context is pushed.
*   `request_finished`: Sent when a request context is popped.
*   `appcontext_pushed`, `appcontext_popped`: Sent when an application context is pushed/popped.
*   `got_request_exception`: Sent when an exception is encountered during request processing.

### Custom Signals

You can define and use your own custom signals.

```python
from flask import Flask, signals

app = Flask(__name__)

# Define a custom signal
user_registered = signals.Namespace().signal('user-registered')

# A receiver function
def log_user_registration(sender, user_id):
    print(f"User {user_id} registered from {sender.name}")

# Connect the receiver to the signal
user_registered.connect(log_user_registration, app)

@app.route('/register/<int:user_id>')
def register_user(user_id):
    # ... registration logic ...
    user_registered.send(app, user_id=user_id) # Send the signal
    return f"User {user_id} registered!"
```
