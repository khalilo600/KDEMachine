# Flask Forms and Validation (using Flask-WTF)

Handling user input and ensuring its validity is a crucial part of web development. Flask, being a microframework, doesn't include a built-in form library. However, `WTForms` is a popular choice, and `Flask-WTF` provides seamless integration with Flask, simplifying form creation, validation, and CSRF protection.

## 1. Introduction to Forms in Flask

### Why use a form library?

Manually creating HTML forms, handling submission, validating data, and displaying errors can be repetitive and error-prone. A form library like WTForms automates much of this process, providing:

*   **Pythonic form definition:** Define forms as Python classes.
*   **Automatic rendering:** Easily render forms in templates.
*   **Robust validation:** Built-in and custom validators.
*   **CSRF protection:** Essential security feature.
*   **Integration with models:** Simplify data persistence.

### WTForms and Flask-WTF

*   **WTForms:** The core library for defining forms, fields, and validators.
*   **Flask-WTF:** An extension that integrates WTForms with Flask, adding features like CSRF protection, file upload handling, and reCAPTCHA support.

## 2. Installation

```bash
pip install Flask-WTF
```

## 3. Creating a Form

Forms are defined as Python classes that inherit from `FlaskForm` (from `flask_wtf`). Each field in the form is an instance of a WTForms field type.

```python
# app.py (or a separate forms.py file)

from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField, TextAreaField, SelectField, IntegerField
from wtforms.validators import DataRequired, Length, Email, EqualTo, NumberRange, URL

class LoginForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Remember Me')
    submit = SubmitField('Login')

class RegistrationForm(FlaskForm):
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)])
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

class PostForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired(), Length(max=100)])
    content = TextAreaField('Content', validators=[DataRequired()])
    category = SelectField('Category', choices=[('tech', 'Technology'), ('news', 'News')], validators=[DataRequired()])
    submit = SubmitField('Post')
```

### Field Types

WTForms provides various field types:

*   `StringField`: For single-line text input.
*   `PasswordField`: For password input (renders as `type="password"`).
*   `TextAreaField`: For multi-line text input.
*   `BooleanField`: For checkboxes.
*   `IntegerField`, `FloatField`: For number inputs.
*   `SelectField`: For dropdowns.
*   `SubmitField`: For submit buttons.
*   `FileField`: For file uploads.

### Validators

Validators are functions that check if the submitted data meets certain criteria.

*   `DataRequired()`: Ensures the field is not empty.
*   `Length(min=x, max=y)`: Checks if the string length is within a range.
*   `Email()`: Validates if the input is a valid email address.
*   `EqualTo('field_name')`: Checks if the field's value is equal to another field's value (e.g., for password confirmation).
*   `NumberRange(min=x, max=y)`: Checks if a number is within a range.
*   `URL()`: Validates if the input is a valid URL.

## 4. Rendering Forms in Templates

Flask-WTF forms can be easily rendered in Jinja2 templates.

### `{{ form.field_name.label }}` and `{{ form.field_name() }}`

*   `form.field_name.label`: Renders the HTML `<label>` tag for the field.
*   `form.field_name()`: Renders the HTML input element for the field.

```html
<!-- templates/login.html -->

<form method="POST" action="">
    {{ form.csrf_token }} {# Important for CSRF protection #}
    <p>
        {{ form.username.label }}<br>
        {{ form.username(size=32) }}
        {% for error in form.username.errors %}
            <span style="color: red;">{{ error }}</span>
        {% endfor %}
    </p>
    <p>
        {{ form.password.label }}<br>
        {{ form.password(size=32) }}
        {% for error in form.password.errors %}
            <span style="color: red;">{{ error }}</span>
        {% endfor %}
    </p>
    <p>{{ form.remember() }} {{ form.remember.label }}</p>
    <p>{{ form.submit() }}</p>
</form>
```

### Displaying Field Errors

Each field object has an `errors` attribute, which is a list of validation error messages.

### CSRF Token (`{{ form.csrf_token }}`)

Flask-WTF automatically generates and validates a CSRF token. You must include `{{ form.csrf_token }}` inside your `<form>` tags for CSRF protection to work.

## 5. Processing Form Data in Views

### Instantiating a Form with `request.form`

When a form is submitted via `POST`, you instantiate your form class with `request.form` (and `request.files` for file uploads).

### `form.validate_on_submit()`

This method is a convenient shortcut that does two things:

1.  Checks if the request method is `POST`.
2.  If it is `POST`, it calls `form.validate()`.

It returns `True` if the request is `POST` and the form is valid, `False` otherwise.

### Accessing Validated Data (`form.field_name.data`)

If `form.validate_on_submit()` returns `True`, the validated and converted data for each field is available via `form.field_name.data`.

### Handling Validation Errors

If `form.validate_on_submit()` returns `False`, you can re-render the form, and the `form.field_name.errors` will automatically contain the error messages.

```python
# app.py

from flask import Flask, render_template, request, redirect, url_for, flash
from .forms import RegistrationForm, LoginForm

app = Flask(__name__)
app.config['SECRET_KEY'] = 'a_very_secret_key' # Required for Flask-WTF

@app.route('/register', methods=['GET', 'POST'])
def register():
    form = RegistrationForm()
    if form.validate_on_submit():
        # Process valid data
        username = form.username.data
        email = form.email.data
        password = form.password.data
        # Save user to database (e.g., using SQLAlchemy)
        flash(f'Account created for {username}!', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Register', form=form)

@app.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        # Check credentials
        if form.username.data == 'admin' and form.password.data == 'password':
            flash('You have been logged in!', 'success')
            return redirect(url_for('home'))
        else:
            flash('Login Unsuccessful. Please check username and password', 'danger')
    return render_template('login.html', title='Login', form=form)

@app.route('/home')
def home():
    return 'Welcome Home!'
```

## 6. Model Forms (Flask-SQLAlchemy integration)

If you are using an ORM like SQLAlchemy, Flask-WTF can generate forms directly from your models, simplifying the process of creating forms for database objects.

```python
# app.py (assuming Flask-SQLAlchemy setup)

from flask_wtf.sqla import model_form
from .models import User # Your SQLAlchemy User model

# Create a form for the User model
UserForm = model_form(User, db.session)

# Or define it as a class
class UserProfileForm(FlaskForm):
    class Meta:
        model = User
        fields = ['username', 'email']
        # exclude = ['password']

# In a view:
@app.route('/profile/edit', methods=['GET', 'POST'])
def edit_profile():
    user = User.query.get(1) # Get user to edit
    form = UserProfileForm(obj=user) # Populate form with existing user data
    if form.validate_on_submit():
        form.populate_obj(user) # Update user object with form data
        db.session.commit()
        flash('Profile updated!', 'success')
        return redirect(url_for('profile'))
    return render_template('edit_profile.html', form=form)
```

### `QuerySelectField`

For fields that should represent a choice from a database query (e.g., selecting an author from a list of users).

```python
from wtforms_sqlalchemy.fields import QuerySelectField

class PostForm(FlaskForm):
    # ...
    author = QuerySelectField(query_factory=lambda: User.query.all(), get_label='username')
    # ...
```

## 7. Custom Validators

Beyond the built-in validators, you can create your own custom validation logic.

### Field-level Custom Validators

Define a method `validate_fieldname` in your form class.

```python
class RegistrationForm(FlaskForm):
    # ...
    username = StringField('Username', validators=[DataRequired(), Length(min=2, max=20)])

    def validate_username(self, username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('That username is taken. Please choose a different one.')
```

### Form-level Custom Validators

Define a `validate()` method in your form class to perform validation that involves multiple fields.

```python
class MyForm(FlaskForm):
    field1 = StringField('Field 1')
    field2 = StringField('Field 2')

    def validate(self):
        if not super().validate(): # Run all field-level validators first
            return False

        if self.field1.data == self.field2.data:
            self.field2.errors.append('Field 2 cannot be the same as Field 1.')
            return False
        return True
```

## 8. File Uploads with Flask-WTF

Flask-WTF simplifies handling file uploads.

```python
# app.py

from flask_wtf.file import FileField, FileAllowed, FileRequired
from werkzeug.utils import secure_filename
import os

app.config['UPLOAD_FOLDER'] = 'uploads'

class UploadForm(FlaskForm):
    photo = FileField('Upload Photo', validators=[FileRequired(), FileAllowed(['jpg', 'png'], 'Images only!')])
    submit = SubmitField('Upload')

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    form = UploadForm()
    if form.validate_on_submit():
        f = form.photo.data
        filename = secure_filename(f.filename)
        f.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        flash('File uploaded successfully!', 'success')
        return redirect(url_for('upload_file'))
    return render_template('upload.html', form=form)
```

### `FileField`

Used for file input fields.

### `FileRequired`, `FileAllowed` Validators

*   `FileRequired()`: Ensures a file is uploaded.
*   `FileAllowed(extensions, message)`: Checks if the uploaded file's extension is in the allowed list.

### Handling Uploaded Files

After validation, the uploaded file object is available at `form.field_name.data`. You can then use its `save()` method.

## 9. CSRF Protection

Flask-WTF provides robust CSRF (Cross-Site Request Forgery) protection automatically.

### Automatic CSRF Token Generation

As long as `app.config['SECRET_KEY']` is set, Flask-WTF will automatically generate a CSRF token for your forms. You just need to include `{{ form.csrf_token }}` in your template.

### `SECRET_KEY` Requirement

The `SECRET_KEY` is crucial for the security of your application, especially for sessions and CSRF protection. It should be a long, random string and kept secret.
