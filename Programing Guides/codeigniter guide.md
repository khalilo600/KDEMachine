# CodeIgniter 4 Guide: Comprehensive Learning Outline

This guide provides a structured overview of CodeIgniter 4, a popular open-source PHP framework. It covers fundamental concepts, routing, controllers, views, database interaction, forms, validation, and more.

---

## I. Getting Started and Core Concepts

### A. What is CodeIgniter?

CodeIgniter is a powerful PHP framework with a very small footprint, built for developers who need a simple and elegant toolkit to create full-featured web applications. It is known for its speed and flexibility.

*   **MVC Architecture:** Separates application logic into Model (data), View (UI), and Controller (logic).
*   **Lightweight:** The core system is very lean, and you can add libraries as you need them.
*   **Fast:** CodeIgniter is known for its exceptional performance.

### B. Why Use CodeIgniter?

*   **Simplicity:** CodeIgniter is easy to learn and use, with clear and comprehensive documentation.
*   **Performance:** It's one of the fastest PHP frameworks available.
*   **Flexibility:** You are not forced to use a specific coding paradigm.
*   **Security:** Provides built-in protection against common security threats.

### C. Installation and Setup

The recommended way to install CodeIgniter 4 is by using Composer.

1.  **Composer:** Ensure you have Composer installed.

    ```bash
    composer create-project codeigniter4/appstarter my-ci4-app
    cd my-ci4-app
    php spark serve
    ```

### D. Directory Structure

*   **`app/`:** Contains the core code of your application.
*   **`public/`:** The web server's document root.
*   **`writable/`:** Directory for files that need to be written to by the application.
*   **`tests/`:** Contains your automated tests.
*   **`vendor/`:** Contains your Composer dependencies.

### E. Configuration (`.env` file)

CodeIgniter uses a `.env` file to store environment-specific variables.

```dotenv
CI_ENVIRONMENT = development
APP_BASEURL = "http://localhost:8080/"
database.default.hostname = localhost
database.default.database = ci4
database.default.username = root
database.default.password =
database.default.DBDriver = MySQLi
```

### F. Request Lifecycle

1.  **`public/index.php`:** All requests are directed here.
2.  **`app/Config/Routes.php`:** The router matches the URI to a controller.
3.  **Controller:** The controller is instantiated, and the appropriate method is called.
4.  **View:** The controller loads a view and passes data to it.
5.  **Response:** The rendered view is sent back to the browser.

---

## II. Routing

### A. Basic Routing

Routes are defined in `app/Config/Routes.php`.

```php
// app/Config/Routes.php
$routes->get('/', 'Home::index');
$routes->get('pages/(:segment)', 'Pages::view/$1');
```

### B. Route Placeholders

You can use placeholders to capture segments of the URI.

```php
$routes->get('users/(:num)', 'Users::show/$1');
```

### C. Named Routes

You can give names to your routes to make them easier to reference.

```php
$routes->get('profile', 'Users::profile', ['as' => 'user-profile']);
```

---

## III. Controllers

### A. Creating Controllers

```bash
php spark make:controller MyController
```

```php
// app/Controllers/MyController.php
<?php

namespace App\Controllers;

class MyController extends BaseController
{
    public function index()
    {
        return view('welcome_message');
    }
}
```

### B. Controller Actions

Link routes to controller methods.

```php
// app/Config/Routes.php
$routes->get('my-controller', 'MyController::index');
```

---

## IV. Views

### A. Creating Views

Views are stored in `app/Views`.

```html
<!-- app/Views/my_view.php -->
<h1>Hello, <?= esc($name) ?>!</h1>
```

### B. Passing Data to Views

```php
// app/Controllers/MyController.php
public function index()
{
    $data['name'] = 'CodeIgniter';
    return view('my_view', $data);
}
```

---

## V. Database Interaction

### A. Configuration

Database settings are in `app/Config/Database.php` and can be overridden in the `.env` file.

### B. Query Builder

CodeIgniter's Query Builder class gives you access to a set of functions that assist in building and running database queries.

```php
$db = \Config\Database::connect();
$builder = $db->table('users');

$query = $builder->get();

foreach ($query->getResult() as $row) {
    echo $row->title;
}
```

### C. Models

Models are classes that are designed to work with information in your database.

```bash
php spark make:model UserModel
```

```php
// app/Models/UserModel.php
<?php

namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table = 'users';
}
```

---

## VI. Forms and Validation

### A. Form Helper

CodeIgniter's Form Helper provides functions that assist in working with forms.

```php
<?= form_open('users/create') ?>
    <input type="text" name="username">
    <input type="submit" value="Submit">
<?= form_close() ?>
```

### B. Validation

CodeIgniter's Validation library provides a comprehensive set of tools for validating form data.

```php
// app/Controllers/Users.php
public function create()
{
    $validation =  \Config\Services::validation();

    if ($this->request->getMethod() === 'post' && $validation->run($this->request->getPost(), 'user')) {
        // Valid
    } else {
        // Invalid
    }
}
```

---

## VII. Testing

### A. Unit Testing

CodeIgniter is built with testing in mind and provides a simple but flexible testing framework.

```bash
php spark make:test UserTest
```

```php
// tests/app/Controllers/UserTest.php
<?php

namespace App\Controllers;

use CodeIgniter\Test\CIUnitTestCase;

class UserTest extends CIUnitTestCase
{
    public function testSomething()
    {
        $this->assertTrue(true);
    }
}
```

---

## VIII. Deployment

### A. Server Requirements

*   PHP version 7.4 or newer.
*   `intl` and `mbstring` PHP extensions.

### B. Optimization

*   **Configuration Caching:** `php spark config:cache`
*   **Route Caching:** `php spark route:cache`

### C. Environment Configuration

Set the `CI_ENVIRONMENT` variable in your `.env` file to `production`.
