# Laravel Database

Laravel's database tools are comprehensive, providing powerful ways to interact with your database, from schema management to data manipulation. This document delves into the various aspects of database interaction in Laravel.

## 1. Configuration

Laravel's database configuration is primarily managed through `config/database.php` and environment variables in your `.env` file.

### `config/database.php`

This file contains all of your application's database connection settings. You can define multiple connections and specify a default one.

```php
<?php

return [

    'default' => env('DB_CONNECTION', 'mysql'),

    'connections' => [

        'sqlite' => [
            'driver' => 'sqlite',
            'database' => env('DB_DATABASE', database_path('database.sqlite')),
            'prefix' => '',
            'foreign_key_constraints' => env('DB_FOREIGN_KEYS', true),
        ],

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
            'prefix_indexes' => true,
            'strict' => true,
            'engine' => null,
            'options' => extension_loaded('pdo_mysql') ? array_filter([
                PDO::MYSQL_ATTR_SSL_CA => env('MYSQL_ATTR_SSL_CA'),
            ]) : [],
        ],

        // ... other connections like pgsql, sqlsrv
    ],

    'migrations' => 'migrations',

    'redis' => [

        'client' => env('REDIS_CLIENT', 'phpredis'),

        'options' => [
            'cluster' => env('REDIS_CLUSTER', 'redis'),
            'prefix' => env('REDIS_PREFIX', Str::slug(env('APP_NAME', 'laravel'), '_').'_database_'),
        ],

        'default' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_DB', '0'),
        ],

        'cache' => [
            'url' => env('REDIS_URL'),
            'host' => env('REDIS_HOST', '127.0.0.1'),
            'username' => env('REDIS_USERNAME'),
            'password' => env('REDIS_PASSWORD'),
            'port' => env('REDIS_PORT', '6379'),
            'database' => env('REDIS_CACHE_DB', '1'),
        ],

    ],

];
?>
```

### `.env` Variables

Your `.env` file holds sensitive credentials and environment-specific settings. These values are loaded into `config/database.php` using the `env()` helper function.

```ini
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

### Default Connection

The `default` key in `config/database.php` specifies which database connection should be used by default. You can change this at runtime using `DB::connection('connection-name')`.

## 2. Migrations

Migrations are Laravel's way of managing your database schema. They allow you to define and modify your database tables using PHP code, making schema changes version-controlled and easily shareable across your team.

### Creating Migrations

```bash
php artisan make:migration create_users_table
php artisan make:migration add_avatar_to_users_table --table=users
```

### Migration Structure

Each migration file contains two methods: `up()` and `down()`.

*   The `up()` method is used to add new tables, columns, or indexes to your database.
*   The `down()` method should reverse the operations performed by the `up()` method, effectively rolling back the migration.

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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description')->nullable();
            $table->decimal('price', 8, 2);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
?>
```

### Schema Builder

Laravel's Schema facade provides a database-agnostic way to create and manipulate tables.

#### Creating Tables

```php
<?php
Schema::create('flights', function (Blueprint $table) {
    $table->id();
    $table->string('name');
    $table->string('airline');
    $table->timestamps();
});
?>
```

#### Modifying Tables

```php
<?php
Schema::table('users', function (Blueprint $table) {
    $table->string('email')->nullable()->change(); // Change column type
    $table->string('avatar')->after('email')->nullable(); // Add column
    $table->renameColumn('name', 'full_name'); // Rename column
});
?>
```

#### Dropping Tables/Columns

```php
<?php
Schema::drop('flights'); // Drop table if exists
Schema::dropIfExists('flights'); // Drop table if exists

Schema::table('users', function (Blueprint $table) {
    $table->dropColumn('avatar'); // Drop column
    $table->dropColumn(['votes', 'photos']); // Drop multiple columns
});
?>
```

#### Column Types and Modifiers

Laravel's Schema Builder supports a wide variety of column types and modifiers:

*   **Types:** `string`, `text`, `integer`, `bigIncrements`, `boolean`, `date`, `dateTime`, `decimal`, `double`, `enum`, `float`, `json`, `longText`, `mediumText`, `smallInteger`, `time`, `timestamp`, `uuid`, etc.
*   **Modifiers:** `nullable()`, `default()`, `unsigned()`, `unique()`, `index()`, `primary()`, `foreign()`, `constrained()`, `cascadeOnDelete()`, `after()`, etc.

```php
<?php
$table->string('name', 100)->unique();
$table->integer('votes')->default(0);
$table->foreignId('user_id')->constrained()->onDelete('cascade');
?>
```

### Running Migrations

*   `php artisan migrate`: Runs all outstanding migrations.
*   `php artisan migrate:fresh`: Drops all tables from the database and then runs the `migrate` command.
*   `php artisan migrate:rollback`: Rolls back the last batch of migrations.
*   `php artisan migrate:reset`: Rolls back all migrations.
*   `php artisan migrate:status`: Shows the status of each migration.

## 3. Seeding

Database seeding is a way to populate your database with dummy data for testing or initial setup.

### Creating Seeders

```bash
php artisan make:seeder UserSeeder
```

`database/seeders/UserSeeder.php`:
```php
<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => Hash::make('password'),
        ]);

        User::factory()->count(50)->create();
    }
}
?>
```

### `DatabaseSeeder`

The `DatabaseSeeder` class is the main seeder from which you can call other seeders.

`database/seeders/DatabaseSeeder.php`:
```php
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            // PostSeeder::class,
        ]);
    }
}
?>
```

### Running Seeders

*   `php artisan db:seed`: Runs the `DatabaseSeeder`.
*   `php artisan db:seed --class=UserSeeder`: Runs a specific seeder.
*   `php artisan migrate:fresh --seed`: Drops all tables, runs migrations, and then runs the `DatabaseSeeder`.

## 4. Factories

Factories provide a convenient way to generate large amounts of dummy data for your models.

### Creating Factories

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
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Post::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => \App\Models\User::factory(),
            'title' => $this->faker->sentence(),
            'body' => $this->faker->paragraph(),
        ];
    }

    /**
     * Indicate that the post is published.
     */
    public function published(): Factory
    {
        return $this->state(function (array $attributes) {
            return [
                'published_at' => now(),
            ];
        });
    }
}
?>
```

### Using Factories

```php
<?php
use App\Models\User;
use App\Models\Post;

// Create a single user
$user = User::factory()->create();

// Create multiple posts
$posts = Post::factory()->count(10)->create();

// Create a published post
$publishedPost = Post::factory()->published()->create();

// Create a post with a specific user
$user = User::factory()->create();
$post = Post::factory()->for($user)->create();
?>
```

## 5. Query Builder

Laravel's database query builder provides a convenient, expressive interface to create and run database queries. It can be used to perform most database operations in your application and works on all supported database systems.

### Retrieving Results

```php
<?php
use Illuminate\Support\Facades\DB;

// Get all rows from a table
$users = DB::table('users')->get();

// Get a single row by ID
$user = DB::table('users')->where('id', 1)->first();

// Get a single column's value
$name = DB::table('users')->where('id', 1)->value('name');

// Get a list of column values
$titles = DB::table('posts')->pluck('title');

// Aggregate functions
$count = DB::table('users')->count();
$maxPrice = DB::table('products')->max('price');
?>
```

### Selects

```php
<?php
// Select specific columns
$users = DB::table('users')->select('name', 'email')->get();

// Add a select statement
$users = DB::table('users')
            ->select('name')
            ->addSelect('email')
            ->get();
?>
```

### Joins

```php
<?php
// Basic join
$users = DB::table('users')
            ->join('contacts', 'users.id', '=', 'contacts.user_id')
            ->select('users.name', 'contacts.phone')
            ->get();

// Left join
$users = DB::table('users')
            ->leftJoin('posts', 'users.id', '=', 'posts.user_id')
            ->get();

// Cross join
$cartesian = DB::table('sizes')
                ->crossJoin('colors')
                ->get();
?>
```

### Where Clauses

```php
<?php
// Basic where
$users = DB::table('users')->where('votes', '>', 100)->get();

// Or where
$users = DB::table('users')
            ->where('votes', '>', 100)
            ->orWhere('name', 'John')
            ->get();

// Where between
$users = DB::table('users')->whereBetween('votes', [1, 100])->get();

// Where null / not null
$users = DB::table('users')->whereNull('updated_at')->get();

// Where date / month / day / year
$users = DB::table('users')->whereDate('created_at', '2023-01-01')->get();

// Advanced where clauses with closures
$users = DB::table('users')
            ->where('name', 'John')
            ->orWhere(function ($query) {
                $query->where('votes', '>', 100)
                      ->where('title', 'Admin');
            })
            ->get();
?>
```

### Ordering, Grouping, Limit & Offset

```php
<?php
// Order by
$users = DB::table('users')->orderBy('name', 'desc')->get();

// Group by and having
$users = DB::table('users')
            ->groupBy('account_id')
            ->having('account_id', '>', 100)
            ->get();

// Limit and offset
$users = DB::table('users')->offset(10)->limit(5)->get();
?>
```

### Inserts, Updates, Deletes

```php
<?php
// Insert a record
DB::table('users')->insert([
    'name' => 'Jane Doe',
    'email' => 'jane@example.com',
    'password' => bcrypt('password'),
]);

// Update records
DB::table('users')
    ->where('id', 1)
    ->update(['votes' => 1]);

// Delete records
DB::table('users')->where('votes', '<', 100)->delete();
?>
```

### Raw Expressions

Sometimes you may need to use raw expressions in your queries.

```php
<?php
use Illuminate\Support\Facades\DB;

$users = DB::table('users')
            ->select(DB::raw('count(*) as user_count, status'))
            ->where('status', '<>', 1)
            ->groupBy('status')
            ->get();
?>
```

## 6. Eloquent ORM (Advanced Topics)

(For basic Eloquent ORM concepts, refer to `orm.md`)

### Collections

Eloquent methods that return multiple results will return an `Illuminate\Database\Eloquent\Collection` object. This object extends Laravel's base `Collection` and provides various helper methods for working with your results.

```php
<?php
$users = App\Models\User::all();

$names = $users->map(function (\App\Models\User $user) {
    return $user->name;
});
?>
```

### Eager Loading (`with`)

Eager loading is used to load a model's relationships when querying the parent model. This solves the N+1 query problem.

```php
<?php
// Without eager loading (N+1 problem)
$posts = App\Models\Post::all();
foreach ($posts as $post) {
    echo $post->user->name; // Each access to user triggers a new query
}

// With eager loading
$posts = App\Models\Post::with('user')->get();
foreach ($posts as $post) {
    echo $post->user->name; // User is already loaded, no extra queries
}

// Eager loading multiple relationships
$posts = App\Models\Post::with(['user', 'comments'])->get();

// Eager loading with constraints
$users = App\Models\User::with(['posts' => function ($query) {
    $query->where('title', 'like', '%Laravel%');
}])->get();
?>
```

### Lazy Eager Loading (`load`)

Sometimes you may need to eager load a relationship after the parent model has already been retrieved.

```php
<?php
$users = App\Models\User::all();

if (Auth::user()->isAdmin()) {
    $users->load('roles');
}
?>
```

### Inserting & Updating Related Models

Eloquent provides convenient methods for working with related models.

```php
<?php
$user = App\Models\User::find(1);

// One-to-Many: Create a new post for the user
$post = $user->posts()->create([
    'title' => 'New Post',
    'body' => 'Content here.',
]);

// Many-to-Many: Attach a role to a user
$user->roles()->attach($roleId);

// Many-to-Many: Detach a role from a user
$user->roles()->detach($roleId);

// Many-to-Many: Sync roles (attach/detach as needed)
$user->roles()->sync([1, 2, 3]);
?>
```

### Timestamps

By default, Eloquent automatically maintains `created_at` and `updated_at` columns. You can disable this by setting `$timestamps = false` in your model.

### Casts

Attribute casting provides a convenient method of converting attributes to common data types as they are retrieved from your database.

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected $casts = [
        'email_verified_at' => 'datetime',
        'is_admin' => 'boolean',
        'options' => 'array',
    ];
}
?>
```

### Events (Model Events)

Eloquent models fire several events, allowing you to hook into various points in a model's lifecycle (e.g., `creating`, `created`, `updating`, `updated`, `deleting`, `deleted`).

```php
<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    protected static function booted(): void
    {
        static::created(function (User $user) {
            // ...
        });

        static::deleting(function (User $user) {
            // Delete related posts before user is deleted
            $user->posts()->delete();
        });
    }
}
?>
```

## 7. Transactions

Transactions allow you to run a set of database operations within a single, atomic unit of work. If any operation within the transaction fails, the entire transaction is rolled back.

### Using `DB::transaction`

```php
<?php
use Illuminate\Support\Facades\DB;

try {
    DB::transaction(function () {
        DB::table('users')->update(['votes' => 1]);

        DB::table('posts')->delete();
    });
} catch (\Exception $e) {
    // Handle exception, transaction was rolled back
}
?>
```

### Manual Transactions

```php
<?php
use Illuminate\Support\Facades\DB;

DB::beginTransaction();

try {
    DB::table('users')->update(['votes' => 1]);

    DB::table('posts')->delete();

    DB::commit();
} catch (\Exception $e) {
    DB::rollBack();
    // Handle exception
}
?>
```

## 8. Database Testing

Laravel provides helpful tools for testing your database interactions.

### `RefreshDatabase` Trait

This trait automatically migrates your test database before each test and rolls back the migrations after each test, ensuring a clean database state for every test.

```php
<?php
namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function test_users_can_be_created(): void
    {
        // ...
    }
}
?>
```

### Assertions

Laravel's testing utilities provide convenient database assertions.

```php
<?php
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class PostTest extends TestCase
{
    use RefreshDatabase;

    public function test_a_post_can_be_created(): void
    {
        $user = \App\Models\User::factory()->create();

        $response = $this->actingAs($user)->post('/posts', [
            'title' => 'Test Post',
            'body' => 'This is a test post.',
        ]);

        $this->assertDatabaseHas('posts', [
            'title' => 'Test Post',
            'user_id' => $user->id,
        ]);

        $this->assertDatabaseMissing('posts', [
            'title' => 'Non Existent Post',
        ]);
    }
}
?>
```
