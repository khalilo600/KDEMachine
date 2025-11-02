# Data Fetching in Next.js

Next.js provides a number of different ways to fetch data. The best way to fetch data depends on the specific needs of your application.

## Server-Side Rendering (SSR)

Server-side rendering (SSR) is the process of rendering a page on the server and sending the fully rendered HTML to the client. This can improve performance and SEO.

To use SSR, you need to export an `async` function called `getServerSideProps` from your page. This function will be called on the server at request time.

```jsx
export async function getServerSideProps(context) {
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

function Page({ data }) {
  // Render data...
}

export default Page;
```

## Static Site Generation (SSG)

Static site generation (SSG) is the process of rendering a page at build time. This is even faster than SSR, and it is a great option for pages that do not have dynamic content.

To use SSG, you need to export an `async` function called `getStaticProps` from your page. This function will be called at build time.

```jsx
export async function getStaticProps(context) {
  const res = await fetch(`https://.../data`);
  const data = await res.json();

  return {
    props: { data }, // will be passed to the page component as props
  };
}

function Page({ data }) {
  // Render data...
}

export default Page;
```

### `getStaticPaths`

If you have a dynamic route with `getStaticProps`, you need to define a list of paths that have to be rendered to HTML at build time.

To do this, you need to export an `async` function called `getStaticPaths` from your page.

```jsx
export async function getStaticPaths() {
  const res = await fetch('https://.../posts');
  const posts = await res.json();

  const paths = posts.map((post) => ({
    params: { id: post.id },
  }));

  return { paths, fallback: false };
}
```

## Incremental Static Regeneration (ISR)

Incremental Static Regeneration (ISR) allows you to update your static pages after they have been built. This is useful for pages that have content that changes frequently.

To use ISR, you need to add a `revalidate` prop to the object returned by `getStaticProps`.

```jsx
export async function getStaticProps() {
  const res = await fetch('https://.../data');
  const data = await res.json();

  return {
    props: {
      data,
    },
    revalidate: 10, // In seconds
  };
}
```

This will cause the page to be re-generated at most once every 10 seconds.

## Client-Side Data Fetching

You can also fetch data on the client-side using a library like SWR or React Query. This is a good option for data that is specific to a user, or for data that changes very frequently.

### SWR

SWR is a React Hooks library for data fetching. It provides a number of features out of the box, including caching, revalidation, and focus tracking.

```jsx
import useSWR from 'swr';

const fetcher = (url) => fetch(url).then((res) => res.json());

function Profile() {
  const { data, error } = useSWR('/api/user', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <div>Hello {data.name}!</div>;
}
```

Data fetching is a fundamental part of any web application. By understanding the different data fetching strategies available in Next.js, you can create fast, scalable, and SEO-friendly applications.
