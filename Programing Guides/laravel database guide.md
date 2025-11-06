# Laravel Database Guide: Comprehensive Learning Outline

This guide focuses specifically on database interaction within the Laravel framework. It covers database configuration, migrations for schema management, the powerful Eloquent ORM for object-relational mapping, the Query Builder for flexible database queries, seeding for data population, and advanced database features like transactions and raw SQL.

---

## I. Getting Started with Laravel Database

### A. Database Configuration (`.env`, `config/database.php`)

Laravel's database configuration is primarily managed through the `.env` file and the `config/database.php` configuration file.

*   **`.env` file:** Stores environment-specific variables, including database credentials.

    ```dotenv
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_username
    DB_PASSWORD=your_password
    ```

*   **`config/database.php`:** Defines all of your application's database connections. It reads values from the `.env` file.

    ```php
    // config/database.php
    'connections' => [
        'mysql' => [
            'driver' => 'mysql',
            'host' => env('DB_HOST', '127.0.0.1'),
            'port' => env('DB_PORT', '3306'),
            'database' => env('DB_DATABASE', 'laravel'),
            'username' => env('DB_USERNAME', 'root'),
            'password' => env('DB_PASSWORD', ''),
            'unix_socket' => env('DB_SOCKET', ''),
            'charset' => 'utf8mb4',
            'collation' => 'utf8mb4_unicode_ci',
            'prefix' => '',
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],
        // ... other connections
    ],
    ```

### B. Supported Databases (MySQL, PostgreSQL, SQLite, SQL Server)

Laravel supports several popular database systems out of the box:

*   **MySQL:** The most commonly used.
*   **PostgreSQL:** A powerful, open-source object-relational database system.
*   **SQLite:** A self-contained, serverless, zero-configuration, transactional SQL database engine. Good for development and testing.
*   **SQL Server:** Microsoft's relational database management system.

### C. Database Migrations

Migrations are like version control for your database, allowing you to define and modify your database schema using PHP code.

1.  **Creating Migrations (`php artisan make:migration`)

    ```bash
    php artisan make:migration create_users_table
    php artisan make:migration add_avatar_to_users_table --table=users
    ```
    This generates a new migration file in the `database/migrations` directory.

    ```php
    // database/migrations/YYYY_MM_DD_HHMMSS_create_users_table.php
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
            Schema::create('users', function (Blueprint $table) {
                $table->id();
                $table->string('name');
                $table->string('email')->unique();
                $table->timestamp('email_verified_at')->nullable();
                $table->string('password');
                $table->rememberToken();
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down(): void
        {
            Schema::dropIfExists('users');
        }
    };
    ```

2.  **Running Migrations (`php artisan migrate`)

    ```bash
    php artisan migrate # Runs all outstanding migrations
    ```

3.  **Rolling Back Migrations**

    *   `php artisan migrate:rollback`: Rolls back the last batch of migrations.
    *   `php artisan migrate:reset`: Rolls back all migrations.
    *   `php artisan migrate:refresh`: Rolls back all migrations and then runs them again.
    *   `php artisan migrate:fresh`: Drops all tables from the database and then runs the `migrate` command.

4.  **Schema Builder (Creating, Modifying, Dropping Tables)**

    *   **Creating Tables:** Use `Schema::create()`.

        ```php
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->timestamps();
        });
        ```

    *   **Modifying Tables:** Use `Schema::table()`.

        ```php
        Schema::table('users', function (Blueprint $table) {
            $table->string('avatar')->nullable()->after('email');
        });
        ```

    *   **Dropping Tables:** Use `Schema::drop()` or `Schema::dropIfExists()`.

        ```php
        Schema::dropIfExists('products');
        ```

    *   **Columns (Types, Modifiers):** Laravel's schema builder supports various column types and modifiers.

        ```php
        $table->string('name', 100);
        $table->integer('votes')->default(0);
        $table->boolean('is_admin')->default(false);
        $table->timestamp('published_at')->nullable();
        $table->softDeletes(); // Adds a 'deleted_at' column for soft deletes
        ```

    *   **Indexes (Primary, Unique, Foreign Key):**

        ```php
        $table->primary('id');
        $table->string('email')->unique();
        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->index(['account_id', 'created_at']);
        ```

---

## II. Eloquent ORM (Object-Relational Mapper)

Eloquent is Laravel's powerful ORM, providing an ActiveRecord implementation for working with your database. Each database table has a corresponding "Model" that is used to interact with that table.

### A. Defining Models (`php artisan make:model`)

```bash
php artisan make:model Post
```

```php
// app/Models/Post.php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes; // For soft deletes

class Post extends Model
{
    use HasFactory, SoftDeletes;

    // The table associated with the model.
    protected $table = 'posts';

    // The primary key for the model.
    protected $primaryKey = 'id';

    // Indicates if the IDs are auto-incrementing.
    public $incrementing = true;

    // The "type" of the auto-incrementing ID.
    protected $keyType = 'int';

    // Indicates if the model should be timestamped.
    public $timestamps = true;

    // The attributes that are mass assignable.
    protected $fillable = [
        'title',
        'body',
        'user_id',
    ];

    // The attributes that should be hidden for serialization.
    protected $hidden = [
        // 'password',
    ];

    // The attributes that should be cast.
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    // Define relationship with User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
```

### B. Retrieving Models

*   **`all()`:** Retrieve all models from a table.
*   **`find($id)`:** Retrieve a single model by its primary key.
*   **`where($column, $operator, $value)`:** Add `WHERE` clauses to the query.
*   **`first()`:** Retrieve the first model matching the query.
*   **`firstOrFail()`:** Retrieve the first model matching the query or throw an exception.
*   **`get()`:** Execute the query and retrieve all results.
*   **`pluck($column, $key)`:** Retrieve a list of column values.
*   **`count()`:** Get the number of results.

    ```php
    use App\Models\Post;

    $posts = Post::all();
    $post = Post::find(1);
    $activePosts = Post::where('status', 'active')->get();
    $latestPost = Post::orderBy('created_at', 'desc')->first();
    $titles = Post::pluck('title');
    ```

*   **Chunking Results:** Process large result sets in smaller chunks to reduce memory usage.

    ```php
    Post::chunk(200, function ($posts) {
        foreach ($posts as $post) {
            // Process each post
        }
    });
    ```

### C. Inserting & Updating Models

*   **`create($attributes)`:** Create and save a new model instance (requires `$fillable`).
*   **`save()`:** Save an existing model instance.
*   **`update($attributes)`:** Update an existing model instance.
*   **`upsert($values, $uniqueBy, $update)`:** Insert or update records that already exist.

    ```php
    use App\Models\Post;

    // Create
    $post = Post::create([
        'title' => 'New Post',
        'body' => 'Content here.',
        'user_id' => 1,
    ]);

    // Save (after creating an instance)
    $post = new Post();
    $post->title = 'Another Post';
    $post->body = 'More content.';
    $post->user_id = 1;
    $post->save();

    // Update
    $post = Post::find(1);
    $post->title = 'Updated Title';
    $post->save();

    // Or update directly on a query
    Post::where('user_id', 1)->update(['status' => 'published']);
    ```

*   **Mass Assignment Protection (`$fillable`, `$guarded`):** Prevents malicious users from modifying sensitive fields.
    *   `$fillable`: An array of attributes that can be mass assigned.
    *   `$guarded`: An array of attributes that are not mass assignable.

### D. Deleting Models (`delete()`, `destroy()`, Soft Deletes)

*   **`delete()`:** Delete a single model instance.
*   **`destroy($ids)`:** Delete multiple models by their primary keys.
*   **Soft Deletes:** Instead of permanently removing records, they are marked as "deleted" by setting a `deleted_at` timestamp. Requires `Illuminate\Database\Eloquent\SoftDeletes` trait on the model.

    ```php
    use App\Models\Post;

    $post = Post::find(1);
    $post->delete(); // Soft deletes if trait is used

    Post::destroy(2, 3); // Delete posts with IDs 2 and 3

    // With Soft Deletes:
    $trashedPosts = Post::onlyTrashed()->get(); // Retrieve only soft-deleted posts
    $allPosts = Post::withTrashed()->get(); // Retrieve all posts, including soft-deleted
    $post->restore(); // Restore a soft-deleted post
    $post->forceDelete(); // Permanently delete a soft-deleted post
    ```

### E. Eloquent Relationships

Eloquent makes it easy to define relationships between models.

*   **One-to-One (`hasOne`, `belongsTo`):

    ```php
    // User has one Phone
    class User extends Model { public function phone() { return $this->hasOne(Phone::class); } }
    // Phone belongs to one User
    class Phone extends Model { public function user() { return $this->belongsTo(User::class); } }
    ```

*   **One-to-Many (`hasMany`, `belongsTo`):

    ```php
    // User has many Posts
    class User extends Model { public function posts() { return $this->hasMany(Post::class); } }
    // Post belongs to one User
    class Post extends Model { public function user() { return $this->belongsTo(User::class); } }
    ```

*   **Many-to-Many (`belongsToMany`):

    ```php
    // User belongs to many Roles
    class User extends Model { public function roles() { return $this->belongsToMany(Role::class); } }
    // Role belongs to many Users
    class Role extends Model { public function users() { return $this->belongsToMany(User::class); } }
    ```

*   **Has Many Through:** Accessing a distant relation through an intermediate relation.
*   **Polymorphic Relations:** A model can belong to more than one other model on a single association.

### F. Eager Loading (`with()`)

Prevents the "N+1 query problem" by loading related models when the parent model is retrieved.

```php
// Without eager loading (N+1 problem)
$posts = Post::all();
foreach ($posts as $post) {
    echo $post->user->name; // Each access to $post->user makes a new query
}

// With eager loading
$posts = Post::with('user')->get();
foreach ($posts as $post) {
    echo $post->user->name; // User is already loaded, no extra queries
}
```

### G. Accessors & Mutators

*   **Accessors:** Transform Eloquent attribute values when they are accessed.
*   **Mutators:** Transform Eloquent attribute values when they are set.

    ```php
    class User extends Model
    {
        // Accessor: getFullNameAttribute
        protected function fullName(): Attribute
        {
            return Attribute::make(
                get: fn (string $value, array $attributes) => $attributes['first_name'] . ' ' . $attributes['last_name'],
            );
        }

        // Mutator: setPasswordAttribute
        protected function password(): Attribute
        {
            return Attribute::make(
                set: fn (string $value) => bcrypt($value),
            );
        }
    }
    ```

### H. Scopes (Local, Global)

*   **Local Scopes:** Allow you to define common sets of constraints that you may easily re-use in your application.

    ```php
    class Post extends Model
    {
        public function scopePublished(Builder $query): void
        {
            $query->where('published', true);
        }
    }
    // Usage: Post::published()->get();
    ```

*   **Global Scopes:** Apply a set of constraints to all queries for a given model.

### I. Events

Eloquent models fire several events, allowing you to hook into various points in a model's lifecycle (e.g., `creating`, `created`, `updating`, `updated`, `deleting`, `deleted`).

---

## III. Query Builder

Laravel's Query Builder provides a convenient, fluent interface for creating and running database queries. It can be used to perform most database operations in your application and works with all supported database systems.

### A. Retrieving Results

*   `DB::table('table')->get()`: Retrieve all rows from a table.
*   `DB::table('table')->first()`: Retrieve the first row.
*   `DB::table('table')->pluck('column')`: Retrieve a list of column values.
*   `DB::table('table')->count()`: Get the number of results.

    ```php
    use Illuminate\Support\Facades\DB;

    $users = DB::table('users')->get();
    $name = DB::table('users')->where('id', 1)->value('name');
    ```

### B. Select Statements

```php
$users = DB::table('users')->select('name', 'email')->get();
$users = DB::table('users')->distinct()->get();
```

### C. Raw Expressions

Allows you to inject raw SQL into parts of your queries.

```php
$users = DB::table('users')
             ->select(DB::raw('count(*) as user_count, status'))
             ->where('status', '<>', 1)
             ->groupBy('status')
             ->get();
```

### D. Joins (`join()`, `leftJoin()`, `rightJoin()`)

```php
$users = DB::table('users')
            ->join('contacts', 'users.id', '=', 'contacts.user_id')
            ->select('users.name', 'contacts.phone')
            ->get();
```

### E. Where Clauses (Basic, Advanced, `orWhere`, `whereIn`, `whereNull`)

```php
DB::table('users')->where('votes', '>', 100)->get();
DB::table('users')->where('name', 'like', 'J%')->get();
DB::table('users')->where([
    ['status', '=', 'active'],
    ['votes', '>', 100]
])->get();

DB::table('users')
    ->where('votes', '>', 100)
    ->orWhere('name', 'John')
    ->get();

DB::table('users')->whereIn('id', [1, 2, 3])->get();
DB::table('users')->whereNull('updated_at')->get();
```

### F. Ordering, Grouping, Limiting (`orderBy()`, `groupBy()`, `limit()`, `skip()`)

```php
DB::table('users')->orderBy('name', 'desc')->get();
DB::table('users')->groupBy('account_id')->get();
DB::table('users')->skip(10)->limit(5)->get(); // Pagination
```

### G. Inserts, Updates, Deletes

```php
DB::table('users')->insert([
    'name' => 'Jane Doe',
    'email' => 'jane@example.com',
    'password' => bcrypt('password')
]);

DB::table('users')
    ->where('id', 1)
    ->update(['votes' => 1]);

DB::table('users')->where('votes', '<', 100)->delete();
```

---

## IV. Database Seeding and Factories

### A. Database Seeders (`php artisan make:seeder`, `db:seed`)

Seeders are used to populate your database with dummy data for testing or initial setup.

```bash
php artisan make:seeder UserSeeder
```

```php
// database/seeders/UserSeeder.php
<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::factory()->count(10)->create(); // Create 10 users using a factory
    }
}
```

Run seeders:

```bash
php artisan db:seed --class=UserSeeder
php artisan migrate:fresh --seed # Fresh migration and run all seeders
```

### B. Model Factories (`php artisan make:factory`)

Factories provide a convenient way to generate large amounts of dummy data for your models.

```bash
php artisan make:factory PostFactory --model=Post
```

```php
// database/factories/PostFactory.php
<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(), // Create a user for each post
            'title' => $this->faker->sentence(),
            'body' => $this->faker->paragraphs(3, true),
        ];
    }
}
```

### C. Calling Factories from Seeders

(See `database/seeders/UserSeeder.php` example in Section IV.A)

---

## V. Transactions

Transactions allow you to run a set of database operations within a single, atomic unit of work. If any operation within the transaction fails, the entire transaction is rolled back.

### A. Using `DB::transaction()`

```php
use Illuminate\Support\Facades\DB;

try {
    DB::transaction(function () {
        DB::table('users')->update(['votes' => 1]);
        DB::table('posts')->delete();
    });
} catch (\Exception $e) {
    // Handle exception, transaction was rolled back
}
```

### B. Manual Transactions

```php
DB::beginTransaction();

try {
    DB::table('users')->update(['votes' => 1]);
    DB::table('posts')->delete();

    DB::commit();
} catch (\Exception $e) {
    DB::rollBack();
    // Handle exception
}
```

---

## VI. Advanced Database Features

### A. Raw SQL Queries (`DB::statement()`, `DB::select()`, `DB::insert()`, `DB::update()`, `DB::delete()`)

You can execute raw SQL queries when the Query Builder or Eloquent ORM don't provide the exact functionality you need.

```php
use Illuminate\Support\Facades\DB;

// Execute a general statement
DB::statement('DROP TABLE users');

// Select data
$users = DB::select('SELECT * FROM users WHERE active = ?', [1]);

// Insert data
DB::insert('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', ['John', 'john@example.com', 'secret']);

// Update data
DB::update('UPDATE users SET votes = 100 WHERE name = ?', ['John']);

// Delete data
DB::delete('DELETE FROM users WHERE active = 0');
```

### B. Database Testing (RefreshDatabase, Factories)

Laravel provides excellent tools for testing database interactions.

*   **`RefreshDatabase` trait:** Automatically migrates and refreshes your database for each test, ensuring a clean state.
*   **Factories:** Used to create dummy data for tests.

    ```php
    // tests/Feature/UserTest.php
    use Illuminate\Foundation\Testing\RefreshDatabase;
    use Tests\TestCase;
    use App\Models\User;

    class UserTest extends TestCase
    {
        use RefreshDatabase;

        public function test_a_user_can_be_created(): void
        {
            $user = User::factory()->create();
            $this->assertDatabaseHas('users', ['email' => $user->email]);
        }
    }
    ```

### C. Caching Queries

You can cache the results of queries to improve performance.

```php
use Illuminate\Support\Facades\Cache;

$users = Cache::remember('users', $seconds, function () {
    return DB::table('users')->get();
});
```
