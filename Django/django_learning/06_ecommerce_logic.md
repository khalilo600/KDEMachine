
# Phase 2: E-commerce Logic

Now it's time to add the core e-commerce functionality to your bookstore application. This involves implementing a shopping cart.

## Key Concepts

### 1. Sessions and Cookies

*   **Cookies:** A cookie is a small piece of data that is stored on the user's computer by the web browser. Cookies are used to store information about the user, such as their session ID.
*   **Sessions:** A session is a way of storing data on the server for a particular user. Django uses a session ID stored in a cookie to identify the user's session.

### 2. Shopping Cart

A shopping cart is a temporary storage for the items that a user wants to buy.

*   **In-memory cart:** For simple applications, you can store the shopping cart in the user's session.
*   **Database-backed cart:** For more complex applications, you can create a `Cart` model and store the shopping cart in the database.

## Bookstore Features to Implement

*   **`Cart` Model/logic:**
    *   Decide whether to use a session-based cart or a database-backed cart.
    *   If you choose a database-backed cart, create a `Cart` model and a `CartItem` model.
*   **Add to Cart functionality:**
    1.  Create a view to handle adding items to the cart.
    2.  Add an "Add to Cart" button to the book detail page.
    3.  When the user clicks the button, the item should be added to their shopping cart.
