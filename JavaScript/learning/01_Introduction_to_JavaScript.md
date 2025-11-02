# Introduction to JavaScript

JavaScript is a high-level, interpreted programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS. It is used to make web pages interactive and dynamic.

## What is JavaScript?

*   JavaScript is a scripting language for web pages.
*   JavaScript can update and change both HTML and CSS.
*   JavaScript can calculate, manipulate and validate data.
*   JavaScript can be used to create dynamic and interactive web content.

## Why Use JavaScript?

JavaScript is a versatile and powerful language that can be used for a wide variety of purposes.

*   **Interactivity:** JavaScript can be used to create interactive elements on a web page, such as dropdown menus, image sliders, and form validation.
*   **Dynamic Content:** JavaScript can be used to update the content of a web page without having to reload the page. This is known as AJAX (Asynchronous JavaScript and XML).
*   **Web Applications:** JavaScript can be used to create full-fledged web applications, such as online games, social media platforms, and e-commerce sites.
*   **Mobile Apps:** With the help of frameworks like React Native and NativeScript, you can use JavaScript to create native mobile apps for iOS and Android.
*   **Server-Side Development:** With Node.js, you can use JavaScript to write server-side code and build back-end services.

## How to Add JavaScript to an HTML Page

There are two ways to add JavaScript to an HTML page:

1.  **Internal JavaScript:** By using a `<script>` tag in the `<head>` or `<body>` section of the HTML page.
2.  **External JavaScript:** By linking to an external JavaScript file using a `<script>` tag.

### Internal JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Page</title>
</head>
<body>

  <h1>My First JavaScript</h1>

  <button type="button"
  onclick="document.getElementById('demo').innerHTML = Date()">
  Click me to display Date and Time.</button>

  <p id="demo"></p>

  <script>
    // JavaScript code goes here
  </script>

</body>
</html>
```

### External JavaScript

**myScript.js:**
```javascript
function myFunction() {
  document.getElementById("demo").innerHTML = "Paragraph changed.";
}
```

**index.html:**
```html
<!DOCTYPE html>
<html>
<body>

<h2>Demo External JavaScript</h2>

<p id="demo">A Paragraph</p>

<button type="button" onclick="myFunction()">Try it</button>

<script src="myScript.js"></script>

</body>
</html>
```

Using an external JavaScript file is the most common and recommended way to use JavaScript. It helps to keep your HTML and JavaScript code separate, which makes it easier to read and maintain.

## The JavaScript Console

The JavaScript console is a tool that is built into all modern web browsers. It allows you to write and test JavaScript code, and it is an essential tool for debugging.

To open the console in most browsers, you can press `F12` or `Ctrl+Shift+I` (`Cmd+Option+I` on Mac).

JavaScript is a fundamental language for web development, and it is a great starting point for anyone who wants to learn how to code. By mastering the basics of JavaScript, you will be able to create a wide variety of dynamic and interactive web experiences.
