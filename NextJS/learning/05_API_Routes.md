# API Routes in Next.js

API routes provide a way to create a serverless API for your Next.js application. Any file inside the `pages/api` directory is mapped to `/api/*` and will be treated as an API endpoint instead of a page.

## Creating an API Route

To create an API route, you need to create a file in the `pages/api` directory. The file must export a default function that takes two arguments: `req` and `res`.

*   `req`: An instance of `http.IncomingMessage`, plus some pre-built middlewares.
*   `res`: An instance of `http.ServerResponse`, plus some helper functions.

**pages/api/hello.js:**
```javascript
export default function handler(req, res) {
  res.status(200).json({ text: 'Hello' });
}
```

This will create an API endpoint at `/api/hello` that returns a JSON object with the text "Hello".

## Dynamic API Routes

API routes can also be dynamic. To create a dynamic API route, you can use brackets in the file name.

**pages/api/posts/[id].js:**
```javascript
export default function handler(req, res) {
  const { id } = req.query;
  res.end(`Post: ${id}`);
}
```

This will create an API endpoint that can be accessed at `/api/posts/1`, `/api/posts/2`, and so on.

## Handling Different HTTP Methods

You can handle different HTTP methods in your API routes by using the `req.method` property.

```javascript
export default function handler(req, res) {
  if (req.method === 'POST') {
    // Process a POST request
  } else {
    // Handle any other HTTP method
  }
}
```

## Middleware

Next.js provides a number of pre-built middlewares that you can use in your API routes.

*   `req.cookies`: An object containing the cookies sent by the request.
*   `req.query`: An object containing the query string.
*   `req.body`: An object containing the body of the request, parsed by `content-type`.

## Use Cases for API Routes

*   **Building a REST API:** You can use API routes to build a full-fledged REST API for your application.
*   **Handling Form Submissions:** You can use API routes to handle form submissions and save the data to a database.
*   **Implementing Authentication:** You can use API routes to implement authentication and authorization for your application.
*   **Connecting to a Database:** You can use API routes to connect to a database and perform CRUD operations.

## Example: Connecting to a Database

Here is an example of how to connect to a MongoDB database in an API route:

```javascript
import { connectToDatabase } from '../../util/mongodb';

export default async function handler(req, res) {
  const { db } = await connectToDatabase();

  const data = await db.collection('my-collection').find().toArray();

  res.status(200).json(data);
}
```

API routes are a powerful and flexible feature in Next.js. By using API routes, you can build a full-stack application with a single codebase.
