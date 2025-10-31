# Flask Routes and Views

In Flask, routes define the URLs that your application responds to, and views are the functions that handle the logic for those URLs, generating the responses sent back to the client. This document details how to define and manage routes and views in Flask.

## 1. What are Routes and Views in Flask?

*   **Routes:** These are the URL patterns that your Flask application listens for. When a client (e.g., a web browser) sends a request to a specific URL, Flask matches that URL against your defined routes.
*   **Views:** These are Python functions (or methods in class-based views) that are executed when a matching route is found. A view function's primary responsibility is to process the incoming request, interact with models (if applicable), and return an HTTP response.

## 2. Basic Routing

Routes are defined using the `@app.route()` decorator, which associates a URL path with a view function.

### `@app.route()` Decorator

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return 'Hello, World!'

@app.route('/about')
def about():
    return 'This is the about page.'
```

### HTTP Methods (`methods=['GET', 'POST']`)

By default, routes respond to `GET` requests. You can specify which HTTP methods a route should handle using the `methods` argument.

```python
from flask import request

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # Process login credentials
        return f'Logged in as {username}'
    else:
        return 'Please log in (GET request)'
```

## 3. Variable Rules

You can add variable parts to your URLs, which are then passed as keyword arguments to your view function.

### `<variable_name>`

```python
@app.route('/user/<username>')
def show_user_profile(username):
    return f'User: {username}'
```

### Type Converters

You can specify a converter to filter the variable to a specific type. If the URL segment doesn't match the converter type, a 404 error is raised.

*   `<string:name>` (default): Accepts any text without a slash.
*   `<int:id>`: Accepts positive integers.
*   `<float:price>`: Accepts positive floating-point values.
*   `<path:filepath>`: Accepts slashes, useful for matching entire directory paths.
*   `<uuid:id>`: Accepts UUID strings.

```python
@app.route('/post/<int:post_id>')
def show_post(post_id):
    return f'Post ID: {post_id}'

@app.route('/path/<path:subpath>')
def show_subpath(subpath):
    return f'Subpath: {subpath}'

@app.route('/product/<float:price>')
def show_product_price(price):
    return f'Product price: {price:.2f}'
```

## 4. URL Building

The `url_for()` function is used for dynamically building URLs for a specific function. This is preferred over hardcoding URLs because it allows you to change URLs in one place without breaking links throughout your application.

### `url_for()` Function

```python
from flask import url_for, redirect

@app.route('/hello')
def hello():
    return redirect(url_for('index')) # Redirects to the URL for the 'index' function

@app.route('/')
def index():
    return 'Index Page'

# Example usage in a template:
# <a href="{{ url_for('show_user_profile', username='Alice') }}">Alice's Profile</a>
```

### Generating URLs for Static Files

```python
# In a template:
# <link rel="stylesheet" href="{{ url_for('static', filename='css/style.css') }}">
```

### Generating URLs for Functions with Arguments

```python
# In Python code:
user_url = url_for('show_user_profile', username='Bob') # /user/Bob
post_url = url_for('show_post', post_id=123) # /post/123
```

## 5. Redirects and Errors

### `redirect()`

Returns a redirect response to another URL.

```python
from flask import redirect, url_for

@app.route('/old-page')
def old_page():
    return redirect(url_for('new_page'))

@app.route('/new-page')
def new_page():
    return 'This is the new page!'
```

### `abort()`

Raises an `HTTPException` for a given status code. This will trigger the appropriate error handler.

```python
from flask import abort

@app.route('/admin_only')
def admin_only():
    if not current_user.is_admin: # Assuming current_user is available
        abort(403) # Forbidden
    return 'Welcome, Admin!'
```

### `errorhandler()`

Registers a function to handle errors for a given HTTP status code or exception.

```python
from flask import render_template

@app.errorhandler(404)
def page_not_found(error):
    return render_template('404.html'), 404

@app.errorhandler(500)
def internal_server_error(error):
    return render_template('500.html'), 500
```

## 6. Request Object

The `request` object (imported from `flask`) contains all incoming request data and metadata. It's a global object that is available within a request context.

### Accessing Request Data

*   `request.args`: Dictionary-like object for query parameters (e.g., `?key=value`).
*   `request.form`: Dictionary-like object for form data (from `POST` requests).
*   `request.json`: If the incoming request has `Content-Type: application/json`, this will contain the parsed JSON data.
*   `request.files`: Dictionary-like object for uploaded files.

```python
@app.route('/search')
def search():
    query = request.args.get('q') # Get query parameter 'q'
    return f'Searching for: {query}'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return 'No file part'
    file = request.files['file']
    if file.filename == '':
        return 'No selected file'
    if file:
        file.save(f'uploads/{file.filename}')
        return 'File uploaded successfully'
```

### Request Methods (`request.method`)

```python
@app.route('/submit', methods=['GET', 'POST'])
def submit():
    if request.method == 'POST':
        return 'You made a POST request'
    else:
        return 'You made a GET request'
```

### Headers (`request.headers`)

```python
@app.route('/headers')
def show_headers():
    user_agent = request.headers.get('User-Agent')
    return f'Your User-Agent is: {user_agent}'
```

## 7. Response Object

View functions return responses that Flask converts into `Response` objects.

### Returning Strings, Tuples (content, status, headers)

*   **String:** Flask converts it to a `Response` object with `text/html` content type.
*   **Tuple:** `(response, status_code, headers)` or `(response, status_code)`. `response` can be a string, a `Response` object, or a WSGI callable.

```python
@app.route('/plain')
def plain_text():
    return 'This is plain text', 200, {'Content-Type': 'text/plain'}
```

### `jsonify()` for JSON Responses

Converts a Python dictionary or list to a JSON response. Automatically sets the `Content-Type` header to `application/json`.

```python
from flask import jsonify

@app.route('/api/data')
def api_data():
    data = {'name': 'Alice', 'age': 30}
    return jsonify(data)
```

### `make_response()`

Allows you to explicitly create a `Response` object and modify it.

```python
from flask import make_response

@app.route('/set-cookie')
def set_cookie():
    response = make_response("Cookie set!")
    response.set_cookie('my_cookie', 'some_value')
    return response
```

## 8. Session

Flask provides a `session` object to store user-specific data across requests. The session is implemented using signed cookies, so users can view the contents of their session but not modify it unless they know the secret key.

### Setting and Getting Session Variables

```python
from flask import session, redirect, url_for

app.config['SECRET_KEY'] = 'your_secret_key_here' # Crucial for session security

@app.route('/set-name/<name>')
def set_name(name):
    session['username'] = name
    return f'Username set to {name}'

@app.route('/get-name')
def get_name():
    username = session.get('username', 'Guest')
    return f'Hello, {username}'

@app.route('/logout')
def logout():
    session.pop('username', None) # Remove 'username' from session
    return redirect(url_for('index'))
```

### `SECRET_KEY` Configuration

**Always set a strong `SECRET_KEY` in production.** Without it, sessions are not secure.

## 9. Flash Messaging

Flash messages provide a way to display one-time messages to the user, typically after a form submission or an action.

### `flash()`

Adds a message to the session.

```python
from flask import flash

@app.route('/process-form', methods=['POST'])
def process_form():
    # ... process form data ...
    flash('Your form was submitted successfully!')
    return redirect(url_for('index'))
```

### `get_flashed_messages()`

Retrieves and clears flashed messages from the session. Typically used in templates.

```html
<!-- In your base.html or a specific template -->
{% with messages = get_flashed_messages() %}
  {% if messages %}
    <ul class="flashes">
    {% for message in messages %}
      <li>{{ message }}</li>
    {% endfor %}
    </ul>
  {% endif %}
{% endwith %}
```

## 10. Blueprints (Briefly)

Blueprints allow you to organize your Flask application into smaller, reusable components. They are like mini-applications that can be registered with a main application.

```python
# my_app/auth/routes.py

from flask import Blueprint

auth_bp = Blueprint('auth', __name__, url_prefix='/auth')

@auth_bp.route('/login')
def login():
    return "Auth Login Page"

# my_app/app.py

from flask import Flask
from my_app.auth.routes import auth_bp

app = Flask(__name__)
app.register_blueprint(auth_bp)
```

(For more details on Blueprints, refer to `flask_extensions_other.md`)
