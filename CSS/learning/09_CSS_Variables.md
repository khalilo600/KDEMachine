# CSS Variables (Custom Properties)

CSS variables, also known as custom properties, are a powerful feature in CSS that allow you to store and reuse values in your stylesheets. They can make your code more readable, maintainable, and flexible.

## Declaring and Using CSS Variables

To declare a CSS variable, you need to define it within a selector. A common practice is to declare global variables on the `:root` pseudo-class, so that they can be accessed by all other elements on the page.

Variable names must start with two dashes (`--`).

```css
:root {
  --main-color: #06c;
  --accent-color: #f06;
  --base-font-size: 16px;
}
```

To use a variable, you use the `var()` function.

```css
.my-element {
  color: var(--main-color);
  font-size: var(--base-font-size);
}
```

## The Benefits of Using CSS Variables

*   **Readability:** By giving a meaningful name to a value, you can make your code more self-documenting and easier to understand.
*   **Maintainability:** If you need to change a value that is used in multiple places, you only need to change it in one place. This can save you a lot of time and effort.
*   **Flexibility:** You can change the value of a CSS variable with JavaScript, which allows you to create dynamic and interactive themes.

## Local Variables

You can also declare variables that are local to a specific element. These variables will only be accessible within that element and its descendants.

```css
.my-element {
  --local-color: #f00;
  color: var(--local-color);
}
```

## Fallback Values

The `var()` function accepts a second parameter, which is a fallback value. The fallback value will be used if the variable is not defined.

```css
.my-element {
  color: var(--undefined-variable, #000); /* This will be black */
}
```

## Use Cases for CSS Variables

*   **Theming:** CSS variables are great for creating themes. You can define a set of variables for each theme, and then switch between them by changing the values of the variables.
*   **Responsive Design:** You can use CSS variables to change the layout of your page at different breakpoints.
*   **Component Libraries:** CSS variables can be used to create a consistent and customizable component library.

## Example of Theming with CSS Variables

```css
/* Default theme (light) */
:root {
  --background-color: #fff;
  --text-color: #333;
}

/* Dark theme */
.dark-theme {
  --background-color: #333;
  --text-color: #fff;
}

body {
  background-color: var(--background-color);
  color: var(--text-color);
}
```

To switch to the dark theme, you would simply add the `dark-theme` class to the `<body>` element.

CSS variables are a powerful and flexible feature that can greatly improve your CSS workflow. By using them effectively, you can write more maintainable, readable, and dynamic stylesheets.
