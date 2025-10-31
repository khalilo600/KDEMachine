# Laravel Livewire & Filament

This guide introduces two powerful tools in the Laravel ecosystem: Livewire for building dynamic interfaces with PHP, and Filament for rapidly building elegant TALL stack admin panels.

## 1. Laravel Livewire

Livewire is a full-stack framework for Laravel that allows you to build dynamic interfaces with the simplicity of writing PHP. It bridges the gap between the backend and frontend, letting you create reactive components without writing a lot of JavaScript.

### 1.1 What is Livewire?

Livewire allows you to write PHP code that reacts to user interactions on the frontend, effectively turning your PHP into JavaScript. It's ideal for building features like:

*   Real-time search and filtering
*   Dynamic forms with validation
*   Interactive dashboards
*   Shopping cart functionality
*   Complex UIs without SPA overhead

### 1.2 Installation

Getting started with Livewire is straightforward.

```bash
composer require livewire/livewire
```

After installation, include Livewire's assets in your main layout file (typically `resources/views/layouts/app.blade.php` or similar):

```html
<!DOCTYPE html>
<html>
<head>
    <!-- ... -->
    @livewireStyles
</head>
<body>
    <!-- ... -->
    @livewireScripts
</body>
</html>
```

### 1.3 Creating a Component

Generate new Livewire components using the Artisan command:

```bash
php artisan make:livewire Counter
```

This creates two files:

1.  `app/Livewire/Counter.php` (the component's class)
2.  `resources/views/livewire/counter.blade.php` (the component's view)

### 1.4 Component Structure

#### Component Class (`app/Livewire/Counter.php`)

```php
<?php

namespace App\Livewire;

use Livewire\Component;

class Counter extends Component
{
    public $count = 0; // Public properties are automatically made available to the view and are reactive.

    public function increment()
    {
        $this->count++;
    }

    public function decrement()
    {
        $this->count--;
    }

    public function render()
    {
        // The render method defines the component's view.
        return view('livewire.counter');
    }
}
?>
```

#### Component View (`resources/views/livewire/counter.blade.php`)

```html
<div style="text-align: center;">
    <button wire:click="increment">+</button>
    <h1>{{ $count }}</h1>
    <button wire:click="decrement">-</button>
</div>
```

### 1.5 Embedding a Component

You can embed a Livewire component anywhere in your Blade views:

```html
<!-- In any Blade file, e.g., resources/views/welcome.blade.php -->
<div class="my-app">
    @livewire('counter')
</div>

<!-- Or using the component tag syntax (preferred in Livewire 3+) -->
<div class="my-app">
    <livewire:counter />
</div>
```

### 1.6 Data Binding (`wire:model`)

`wire:model` synchronizes input fields with public properties on your Livewire component.

```html
<!-- In livewire/search-posts.blade.php -->
<div>
    <input type="text" wire:model="search" placeholder="Search posts...">

    @foreach ($posts as $post)
        <p>{{ $post->title }}</p>
    @endforeach
</div>
```

```php
<?php
// In app/Livewire/SearchPosts.php

namespace App\Livewire;

use Livewire\Component;
use App\Models\Post;

class SearchPosts extends Component
{
    public $search = '';

    public function render()
    {
        return view('livewire.search-posts', [
            'posts' => Post::where('title', 'like', '%' . $this->search . '%')->get(),
        ]);
    }
}
?>
```

*   `wire:model.live`: Updates the property as you type.
*   `wire:model.blur`: Updates the property when the input loses focus.
*   `wire:model.debounce.500ms`: Updates the property after 500ms of inactivity.

### 1.7 Actions (`wire:click`, `wire:submit`)

`wire:click`, `wire:submit`, and similar directives call public methods on your component.

```html
<button wire:click="save">Save</button>

<form wire:submit="createPost">
    <!-- ... -->
    <button type="submit">Create</button>
</form>
```

### 1.8 Lifecycle Hooks

Livewire components have a lifecycle, and you can tap into various stages:

*   `mount()`: Runs once, when the component is first mounted.
*   `boot()`: Runs on every request, after `mount`.
*   `hydrate()`: Runs on every subsequent request, before any action.
*   `updating($name, $value)`: Runs before a property is updated.
*   `updated($name, $value)`: Runs after a property is updated.
*   `calling($method, $params)`: Runs before an action is called.
*   `called($method, $params)`: Runs after an action is called.
*   `dehydrate()`: Runs on every subsequent request, after any action, before the component is rendered again.

### 1.9 Events

Livewire provides a robust event system for communication between components.

*   **Emitting Events:**
    ```php
    // app/Livewire/CreatePost.php
    $this->dispatch('post-created', $post->id);
    ```

*   **Listening for Events:**
    ```html
    <!-- livewire/post-list.blade.php -->
    <div x-data="{}" @post-created="alert('Post ' + $event.detail + ' created!')">
        <!-- ... -->
    </div>
    ```
    ```php
    // app/Livewire/PostList.php
    protected $listeners = ['post-created' => 'refreshPosts'];

    public function refreshPosts($postId)
    {
        // ... logic to update post list ...
    }
    ```

### 1.10 Validation

You can validate data in Livewire components just like in Laravel controllers.

```php
<?php
// In app/Livewire/CreatePostForm.php

use Livewire\Component;
use App\Models\Post;

class CreatePostForm extends Component
{
    public $title = '';
    public $body = '';

    protected $rules = [
        'title' => 'required|min:6',
        'body' => 'required',
    ];

    public function createPost()
    {
        $this->validate(); // Runs validation with defined $rules

        Post::create(['title' => $this->title, 'body' => $this->body]);

        $this->reset(['title', 'body']); // Clear form fields
        $this->dispatch('post-created'); // Emit event
    }

    public function render()
    {
        return view('livewire.create-post-form');
    }
}
?>
```

```html
<!-- In livewire/create-post-form.blade.php -->
<form wire:submit="createPost">
    <input type="text" wire:model="title">
    @error('title') <span class="error">{{ $message }}</span> @enderror

    <textarea wire:model="body"></textarea>
    @error('body') <span class="error">{{ $message }}</span> @enderror

    <button type="submit">Submit</button>
</form>
```

### 1.11 File Uploads

Livewire makes handling file uploads simple.

```php
<?php
// In app/Livewire/UploadPhoto.php

use Livewire\Component;
use Livewire\WithFileUploads;

class UploadPhoto extends Component
{
    use WithFileUploads; // Important trait for file uploads

    public $photo;

    public function save()
    {
        $this->validate([
            'photo' => 'image|max:1024', // 1MB Max
        ]);

        $this->photo->store('photos'); // Stores in storage/app/photos

        session()->flash('message', 'Photo successfully uploaded.');
    }

    public function render()
    {
        return view('livewire.upload-photo');
    }
}
?>
```

```html
<!-- In livewire/upload-photo.blade.php -->
<form wire:submit="save">
    @if (session()->has('message'))
        <div class="alert alert-success">{{ session('message') }}</div>
    @endif

    <input type="file" wire:model="photo">

    @error('photo') <span class="error">{{ $message }}</span> @enderror

    <button type="submit">Upload</button>
</form>
```

## 2. Laravel Filament

Filament is a collection of tools for Laravel developers to quickly build beautiful TALL stack (Tailwind CSS, Alpine.js, Livewire, Laravel) interfaces for their applications. It's particularly strong for creating admin panels, CRUD interfaces, and custom dashboards.

### 2.1 What is Filament?

Filament provides:

*   **Admin Panel:** A full-featured admin interface generator.
*   **Form Builder:** Programmatically build complex forms with an expressive PHP API.
*   **Table Builder:** Generate interactive data tables with powerful filtering, sorting, and searching.
*   **Notification System:** Built-in notifications.
*   **Widgets:** For displaying quick information on dashboards.

### 2.2 Installation

Install Filament via Composer:

```bash
composer require filament/filament:^3.0
```

Publish Filament's assets:

```bash
php artisan filament:install
```

This will publish configuration files, migrate new tables (for users, if you choose), and create a new Filament user.

### 2.3 Admin Panel Setup

After installation, you can access your admin panel at `/admin`.

### 2.4 Resources

Filament resources are the core of building your admin panel. Each resource corresponds to an Eloquent model and allows you to define forms for creating/editing, and tables for listing records.

#### Creating a Resource

```bash
php artisan make:filament-resource Post
```

This generates several files, including `app/Filament/Resources/PostResource.php`.

#### Listing Records (Table Definition)

Inside `PostResource.php`, you define the `table` method:

```php
<?php
// In app/Filament/Resources/PostResource.php

use Filament\Tables\Actions\DeleteAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

public static function table(Table $table): Table
{
    return $table
        ->columns([
            TextColumn::make('id')->sortable(),
            TextColumn::make('title')->searchable()->sortable(),
            TextColumn::make('user.name')->label('Author')->searchable()->sortable(),
            TextColumn::make('created_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
        ])
        ->filters([
            // ... filters
        ])
        ->actions([
            // ... actions like EditAction, ViewAction
            DeleteAction::make(),
        ])
        ->bulkActions([
            // ... bulk actions like BulkDeleteAction
        ]);
}
?>
```

#### Forms (Creating/Editing Records)

Inside `PostResource.php`, you define the `form` method:

```php
<?php
// In app/Filament/Resources/PostResource.php

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;

public static function form(Form $form): Form
{
    return $form
        ->schema([
            TextInput::make('title')->required()->maxLength(255),
            Select::make('user_id')
                ->relationship('user', 'name')
                ->required(),
            RichEditor::make('body')->required()->columnSpanFull(),
        ]);
}
?>
```

### 2.5 Custom Pages

You can create custom pages within your Filament admin panel for functionalities not directly tied to a model resource.

```bash
php artisan make:filament-page SettingsPage
```

### 2.6 Widgets

Widgets are small, self-contained components that can be displayed on dashboards or resource overview pages.

```bash
php artisan make:filament-widget StatsOverview --dashboard
```

### 2.7 Authentication & Authorization

Filament handles its own authentication system by default (using a separate `users` table or your existing one if configured). Authorization can be implemented using Laravel Gates and Policies, which Filament fully supports.

### 2.8 Relation Managers

Relation managers allow you to manage a model's relationships directly from its parent resource's edit page. For example, managing a post's comments from the post edit page.

```bash
php artisan make:filament-relation-manager PostResource comments --model=Comment
```
