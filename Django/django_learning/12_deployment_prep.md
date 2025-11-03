
# Phase 3: Deployment Prep

Deployment is the process of making your web application available to the public. Before you deploy your application, there are a few things you need to do to prepare it for a production environment.

## Key Concepts

### 1. Managing Static and Media Files

*   **Static files:** These are the CSS, JavaScript, and image files that are part of your application.
*   **Media files:** These are the files that are uploaded by users, such as the book cover images.

In a production environment, you don't want to serve static and media files with Django. Instead, you should use a dedicated web server like Nginx or a cloud storage service like Amazon S3.

*   **WhiteNoise:** A library that simplifies the process of serving static files in production.
*   **Amazon S3:** A cloud storage service that can be used to store and serve static and media files.

### 2. Security

Security is a crucial aspect of web development. Django provides several security features out of the box.

*   **CSRF (Cross-Site Request Forgery):** Django has built-in protection against CSRF attacks.
*   **XSS (Cross-Site Scripting):** Django's template language protects you against most XSS attacks.

## Bookstore Features to Implement

*   **Configure for production-ready deployment:**
    1.  Set `DEBUG` to `False` in your `settings.py`.
    2.  Configure a production-ready database (e.g., PostgreSQL).
    3.  Set up a service to serve your static and media files (e.g., WhiteNoise or Amazon S3).
    4.  Choose a hosting provider (e.g., Heroku, AWS, or DigitalOcean) and deploy your application.
