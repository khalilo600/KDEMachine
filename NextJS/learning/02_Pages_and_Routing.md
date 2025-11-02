# Pages and Routing in Next.js

Next.js has a file-system based router. This means that the routes in your application are determined by the structure of your `pages` directory.

## The `pages` Directory

When a file is added to the `pages` directory, it's automatically available as a route.

*   `pages/index.js` is mapped to `/`
*   `pages/about.js` is mapped to `/about`
*   `pages/posts/first-post.js` is mapped to `/posts/first-post`

## Dynamic Routes

Next.js also supports dynamic routes. To create a dynamic route, you can use brackets in the file name.

For example, if you create a file called `pages/posts/[id].js`, you can access the `id` parameter in your component using the `useRouter` hook.

**pages/posts/[id].js:**
```jsx
import { useRouter } from 'next/router';

function Post() {
  const router = useRouter();
  const { id } = router.query;

  return <p>Post: {id}</p>;
}

export default Post;
```

Now, if you navigate to `/posts/1`, the `id` parameter will be `1`.

### Catch-all Routes

You can also create a catch-all route by adding three dots inside the brackets.

For example, `pages/posts/[...slug].js` will match `/posts/a`, `/posts/a/b`, `/posts/a/b/c`, and so on.

## Linking Between Pages

To link between pages, you can use the `<Link>` component from `next/link`.

```jsx
import Link from 'next/link';

function Home() {
  return (
    <ul>
      <li>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li>
        <Link href="/about">
          <a>About Us</a>
        </Link>
      </li>
      <li>
        <Link href="/posts/1">
          <a>First Post</a>
        </Link>
      </li>
    </ul>
  );
}

export default Home;
```

The `<Link>` component will automatically prefetch the page in the background, which makes navigation feel instant.

## The `useRouter` Hook

The `useRouter` hook allows you to access the `router` object in your component. The `router` object contains information about the current route, such as the `pathname`, `query`, and `asPath`.

```jsx
import { useRouter } from 'next/router';

function ActiveLink({ children, href }) {
  const router = useRouter();
  const style = {
    marginRight: 10,
    color: router.asPath === href ? 'red' : 'black',
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
}
```

## Programmatic Navigation

You can also navigate programmatically using the `router.push()` method.

```jsx
import { useRouter } from 'next/router';

function MyButton() {
  const router = useRouter();

  function handleClick() {
    router.push('/about');
  }

  return (
    <button onClick={handleClick}>
      Go to About page
    </button>
  );
}
```

Routing is a fundamental part of any web application. By understanding how routing works in Next.js, you can create complex and user-friendly navigation experiences.
