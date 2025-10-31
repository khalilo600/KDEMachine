# Django Forms

Django's forms framework provides a robust and flexible way to handle user input, from generating HTML forms to validating submitted data and saving it to models. It abstracts away much of the tedious work involved in form processing.

## 1. What are Forms?

In Django, a "Form" is a class that describes a form and determines how it behaves. It's a collection of fields, each with its own validation rules and rendering logic. Django forms handle three distinct parts:

1.  **Preparing data to be rendered as HTML.**
2.  **Handling submitted data from the client.**
3.  **Validating that data against a set of rules.**

## 2. Creating a Form

Forms are typically defined in an app's `forms.py` file.

### `django.forms.Form`

All custom forms inherit from `django.forms.Form`.

```python
# myapp/forms.py

from django import forms

class ContactForm(forms.Form):
    name = forms.CharField(label='Your Name', max_length=100)
    email = forms.EmailField(label='Your Email')
    message = forms.CharField(label='Your Message', widget=forms.Textarea)
    newsletter = forms.BooleanField(label='Subscribe to newsletter', required=False)
```

### Field Types

Django provides a wide array of field types, each corresponding to a specific type of input and validation.

*   `CharField`: Text input.
*   `IntegerField`: Integer input.
*   `EmailField`: Email input with email validation.
*   `DateField`, `DateTimeField`: Date and datetime inputs.
*   `BooleanField`: Checkbox input.
*   `ChoiceField`: Dropdown select or radio buttons. Requires `choices` argument (list of 2-tuples).
*   `ModelChoiceField`: A `ChoiceField` whose choices are a model QuerySet.
*   `FileField`, `ImageField`: For file uploads.

### Widgets

Widgets are Django's representation of an HTML input element. They handle how the field is rendered in HTML. Each field type has a default widget, but you can override it.

*   `forms.TextInput`: Default for `CharField`.
*   `forms.Textarea`: Default for `TextField`.
*   `forms.Select`: Default for `ChoiceField`.
*   `forms.RadioSelect`: Renders `ChoiceField` as radio buttons.
*   `forms.CheckboxInput`: Default for `BooleanField`.
*   `forms.PasswordInput`: For password fields.
*   `forms.FileInput`: For file upload fields.

```python
# myapp/forms.py

class LoginForm(forms.Form):
    username = forms.CharField(max_length=100)
    password = forms.CharField(widget=forms.PasswordInput)
```

## 3. Processing Forms

Forms are processed in your views.

### Instantiating a Form

*   **Unbound Form (GET request):** When the form is first displayed, it's empty.
    ```python
    form = ContactForm()
    ```
*   **Bound Form (POST request):** When the form is submitted, it's instantiated with the submitted data.
    ```python
    form = ContactForm(request.POST)
    ```

### `is_valid()` Method

This method runs all validation rules defined for the form and its fields. It returns `True` if all data is valid, `False` otherwise.

### `cleaned_data` Dictionary

If `is_valid()` returns `True`, the validated and normalized form data is available in the `form.cleaned_data` dictionary.

### Displaying Form Errors

If `is_valid()` returns `False`, `form.errors` will contain a dictionary of errors, mapping field names to a list of error messages.

```python
# myapp/views.py

from django.shortcuts import render
from .forms import ContactForm

def contact_view(request):
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            # Process the data in form.cleaned_data
            name = form.cleaned_data['name']
            email = form.cleaned_data['email']
            message = form.cleaned_data['message']
            # ... do something with the data (e.g., send email, save to DB) ...
            return render(request, 'myapp/success.html', {'name': name}) # Redirect or render success
    else:
        form = ContactForm() # An unbound form
    return render(request, 'myapp/contact.html', {'form': form})
```

## 4. Rendering Forms

Django forms can be rendered in templates in several ways.

### Automatic Rendering

*   `{{ form.as_p }}`: Renders each field wrapped in `<p>` tags.
*   `{{ form.as_ul }}`: Renders each field wrapped in `<li>` tags.
*   `{{ form.as_table }}`: Renders each field wrapped in `<tr>` tags.

```html
<!-- myapp/templates/myapp/contact.html -->

<form method="post">
    {% csrf_token %}
    {{ form.as_p }}
    <button type="submit">Submit</button>
</form>
```

### Manual Rendering

For fine-grained control, you can render each field individually.

```html
<!-- myapp/templates/myapp/contact.html -->

<form method="post">
    {% csrf_token %}
    <div>
        {{ form.name.label_tag }}
        {{ form.name }}
        {% if form.name.errors %}
            <ul class="errorlist">{% for error in form.name.errors %}<li>{{ error }}</li>{% endfor %}</ul>
        {% endif %}
    </div>
    <div>
        {{ form.email.label_tag }}
        {{ form.email }}
        {% if form.email.errors %}
            <ul class="errorlist">{% for error in form.email.errors %}<li>{{ error }}</li>{% endfor %}</ul>
        {% endif %}
    </div>
    <div>
        {{ form.message.label_tag }}
        {{ form.message }}
        {% if form.message.errors %}
            <ul class="errorlist">{% for error in form.message.errors %}<li>{{ error }}</li>{% endfor %}</ul>
        {% endif %}
    </div>
    <button type="submit">Submit</button>
</form>
```

### Accessing Individual Fields

Each field in a form can be accessed as `form.field_name`. This field object has properties like `label_tag`, `help_text`, `errors`, and `value`.

## 5. Model Forms

`ModelForm` is a helper class that lets you create a `Form` from a Django model. It automatically generates form fields based on the model's fields and handles saving the data back to the model instance.

### `django.forms.ModelForm`

```python
# myapp/forms.py

from django import forms
from .models import Post

class PostForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = ['title', 'content', 'is_published'] # Fields to include
        # exclude = ['pub_date'] # Fields to exclude
        widgets = {
            'content': forms.Textarea(attrs={'cols': 80, 'rows': 20}),
        }
```

### Saving `ModelForm` Data

```python
# myapp/views.py

from django.shortcuts import render, redirect, get_object_or_404
from .forms import PostForm
from .models import Post

def create_post(request):
    if request.method == 'POST':
        form = PostForm(request.POST)
        if form.is_valid():
            form.save() # Saves the new Post instance to the database
            return redirect('myapp:post_list')
    else:
        form = PostForm()
    return render(request, 'myapp/post_form.html', {'form': form})

def update_post(request, pk):
    post = get_object_or_404(Post, pk=pk)
    if request.method == 'POST':
        form = PostForm(request.POST, instance=post) # Pass instance to update existing object
        if form.is_valid():
            form.save()
            return redirect('myapp:post_detail', pk=post.pk)
    else:
        form = PostForm(instance=post) # Populate form with existing data
    return render(request, 'myapp/post_form.html', {'form': form})
```

## 6. Form Validation

Django's form validation occurs when `is_valid()` is called.

### Field-level Validation

Each field type has built-in validation. You can also add custom validation methods for individual fields.

```python
# myapp/forms.py

class MyForm(forms.Form):
    email = forms.EmailField()
    # ...

    def clean_email(self):
        email = self.cleaned_data['email']
        if "bad-domain.com" in email:
            raise forms.ValidationError("This email domain is not allowed.")
        return email
```

### Form-level Validation (`clean()`)

For validation that depends on multiple fields, use the form's `clean()` method.

```python
# myapp/forms.py

class RegistrationForm(forms.Form):
    password = forms.CharField(widget=forms.PasswordInput)
    password_confirm = forms.CharField(widget=forms.PasswordInput)

    def clean(self):
        cleaned_data = super().clean()
        password = cleaned_data.get('password')
        password_confirm = cleaned_data.get('password_confirm')

        if password and password_confirm and password != password_confirm:
            self.add_error('password_confirm', "Passwords do not match.")
            # Or raise forms.ValidationError("Passwords do not match.")

        return cleaned_data
```

### Custom Validators

You can write reusable validators that can be applied to any field.

```python
# myapp/validators.py

from django.core.exceptions import ValidationError

def validate_even(value):
    if value % 2 != 0:
        raise ValidationError(
            '%(value)s is not an even number', params={'value': value},
        )

# myapp/forms.py

from django import forms
from .validators import validate_even

class NumberForm(forms.Form):
    even_number = forms.IntegerField(validators=[validate_even])
```

## 7. Formsets

Formsets allow you to handle multiple instances of the same form on a single page. They are particularly useful for dynamically adding or removing related items.

### `modelformset_factory` and `formset_factory`

```python
# myapp/views.py

from django.forms import modelformset_factory
from .models import Book

def manage_books(request):
    BookFormSet = modelformset_factory(Book, fields=('title', 'author'), extra=1)
    if request.method == 'POST':
        formset = BookFormSet(request.POST)
        if formset.is_valid():
            formset.save()
            return redirect('success_url')
    else:
        formset = BookFormSet()
    return render(request, 'myapp/manage_books.html', {'formset': formset})
```

## 8. Form Security

### CSRF Protection (`{% csrf_token %}`)

Django's forms framework includes robust Cross-Site Request Forgery (CSRF) protection. Always include `{% csrf_token %}` in your forms that use the POST method.

```html
<form method="post">
    {% csrf_token %}
    <!-- form fields -->
    <button type="submit">Submit</button>
</form>
```
