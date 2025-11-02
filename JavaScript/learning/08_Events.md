# JavaScript Events

Events are actions that happen in the browser, such as a user clicking a button, a page finishing loading, or a form being submitted. JavaScript can "listen" for these events and execute code in response.

## Event Handling

Event handling is the process of responding to events. There are several ways to handle events in JavaScript.

### Inline Event Handlers

You can use inline event handlers to attach an event to an element directly in the HTML.

```html
<button onclick="alert('Button clicked!')">Click me</button>
```

While this approach is simple, it is generally not recommended because it mixes HTML and JavaScript, which can make the code harder to read and maintain.

### Event Handler Properties

You can also assign an event handler to an element using its event handler property.

```javascript
const myButton = document.getElementById("my-button");

myButton.onclick = function() {
  alert("Button clicked!");
};
```

This is a better approach than inline event handlers, but it has the limitation that you can only assign one event handler per event.

### Event Listeners

The recommended way to handle events is with event listeners. Event listeners allow you to attach multiple event handlers to an element for the same event.

The `addEventListener()` method takes two arguments: the name of the event, and the function to be executed when the event occurs.

```javascript
const myButton = document.getElementById("my-button");

myButton.addEventListener("click", function() {
  alert("Button clicked!");
});
```

You can also remove an event listener using the `removeEventListener()` method.

## Common Events

There are many different types of events that you can listen for. Here are some of the most common ones:

### Mouse Events

*   `click`: The user clicks on an element.
*   `dblclick`: The user double-clicks on an element.
*   `mouseover`: The mouse pointer moves onto an element.
*   `mouseout`: The mouse pointer moves out of an element.
*   `mousedown`: The user presses a mouse button over an element.
*   `mouseup`: The user releases a mouse button over an element.

### Keyboard Events

*   `keydown`: The user presses a key.
*   `keyup`: The user releases a key.
*   `keypress`: The user presses and holds a key.

### Form Events

*   `submit`: The user submits a form.
*   `change`: The value of an input element changes.
*   `focus`: An element gets focus.
*   `blur`: An element loses focus.

### Window/Document Events

*   `load`: The page finishes loading.
*   `unload`: The page is being unloaded.
*   `resize`: The browser window is resized.
*   `scroll`: The user scrolls the page.

## The Event Object

When an event occurs, the browser creates an event object and passes it to the event handler function. The event object contains information about the event, such as the type of event, the element that triggered the event, and the position of the mouse pointer.

```javascript
myButton.addEventListener("click", function(event) {
  console.log(event.type); // "click"
  console.log(event.target); // the button element
});
```

## Event Bubbling and Capturing

Event bubbling and capturing are two different models for how events propagate through the DOM tree.

*   **Event Bubbling:** The event is first captured and handled by the innermost element and then propagated to outer elements.
*   **Event Capturing:** The event is first captured by the outermost element and then propagated to inner elements.

By default, all events bubble. You can use the `useCapture` argument of the `addEventListener()` method to specify whether to use event capturing or bubbling.

Events are a fundamental part of web development. By understanding how to use events effectively, you can create dynamic and interactive web pages that respond to user input.
