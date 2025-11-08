# The Way to Rails

Welcome to your journey on **The Way to Rails**! This guide is designed to give you a solid foundation in Ruby, the language that powers Rails, and then guide you through building your first Rails application.

---

### Lesson 1: The First Step

Welcome to your first lesson on **The Way to Rails**! The goal of this series is to give you a solid foundation in Ruby, the language that powers Rails. By the end of this journey, you'll not only understand how Rails works, but you'll also be able to write your own Ruby code with confidence.

#### The Core Idea: Everything is an Object

In Ruby, everything you work with is an "object". Think of an object as a thing that has its own data and its own set of abilities. For example, a piece of text (a "String" in Ruby) is an object. It holds the data of the text itself, and it has abilities like being able to tell you its length or to be converted to uppercase.

#### Variables: Giving Names to Objects

We use variables to give names to these objects so we can refer to them later. Creating a variable is as simple as picking a name and using the `=` sign to assign an object to it.

```ruby
# Here, we're assigning a String object to the variable `greeting`
greeting = "Hello, World!"

# And here, we're assigning a Number object to the variable `my_favorite_number`
my_favorite_number = 42
```

#### Basic Objects: Strings, Numbers, and Booleans

Let's look at some of the most common objects you'll encounter:

*   **Strings:** Represent text.
    ```ruby
    message = "Welcome to The Way to Rails"
    ```
*   **Numbers:** Represent, well, numbers!
    ```ruby
    chapter = 1
    pi = 3.14
    ```
*   **Booleans:** Represent `true` or `false`.
    ```ruby
    is_learning_fun = true
    ```

---

### Lesson 2: The Fork in the Road

In our last lesson, we learned about the core idea of Ruby: everything is an object. We also saw how to use variables to give names to these objects.

Now, it's time to learn how to make our programs do interesting things. We'll learn how to create our own "abilities" for our objects and how to make our programs make decisions.

#### Methods: Creating Your Own Abilities

A method is a set of instructions that you can give a name to. You can then "call" that method by its name to execute the instructions.

Let's create a method called `greet` that takes a name as an argument and prints a greeting to the screen.

```ruby
def greet(name)
  puts "Hello, #{name}! Welcome to The Way to Rails."
end

# Now, let's call our new method
greet("nk")  # Output: Hello, nk! Welcome to The Way to Rails.
```

The `#{name}` syntax is a special Ruby feature called "string interpolation". It allows you to embed the value of a variable directly into a string.

#### Control Flow: Making Decisions

Sometimes, you want your program to do different things based on certain conditions. This is where control flow comes in. The most common way to control the flow of your program is with `if`, `elsif`, and `else`.

Let's write a method that checks if a number is positive, negative, or zero.

```ruby
def check_number(number)
  if number > 0
    puts "#{number} is positive."
  elsif number < 0
    puts "#{number} is negative."
  else
    puts "#{number} is zero."
  end
end

check_number(10)   # Output: 10 is positive.
check_number(-5)  # Output: -5 is negative.
check_number(0)    # Output: 0 is zero.
```

---

### Lesson 3: The Scenic Route

So far, we've learned about objects, variables, methods, and how to make our programs make decisions. Now, let's learn how to work with collections of objects. This is where Ruby really starts to shine.

#### Arrays: Ordered Lists

An array is a list of objects, in a specific order. You can put any kind of object in an array, and you can access the objects by their position (or "index") in the list. In Ruby, array indices start at 0.

```ruby
# An array of numbers
my_favorite_numbers = [42, 7, 13]

# An array of strings
my_favorite_things = ["Ruby", "Rails", "Turtles"]

# Accessing elements in an array
puts my_favorite_things[0]  # Output: Ruby
puts my_favorite_things[2]  # Output: Turtles
```

#### Hashes: Key-Value Pairs

A hash is a collection of key-value pairs. It's like a dictionary, where you have a "key" (the word) and a "value" (the definition). In Ruby, keys are often a special kind of object called a "symbol" (e.g., `:name`).

```ruby
# A hash representing a user
user = {
  :name => "nk",
  :email => "nk@example.com",
  :age => 30
}

# Accessing values in a hash
puts user[:name]  # Output: nk
puts user[:age]   # Output: 30
```

Ruby has a newer, more concise syntax for hashes with symbol keys:

```ruby
user = {
  name: "nk",
  email: "nk@example.com",
  age: 30
}
```

#### Loops and Iterators: Repeating Yourself (the Right Way)

Often, you'll want to do the same thing to each item in a collection. This is where loops and iterators come in. The most common iterator in Ruby is the `each` method.

```ruby
my_favorite_things = ["Ruby", "Rails", "Turtles"]

my_favorite_things.each do |thing|
  puts "I love #{thing}!"
end
```

---

### Lesson 4: The Destination

You've learned about objects, variables, methods, control flow, arrays, and hashes. Now, let's see how these concepts come together in a Rails application to create something tangible.

Our goal for this lesson is to display a simple list of blog posts on your "Welcome" page. For now, we won't use a database; we'll simulate our posts using an array of hashes.

#### Step 1: Prepare Our "Posts" in the Controller

In Rails, the "controller" is responsible for preparing the data that the "view" will display. Let's open your `app/controllers/welcome_controller.rb` file and add some sample posts.

```ruby
class WelcomeController < ApplicationController
  def index
    @posts = [
      { title: "My First Blog Post", author: "nk" },
      { title: "Learning Rails is Fun!", author: "nk" },
      { title: "The Way to Rails Journey", author: "Gemini" }
    ]
  end
end
```

#### Step 2: Display the Posts in the View

Now that our controller has prepared the `@posts` data, let's modify the view to display them. Open `app/views/welcome/index.html.erb`.

```html
<h1>Welcome to Your Blog!</h1>

<h2>Our Latest Posts</h2>

<% @posts.each do |post| %>
  <div>
    <h3><%= post[:title] %></h3>
    <p>By <%= post[:author] %></p>
    <hr>
  </div>
<% end %>
```

---

### Lesson 5: The Blueprint

In our last lesson, we created a list of posts, but they were just temporary. To make our data "persistent", we need to store it in a database. In Rails, we do this using **Models** and **Migrations**.

#### Step 1: Generating a Model

Let's use a Rails generator to create our `Post` model. We'll tell the generator that we want our `Post` model to have a `title` (which will be a string) and an `author` (also a string).

```bash
rails generate model Post title:string author:string
```

#### Step 2: Running the Migration

Now that we have our migration file, let's run it to actually create the `posts` table in our database.

```bash
rails db:migrate
```

#### Step 3: Interacting with the Model

Now for the fun part! Let's use the `rails console` to interact with our new `Post` model.

```bash
rails console
```

Now, let's try some commands in the console:

*   **Create a new post:**
    ```ruby
    Post.create(title: "My First Real Post", author: "nk")
    ```
*   **Find all posts:**
    ```ruby
    Post.all
    ```

---

### Lesson 6: The Grand Finale

You've created a `Post` model and a `posts` table in your database to store them. Now, it's time to replace our temporary array of hashes with real data from the database.

#### Step 1: Update the Controller

First, let's update our `WelcomeController` to fetch all the posts from the database instead of using our hard-coded array. Open `app/controllers/welcome_controller.rb`.

```ruby
class WelcomeController < ApplicationController
  def index
    @posts = Post.all
  end
end
```

#### Step 2: Update the View

Now, let's update our view to work with our new `Post` objects. Open `app/views/welcome/index.html.erb`.

```html
<h1>Welcome to Your Blog!</h1>

<h2>Our Latest Posts</h2>

<% @posts.each do |post| %>
  <div>
    <h3><%= post.title %></h3>
    <p>By <%= post.author %></p>
    <hr>
  </div>
<% end %>
```

---

### Lesson 7: The Forge

In web development, we often talk about "CRUD" operations: **C**reate, **R**ead, **U**pdate, and **D**elete. You've already implemented the "Read" part by displaying a list of posts. Now, let's tackle the "Create" part.

#### Step 1: Resourceful Routing

Rails has a powerful feature called "resourceful routing" that makes it easy to set up all the necessary routes for a model. Open `config/routes.rb`.

```ruby
Rails.application.routes.draw do
  root "welcome#index"
  resources :posts
  # ...
end
```

#### Step 2: Generate a Posts Controller

Now, let's generate a new controller to handle our `Post` model.

```bash
rails generate controller Posts
```

#### Step 3: Implement the `new` and `create` Actions

Let's add the `new` and `create` actions to our new `PostsController`. Open `app/controllers/posts_controller.rb`.

```ruby
class PostsController < ApplicationController
  def new
    @post = Post.new
  end

  def create
    @post = Post.new(post_params)

    if @post.save
      redirect_to root_path, notice: "Post was successfully created."
    else
      render :new
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :author)
  end
end
```

#### Step 4: Create the Form View

Now, let's create the view with the form for creating a new post. Create a new file at `app/views/posts/new.html.erb`.

```html
<h1>New Post</h1>

<%= form_with(model: @post, local: true) do |form| %>
  <p>
    <%= form.label :title %><br>
    <%= form.text_field :title %>
  </p>

  <p>
    <%= form.label :author %><br>
    <%= form.text_field :author %>
  </p>

  <p>
    <%= form.submit %>
  </p>
<% end %>
```

#### Step 5: Add a Link to the Form

Finally, let's add a link to our "Welcome" page so we can easily get to the "New Post" form. Open `app/views/welcome/index.html.erb`.

```html
<%= link_to "New Post", new_post_path %>
```

---

### Lesson 8: The Gatekeeper

In the last lesson, you built a form to create new posts. But what happens if someone tries to create a post without a title or an author? This is where **validations** come in.

#### Step 1: Add Validations to the Model

Let's add validations to our `Post` model to ensure that both the `title` and `author` are present. Open `app/models/post.rb`.

```ruby
class Post < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true
end
```

#### Step 2: Display Validation Errors in the Form

Now that we have validations, if a post fails to save, we need to show the user *why* it failed. Open `app/views/posts/new.html.erb`.

```html
<h1>New Post</h1>

<%= form_with(model: @post, local: true) do |form| %>
  <% if @post.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@post.errors.count, "error") %> prohibited this post from being saved:</h2>

      <ul>
        <% @post.errors.full_messages.each do |msg| %>
          <li><%= msg %></li>
        <% end %>
      </ul>
    </div>
  <% end %>

  <p>
    <%= form.label :title %><br>
    <%= form.text_field :title %>
  </p>

  <p>
    <%= form.label :author %><br>
    <%= form.text_field :author %>
  </p>

  <p>
    <%= form.submit %>
  </p>
<% end %>
```

---

### Lesson 9: The Spotlight

You can currently see a list of all your posts on the home page. But what if you want to see more details about a specific post? That's what the "Show" action is for.

#### Step 1: Implement the `show` Action in the Controller

First, we need to tell our `PostsController` how to find and prepare a single post for display. Open `app/controllers/posts_controller.rb`.

```ruby
class PostsController < ApplicationController
  # ...

  def show
    @post = Post.find(params[:id])
  end

  # ...
end
```

#### Step 2: Create the `show` View

Now, let's create the view that will display the details of the single post. Create a new file at `app/views/posts/show.html.erb`.

```html
<h1><%= @post.title %></h1>
<p>By <%= @post.author %></p>

<%= link_to "Back to Posts", root_path %>
```

#### Step 3: Link to Individual Posts from the Index Page

Finally, let's make it easy to navigate to these individual post pages from our home page. Open `app/views/welcome/index.html.erb`.

```html
<h3><%= link_to post.title, post_path(post) %></h3>
```

---

### Lesson 10: The Refinement

You've learned how to create and read posts. Now, let's give yourself the power to change your mind by implementing the "Update" and "Delete" actions.

#### Step 1: The "Update" Action

Add the `edit` and `update` actions to `app/controllers/posts_controller.rb`.

```ruby
class PostsController < ApplicationController
  # ...

  def edit
    @post = Post.find(params[:id])
  end

  def update
    @post = Post.find(params[:id])

    if @post.update(post_params)
      redirect_to @post, notice: "Post was successfully updated."
    else
      render :edit
    end
  end

  # ...
end
```

Create the `edit` view at `app/views/posts/edit.html.erb`.

```html
<h1>Edit Post</h1>

<%= form_with(model: @post, local: true) do |form| %>
  <% if @post.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@post.errors.count, "error") %> prohibited this post from being saved:</h2>

      <ul>
        <% @post.errors.full_messages.each do |msg| %>
          <li><%= msg %></li>
        <% end %>
      </ul>
    </div>
  <% end %>

  <p>
    <%= form.label :title %><br>
    <%= form.text_field :title %>
  </p>

  <p>
    <%= form.label :author %><br>
    <%= form.text_field :author %>
  </p>

  <p>
    <%= form.submit %>
  </p>
<% end %>
```

#### Step 2: The "Delete" Action

Add the `destroy` action to `app/controllers/posts_controller.rb`.

```ruby
class PostsController < ApplicationController
  # ...

  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    redirect_to root_path, notice: "Post was successfully destroyed."
  end

  # ...
end
```

#### Step 3: Add "Edit" and "Delete" Links

Open `app/views/posts/show.html.erb`.

```html
<h1><%= @post.title %></h1>
<p>By <%= @post.author %></p>

<%= link_to "Edit", edit_post_path(@post) %> |
<%= link_to "Delete", post_path(@post), data: { "turbo-method": :delete, "turbo-confirm": "Are you sure?" } %> |
<%= link_to "Back to Posts", root_path %>
```

---

### Lesson 11: The Gatekeeper (User Authentication: Part 1 - User Model and Signup)

User authentication is about verifying who a user is. For our blog, this means allowing people to create accounts with a username and password.

#### Step 1: Generating a User Model

```bash
rails generate model User username:string password_digest:string
```

#### Step 2: Add `has_secure_password`

Open `Gemfile` and add `gem "bcrypt", "~> 3.1.7"`. Then run `bundle install`.

Open `app/models/user.rb`.

```ruby
class User < ApplicationRecord
  has_secure_password
end
```

#### Step 3: Running the Migration

```bash
rails db:migrate
```

#### Step 4: Creating a Users Controller

```bash
rails generate controller Users new create
```

#### Step 5: Updating Routes

Open `config/routes.rb`.

```ruby
Rails.application.routes.draw do
  root "welcome#index"
  resources :posts
  resources :users, only: [:new, :create]
  get 'signup', to: 'users#new'
  # ...
end
```

#### Step 6: Implementing `new` and `create` Actions in `UsersController`

Open `app/controllers/users_controller.rb`.

```ruby
class UsersController < ApplicationController
  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.save
      redirect_to root_path, notice: "Account created successfully!"
    else
      render :new
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :password_confirmation)
  end
end
```

#### Step 7: Creating the Signup Form View

Open `app/views/users/new.html.erb`.

```html
<h1>Sign Up</h1>

<%= form_with(model: @user, local: true, url: signup_path) do |form| %>
  <% if @user.errors.any? %>
    <div id="error_explanation">
      <h2><%= pluralize(@user.errors.count, "error") %> prohibited this user from being saved:</h2>
      <ul>
        <% @user.errors.full_messages.each do |msg| %>
          <li><%= msg %></li>
        <% end %>
      </ul>
    </div>
  <% end %>

  <p>
    <%= form.label :username %><br>
    <%= form.text_field :username %>
  </p>

  <p>
    <%= form.label :password %><br>
    <%= form.password_field :password %>
  </p>

  <p>
    <%= form.label :password_confirmation %><br>
    <%= form.password_field :password_confirmation %>
  </p>

  <p>
    <%= form.submit "Create Account" %>
  </p>
<% end %>
```

---

### Lesson 12: The Gatekeeper (User Authentication: Part 2 - Login and Logout)

When a user logs in, we need a way to "remember" them as they navigate from page to page. We do this by storing their `user_id` in a special `session` object.

#### Step 1: Create a Sessions Controller

```bash
rails generate controller Sessions new create destroy
```

#### Step 2: Update Routes for Login and Logout

Open `config/routes.rb`.

```ruby
Rails.application.routes.draw do
  root "welcome#index"
  resources :posts
  resources :users, only: [:new, :create]
  get 'signup', to: 'users#new'

  get 'login', to: 'sessions#new'
  post 'login', to: 'sessions#create'
  delete 'logout', to: 'sessions#destroy'

  # ...
end
```

#### Step 3: Implement the `new` and `create` Actions

Open `app/controllers/sessions_controller.rb`.

```ruby
class SessionsController < ApplicationController
  def new
  end

  def create
    user = User.find_by(username: params[:session][:username])
    if user && user.authenticate(params[:session][:password])
      session[:user_id] = user.id
      redirect_to root_path, notice: "Logged in successfully!"
    else
      flash.now[:alert] = "Invalid username or password"
      render :new
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_path, notice: "Logged out!"
  end
end
```

#### Step 4: Create the Login Form View

Open `app/views/sessions/new.html.erb`.

```html
<h1>Log In</h1>

<%= form_with(url: login_path, scope: :session, local: true) do |form| %>
  <p>
    <%= form.label :username %><br>
    <%= form.text_field :username %>
  </p>

  <p>
    <%= form.label :password %><br>
    <%= form.password_field :password %>
  </p>

  <p>
    <%= form.submit "Log In" %>
  </p>
<% end %>
```

#### Step 5: Display the Current User

Open `app/controllers/application_controller.rb`.

```ruby
class ApplicationController < ActionController::Base
  helper_method :current_user, :logged_in?

  def current_user
    @current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
  end

  def logged_in?
    !!current_user
  end
end
```

#### Step 6: Update the Layout

Open `app/views/layouts/application.html.erb` and add this before `<%= yield %>`.

```html
<div class="login-status">
  <% if logged_in? %>
    Logged in as <%= current_user.username %> |
    <%= link_to "Log Out", logout_path, data: { "turbo-method": :delete } %>
  <% else %>
    <%= link_to "Log In", login_path %> |
    <%= link_to "Sign Up", signup_path %>
  <% end %>
</div>
<hr>
```

---

### Lesson 13: The VIP Lounge (Authorization)

Authorization is about restricting access to certain parts of your application.

#### Step 1: Restrict Access in the `PostsController`

Open `app/controllers/application_controller.rb`.

```ruby
class ApplicationController < ActionController::Base
  # ...

  def require_user
    if !logged_in?
      flash[:alert] = "You must be logged in to perform that action."
      redirect_to login_path
    end
  end
end
```

Open `app/controllers/posts_controller.rb`.

```ruby
class PostsController < ApplicationController
  before_action :require_user, except: [:show]

  # ...
end
```

#### Step 2: Hide Links in the Views

Open `app/views/welcome/index.html.erb`.

```html
<% if logged_in? %>
  <%= link_to "New Post", new_post_path %>
<% end %>
```

Open `app/views/posts/show.html.erb`.

```html
<% if logged_in? %>
  <%= link_to "Edit", edit_post_path(@post) %> |
  <%= link_to "Delete", post_path(@post), data: { "turbo-method": :delete, "turbo-confirm": "Are you sure?" } %> |
<% end %>
```

#### Step 3: Associate Posts with Users

```bash
rails generate migration AddUserIdToPosts user:references
rails db:migrate
```

Open `app/models/user.rb`.

```ruby
class User < ApplicationRecord
  has_secure_password
  has_many :posts
end
```

Open `app/models/post.rb`.

```ruby
class Post < ApplicationRecord
  validates :title, presence: true
  belongs_to :user
end
```

#### Step 4: Update the `create` Action and Views

Open `app/controllers/posts_controller.rb`.

```ruby
def create
  @post = Post.new(post_params)
  @post.user = current_user
  if @post.save
    redirect_to root_path, notice: "Post was successfully created."
  else
    render :new
  end
end
```

Remove the `author` field from `app/views/posts/new.html.erb` and `app/views/posts/edit.html.erb`.

Change `<%= post.author %>` to `<%= post.user.username %>` in `app/views/welcome/index.html.erb` and `app/views/posts/show.html.erb`.
