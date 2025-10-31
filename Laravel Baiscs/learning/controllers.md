# Laravel Controllers

Laravel controllers serve as an intermediary between incoming HTTP requests and your application's business logic. They group related request handling logic into a single class, making your code more organized and maintainable.

## 1. What are Controllers?

Controllers are classes that handle incoming HTTP requests and return an appropriate response. They are typically stored in the `app/Http/Controllers` directory. By centralizing request handling logic, controllers help keep your routes file clean and focused solely on route definitions.

## 2. Creating Controllers

You can generate a new controller using the Artisan command-line tool.

```bash
php artisan make:controller UserController
```

This will create a file named `UserController.php` in `app/Http/Controllers`:

```php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    //
}
?>
```

## 3. Controller Actions

Controller actions are the methods within a controller that respond to specific HTTP requests.

### Basic Controller Actions

```php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the users.
     */
    public function index()
    {
        return 'Displaying all users';
    }

    /**
     * Show the form for creating a new user.
     */
    public function create()
    {
        return 'Show form to create user';
    }

    /**
     * Store a newly created user in storage.
     */
    public function store(Request $request)
    {
        // Validate and store the new user
        return 'Storing new user';
    }

    /**
     * Display the specified user.
     */
    public function show(string $id)
    {
        return 'Displaying user ' . $id;
    }

    /**
     * Show the form for editing the specified user.
     */
    public function edit(string $id)
    {
        return 'Show form to edit user ' . $id;
    }

    /**
     * Update the specified user in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validate and update the user
        return 'Updating user ' . $id;
    }

    /**
     * Remove the specified user from storage.
     */
    public function destroy(string $id)
    {
        return 'Deleting user ' . $id;
    }
}
?>
```

### Routing to Controller Actions

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/users', [UserController::class, 'index']);
Route::post('/users', [UserController::class, 'store']);
Route::get('/users/{id}', [UserController::class, 'show']);
?>
```

### Single Action Controllers

If your controller only handles a single action, you can define it as an invokable controller. This is useful for simple actions that don't require a full resource controller.

```bash
php artisan make:controller ShowProfileController --invokable
```

`app/Http/Controllers/ShowProfileController.php`:
```php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ShowProfileController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request, string $id)
    {
        return 'Showing profile for user ' . $id;
    }
}
?>
```

Routing to an invokable controller:

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ShowProfileController;

Route::get('/user/{id}/profile', ShowProfileController::class);
?>
```

## 4. Resource Controllers

Laravel resource routing assigns the typical "CRUD" routes to a controller with a single line of code. This is very convenient for building RESTful APIs or web interfaces.

```bash
php artisan make:controller PostController --resource
```

This will generate a controller with methods like `index`, `create`, `store`, `show`, `edit`, `update`, and `destroy`.

To register a resource controller:

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PostController;

Route::resource('posts', PostController::class);
?>
```

This single line registers multiple routes:

| Verb     | URI                | Action   | Route Name   |
| :------- | :----------------- | :------- | :----------- |
| GET      | `/posts`           | `index`  | `posts.index`  |
| GET      | `/posts/create`    | `create` | `posts.create` |
| POST     | `/posts`           | `store`  | `posts.store`  |
| GET      | `/posts/{post}`    | `show`   | `posts.show`   |
| GET      | `/posts/{post}/edit` | `edit`   | `posts.edit`   |
| PUT/PATCH | `/posts/{post}`    | `update` | `posts.update` |
| DELETE   | `/posts/{post}`    | `destroy`| `posts.destroy`|

## 5. Dependency Injection

Laravel's service container is used to perform dependency injection on your controllers. This means you can type-hint any dependencies your controller needs in its constructor or method signatures, and Laravel will automatically resolve and inject them.

### Constructor Injection

```php
<?php
namespace App\Http\Controllers;

use App\Services\OrderService;
use App\Http\Controllers\Controller;

class OrderController extends Controller
{
    protected $orderService;

    public function __construct(OrderService $orderService)
    {
        $this->orderService = $orderService;
    }

    public function index()
    {
        $orders = $this->orderService->getAllOrders();
        return view('orders.index', compact('orders'));
    }
}
?>
```

### Method Injection

```php
<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function store(Request $request)
    {
        // The Request instance is automatically injected
        $name = $request->input('name');
        // ...
    }

    public function update(Request $request, User $user)
    {
        // Both Request and User model are injected
        $user->update($request->all());
        return back();
    }
}
?>
```

## 6. Middleware in Controllers

Middleware provides a convenient mechanism for filtering HTTP requests entering your application. You can assign middleware to controller actions.

### Assigning Middleware in Routes

```php
<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/profile', [UserController::class, 'show'])->middleware('auth');
?>
```

### Assigning Middleware in Controller Constructor

```php
<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth'); // Applies 'auth' middleware to all methods

        $this->middleware('log')->only('index'); // Applies 'log' only to the index method

        $this->middleware('subscribed')->except('store'); // Applies 'subscribed' to all except store
    }
}
?>
```

## 7. Form Request Validation

For more complex validation scenarios, you may wish to create a "form request". Form requests are custom request classes that encapsulate validation logic.

```bash
php artisan make:request StorePostRequest
```

`app/Http/Requests/StorePostRequest.php`:
```php
<?php
namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Set to true if all users are authorized, or add logic here
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'title' => ['required', 'string', 'max:255'],
            'body' => ['required', 'string'],
        ];
    }
}
?>
```

Using the form request in your controller:

```php
<?php
namespace App\Http\Controllers;

use App\Http\Requests\StorePostRequest;
use App\Http\Controllers\Controller;

class PostController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        // The incoming request is already validated.
        // Access validated data using $request->validated()
        $validated = $request->validated();

        // Create the post...

        return redirect('/posts')->with('success', 'Post created successfully!');
    }
}
?>
```
