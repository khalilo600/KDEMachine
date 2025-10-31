# Laravel Application Development Guide

This guide will walk you through the process of creating a new Laravel application, from initial setup to database interaction, views, and basic deployment considerations.

## 1. Project Setup

### 1.1 Install Laravel Installer (if not already installed)

```bash
composer global require laravel/installer
```

### 1.2 Create a New Laravel Project

```bash
laravel new my-app
# Or using Composer
composer create-project laravel/laravel my-app
```

Navigate into your new project directory:

```bash
cd my-app
```

### 1.3 Start the Development Server

```bash
php artisan serve
```

Open your browser and go to `http://127.0.0.1:8000` (or the address shown in your terminal). You should see the Laravel welcome page.

## 2. Database Configuration

Laravel uses the `.env` file for environment-specific configurations, including database credentials.

### 2.1 Configure `.env`

Open the `.env` file in your project root and update the database settings. For example, for MySQL:

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=my_app_db
DB_USERNAME=root
DB_PASSWORD=your_password
```

Make sure to create the `my_app_db` database in your database server (e.g., using phpMyAdmin, MySQL Workbench, or the MySQL CLI).

## 3. Migrations: Defining Your Database Schema

Migrations are like version control for your database, allowing you to define and modify your database tables using PHP code.

### 3.1 Create a Migration for a New Table (e.g., `posts`)

```bash
php artisan make:migration create_posts_table
```

This will create a file in `database/migrations`. Open it and define your table schema:

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('body');
            $table->timestamps(); // Adds created_at and updated_at columns
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
```

### 3.2 Run Migrations

```bash
php artisan migrate
```

This command will create the `posts` table (and default `users`, `password_reset_tokens`, `failed_jobs`, `cache` tables) in your configured database.

## 4. Models: Interacting with Your Database

Eloquent ORM models provide an object-oriented way to interact with your database tables.

### 4.1 Create a Model

```bash
php artisan make:model Post
```

This creates `app/Models/Post.php`:

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Post extends Model
{
    use HasFactory;

    // Define which attributes are mass assignable
    protected $fillable = ['title', 'body'];
}
```

### 4.2 Basic CRUD Operations (Example in a route for simplicity)

```php
<?php
// In routes/web.php

use App\Models\Post;
use Illuminate\Support\Facades\Route;

Route::get('/posts/create', function () {
    // Create a new post
    $post = Post::create([
        'title' => 'My First Post',
        'body' => 'This is the content of my first post.',
    ]);
    return 'Post created with ID: ' . $post->id;
});

Route::get('/posts', function () {
    // Retrieve all posts
    $posts = Post::all();
    return view('posts.index', ['posts' => $posts]);
});

Route::get('/posts/{id}', function (string $id) {
    // Find a post by ID
    $post = Post::findOrFail($id);
    return view('posts.show', ['post' => $post]);
});

Route::get('/posts/{id}/edit', function (string $id) {
    // Update a post
    $post = Post::findOrFail($id);
    $post->update(['title' => 'Updated Title']);
    return 'Post ' . $post->id . ' updated.';
});

Route::get('/posts/{id}/delete', function (string $id) {
    // Delete a post
    $post = Post::findOrFail($id);
    $post->delete();
    return 'Post ' . $post->id . ' deleted.';
});
```

## 5. Controllers: Handling Request Logic

Controllers group related request handling logic into a single class.

### 5.1 Create a Controller

```bash
php artisan make:controller PostController --resource
```

This creates `app/Http/Controllers/PostController.php` with CRUD methods.

### 5.2 Define Routes for the Controller

```php
<?php
// In routes/web.php

use App\Http\Controllers\PostController;
use Illuminate\Support\Facades\Route;

Route::resource('posts', PostController::class);
```

This single line registers 7 routes for your `PostController` (index, create, store, show, edit, update, destroy).

## 6. Views: Displaying Data

Views contain the HTML served by your application and are typically located in `resources/views`.

### 6.1 Create a View (e.g., `resources/views/posts/index.blade.php`)

```html
<!-- resources/views/posts/index.blade.php -->

<h1>All Posts</h1>

@if ($posts->isEmpty())
    <p>No posts found.</p>
@else
    <ul>
        @foreach ($posts as $post)
            <li>
                <a href="/posts/{{ $post->id }}">{{ $post->title }}</a>
                <p>{{ Str::limit($post->body, 50) }}</p>
            </li>
        @endforeach
    </ul>
@endif
```

### 6.2 Create a View (e.g., `resources/views/posts/show.blade.php`)

```html
<!-- resources/views/posts/show.blade.php -->

<h1>{{ $post->title }}</h1>
<p>{{ $post->body }}</p>
<a href="/posts">Back to all posts</a>
```

### 6.3 Update Controller to Return Views

Modify your `PostController` methods to return views:

```php
<?php
// In app/Http/Controllers/PostController.php

// ... (other use statements)
use App\Models\Post;

class PostController extends Controller
{
    public function index()
    {
        $posts = Post::all();
        return view('posts.index', compact('posts'));
    }

    public function show(Post $post)
    {
        return view('posts.show', compact('post'));
    }

    // ... (other methods)
}
```

## 7. Seeding: Populating Your Database with Test Data

Seeders allow you to populate your database with dummy data.

### 7.1 Create a Seeder

```bash
php artisan make:seeder PostSeeder
```

`database/seeders/PostSeeder.php`:

```php
<?php

namespace Database\Seeders;

use App\Models\Post;
use Illuminate\Database\Seeder;

class PostSeeder extends Seeder
{
    public function run(): void
    {
        Post::factory()->count(10)->create(); // Create 10 dummy posts
    }
}
```

### 7.2 Update `DatabaseSeeder`

Open `database/seeders/DatabaseSeeder.php` and call your new seeder:

```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            // UserSeeder::class, // Uncomment if you have a UserSeeder
            PostSeeder::class,
        ]);
    }
}
```

### 7.3 Run Seeders

```bash
php artisan db:seed
```

## 8. Factories: Generating Realistic Dummy Data

Factories are used by seeders to generate realistic dummy data for your models.

### 8.1 Create a Factory (if not already created with `make:model -mfs`)

```bash
php artisan make:factory PostFactory --model=Post
```

`database/factories/PostFactory.php`:

```php
<?php

namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'body' => $this->faker->paragraph(3),
        ];
    }
}
```

## 9. Basic Styling (Optional, using Tailwind CSS)

Laravel Breeze or Jetstream can set up authentication and basic styling. If you're starting from scratch, you might add a CSS framework.

### 9.1 Install Tailwind CSS

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 9.2 Configure `tailwind.config.js`

```javascript
// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### 9.3 Add Tailwind Directives to `resources/css/app.css`

```css
/* resources/css/app.css */

@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 9.4 Compile Assets

```bash
npm run dev
# For production
npm run build
```

### 9.5 Link CSS in Your Layout

```html
<!-- In your layout file, e.g., resources/views/layouts/app.blade.php -->

<head>
    <!-- ... -->
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
```

## 10. Next Steps

*   **Authentication:** Use Laravel Breeze or Jetstream for quick authentication scaffolding.
*   **Validation:** Implement form request validation for robust input handling.
*   **Relationships:** Define Eloquent relationships between your models.
*   **Testing:** Write unit and feature tests for your application.
*   **Deployment:** Learn how to deploy your Laravel application to a production server.
