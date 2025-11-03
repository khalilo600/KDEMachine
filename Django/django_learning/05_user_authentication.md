
# Phase 2: User Authentication

User authentication is a crucial part of most web applications. Django provides a robust and secure authentication system out of the box.

## Key Concepts

### 1. Built-in Django Auth

Django comes with a built-in user authentication system. It handles user accounts, groups, permissions and cookie-based user sessions.

*   **`User` model:** Django has a built-in `User` model that can be used to store user information.
*   **Authentication Views:** Django provides views for common authentication tasks like login, logout, and password management.

### 2. User Registration

While Django provides views for login and logout, it doesn't come with a built-in view for user registration. You'll need to create your own registration view.

*   Create a form for user registration.
*   Create a view to handle the form submission and create a new user.

## Bookstore Features to Implement

*   **User login and registration pages:**
    1.  Create a registration page with a form for users to sign up.
    2.  Create a login page for users to log in.
    3.  Create a logout view.
*   **Restrict 'add/edit' views to logged-in users or staff:**
    *   Use the `@login_required` decorator to restrict access to certain views to logged-in users.
    *   Use the `@user_passes_test` decorator to restrict access to staff members.
