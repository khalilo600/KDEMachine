# React Router

React Router is a popular library for adding routing to a React application. It allows you to create a single-page application with navigation that mimics the behavior of a traditional multi-page application.

## Installation

To install React Router, you can use npm or yarn:

```bash
npm install react-router-dom
```

## The Core Components

React Router has three core components:

*   `<BrowserRouter>`: The main router component. It should be at the root of your application.
*   `<Route>`: The component that defines a route. It takes a `path` prop and a `component` prop.
*   `<Link>`: The component that creates a link to a route.

### Example

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about/">About</Link>
            </li>
          </ul>
        </nav>

        <Route path="/" exact component={Home} />
        <Route path="/about/" component={About} />
      </div>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```

In this example, we have two routes: `/` and `/about/`. When the user clicks on one of the links, the corresponding component will be rendered.

## URL Parameters

React Router allows you to pass parameters in the URL. You can define a URL parameter by prefixing it with a colon in the `path` prop of the `<Route>` component.

```jsx
<Route path="/users/:id" component={User} />
```

In the `User` component, you can access the `id` parameter using the `match` prop.

```jsx
function User({ match }) {
  return <h2>User ID: {match.params.id}</h2>;
}
```

## The `Switch` Component

The `<Switch>` component is used to render only the first `<Route>` that matches the current location. This is useful for rendering a 404 page.

```jsx
import { Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}
```

## The `Redirect` Component

The `<Redirect>` component is used to redirect the user to a different route.

```jsx
import { Redirect } from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
}
```

## Hooks

React Router also provides a number of hooks that you can use in your functional components.

*   `useHistory`: Gives you access to the `history` object.
*   `useLocation`: Gives you access to the `location` object.
*   `useParams`: Gives you access to the URL parameters.
*   `useRouteMatch`: Gives you access to the `match` object.

React Router is a powerful and flexible library that is essential for building single-page applications with React. By mastering the concepts of React Router, you can create complex and user-friendly navigation experiences.
