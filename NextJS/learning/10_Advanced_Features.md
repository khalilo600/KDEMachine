# Advanced Features in Next.js

Next.js provides a number of advanced features that you can use to build more complex and powerful applications.

## Custom `_app.js`

The `pages/_app.js` file allows you to override the default `App` component that Next.js uses to initialize pages. This is useful for a variety of purposes, such as:

*   **Persisting layout between page changes:** You can use a custom `_app.js` to create a layout that is shared across all pages.
*   **Keeping state when navigating pages:** You can use a custom `_app.js` to store state that should be preserved when navigating between pages.
*   **Injecting additional data into pages:** You can use a custom `_app.js` to inject additional data into your pages.
*   **Adding global CSS:** You can use a custom `_app.js` to add a global stylesheet to your application.

**pages/_app.js:**
```jsx
function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
```

## Custom `_document.js`

The `pages/_document.js` file allows you to override the default `Document` component that Next.js uses to render the `<html>`, `<head>`, and `<body>` tags. This is useful for:

*   **Customizing the `<html>` and `<body>` tags:** You can use a custom `_document.js` to add custom attributes to the `<html>` and `<body>` tags.
*   **Adding custom `<head>` tags:** You can use a custom `_document.js` to add custom `<head>` tags, such as meta tags and link tags.

**pages/_document.js:**
```jsx
import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
```

## Custom Error Pages

Next.js provides a default error page for handling 404 and 500 errors. You can create a custom error page by creating a `pages/404.js` or `pages/500.js` file.

**pages/404.js:**
```jsx
function Custom404() {
  return <h1>404 - Page Not Found</h1>;
}

export default Custom404;
```

## Internationalization (i18n)

Next.js has built-in support for internationalization (i18n). To enable i18n, you need to add an `i18n` config to your `next.config.js` file.

**next.config.js:**
```javascript
module.exports = {
  i18n: {
    locales: ['en-US', 'fr', 'nl-NL'],
    defaultLocale: 'en-US',
  },
};
```

Next.js will then automatically handle the routing for the different locales.

## AMP Support

Next.js has built-in support for Accelerated Mobile Pages (AMP). To enable AMP, you can add `amp: true` to the config of a page.

```jsx
export const config = {
  amp: true,
};

function MyAmpPage() {
  return <h3>My AMP Page</h3>;
}

export default MyAmpPage;
```

## Environment Variables

Next.js has built-in support for environment variables. You can create a `.env.local` file in the root of your project to store your environment variables.

**.env.local:**
```
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```

Next.js will automatically load the environment variables from this file.

Next.js is a powerful and flexible framework that provides a wide range of advanced features. By mastering these features, you can build complex and sophisticated applications with ease.
