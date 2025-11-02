# Styling in Next.js

Next.js provides a number of different ways to style your application. The best way to style your application depends on the specific needs of your project.

## Global CSS

To add a global stylesheet to your application, you can import it into the `pages/_app.js` file.

**styles.css:**
```css
body {
  font-family: sans-serif;
}
```

**pages/_app.js:**
```jsx
import '../styles.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

This stylesheet will be applied to all pages in your application.

## Component-Level CSS

Next.js also supports component-level CSS using CSS Modules. A CSS Module is a CSS file in which all class names and animation names are scoped locally by default.

To use CSS Modules, you need to create a file with the `.module.css` extension.

**Button.module.css:**
```css
.error {
  color: white;
  background-color: red;
}
```

**Button.js:**
```jsx
import styles from './Button.module.css';

export function Button() {
  return (
    <button
      type="button"
      // Note how the error class is accessed as a property on the imported styles object.
      className={styles.error}
    >
      Error
    </button>
  );
}
```

## Sass/SCSS

Next.js has built-in support for Sass and SCSS. To use Sass, you first need to install the `sass` package:

```bash
npm install sass
```

Then, you can import `.scss` or `.sass` files into your components.

## CSS-in-JS

CSS-in-JS is a popular way to style React applications. It allows you to write CSS in your JavaScript files, which can make it easier to create dynamic and reusable styles.

There are a number of different CSS-in-JS libraries available, such as styled-components and Emotion.

### styled-components

To use styled-components, you first need to install it:

```bash
npm install styled-components
```

Then, you can create a styled component by using the `styled` function.

```jsx
import styled from 'styled-components';

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

function MyComponent() {
  return <Title>Hello World</Title>;
}
```

## Tailwind CSS

Tailwind CSS is a utility-first CSS framework that has become very popular in recent years. It provides a set of low-level utility classes that you can use to build your UI.

To use Tailwind CSS, you first need to install it and configure it with PostCSS.

```bash
npm install tailwindcss postcss autoprefixer
```

Then, you can create a `tailwind.config.js` file and a `postcss.config.js` file.

Finally, you can import the Tailwind CSS utilities into your global stylesheet.

**styles.css:**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Now, you can use the Tailwind CSS utility classes in your components.

```jsx
<div className="bg-blue-500 text-white p-4">
  Hello, world!
</div>
```

Styling is an important part of any web application. By understanding the different styling options available in Next.js, you can create beautiful and maintainable UIs.
