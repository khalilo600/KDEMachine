# Django Models and ORM

Django's Object-Relational Mapper (ORM) is a powerful and intuitive way to interact with your database. It allows you to define your database schema using Python classes (models) and then interact with your database using Python objects, abstracting away the need to write raw SQL.

## 1. What are Models?

A model is the single, definitive source of information about your data. It contains the essential fields and behaviors of the data you're storing. Each model maps to a single database table. In Django, models are defined as Python classes that subclass `django.db.models.Model`.

## 2. Defining Models

Models are typically defined in `models.py` files within your Django apps.

### `django.db.models.Model`

All Django models inherit from `django.db.models.Model`.

```python
# myapp/models.py

from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=200)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    publication_date = models.DateField()
    is_published = models.BooleanField(default=False)

    def __str__(self):
        return self.title
```

### Fields (Types and Options)

Django provides a rich set of field types to represent different kinds of data.

#### Common Field Types

*   `CharField`: For small-to-medium sized strings. Requires `max_length`.
*   `TextField`: For large text fields.
*   `IntegerField`: For integers.
*   `DecimalField`: For fixed-precision decimal numbers. Requires `max_digits` and `decimal_places`.
*   `FloatField`: For floating-point numbers.
*   `BooleanField`: For true/false values.
*   `DateField`: For dates.
*   `DateTimeField`: For dates and times.
*   `EmailField`: `CharField` that checks for a valid email address.
*   `URLField`: `CharField` that checks for a valid URL.
*   `UUIDField`: For universally unique identifiers.
*   `FileField`, `ImageField`: For file uploads.
*   `ForeignKey`: A many-to-one relationship.
*   `ManyToManyField`: A many-to-many relationship.
*   `OneToOneField`: A one-to-one relationship.

#### Common Field Options

*   `null=True`: (Database-related) Sets `NULL` in the database for empty values. Defaults to `False`.
*   `blank=True`: (Validation-related) Allows the field to be blank in forms. Defaults to `False`.
*   `default=value`: Sets a default value for the field.
*   `unique=True`: Ensures this field has a unique value across all records.
*   `primary_key=True`: Sets this field as the primary key for the model.
*   `auto_now=True`: Automatically updates the field to `now()` every time the object is saved.
*   `auto_now_add=True`: Automatically sets the field to `now()` when the object is first created.
*   `on_delete`: Required for `ForeignKey` and `OneToOneField`, specifies behavior when the referenced object is deleted (e.g., `models.CASCADE`, `models.PROTECT`, `models.SET_NULL`).
*   `verbose_name`: A human-readable name for the field.
*   `help_text`: Extra "help" text for forms.

### `__str__` Method

It's highly recommended to define a `__str__()` method for your models. This method is called whenever an instance of the model is converted to a string (e.g., in the Django Admin or when printing an object).

### `Meta` Class

Inside your model, you can define a `Meta` class to provide metadata about the model.

*   `ordering`: Specifies the default ordering for query results.
*   `verbose_name`: A human-readable singular name for the object.
*   `verbose_name_plural`: A human-readable plural name for the object.
*   `db_table`: Specifies the name of the database table to use for this model.
*   `unique_together`: Enforces uniqueness for a combination of fields.

```python
# myapp/models.py

class Post(models.Model):
    # ... fields ...

    class Meta:
        ordering = ['pub_date']
        verbose_name = 'blog post'
        verbose_name_plural = 'blog posts'
        unique_together = [['title', 'pub_date']]
```

## 3. Migrations

(For a more detailed guide on migrations, refer to `guide.md`)

After defining or changing your models, you need to create and apply migrations to update your database schema.

*   `python manage.py makemigrations [app_name]`: Creates new migration files based on changes detected in your models.
*   `python manage.py migrate [app_name]`: Applies pending migrations to the database.

## 4. QuerySet API

Django's ORM provides a rich QuerySet API for retrieving, filtering, and ordering objects from your database.

### Retrieving Objects

*   `Model.objects.all()`: Returns all objects from the database.
*   `Model.objects.get(pk=1)`: Retrieves a single object matching the lookup parameters. Raises `DoesNotExist` if no object is found, or `MultipleObjectsReturned` if more than one is found.
*   `Model.objects.filter(field=value)`: Returns a new QuerySet containing objects that match the lookup parameters.
*   `Model.objects.exclude(field=value)`: Returns a new QuerySet containing objects that do *not* match the lookup parameters.
*   `Model.objects.order_by('field')`: Orders the QuerySet by the given field. Use `-'field'` for descending order.
*   `Model.objects.values('field1', 'field2')`: Returns dictionaries instead of model instances.
*   `Model.objects.values_list('field1', 'field2', flat=True)`: Returns tuples or a flat list of values.
*   `Model.objects.annotate(new_field=Count('related_field'))`: Adds an annotation to the QuerySet.
*   `Model.objects.aggregate(Avg('field'))`: Returns a dictionary of aggregate values.

```python
from myapp.models import Post, Author
from django.db.models import Count, Avg

# Get all posts
posts = Post.objects.all()

# Get a specific author
author = Author.objects.get(email='john@example.com')

# Get posts by a specific author, ordered by publication date
author_posts = Post.objects.filter(author=author).order_by('-pub_date')

# Get posts with more than 5 comments
popular_posts = Post.objects.annotate(num_comments=Count('comment')).filter(num_comments__gt=5)

# Get average rating of books
avg_rating = Book.objects.aggregate(Avg('rating'))
```

### Chaining QuerySets

QuerySet methods return new QuerySets, allowing you to chain multiple filters and operations.

```python
published_posts = Post.objects.filter(is_published=True).order_by('-pub_date')
```

### `Q` Objects for Complex Lookups

`Q` objects allow you to build complex `WHERE` clauses using `AND`, `OR`, and `NOT` conditions.

```python
from django.db.models import Q

# Posts with title containing 'Django' OR content containing 'Python'
posts = Post.objects.filter(Q(title__icontains='Django') | Q(content__icontains='Python'))

# Posts with title containing 'Django' AND NOT published
posts = Post.objects.filter(Q(title__icontains='Django') & ~Q(is_published=True))
```

### `F` Objects for Database Functions

`F` objects allow you to refer to model field values within a query and perform database operations using them.

```python
from django.db.models import F

# Increment the number of views for all posts
Post.objects.all().update(views=F('views') + 1)

# Find posts where comment_count is greater than like_count
posts = Post.objects.filter(comment_count__gt=F('like_count'))
```

### `select_related()` and `prefetch_related()` for Optimizing Relationships

These methods are crucial for optimizing database queries involving relationships, preventing the "N+1 query problem."

*   `select_related()`: Used for `ForeignKey` and `OneToOneField` relationships. Performs a SQL `JOIN` and returns a QuerySet with related objects already populated.
*   `prefetch_related()`: Used for `ManyToManyField` and reverse `ForeignKey` relationships. Performs a separate lookup for each relationship and joins them in Python.

```python
# N+1 problem example:
# posts = Post.objects.all()
# for post in posts:
#     print(post.author.name) # Each access to author hits the database

# Using select_related to optimize ForeignKey
posts = Post.objects.select_related('author').all()
for post in posts:
    print(post.author.name) # No extra queries

# Using prefetch_related for ManyToMany or reverse ForeignKey
authors = Author.objects.prefetch_related('book_set').all()
for author in authors:
    for book in author.book_set.all(): # Accesses pre-fetched books
        print(book.title)
```

## 5. Creating, Updating, Deleting Objects

### Creating Objects

```python
# Method 1: Create an instance and save
post = Post(title="New Post", content="Some content.", author=author_instance)
post.save()

# Method 2: Using create() (saves immediately)
post = Post.objects.create(title="Another Post", content="More content.", author=author_instance)
```

### Updating Objects

```python
# Update a single object
post = Post.objects.get(pk=1)
post.title = "Updated Title"
post.save()

# Update multiple objects (QuerySet update)
Post.objects.filter(author=author_instance).update(is_published=True)
```

### Deleting Objects

```python
# Delete a single object
post = Post.objects.get(pk=1)
post.delete()

# Delete multiple objects (QuerySet delete)
Post.objects.filter(is_published=False).delete()
```

## 6. Relationships

Django's ORM handles relationships between models seamlessly.

### One-to-Many (`ForeignKey`)

*   Defined on the "many" side of the relationship.
*   Accessing the "one" side: `post.author`
*   Accessing the "many" side (reverse relationship): `author.post_set.all()` (or `author.posts.all()` if `related_name` is used).

### Many-to-Many (`ManyToManyField`)

*   Defined on either side of the relationship.
*   Accessing related objects: `book.authors.all()`, `author.books.all()`.
*   Adding/removing relationships: `book.authors.add(author)`, `book.authors.remove(author)`, `book.authors.clear()`.

### One-to-One (`OneToOneField`)

*   Similar to `ForeignKey` but enforces uniqueness on the related object.
*   Accessing related objects: `user.profile`, `profile.user`.

## 7. Model Managers

Managers are the interface through which database query operations are provided to Django models. Every `Model` has at least one `Manager`, by default named `objects`.

### `objects` Manager

```python
# myapp/models.py

class Post(models.Model):
    # ... fields ...
    pass

# Usage:
posts = Post.objects.all()
```

### Custom Managers

You can define custom managers to add extra QuerySet methods or modify the initial QuerySet returned by `all()`.

```python
# myapp/models.py

class PublishedPostManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_published=True)

class Post(models.Model):
    # ... fields ...
    objects = models.Manager() # Default manager
    published = PublishedPostManager() # Custom manager

# Usage:
published_posts = Post.published.all()
```

## 8. Signals

Django's signals allow certain senders to notify a set of receivers that some action has taken place. They are useful for decoupling applications.

### Common Signals

*   `pre_save`, `post_save`: Sent before/after a model's `save()` method is called.
*   `pre_delete`, `post_delete`: Sent before/after a model's `delete()` method is called.
*   `m2m_changed`: Sent when a `ManyToManyField` is changed.

### Connecting Signals

Signals are typically connected in an `AppConfig`'s `ready()` method or in a separate `signals.py` module.

```python
# myapp/signals.py

from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Post

@receiver(post_save, sender=Post)
def post_created_or_updated(sender, instance, created, **kwargs):
    if created:
        print(f"New post created: {instance.title}")
    else:
        print(f"Post updated: {instance.title}")

# myapp/apps.py

from django.apps import AppConfig

class MyappConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'myapp'

    def ready(self):
        import myapp.signals # Import signals here
```

## 9. Model Inheritance

Django supports three types of model inheritance, allowing you to reuse common code and define relationships between models in a structured way.

### Abstract Base Classes

*   Used when you want to put some common information into a number of other models.
*   Django does not create a database table for abstract base classes.

```python
# myapp/models.py

class CommonInfo(models.Model):
    name = models.CharField(max_length=100)
    age = models.IntegerField()

    class Meta:
        abstract = True

class Student(CommonInfo):
    school = models.CharField(max_length=100)

class Teacher(CommonInfo):
    subject = models.CharField(max_length=100)
```

### Multi-table Inheritance

*   Each model in the hierarchy is a model all by itself and gets its own database table.
*   A `OneToOneField` is automatically added from the child model to its parent.

```python
# myapp/models.py

class Place(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=80)

class Restaurant(Place):
    serves_pizza = models.BooleanField(default=False)
```

### Proxy Models

*   Used when you only want to change the Python behavior of a model, not its database storage.
*   No new database table is created.

```python
# myapp/models.py

class Person(models.Model):
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)

class MyPerson(Person):
    class Meta:
        proxy = True
        ordering = ['last_name']

    def do_something(self):
        return "I am a person."
```
