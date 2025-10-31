# Laravel Routes

Laravel's routing system is a powerful way to connect incoming HTTP requests to the appropriate controller actions or closures. It provides a clean and expressive API for defining all your application's routes.

## 1. Basic Routing

The most fundamental way to define a route is to specify a URI and a Closure (an anonymous function) or a controller action.

```php
<?php

use Illuminate\Support\Facades\Route;

// Basic GET route returning a string
Route::get('/greeting', function () {
    return 'Hello World';
});

// Basic POST route
Route::post('/submit-form', function () {
    // Handle form submission
    return 'Form submitted!';
});

// You can define routes for all HTTP verbs: GET, POST, PUT, PATCH, DELETE, OPTIONS
Route::put('/update-resource/{id}', function ($id) {
    return 'Updating resource ' . $id;
});

Route::delete('/delete-resource/{id}', function ($id) {
    return 'Deleting resource ' . $id;
});

// Route to a controller action
// Assuming you have an App\Http\Controllers\UserController
Route::get('/users', [App\Http\Controllers\UserController::class, 'index']);
Route::get('/users/{id}', [App\Http\Controllers\UserController::class, 'show']);
?>
```

## 2. Route Parameters

Often, you will need to capture segments of the URI.

### Required Parameters

```php
<?php
Route::get('/user/{id}', function (string $id) {
    return 'User ID: ' . $id;
});

// Multiple parameters
Route::get('/posts/{post}/comments/{comment}', function (string $postId, string $commentId) {
    return 'Post ID: ' . $postId . ', Comment ID: ' . $commentId;
});
?>
```

### Optional Parameters

You can make route parameters optional by placing a `?` mark after the parameter name and giving your corresponding variable a `null` default value.

```php
<?php
Route::get('/user/{name?}', function (?string $name = null) {
    return $name ? 'Hello ' . $name : 'Hello Guest';
});
?>
```

### Regular Expression Constraints

You can constrain the format of your route parameters using the `where` method.

```php
<?php
Route::get('/user/{id}', function (string $id) {
    return 'User ID: ' . $id;
})->where('id', '[0-9]+'); // Only numbers

Route::get('/post/{name}', function (string $name) {
    return 'Post Name: ' . $name;
})->where('name', '[A-Za-z]+'); // Only alphabetic characters

// Global constraints can be defined in the `App\Providers\RouteServiceProvider`
?>
```

## 3. Named Routes

Named routes allow you to conveniently generate URLs or redirects for specific routes.

```php
<?php
Route::get('/user/profile', function () {
    //
})->name('profile');

// Generating URLs
// $url = route('profile');

// Redirecting
// return redirect()->route('profile');

// Named routes with parameters
Route::get('/user/{id}/profile', function (string $id) {
    //
})->name('user.profile');

// $url = route('user.profile', ['id' => 1]);
?>
```

## 4. Route Groups

Route groups allow you to share route attributes, such as middleware, without needing to define those attributes on each individual route.

### Middleware

```php
<?php
Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        // Uses the 'auth' middleware
    });

    Route::get('/settings', function () {
        // Uses the 'auth' middleware
    });
});
?>
```

### Prefixes

The `prefix` method can be used to prefix each route in the group with a given URI.

```php
<?php
Route::prefix('admin')->group(function () {
    Route::get('/users', function () {
        return 'Admin Users';
    });
    Route::get('/products', function () {
        return 'Admin Products';
    });
});
// This will register routes like /admin/users and /admin/products
?>
```

### Name Prefixes

The `name` method can be used to prefix each route's name in the group with a given string.

```php
<?php
Route::name('admin.')->group(function () {
    Route::get('/users', function () {
        // Route name: admin.users
    })->name('users');
});
// route('admin.users')
?>
```

### Subdomain Routing

Route groups may also be used to handle subdomain routing.

```php
<?php
Route::domain('{account}.myapp.com')->group(function () {
    Route::get('user/{id}', function (string $account, string $id) {
        return 'Account: ' . $account . ', User ID: ' . $id;
    });
});
?>
```

## 5. Route Model Binding

Laravel route model binding provides a convenient way to automatically inject model instances directly into your routes.

### Implicit Binding

Laravel automatically resolves Eloquent models defined in routes or controller actions whose variable names match a route segment.

```php
<?php
// Route definition
Route::get('/posts/{post}', [App\Http\Controllers\PostController::class, 'show']);

// PostController.php
// public function show(App\Models\Post $post)
// {
//     return $post->title; // Laravel automatically fetches the Post with the matching ID
// }
?>
```

### Customizing The Key

If you would like implicit model binding to use a database column other than `id`, you may specify the column in the route parameter definition.

```php
<?php
Route::get('/posts/{post:slug}', [App\Http\Controllers\PostController::class, 'show']);
?>
```

## 6. Form Methods

HTML forms do not support `PUT`, `PATCH`, or `DELETE` actions. Laravel provides a way to spoof these HTTP verbs using a hidden `_method` input field.

```html
<form action="/update-resource/1" method="POST">
    @csrf
    @method('PUT')
    <!-- Other form fields -->
    <button type="submit">Update</button>
</form>
```

## 7. Returning Data from Routes

Routes can return various types of data.

### Returning Strings

```php
<?php
Route::get('/hello', function () {
    return 'Hello from a route!';
});
?>
```

### Returning Arrays or JSON

Laravel automatically converts arrays and `Illuminate\Support\Collection` instances to JSON.

```php
<?php
Route::get('/data', function () {
    return ['name' => 'Alice', 'age' => 30];
});

Route::get('/users-json', function () {
    $users = collect([
        ['id' => 1, 'name' => 'Bob'],
        ['id' => 2, 'name' => 'Charlie'],
    ]);
    return $users;
});
?>
```

### Returning Views

The most common way to return content is by returning a view.

```php
<?php
Route::get('/welcome', function () {
    return view('welcome'); // Renders resources/views/welcome.blade.php
});

// Passing data to views
Route::get('/welcome-name', function () {
    return view('welcome', ['name' => 'John Doe']);
});
?>
```

## 8. Redirect Routes

You may define routes that redirect to another URI.

```php
<?php
Route::redirect('/here', '/there'); // 302 Found status code by default
Route::redirect('/here-permanent', '/there-permanent', 301); // 301 Moved Permanently
?>
```

## 9. View Routes

If your route only needs to return a view, you can use the `Route::view` method.

```php
<?php
Route::view('/welcome-simple', 'welcome');

// With data
Route::view('/welcome-data', 'welcome', ['name' => 'Jane Doe']);
?>
