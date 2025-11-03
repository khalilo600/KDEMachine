
# Phase 3: Checkout & Orders

This is where your bookstore application starts to feel like a real e-commerce site. The checkout process is a critical part of any online store.

## Key Concepts

### 1. Order and OrderItem Models

To store order information, you'll need to create new models.

*   **`Order` model:** This model will store information about the order, such as the user who placed the order, the shipping address, and the total price.
*   **`OrderItem` model:** This model will store information about the items in the order, such as the book and the quantity.

### 2. Transactional Integrity

A transaction is a sequence of operations performed as a single logical unit of work. When processing an order, you want to make sure that all the database operations are successful. If one operation fails, you want to roll back all the previous operations.

*   Django provides a `transaction.atomic()` decorator that you can use to wrap a view in a database transaction.

## Bookstore Features to Implement

*   **Implement a Checkout Process:**
    1.  Create a form to collect the user's shipping details.
    2.  Create a view to handle the checkout process. This view will:
        *   Create a new `Order` object.
        *   Create `OrderItem` objects for each item in the cart.
        *   Clear the shopping cart.
*   **Order History for users:**
    1.  Create a view to display a list of the user's past orders.
    2.  Create a template to display the order history.
