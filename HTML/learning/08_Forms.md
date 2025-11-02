# HTML Forms

HTML forms are used to collect user input. The input is most often sent to a server for processing.

## The `<form>` Element

An HTML form is defined with the `<form>` tag. It is a container for different types of input elements, such as text fields, checkboxes, radio buttons, submit buttons, etc.

```html
<form action="/submit-form" method="post">
  <!-- Form elements go here -->
</form>
```

### The `action` and `method` Attributes

*   The `action` attribute specifies the URL where the form data should be sent when the form is submitted.
*   The `method` attribute specifies the HTTP method to be used when submitting the form data. The two most common methods are `GET` and `POST`.
    *   `GET`: Appends the form data to the URL in name/value pairs. It is not suitable for sensitive data.
    *   `POST`: Sends the form data as an HTTP post transaction. It is more secure than `GET` because the data is not visible in the URL.

## Form Input Elements

The `<input>` element is the most used form element. It can be displayed in many ways, depending on the `type` attribute.

### Common Input Types

*   `<input type="text">`: A single-line text input field.
*   `<input type="password">`: A password field (the characters are masked).
*   `<input type="submit">`: A submit button for submitting the form.
*   `<input type="radio">`: A radio button (for selecting one of many choices).
*   `<input type="checkbox">`: A checkbox (for selecting zero or more of many choices).
*   `<input type="button">`: A clickable button.
*   `<input type="file">`: A file-select field and a "Browse" button for file uploads.

### The `<label>` Element

The `<label>` element defines a label for an `<input>` element. It is a good practice to use labels with form controls, as it makes the form more accessible.

```html
<label for="username">Username:</label>
<input type="text" id="username" name="username">
```

## Other Form Elements

*   `<textarea>`: A multi-line text input control.
*   `<select>`: A drop-down list.
*   `<option>`: An option in a drop-down list.
*   `<button>`: A clickable button.

### Example of a Simple Form

```html
<form action="/login" method="post">
  <div>
    <label for="username">Username:</label>
    <input type="text" id="username" name="username">
  </div>
  <div>
    <label for="password">Password:</label>
    <input type="password" id="password" name="password">
  </div>
  <div>
    <input type="submit" value="Login">
  </div>
</form>
```

## Input Attributes

There are many attributes you can use with the `<input>` element to control its behavior and validation.

*   `name`: Specifies the name of the input, which is sent to the server.
*   `value`: Specifies the initial value of the input.
*   `placeholder`: Provides a hint to the user of what can be entered in the input.
*   `required`: Specifies that the input field must be filled out before submitting the form.
*   `readonly`: Specifies that the input field is read-only.
*   `disabled`: Specifies that the input field should be disabled.
