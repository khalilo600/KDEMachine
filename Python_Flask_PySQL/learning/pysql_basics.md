# Python and SQL Database Interaction (PySQL Basics)

This guide explores how to interact with SQL databases using Python, focusing on both raw SQL with standard database adapters and the powerful SQLAlchemy ORM. It also covers integration with Flask applications using Flask-SQLAlchemy.

## 1. Introduction to Database Interaction in Python

### Why use a database?

Databases are essential for storing, managing, and retrieving structured data persistently. They allow applications to handle large amounts of information efficiently, ensure data integrity, and enable complex queries.

### SQL vs. ORM

*   **SQL (Structured Query Language):** A standard language for managing and manipulating relational databases. It offers fine-grained control over queries but can be verbose and prone to SQL injection if not handled carefully.
*   **ORM (Object-Relational Mapper):** A programming technique that maps objects in your code to tables in a relational database. ORMs allow you to interact with your database using object-oriented paradigms (e.g., Python classes and objects) instead of writing raw SQL. This can improve developer productivity, reduce boilerplate code, and enhance security.

### Common Python Database Libraries

*   **`sqlite3`:** Python's built-in adapter for SQLite databases.
*   **`psycopg2`:** A popular PostgreSQL adapter.
*   **`mysql-connector-python` / `PyMySQL`:** Adapters for MySQL databases.
*   **SQLAlchemy:** A comprehensive SQL toolkit and ORM for Python, supporting various database backends.

## 2. SQLAlchemy Core (SQL Expression Language)

SQLAlchemy Core provides a SQL expression language that allows you to construct SQL queries programmatically using Python objects, without necessarily mapping them to full Python classes.

### Installation

```bash
pip install SQLAlchemy
```

### Connecting to a Database (Engines)

An `Engine` is the starting point for any SQLAlchemy application. It represents the database and its dialect.

```python
from sqlalchemy import create_engine, text

# SQLite in-memory database
engine = create_engine('sqlite:///:memory:')

# SQLite file database
# engine = create_engine('sqlite:///mydatabase.db')

# PostgreSQL
# engine = create_engine('postgresql://user:password@host:port/dbname')

# MySQL
# engine = create_engine('mysql+mysqlconnector://user:password@host:port/dbname')

# Test connection
with engine.connect() as connection:
    result = connection.execute(text("SELECT 'hello world'"))
    print(result.scalar())
```

### Defining Table Metadata

Use `Table`, `MetaData`, and `Column` to define your database schema.

```python
from sqlalchemy import MetaData, Table, Column, Integer, String, Text, DateTime, Boolean
from datetime import datetime

metadata = MetaData()

users_table = Table(
    'users',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('username', String(50), unique=True, nullable=False),
    Column('email', String(100), unique=True, nullable=False),
    Column('created_at', DateTime, default=datetime.now),
    Column('is_active', Boolean, default=True),
)

posts_table = Table(
    'posts',
    metadata,
    Column('id', Integer, primary_key=True),
    Column('title', String(200), nullable=False),
    Column('content', Text, nullable=False),
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('created_at', DateTime, default=datetime.now),
)

# Create tables in the database
metadata.create_all(engine)
```

### Inserting Data

```python
from sqlalchemy import insert

with engine.connect() as connection:
    # Insert a single user
    stmt = insert(users_table).values(username='alice', email='alice@example.com')
    result = connection.execute(stmt)
    connection.commit()
    print(f"Inserted user with ID: {result.lastrowid}")

    # Insert multiple posts
    stmt = insert(posts_table)
    connection.execute(stmt, [
        {"title": "My First Post", "content": "Content for first post", "user_id": result.lastrowid},
        {"title": "Another Post", "content": "More content", "user_id": result.lastrowid},
    ])
    connection.commit()
```

### Selecting Data

```python
from sqlalchemy import select, join

with engine.connect() as connection:
    # Select all users
    stmt = select(users_table)
    for row in connection.execute(stmt):
        print(row)

    # Select specific columns, filter, and order
    stmt = select(posts_table.c.title, posts_table.c.created_at).where(posts_table.c.user_id == 1).order_by(posts_table.c.created_at.desc())
    for row in connection.execute(stmt):
        print(f"Title: {row.title}, Created: {row.created_at}")

    # Join tables
    stmt = select(users_table.c.username, posts_table.c.title).join(posts_table)
    for row in connection.execute(stmt):
        print(f"User: {row.username}, Post: {row.title}")
```

### Updating Data

```python
from sqlalchemy import update

with engine.connect() as connection:
    stmt = update(users_table).where(users_table.c.username == 'alice').values(email='alice.updated@example.com')
    connection.execute(stmt)
    connection.commit()
```

### Deleting Data

```python
from sqlalchemy import delete

with engine.connect() as connection:
    stmt = delete(posts_table).where(posts_table.c.user_id == 1)
    connection.execute(stmt)
    connection.commit()
```

### Transactions

SQLAlchemy connections support transactions to ensure atomicity.

```python
with engine.begin() as connection: # engine.begin() automatically commits or rolls back
    connection.execute(update(users_table).where(users_table.c.id == 1).values(is_active=False))
    connection.execute(delete(posts_table).where(posts_table.c.user_id == 1))
    # If any error occurs, both operations are rolled back
```

## 3. SQLAlchemy ORM

SQLAlchemy ORM allows you to define Python classes that map directly to database tables, providing an object-oriented way to interact with your data.

### Defining Models (Declarative Base)

```python
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    created_at = Column(DateTime, default=datetime.now)
    is_active = Column(Boolean, default=True)

    posts = relationship('Post', back_populates='author') # Define relationship to Post

    def __repr__(self):
        return f"<User(id={self.id}, username='{self.username}')>"

class Post(Base):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String(200), nullable=False)
    content = Column(Text, nullable=False)
    user_id = Column(Integer, ForeignKey('users.id'))
    created_at = Column(DateTime, default=datetime.now)

    author = relationship('User', back_populates='posts') # Define relationship to User

    def __repr__(self):
        return f"<Post(id={self.id}, title='{self.title}')>"

# Create engine and tables
engine = create_engine('sqlite:///orm_example.db')
Base.metadata.create_all(engine)
```

### Creating a Session

The `Session` object is the central interface to the database. It manages the persistence of objects.

```python
Session = sessionmaker(bind=engine)
session = Session()
```

### Adding Objects

```python
# Create new objects
new_user = User(username='bob', email='bob@example.com')
new_post = Post(title='ORM Post', content='Content via ORM', author=new_user)

# Add to session and commit
session.add(new_user)
session.add(new_post)
session.commit()
```

### Querying Objects

```python
# Query all users
users = session.query(User).all()
for user in users:
    print(user)

# Filter users
alice = session.query(User).filter_by(username='alice').first()
if alice:
    print(f"Found Alice: {alice.email}")

# Query with relationships (eager loading)
posts_with_authors = session.query(Post).join(User).filter(User.username == 'bob').all()
for post in posts_with_authors:
    print(f"Post: {post.title}, Author: {post.author.username}")
```

### Updating Objects

```python
user_to_update = session.query(User).filter_by(username='bob').first()
if user_to_update:
    user_to_update.email = 'bob.updated@example.com'
    session.commit()
```

### Deleting Objects

```python
user_to_delete = session.query(User).filter_by(username='alice').first()
if user_to_delete:
    session.delete(user_to_delete)
    session.commit()
```

### Relationships (One-to-Many, Many-to-Many)

Defined using `relationship()` in your models.

*   **One-to-Many:** (e.g., `User` has many `Posts`)
    ```python
    # In User model:
    posts = relationship('Post', back_populates='author')
    # In Post model:
    author = relationship('User', back_populates='posts')
    ```

*   **Many-to-Many:** Requires an association table.

### Eager Loading

Use `joinedload()` or `subqueryload()` to load related objects in the same query, preventing N+1 query issues.

```python
# Eager load posts when querying users
users = session.query(User).options(joinedload(User.posts)).all()
for user in users:
    for post in user.posts:
        print(f"User: {user.username}, Post: {post.title}")
```

## 4. Raw SQL with Python Database Adapters

Sometimes, raw SQL is necessary for performance-critical queries or when the ORM doesn't provide the exact functionality needed.

### Using `sqlite3` (Built-in)

Python's `sqlite3` module is part of the standard library.

```python
import sqlite3

# Connect to a database (creates if it doesn't exist)
conn = sqlite3.connect('raw_sql_example.db')
cursor = conn.cursor()

# Create table
cursor.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL
    )
""")
conn.commit()

# Insert data (parameterized query to prevent SQL injection)
cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)", ('Laptop', 1200.00))
cursor.execute("INSERT INTO products (name, price) VALUES (?, ?)", ('Mouse', 25.50))
conn.commit()

# Select data
cursor.execute("SELECT * FROM products WHERE price > ?", (100.00,))
products = cursor.fetchall()
for product in products:
    print(product)

# Update data
cursor.execute("UPDATE products SET price = ? WHERE name = ?", (1250.00, 'Laptop'))
conn.commit()

# Delete data
cursor.execute("DELETE FROM products WHERE name = ?", ('Mouse',))
conn.commit()

conn.close()
```

### Parameterizing Queries

**Always use parameterized queries** (e.g., `?` for `sqlite3`, `%s` for `psycopg2`/`mysql-connector-python`) to pass values to your SQL statements. This is crucial for preventing SQL injection vulnerabilities.

## 5. Integrating with Flask (Flask-SQLAlchemy)

Flask-SQLAlchemy is a Flask extension that provides SQLAlchemy support for your Flask application. It handles engine and session management, making database interaction within Flask much easier.

### Installation

```bash
pip install Flask-SQLAlchemy
```

### Configuration

```python
# app.py

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///flask_app.db' # SQLite file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False # Suppress a warning
db = SQLAlchemy(app)
```

### Defining Models

Models inherit from `db.Model`.

```python
# app.py

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    posts = db.relationship('Post', backref='author', lazy=True) # One-to-Many

    def __repr__(self):
        return f'<User {self.username}>'

class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'<Post {self.title}>'

# To create tables (run once in Python shell):
# >>> from app import db, app
# >>> with app.app_context():
# ...     db.create_all()
```

### Basic CRUD Operations

```python
# In a Flask route or shell (within app context)

# Create
with app.app_context():
    user = User(username='charlie', email='charlie@example.com')
    db.session.add(user)
    db.session.commit()

    post = Post(title='Flask Post', content='Content from Flask', author=user)
    db.session.add(post)
    db.session.commit()

# Read
with app.app_context():
    all_users = User.query.all()
    first_user = User.query.filter_by(username='charlie').first()
    posts_by_charlie = first_user.posts

# Update
with app.app_context():
    user_to_update = User.query.filter_by(username='charlie').first()
    if user_to_update:
        user_to_update.email = 'charlie.new@example.com'
        db.session.commit()

# Delete
with app.app_context():
    user_to_delete = User.query.filter_by(username='charlie').first()
    if user_to_delete:
        db.session.delete(user_to_delete)
        db.session.commit()
```

### Database Migrations with Flask-Migrate (brief mention)

For managing database schema changes in Flask-SQLAlchemy, `Flask-Migrate` (which uses Alembic) is the standard tool. It allows you to create and apply migrations similar to Django's `makemigrations` and `migrate`.

```bash
pip install Flask-Migrate
```

```python
# app.py
from flask_migrate import Migrate

migrate = Migrate(app, db)

# Commands:
# flask db init
# flask db migrate -m "Initial migration"
# flask db upgrade
```

## 6. Transactions in Flask-SQLAlchemy

Flask-SQLAlchemy manages sessions and transactions. When you call `db.session.commit()`, it attempts to commit the current transaction. If an error occurs, `db.session.rollback()` is automatically called.

```python
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///transaction_example.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50))
    balance = db.Column(db.Float)

with app.app_context():
    db.create_all()
    # Add some initial data
    if not Account.query.first():
        db.session.add(Account(name='Alice', balance=1000))
        db.session.add(Account(name='Bob', balance=500))
        db.session.commit()

    def transfer_funds(sender_id, receiver_id, amount):
        try:
            sender = Account.query.get(sender_id)
            receiver = Account.query.get(receiver_id)

            if not sender or not receiver:
                raise ValueError("Account not found")
            if sender.balance < amount:
                raise ValueError("Insufficient funds")

            sender.balance -= amount
            receiver.balance += amount

            db.session.add(sender)
            db.session.add(receiver)
            db.session.commit() # Commit the transaction
            print(f"Transfer successful: {amount} from {sender.name} to {receiver.name}")
        except Exception as e:
            db.session.rollback() # Rollback on error
            print(f"Transfer failed: {e}")

    transfer_funds(1, 2, 200) # Successful transfer
    transfer_funds(1, 2, 2000) # Failed due to insufficient funds, rolled back
```

## 7. Database Testing (Conceptual)

For testing Flask applications with databases, it's common to use an in-memory SQLite database or a separate test database to ensure tests are isolated and fast.

*   **In-memory SQLite:** Configure `SQLALCHEMY_DATABASE_URI` to `sqlite:///:memory:` for tests.
*   **Test Client:** Use Flask's test client to simulate requests.
*   **Assertions:** Assert that data is correctly stored or modified in the database.

```python
# tests/test_app.py

import unittest
from app import app, db, User, Post

class FlaskDatabaseTest(unittest.TestCase):

    def setUp(self):
        app.config['TESTING'] = True
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        self.app = app.test_client()
        with app.app_context():
            db.create_all()

    def tearDown(self):
        with app.app_context():
            db.session.remove()
            db.drop_all()

    def test_user_creation(self):
        with app.app_context():
            user = User(username='testuser', email='test@example.com')
            db.session.add(user)
            db.session.commit()
            self.assertIsNotNone(user.id)
            self.assertEqual(User.query.count(), 1)

    def test_post_creation(self):
        with app.app_context():
            user = User(username='testuser', email='test@example.com')
            db.session.add(user)
            db.session.commit()

            post = Post(title='Test Post', content='Content', author=user)
            db.session.add(post)
            db.session.commit()

            self.assertEqual(Post.query.count(), 1)
            self.assertEqual(user.posts[0].title, 'Test Post')
```
