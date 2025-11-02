# Middleware in Next.js

Middleware allows you to run code before a request is completed. This is useful for a variety of purposes, such as authentication, A/B testing, and internationalization.

In Next.js, you can use middleware to modify the response to a request by rewriting, redirecting, adding headers, or even streaming HTML.

## Creating Middleware

To create middleware, you need to create a `_middleware.js` file in your `pages` directory. This middleware will be applied to all pages in the `pages` directory and its subdirectories.

**pages/_middleware.js:**
```javascript
import { NextResponse } from 'next/server';

export function middleware(req, ev) {
  // You can modify the response here
  return new Response('Hello, world!');
}
```

## How Middleware Works

Middleware is executed before the page is rendered. It can be used to:

*   **Rewrite the URL:** You can use middleware to rewrite the URL of a request. This is useful for creating clean URLs or for A/B testing.
*   **Redirect the user:** You can use middleware to redirect the user to a different page. This is useful for authentication or for handling legacy URLs.
*   **Add headers:** You can use middleware to add headers to the response. This is useful for setting cookies or for adding security headers.
*   **Stream HTML:** You can use middleware to stream HTML to the client. This is useful for creating a fast and responsive user experience.

## The `NextRequest` and `NextResponse` Objects

Middleware receives two arguments: `req` and `ev`.

*   `req`: An instance of `NextRequest`, which is an extension of the standard `Request` object. It provides a number of useful methods and properties, such as `req.nextUrl`, `req.ip`, and `req.geo`.
*   `ev`: An instance of `NextFetchEvent`, which can be used to extend the lifetime of the middleware.

Middleware can return an instance of `NextResponse`, which is an extension of the standard `Response` object. It provides a number of useful methods, such as `NextResponse.redirect()` and `NextResponse.rewrite()`.

## Example: Authentication

Here is an example of how to use middleware to implement authentication:

```javascript
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { cookies } = req;
  const url = req.nextUrl.clone();

  if (url.pathname.includes('/dashboard')) {
    if (!cookies.token) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}
```

In this example, the middleware checks if the user is trying to access a page in the `/dashboard` directory. If the user is not authenticated (i.e., they do not have a `token` cookie), they will be redirected to the `/login` page.

## Example: A/B Testing

Here is an example of how to use middleware to implement A/B testing:

```javascript
import { NextResponse } from 'next/server';

export function middleware(req) {
  const { cookies } = req;
  const url = req.nextUrl.clone();

  if (url.pathname === '/') {
    if (cookies.bucket === 'a') {
      url.pathname = '/a';
      return NextResponse.rewrite(url);
    } else if (cookies.bucket === 'b') {
      url.pathname = '/b';
      return NextResponse.rewrite(url);
    }
  }

  return NextResponse.next();
}
```

In this example, the middleware checks for a `bucket` cookie. If the cookie is set to `a`, the user will be shown the `/a` page. If the cookie is set to `b`, the user will be shown the `/b` page.

Middleware is a powerful and flexible feature in Next.js. By using middleware, you can add a wide variety of functionality to your application without having to modify your pages.
