# Django Database Concepts

This document provides an extensive overview of Django's database interaction, covering configuration, advanced migration techniques, raw SQL, transactions, database functions, and testing strategies.

## 1. Configuration

Django's database connections are configured in the `DATABASES` setting within your project's `settings.py` file.

### `settings.py` (`DATABASES` dictionary)

```python
# myproject/settings.py

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    },
    'replica': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'replica_db',
        'USER': 'replica_user',
        'PASSWORD': 'replica_password',
        'HOST': 'localhost',
        'PORT': '',
        'OPTIONS': {
            'readonly': True,
        },
    }
}
```

*   `ENGINE`: Specifies the database backend (e.g., `django.db.backends.postgresql`, `django.db.backends.mysql`, `django.db.backends.oracle`).
*   `NAME`: The name of your database.
*   `USER`, `PASSWORD`, `HOST`, `PORT`: Credentials and connection details.
*   `OPTIONS`: Backend-specific options.

### Multiple Database Connections

You can define multiple database connections in the `DATABASES` setting. By default, Django uses the connection named `'default'`.

To use a different database, you can specify it with the `using()` method on a QuerySet:

```python
# Read from the 'replica' database
posts = Post.objects.using('replica').all()

# Write to the 'default' database
Post.objects.using('default').create(title="New Post")
```

## 2. Migrations (Advanced Topics)

(For basic migration concepts, refer to `guide.md` and `models.md`)

### Customizing Migration Operations

Sometimes you need to perform custom operations in your migrations that aren't covered by Django's built-in schema operations. You can use `RunPython` or `RunSQL`.

*   **`RunPython`**: Executes arbitrary Python code. Useful for data migrations.

    ```python
    # myapp/migrations/000X_my_custom_migration.py

    from django.db import migrations

    def combine_names(apps, schema_editor):
        MyModel = apps.get_model('myapp', 'MyModel')
        for row in MyModel.objects.all():
            row.full_name = f"{row.first_name} {row.last_name}"
            row.save()

    class Migration(migrations.Migration):
        dependencies = [
            ('myapp', '000X_previous_migration'),
        ]

        operations = [
            migrations.AddField(
                model_name='mymodel',
                name='full_name',
                field=migrations.CharField(max_length=200, null=True),
            ),
            migrations.RunPython(combine_names),
        ]
    ```

*   **`RunSQL`**: Executes arbitrary SQL statements.

    ```python
    # myapp/migrations/000X_my_sql_migration.py

    from django.db import migrations

    class Migration(migrations.Migration):
        dependencies = [
            ('myapp', '000X_previous_migration'),
        ]

        operations = [
            migrations.RunSQL(
                "ALTER TABLE myapp_mymodel ADD COLUMN new_column INT DEFAULT 0;",
                "ALTER TABLE myapp_mymodel DROP COLUMN new_column;"
            ),
        ]
    ```

### Data Migrations

`RunPython` is the primary tool for data migrations, allowing you to modify data within your database as part of a migration.

### Squashing Migrations

As your project grows, you might accumulate many migration files. Squashing migrations combines multiple migration files into a single one, reducing the number of files and improving migration performance.

```bash
python manage.py squashmigrations myapp 0004
```

This squashes all migrations up to and including `0004` for `myapp`.

## 3. Query Builder (Raw SQL)

While Django's ORM is powerful, sometimes you need to execute raw SQL queries for complex operations or performance reasons.

### `django.db.connection.cursor()`

For executing custom SQL directly.

```python
from django.db import connection

def my_custom_sql():
    with connection.cursor() as cursor:
        cursor.execute("UPDATE myapp_post SET views = views + 1 WHERE id = %s", [1])
        cursor.execute("SELECT title, content FROM myapp_post WHERE id = %s", [1])
        row = cursor.fetchone()
    return row
```

### `Model.objects.raw()`

For executing raw SQL queries that return model instances.

```python
posts = Post.objects.raw('SELECT id, title, content FROM myapp_post WHERE author_id = %s', [1])
for p in posts:
    print(p.title)
```

### `DB::statement()` (Equivalent to Laravel's `DB::statement()`)

Django doesn't have a direct `DB::statement()` equivalent like Laravel. You would typically use `django.db.connection.cursor().execute()` for schema-altering SQL statements.

## 4. Transactions

Transactions ensure that a series of database operations are treated as a single, atomic unit of work. Either all operations succeed and are committed, or if any fail, all are rolled back.

### `atomic()` Decorator

The `atomic()` decorator is the most common way to ensure atomicity for a block of code.

```python
from django.db import transaction

@transaction.atomic
def create_post_and_log(title, content, user):
    post = Post.objects.create(title=title, content=content, author=user)
    # If this fails, the post creation will be rolled back
    LogEntry.objects.create(action='post_created', object_id=post.id)
```

### `transaction.on_commit()`

Allows you to register callbacks to be executed after the current transaction successfully commits. This is useful for tasks that should only happen if the database changes are permanent (e.g., sending emails, updating search indexes).

```python
from django.db import transaction

def send_email_after_commit(user_email):
    print(f"Sending email to {user_email}")

@transaction.atomic
def register_user(username, email, password):
    user = User.objects.create_user(username=username, email=email, password=password)
    transaction.on_commit(lambda: send_email_after_commit(user.email))
    return user
```

### Savepoints

Savepoints allow you to create nested transaction blocks. If an inner block fails, you can roll back to the savepoint without affecting the outer transaction.

```python
from django.db import transaction

@transaction.atomic
def complex_operation():
    # Outer transaction
    sid = transaction.savepoint()
    try:
        # Inner operation 1
        Post.objects.create(title="Part 1")
        transaction.savepoint_commit(sid)

        sid = transaction.savepoint()
        # Inner operation 2 (might fail)
        Post.objects.create(title="Part 2", invalid_field="error")
        transaction.savepoint_commit(sid)

    except Exception:
        transaction.savepoint_rollback(sid) # Rollback only the inner operation
        print("Inner operation failed, rolled back to savepoint.")

    # Outer transaction commits here if no unhandled exceptions
```

## 5. Database Functions

Django's ORM allows you to use database functions directly in your QuerySets.

### `Func` Expressions

Represents a database function (e.g., `LOWER`, `UPPER`, `CONCAT`).

```python
from django.db.models import Func, F, Value

# Convert all titles to uppercase
posts = Post.objects.annotate(upper_title=Func(F('title'), function='UPPER'))
for post in posts:
    print(post.upper_title)
```

### `Value` Expressions

Wraps a Python value for use in database queries, preventing it from being interpreted as a column name.

```python
from django.db.models import Value

posts = Post.objects.annotate(greeting=Value('Hello ') + F('title'))
```

### `ExpressionWrapper`

Used to apply an expression to a field and then cast the result to a specific output field type.

```python
from django.db.models import F, ExpressionWrapper, fields

posts = Post.objects.annotate(
    age_in_days=ExpressionWrapper(F('pub_date') - F('created_at'), output_field=fields.DurationField())
)
```

## 6. Database Testing

(Expands on `other.md`'s testing section)

### `TestCase` and `TransactionTestCase`

*   **`django.test.TestCase`**: Each test method runs in its own transaction, which is rolled back at the end of the method. This ensures that each test has a clean database state.
*   **`django.test.TransactionTestCase`**: Used for tests that need to commit transactions (e.g., testing `on_commit` hooks). The database is truncated (emptied) after each test, which is slower than `TestCase`'s rollback.

### `setUpTestData`

For `TestCase` classes, `setUpTestData` is a class method that runs once for the entire test class. Use it to create data that is not modified by any test methods, as this data will not be rolled back between tests.

```python
from django.test import TestCase
from myapp.models import Post

class PostTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Create data that will be used by all tests in this class
        cls.author = User.objects.create_user(username='testuser', password='password')
        cls.post1 = Post.objects.create(title="Post 1", content="Content 1", author=cls.author)
        cls.post2 = Post.objects.create(title="Post 2", content="Content 2", author=cls.author)

    def test_post_count(self):
        self.assertEqual(Post.objects.count(), 2)

    def test_post_title(self):
        self.assertEqual(self.post1.title, "Post 1")
```

### Assertions (`assertNumQueries`)

Django's testing framework provides `assertNumQueries` to check the number of database queries executed within a block of code. This is invaluable for optimizing performance and detecting N+1 query problems.

```python
from django.test import TestCase
from myapp.models import Post, Comment

class QueryTest(TestCase):
    def setUp(self):
        author = User.objects.create_user(username='testuser', password='password')
        post = Post.objects.create(title="Test Post", content="Content", author=author)
        Comment.objects.create(post=post, text="Comment 1")
        Comment.objects.create(post=post, text="Comment 2")

    def test_n_plus_1_problem(self):
        with self.assertNumQueries(1): # Expect 1 query for Post and its related comments
            posts = Post.objects.prefetch_related('comment_set').all()
            for post in posts:
                for comment in post.comment_set.all():
                    print(comment.text)
```

## 7. Database Routers

Database routers are used in multi-database setups to determine which database should be used for a given model or operation.

### For Multi-Database Setups

Create a router class:

```python
# myproject/db_routers.py

class MyRouter:
    route_app_labels = {'auth', 'contenttypes', 'sessions', 'admin'}

    def db_for_read(self, model, **hints):
        if model._meta.app_label in self.route_app_labels:
            return 'default'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label in self.route_app_labels:
            return 'default'
        return None

    def allow_relation(self, obj1, obj2, **hints):
        if (
            obj1._meta.app_label in self.route_app_labels or
            obj2._meta.app_label in self.route_app_labels
        ):
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label in self.route_app_labels:
            return db == 'default'
        return None
```

Register the router in `settings.py`:

```python
# myproject/settings.py

DATABASE_ROUTERS = ['myproject.db_routers.MyRouter']
```
