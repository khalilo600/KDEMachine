# Django's `manage.py` Utility

`manage.py` is a command-line utility that lets you interact with your Django project in various ways. It's a thin wrapper around `django-admin` and provides a convenient way to run administrative tasks for your project.

## 1. What is `manage.py`?

When you create a Django project using `django-admin startproject`, a `manage.py` file is automatically generated in the root of your project. This file serves as the primary script for performing project-specific tasks, such as:

*   Running the development server.
*   Creating new apps.
*   Managing database migrations.
*   Creating superusers.
*   Running tests.
*   Collecting static files.

It essentially puts your project's `settings.py` on `sys.path` and sets the `DJANGO_SETTINGS_MODULE` environment variable, allowing you to run Django commands that are aware of your project's configuration.

## 2. Common `manage.py` Commands

Here's a list of frequently used `manage.py` commands:

### `runserver`

Starts the Django development server. By default, it runs on `http://127.0.0.1:8000/`.

```bash
python manage.py runserver
python manage.py runserver 0.0.0.0:8080 # Run on a specific IP and port
```

### `startapp <app_name>`

Creates a new Django application within your project. This generates a basic directory structure for your app.

```bash
python manage.py startapp blog
```

### `makemigrations [app_name]`

Creates new migration files based on changes detected in your models. These files describe how to update your database schema.

```bash
bpython manage.py makemigrations          # Detects changes in all apps
python manage.py makemigrations myapp     # Detects changes only in 'myapp'
```

### `migrate [app_name]`

Applies pending migrations to your database. This command creates or updates database tables according to your model definitions.

```bash
python manage.py migrate          # Applies all pending migrations
python manage.py migrate myapp     # Applies migrations only for 'myapp'
```

### `createsuperuser`

Creates an administrative user (superuser) who can log into the Django admin interface.

```bash
python manage.py createsuperuser
```

### `shell`

Opens an interactive Python shell with your Django project's environment loaded. This is useful for testing ORM queries, interacting with models, and debugging.

```bash
python manage.py shell
```

### `dbshell`

Opens a command-line client for your database engine, configured with your project's database settings. For example, it would open `psql` for PostgreSQL or `mysql` for MySQL.

```bash
python manage.py dbshell
```

### `collectstatic`

Gathers all static files (CSS, JavaScript, images) from your apps and any other configured locations into a single directory (`STATIC_ROOT`), typically for deployment.

```bash
python manage.py collectstatic
```

### `test [app_name]`

Runs tests for your Django project or specific apps.

```bash
python manage.py test          # Run all tests
python manage.py test myapp     # Run tests only for 'myapp'
```

### `loaddata <fixture_name>` / `dumpdata [app_name]`

*   `loaddata`: Loads data from a fixture (a file containing serialized data) into the database.
*   `dumpdata`: Dumps data from the database into a fixture file.

```bash
python manage.py loaddata initial_data.json
python manage.py dumpdata myapp > myapp_data.json
```

### `changepassword <username>`

Allows you to change a user's password from the command line.

```bash
python manage.py changepassword admin
```

### `check`

Inspects the entire Django project for common problems and provides hints for fixing them.

```bash
python manage.py check
```

## 3. Custom Management Commands

You can extend `manage.py` by creating your own custom commands. This is useful for automating repetitive tasks, performing data cleanup, or running custom scripts that need access to your Django environment.

### Structure of a Custom Command

1.  Create a `management/commands` directory inside your app (e.g., `myapp/management/commands/`).
2.  Inside this directory, create a Python file for your command (e.g., `_close_polls.py`). The name of the file (without `.py`) will be the name of your command.

### `BaseCommand`

All custom commands must inherit from `django.core.management.base.BaseCommand`.

### `add_arguments(self, parser)`

This method is used to define command-line arguments and options for your custom command.

### `handle(self, *args, **options)`

This is the main logic of your command. It's executed when the command is run.

```python
# myapp/management/commands/close_polls.py

from django.core.management.base import BaseCommand, CommandError
from myapp.models import Poll # Assuming you have a Poll model
import datetime

class Command(BaseCommand):
    help = 'Closes the polls for the given year' # Displayed in `python manage.py help close_polls`

    def add_arguments(self, parser):
        # Add a positional argument 'poll_ids' that accepts one or more integers
        parser.add_argument('poll_ids', nargs='+', type=int, help='Specify the poll IDs to close')

        # Add an optional argument '--delete'
        parser.add_argument(
            '--delete',
            action='store_true',
            help='Delete polls instead of just closing them',
        )

    def handle(self, *args, **options):
        poll_ids = options['poll_ids']
        delete_polls = options['delete']

        for poll_id in poll_ids:
            try:
                poll = Poll.objects.get(pk=poll_id)
            except Poll.DoesNotExist:
                raise CommandError(f'Poll "{poll_id}" does not exist')

            if delete_polls:
                poll.delete()
                self.stdout.write(self.style.SUCCESS(f'Successfully deleted poll "{poll_id}"'))
            else:
                poll.is_closed = True # Assuming a field 'is_closed'
                poll.save()
                self.stdout.write(self.style.SUCCESS(f'Successfully closed poll "{poll_id}"'))

        self.stdout.write(self.style.WARNING('Remember to run `python manage.py migrate` if you changed model fields.'))
```

### Running Custom Commands

Once created, your custom command can be run like any other `manage.py` command:

```bash
python manage.py close_polls 1 2 3
python manage.py close_polls 4 --delete
```
