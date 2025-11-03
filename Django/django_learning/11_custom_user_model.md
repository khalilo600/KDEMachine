
# Phase 3: Custom User Model

In some cases, the built-in `User` model may not be sufficient for your needs. Django allows you to extend the default `User` model or even replace it with your own custom user model.

## Key Concepts

### 1. Extending the Default `User` Model

If you only need to add a few extra fields to the `User` model, you can extend it using a one-to-one relationship.

*   Create a new model (e.g., `Profile`).
*   Add a `OneToOneField` to the `User` model.

### 2. Custom `User` Model

If you need more control over the `User` model, you can create your own custom user model.

*   Create a new model that inherits from `AbstractBaseUser` or `AbstractUser`.
*   Set the `AUTH_USER_MODEL` setting in your `settings.py` to point to your custom user model.

**Important:** It's highly recommended to set up a custom user model at the beginning of your project.

## Bookstore Features to Implement

*   **Custom `User` model to link to orders and addresses:**
    1.  Decide whether to extend the default `User` model or create a custom one.
    2.  If you create a custom user model, make sure to do it at the beginning of your project.
    3.  Add fields for shipping address to your custom user model or profile model.
    4.  Link the `Order` model to your custom user model.
