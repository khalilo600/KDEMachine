# Laravel Eloquent ORM

Laravel's Eloquent ORM (Object-Relational Mapper) provides a beautiful, simple ActiveRecord implementation for working with your database. Each database table has a corresponding "Model" that is used to interact with that table. Models allow you to query for data in your tables, as well as insert new records into the table.

## 1. What is an ORM?

An ORM (Object-Relational Mapper) is a programming technique that lets you query and manipulate data from a database using an object-oriented paradigm. It creates a "virtual object database" that can be used from within the programming language. In essence, it maps database tables to classes and rows to objects, allowing developers to interact with the database using familiar object syntax instead of raw SQL.

## 2. Defining Models

Eloquent models are typically located in the `app/Models` directory. You can generate a new model using the Artisan command-line tool.

```bash
php artisan make:model Post
```

This will create `app/Models/Post.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // By default, Eloquent will assume the table name is the plural form of the model name.
    // So, for a Post model, it will look for a 'posts' table.
    // You can override this by setting the $table property:
    // protected $table = 'my_posts';

    // Eloquent will also assume that each table has a primary key column named 'id'.
    // You can override this by setting the $primaryKey property:
    // protected $primaryKey = 'post_id';

    // By default, Eloquent expects 'created_at' and 'updated_at' columns.
    // Set to false if your table does not have these columns:
    // public $timestamps = false;

    // The attributes that are mass assignable.
    protected $fillable = ['title', 'body', 'user_id'];

    // The attributes that should be hidden for serialization.
    // protected $hidden = ['password'];

    // The attributes that should be cast to native types.
    // protected $casts = ['email_verified_at' => 'datetime'];
}
?>
```

## 3. Migrations

Migrations are like version control for your database, allowing your team to easily modify and share the application's database schema. Migrations are typically paired with Eloquent schema builder to easily build your application's database schema.

### Creating Migrations

```bash
php artisan make:migration create_posts_table
```

This will create a migration file in the `database/migrations` directory:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->text('body');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
?>
```

### Running Migrations

```bash
php artisan migrate
```

### Rolling Back Migrations

```bash
php artisan migrate:rollback
```

## 4. Basic CRUD Operations

### Create Records

```php
<?php
use App\Models\Post;

// Create a new Post instance
$post = new Post;
$post->title = 'My First Post';
$post->body = 'This is the body of my first post.';
$post->user_id = 1;
$post->save();

// Using the create method (requires $fillable property in model)
$post = Post::create([
    'title' => 'Another Post',
    'body' => 'This is another post.',
    'user_id' => 1,
]);
?>
```

### Read Records

```php
<?php
use App\Models\Post;

// Retrieve all posts
$posts = Post::all();

// Find a post by its primary key
$post = Post::find(1);

// Find a post by a specific column
$post = Post::where('title', 'My First Post')->first();

// Get multiple posts based on a condition
$posts = Post::where('user_id', 1)->get();

// Retrieve the first post or throw an exception
$post = Post::findOrFail(1);

// Retrieve the first post or create a new one
$post = Post::firstOrCreate(
    ['title' => 'Post Title'],
    ['body' => 'Post Body', 'user_id' => 1]
);
?>
```

### Update Records

```php
<?php
use App\Models\Post;

$post = Post::find(1);
$post->title = 'Updated Title';
$post->save();

// Update multiple records
Post::where('user_id', 1)->update(['status' => 'published']);
?>
```

### Delete Records

```php
<?php
use App\Models\Post;

$post = Post::find(1);
$post->delete();

// Delete multiple records
Post::where('user_id', 1)->delete();
?>
```

## 5. Relationships

Eloquent relationships define how different models are connected to each other.

### One-to-One

Example: A `User` has one `Phone`.

```php
<?php
// User model
public function phone()
{
    return $this->hasOne(Phone::class);
}

// Phone model
public function user()
{
    return $this->belongsTo(User::class);
}
?>
```

### One-to-Many

Example: A `User` has many `Posts`.

```php
<?php
// User model
public function posts()
{
    return $this->hasMany(Post::class);
}

// Post model
public function user()
{
    return $this->belongsTo(User::class);
}
?>
```

### Many-to-Many

Example: A `Post` has many `Tags`, and a `Tag` has many `Posts`.

```php
<?php
// Post model
public function tags()
{
    return $this->belongsToMany(Tag::class);
}

// Tag model
public function posts()
{
    return $this->belongsToMany(Post::class);
}
?>
```

### Has Many Through

Example: A `Country` has many `Posts` through `Users`.

```php
<?php
// Country model
public function posts()
{
    return $this->hasManyThrough(Post::class, User::class);
}
?>
```

### Polymorphic Relations

Allows a model to belong to more than one other model on a single association.

Example: A `Comment` can belong to a `Post` or a `Video`.

```php
<?php
// Comment model
public function commentable()
{
    return $this->morphTo();
}

// Post model
public function comments()
{
    return $this->morphMany(Comment::class, 'commentable');
}

// Video model
public function comments()
{
    return $this->morphMany(Comment::class, 'commentable');
}
?>
```

## 6. Query Scopes

Query scopes allow you to define common sets of constraints that you may easily re-use throughout your application.

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    public function scopePublished($query)
    {
        return $query->where('published', true);
    }

    public function scopePopular($query)
    {
        return $query->orderBy('views', 'desc');
    }
}

// Usage:
// $publishedPosts = Post::published()->get();
// $popularPublishedPosts = Post::published()->popular()->get();
?>
```

## 7. Accessors & Mutators

Accessors and mutators allow you to transform Eloquent attribute values when you retrieve or set them on a model instance.

### Accessors (Getters)

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected function fullName(): Attribute
    {
        return Attribute::make(
            get: fn (string $value, array $attributes) => $attributes['first_name'] . ' ' . $attributes['last_name'],
        );
    }
}

// Usage:
// $user = User::find(1);
// echo $user->full_name; // Access as a property
?>
```

### Mutators (Setters)

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected function password(): Attribute
    {
        return Attribute::make(
            set: fn (string $value) => bcrypt($value),
        );
    }
}

// Usage:
// $user = User::find(1);
// $user->password = 'new-secret'; // Mutator will hash the password
// $user->save();
?>
```

## 8. Soft Deleting

Soft deleting models do not actually remove them from your database. Instead, a `deleted_at` timestamp is set on the record. If the `deleted_at` timestamp is not null for a given model, the model has been soft deleted.

To enable soft deletes on a model, use the `Illuminate\Database\Eloquent\SoftDeletes` trait on the model and add the `deleted_at` column to your database table.

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // Import the trait

class Post extends Model
{
    use HasFactory, SoftDeletes; // Use the SoftDeletes trait

    protected $fillable = ['title', 'body', 'user_id'];

    // Add 'deleted_at' column to your migration:
    // $table->softDeletes();
}

// Usage:
// $post = Post::find(1);
// $post->delete(); // Soft deletes the post

// Retrieve soft deleted models:
// $allPosts = Post::withTrashed()->get();
// $deletedPosts = Post::onlyTrashed()->get();

// Restore a soft deleted model:
// $post->restore();

// Permanently delete a model:
// $post->forceDelete();
?>
```
