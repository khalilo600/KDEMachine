# Laravel Views

Laravel views provide a convenient way to separate your application's logic from its presentation. They typically contain HTML and can be extended with Blade templating engine features for dynamic content.

## 1. What are Views?

Views are the `V` in the MVC (Model-View-Controller) architectural pattern. They contain the HTML served by your application and provide a convenient way to separate your domain and controller logic from your presentation logic. Views are stored in the `resources/views` directory.

## 2. Creating & Rendering Views

A view file generally ends with `.blade.php` (e.g., `welcome.blade.php`), indicating that Laravel's Blade templating engine will process it.

### Creating a View

Simply create a `.blade.php` file within `resources/views` or a subdirectory.

`resources/views/welcome.blade.php`:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Welcome</title>
</head>
<body>
    <h1>Welcome to our application!</h1>
</body>
</html>
```

### Rendering a View

You can return a view from a route or controller.

```php
<?php

use Illuminate\Support\Facades\Route;

Route::get('/welcome', function () {
    return view('welcome'); // This will render resources/views/welcome.blade.php
});

// Views in subdirectories
Route::get('/dashboard', function () {
    return view('admin.dashboard'); // Renders resources/views/admin/dashboard.blade.php
});
?>
```

## 3. Passing Data to Views

You can pass an array of data to your views. The keys of the array become variable names within the view.

```php
<?php
Route::get('/hello/{name}', function (string $name) {
    return view('hello', [
        'name' => $name,
        'framework' => 'Laravel',
    ]);
});

// resources/views/hello.blade.php
// <h1>Hello, {{ $name }}!</h1>
// <p>You're learning {{ $framework }}.</p>
?>
```

Alternatively, you can use the `with` method:

```php
<?php
Route::get('/hello/{name}', function (string $name) {
    return view('hello')
                ->with('name', $name)
                ->with('framework', 'Laravel');
});
?>
```

## 4. Blade Templating Engine

Blade is Laravel's powerful, simple, and elegant templating engine. It provides a set of convenient shortcuts for common PHP tasks and allows for cleaner, more readable views.

### Blade Syntax

Blade templates are compiled into plain PHP code and cached, meaning there's virtually no overhead.

*   **Echoing Data:**
    ```html
    Hello, {{ $name }}! <!-- Escapes HTML entities -->
    Hello, {!! $untrustedHtml !!} <!-- Displays unescaped data (use with caution!) -->
    ```

*   **Comments:**
    ```html
    {{-- This is a Blade comment, ignored by Blade compiler --}}
    ```

### Control Structures

Blade provides convenient shortcuts for PHP's control structures.

*   **If Statements:** `@if`, `@elseif`, `@else`, `@endif`, `@unless`, `@endunless`
    ```html
    @if (count($records) === 1)
        I have one record!
    @elseif (count($records) > 1)
        I have multiple records!
    @else
        I don't have any records!
    @endif

    @unless (Auth::check())
        You are not signed in.
    @endunless
    ```

*   **Switch Statements:** `@switch`, `@case`, `@default`, `@endswitch`
    ```html
    @switch($i)
        @case(1)
            First case...
            @break

        @case(2)
            Second case...
            @break

        @default
            Default case...
    @endswitch
    ```

### Loops

Blade also provides directives for working with loops.

*   **`@for`, `@endfor`**
*   **`@foreach`, `@endforeach`**
*   **`@forelse`, `@empty`, `@endforelse`** (Executes if the array is empty)
*   **`@while`, `@endwhile`**

```html
<ul>
    @foreach ($users as $user)
        <li>{{ $user->name }}</li>
    @endforeach
</ul>

@forelse ($users as $user)
    <li>{{ $user->name }}</li>
@empty
    <p>No users</p>
@endforelse
```

### Layouts and Components

Blade makes it easy to define a master layout and extend it with child views, and to create reusable components.

*   **Defining a Layout (e.g., `resources/views/layouts/app.blade.php`):**
    ```html
    <!DOCTYPE html>
    <html>
    <head>
        <title>App Name - @yield('title')</title>
    </head>
    <body>
        @section('sidebar')
            This is the master sidebar.
        @show

        <div class="container">
            @yield('content')
        </div>
    </body>
    </html>
    ```

*   **Extending a Layout (e.g., `resources/views/child.blade.php`):**
    ```html
    @extends('layouts.app')

    @section('title', 'Page Title')

    @section('sidebar')
        @parent
        <p>This is appended to the master sidebar.</p>
    @endsection

    @section('content')
        <p>This is my body content.</p>
    @endsection
    ```

*   **Components and Slots:** Reusable pieces of UI.
    ```html
    <!-- resources/views/components/alert.blade.php -->
    <div class="alert alert-{{ $type ?? 'info' }}">
        {{ $slot }}
    </div>

    <!-- Usage in another view -->
    <x-alert type="danger">
        <strong>Whoops!</strong> Something went wrong!
    </x-alert>

    <x-alert>
        The default type will be info.
    </x-alert>
    ```

### Stacks

Blade stacks allow you to push content to a named stack, which can be rendered anywhere else in your views or layouts. This is useful for injecting required scripts or styles into your layouts from child views.

*   **Layout (`layouts/app.blade.php`):**
    ```html
    <head>
        <!-- ... -->
        @stack('styles')
    </head>
    <body>
        <!-- ... -->
        @stack('scripts')
    </body>
    ```

*   **Child View:**
    ```html
    @push('scripts')
        <script src="/example.js"></script>
    @endpush

    @push('styles')
        <link rel="stylesheet" href="/example.css">
    @endpush
    ```

## 5. View Composers

View composers are callbacks or class methods that are called when a view is rendered. If you have data that you want to be bound to a view each time that view is rendered, a view composer can help you organize that logic.

```php
<?php
namespace App\Http\View\Composers;

use Illuminate\View\View;

class ProfileComposer
{
    public function compose(View $view)
    {
        $view->with('count', 10);
    }
}
?>
```

### Registering View Composers

View composers can be registered in a service provider (e.g., `AppServiceProvider` or a dedicated `ViewServiceProvider`).

```php
<?php
namespace App\Providers;

use App\Http\View\Composers\ProfileComposer;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function boot()
    {
        // Using a class-based composer
        View::composer('profile', ProfileComposer::class);

        // Using a closure-based composer for multiple views
        View::composer(
            ['dashboard', 'profile'], function (View $view) {
                $view->with('latestPosts', App\Models\Post::latest()->take(3)->get());
            }
        );

        // You can also compose all views
        View::composer('*', function (View $view) {
            // ...
        });
    }
}
?>
```
