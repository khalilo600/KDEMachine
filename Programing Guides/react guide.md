# React Guide: Comprehensive Learning Outline

This guide provides a structured overview of React, a popular JavaScript library for building user interfaces. It covers fundamental concepts, component lifecycle, hooks, advanced patterns, state management, routing, styling, data fetching, testing, and performance optimization.

---

## I. Getting Started and Core Concepts

### A. What is React?

React is a free and open-source front-end JavaScript library for building user interfaces based on UI components. It is maintained by Meta and a community of individual developers and companies.

*   **Declarative:** React makes it easier to create interactive UIs. You describe how your UI should look, and React handles updating the DOM efficiently.
*   **Component-Based:** React applications are built from small, isolated, and reusable pieces of code called components.
*   **Learn Once, Write Anywhere:** You can develop new features in React without rewriting existing code. React can also render on the server using Node and power mobile apps using React Native.

### B. Why Use React?

*   **Efficiency:** React uses a virtual DOM to minimize direct manipulation of the browser's DOM, leading to faster updates.
*   **Reusability:** Components can be reused across different parts of an application, saving development time.
*   **Maintainability:** Component-based architecture makes code easier to understand, debug, and maintain.
*   **Large Ecosystem:** A vast community, rich set of tools, and extensive libraries.
*   **Strong Community Support:** Abundant resources, tutorials, and active forums.

### C. Setting Up a React Project

1.  **Create React App (CRA):** A comfortable environment for learning React, and is the best way to start building a new single-page application in React.

    ```bash
    npx create-react-app my-react-app
    cd my-react-app
    npm start
    ```

2.  **Vite:** A next-generation frontend tooling that provides a faster and leaner development experience for modern web projects. It's often preferred for its speed.

    ```bash
    npm create vite@latest my-react-app -- --template react
    cd my-react-app
    npm install
    npm run dev
    ```

### D. JSX (JavaScript XML)

JSX is a syntax extension for JavaScript that allows you to write HTML-like code directly within your JavaScript files. It's not required to use React, but it makes writing React components much more intuitive.

```jsx
// Example of JSX
const name = 'World';
const element = <h1>Hello, {name}!</h1>;

function getGreeting(user) {
  if (user) {
    return <h1>Hello, {user.firstName} {user.lastName}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}

// Render the element to the DOM
// ReactDOM.render(element, document.getElementById('root'));
```

### E. Components (Functional vs. Class)

Components are the building blocks of any React application.

1.  **Functional Components (Recommended for modern React):** Simple JavaScript functions that accept props as an argument and return JSX.

    ```jsx
    // Functional Component
    function Welcome(props) {
      return <h1>Hello, {props.name}</h1>;
    }

    // Usage
    // <Welcome name="Alice" />
    ```

2.  **Class Components (Legacy):** ES6 classes that extend `React.Component` and have a `render()` method that returns JSX. They can also manage their own state.

    ```jsx
    // Class Component
    import React from 'react';

    class WelcomeClass extends React.Component {
      render() {
        return <h1>Hello, {this.props.name}</h1>;
      }
    }

    // Usage
    // <WelcomeClass name="Bob" />
    ```

### F. Props (Properties)

Props are read-only attributes passed from a parent component to a child component. They allow components to receive data and customize their behavior.

```jsx
// Parent Component
function App() {
  return <Greeting name="Charlie" message="Good morning!" />;
}

// Child Component
function Greeting(props) {
  return (
    <div>
      <h2>{props.message}</h2>
      <p>My name is {props.name}.</p>
    </div>
  );
}
```

### G. State

State is data that a component manages internally. It is mutable and can change over time, triggering re-renders of the component. In functional components, state is managed using the `useState` Hook.

```jsx
import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0); // Initial state is 0

  const increment = () => {
    setCount(count + 1); // Update state
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}
```

### H. Event Handling

React events are named using camelCase and are passed as functions directly to JSX elements.

```jsx
function MyButton() {
  const handleClick = () => {
    alert('Button clicked!');
  };

  return (
    <button onClick={handleClick}>Click Me</button>
  );
}
```

---

## II. Component Lifecycle and Hooks

### A. Component Lifecycle (Class Components - for understanding)

Class components have a lifecycle with various methods that are called at different stages:

*   **Mounting (Component creation):**
    *   `constructor()`
    *   `static getDerivedStateFromProps()`
    *   `render()`
    *   `componentDidMount()` (Good for data fetching, subscriptions)
*   **Updating (Component re-render):**
    *   `static getDerivedStateFromProps()`
    *   `shouldComponentUpdate()` (For performance optimization)
    *   `render()`
    *   `getSnapshotBeforeUpdate()`
    *   `componentDidUpdate()` (Good for DOM manipulation after update)
*   **Unmounting (Component removal):**
    *   `componentWillUnmount()` (Good for cleanup: clear timers, cancel network requests)

### B. Introduction to Hooks

Hooks are functions that let you "hook into" React state and lifecycle features from functional components. They were introduced in React 16.8.

*   **Rules of Hooks:**
    *   Only call Hooks at the top level of your React function.
    *   Only call Hooks from React functional components or custom Hooks.

### C. `useState` Hook

Allows functional components to have state. It returns a stateful value and a function to update it.

```jsx
import React, { useState } from 'react';

function ToggleMessage() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        {isVisible ? 'Hide' : 'Show'} Message
      </button>
      {isVisible && <p>This is a secret message!</p>}
    </div>
  );
}
```

### D. `useEffect` Hook

Allows functional components to perform side effects (data fetching, subscriptions, manually changing the DOM) after rendering. It runs after every render by default.

```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    // This runs after every render
    const intervalId = setInterval(() => {
      setSeconds(prevSeconds => prevSeconds + 1);
    }, 1000);

    // Cleanup function: runs when component unmounts or before re-running effect
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array means this effect runs once on mount and cleans up on unmount

  return <p>Seconds: {seconds}</p>;
}
```

### E. `useContext` Hook

Allows functional components to subscribe to React context, avoiding prop drilling.

```jsx
import React, { useContext, createContext } from 'react';

// 1. Create a Context
const ThemeContext = createContext('light');

// 2. Provider Component
function App() {
  return (
    <ThemeContext.Provider value="dark">
      <Toolbar />
    </ThemeContext.Provider>
  );
}

// 3. Consumer Component
function Toolbar() {
  const theme = useContext(ThemeContext); // Access context value
  return <p>Current theme: {theme}</p>;
}
```

### F. `useRef` Hook

Returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`). The returned object will persist for the full lifetime of the component. Useful for accessing DOM elements directly or storing mutable values that don't trigger re-renders.

```jsx
import React, { useRef } from 'react';

function TextInputWithFocusButton() {
  const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` points to the mounted text input element
    inputEl.current.focus();
  };
  return (
    <>
      <input ref={inputEl} type="text" />
      <button onClick={onButtonClick}>Focus the input</button>
    </>
  );
}
```

### G. Custom Hooks

Custom Hooks are JavaScript functions whose names start with "use" and that may call other Hooks. They allow you to extract reusable stateful logic from components.

```jsx
import { useState, useEffect } from 'react';

function useWindowWidth() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
}

function MyComponent() {
  const width = useWindowWidth();
  return <p>Window width: {width}px</p>;
}
```

---

## III. Advanced React Concepts

### A. Conditional Rendering

Rendering different components or elements based on certain conditions.

*   **`if` statements:**

    ```jsx
    function UserGreeting(props) {
      if (props.isLoggedIn) {
        return <h1>Welcome back!</h1>;
      }
      return <h1>Please sign up.</h1>;
    }
    ```

*   **Logical `&&` operator:** For rendering an element or nothing.

    ```jsx
    function Mailbox(props) {
      const unreadMessages = props.unreadMessages;
      return (
        <div>
          <h1>Hello!</h1>
          {unreadMessages.length > 0 &&
            <h2>You have {unreadMessages.length} unread messages.</h2>
          }
        </div>
      );
    }
    ```

*   **Ternary operator (`condition ? true : false`):** For rendering one of two elements.

    ```jsx
    function LoginButton(props) {
      return (
        props.isLoggedIn ? <button>Logout</button> : <button>Login</button>
      );
    }
    ```

### B. List Rendering and Keys

Rendering collections of data using array methods like `map()`. `key` props are essential for React to efficiently update lists.

```jsx
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) =>
    <li key={number.toString()}>
      {number}
    </li>
  );
  return (
    <ul>{listItems}</ul>
  );
}

// Usage: <NumberList numbers={[1, 2, 3, 4, 5]} />
```

### C. Forms in React

1.  **Controlled Components:** Form elements whose values are controlled by React state. This is the recommended approach.

    ```jsx
    import React, { useState } from 'react';

    function NameForm() {
      const [name, setName] = useState('');

      const handleChange = (event) => {
        setName(event.target.value);
      };

      const handleSubmit = (event) => {
        alert('A name was submitted: ' + name);
        event.preventDefault();
      };

      return (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" value={name} onChange={handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
    ```

2.  **Uncontrolled Components:** Form elements whose values are managed by the DOM itself. You can access their values using a `ref`.

    ```jsx
    import React, { useRef } from 'react';

    function UncontrolledForm() {
      const inputRef = useRef(null);

      const handleSubmit = (event) => {
        alert('A name was submitted: ' + inputRef.current.value);
        event.preventDefault();
      };

      return (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input type="text" ref={inputRef} />
          </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
    ```

### D. Context API

Provides a way to pass data through the component tree without having to pass props down manually at every level (prop drilling).

*   **`createContext`:** Creates a Context object.
*   **`Provider`:** A React component that allows consuming components to subscribe to context changes.
*   **`useContext`:** A Hook to consume context in functional components.

(See `useContext` example in Section II.E)

### E. Portals

Provide a way to render children into a DOM node that exists outside the DOM hierarchy of the parent component. Useful for modals, tooltips, and popovers.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';

function Modal(props) {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-content">
        {props.children}
        <button onClick={props.onClose}>Close</button>
      </div>
    </div>,
    document.getElementById('modal-root') // A DOM element outside the main app root
  );
}

// In your index.html, you'd have:
// <div id="root"></div>
// <div id="modal-root"></div>
```

### F. Error Boundaries

React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree crashing.

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

// Usage:
// <ErrorBoundary>
//   <MyProblematicComponent />
// </ErrorBoundary>
```

### G. Higher-Order Components (HOCs)

A higher-order component is a function that takes a component as an argument and returns a new component with enhanced functionality.

```jsx
function withLogger(WrappedComponent) {
  return class extends React.Component {
    componentDidMount() {
      console.log(`Component ${WrappedComponent.name} mounted.`);
    }
    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
}

function MyComponent() {
  return <p>Hello from MyComponent!</p>;
}

const MyComponentWithLogger = withLogger(MyComponent);

// Usage: <MyComponentWithLogger />
```

### H. Render Props

A pattern where a component takes a function as a prop, and that function returns a React element. This allows for sharing code between components using a prop whose value is a function.

```jsx
import React, { useState } from 'react';

function MouseTracker(props) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event) => {
    setPosition({
      x: event.clientX,
      y: event.clientY
    });
  };

  return (
    <div style={{ height: '100vh' }} onMouseMove={handleMouseMove}>
      {props.render(position)} {/* Call the render prop with state */}
    </div>
  );
}

function App() {
  return (
    <MouseTracker render={mouse => (
      <h1>The mouse position is ({mouse.x}, {mouse.y})</h1>
    )}/>
  );
}
```

---

## IV. Routing and State Management

### A. React Router

A collection of navigational components that compose declaratively with your application.

1.  **Installation and Setup:**

    ```bash
    npm install react-router-dom
    ```

2.  **Core Components:**
    *   **`BrowserRouter`:** Uses the HTML5 history API to keep your UI in sync with the URL.
    *   **`Routes`:** A container for a set of `Route`s. It renders the first `Route` that matches the current URL.
    *   **`Route`:** Renders UI when its path matches the current URL.
    *   **`Link`:** Provides declarative, accessible navigation around your application.
    *   **`useNavigate`:** A Hook for programmatic navigation.
    *   **`useParams`:** A Hook to access URL parameters.

    ```jsx
    import React from 'react';
    import { BrowserRouter, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom';

    function Home() {
      return <h2>Home Page</h2>;
    }

    function About() {
      return <h2>About Page</h2>;
    }

    function UserProfile() {
      const { userId } = useParams(); // Get userId from URL like /users/123
      return <h2>User Profile for ID: {userId}</h2>;
    }

    function Dashboard() {
      const navigate = useNavigate();
      return (
        <div>
          <h2>Dashboard</h2>
          <button onClick={() => navigate('/settings')}>Go to Settings</button>
        </div>
      );
    }

    function AppRouter() {
      return (
        <BrowserRouter>
          <nav>
            <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/dashboard">Dashboard</Link> | <Link to="/users/123">User 123</Link>
          </nav>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/users/:userId" element={<UserProfile />} />
            <Route path="*" element={<h2>404 Not Found</h2>} /> {/* Catch-all for unmatched routes */}
          </Routes>
        </BrowserRouter>
      );
    }
    ```

### B. State Management Solutions

1.  **`useState` and `useContext` (for local/global state):** Sufficient for many small to medium-sized applications. `useContext` can manage global state without external libraries.

2.  **Redux:** A predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.
    *   **Reducers:** Pure functions that take the current state and an action, and return a new state.
    *   **Actions:** Plain JavaScript objects that describe what happened.
    *   **Store:** Holds the application state.
    *   **Middleware:** Provides a third-party extension point between dispatching an action and the moment it reaches the reducer.

    ```jsx
    // Example Redux (simplified)
    // actions.js
    const increment = () => ({ type: 'INCREMENT' });
    const decrement = () => ({ type: 'DECREMENT' });

    // reducer.js
    const initialState = { count: 0 };
    function counterReducer(state = initialState, action) {
      switch (action.type) {
        case 'INCREMENT':
          return { count: state.count + 1 };
        case 'DECREMENT':
          return { count: state.count - 1 };
        default:
          return state;
      }
    }

    // store.js (using @reduxjs/toolkit for modern Redux)
    // import { configureStore } from '@reduxjs/toolkit';
    // const store = configureStore({ reducer: counterReducer });

    // React Component (using react-redux)
    // import { useSelector, useDispatch } from 'react-redux';
    // function CounterComponent() {
    //   const count = useSelector(state => state.count);
    //   const dispatch = useDispatch();
    //   return (
    //     <div>
    //       <p>Count: {count}</p>
    //       <button onClick={() => dispatch(increment())}>+</button>
    //       <button onClick={() => dispatch(decrement())}>-</button>
    //     </div>
    //   );
    // }
    ```

3.  **Zustand, Recoil, Jotai (Alternatives):** Lighter, more modern state management libraries that often offer simpler APIs compared to Redux for certain use cases.

---

## V. Styling React Components

### A. Inline Styles

Applying CSS directly to elements using the `style` prop, which accepts a JavaScript object.

```jsx
function MyComponent() {
  const myStyle = {
    color: 'blue',
    backgroundColor: 'lightgray',
    padding: '10px'
  };
  return <p style={myStyle}>This text is styled inline.</p>;
}
```

### B. CSS Stylesheets

Importing regular `.css` files. Styles are globally scoped.

```css
/* App.css */
.app-header {
  background-color: #282c34;
  color: white;
  padding: 20px;
}
```

```jsx
// App.js
import './App.css';

function App() {
  return (
    <header className="app-header">
      <h1>My App</h1>
    </header>
  );
}
```

### C. CSS Modules

A CSS file where all class names and animation names are scoped locally by default. Prevents naming conflicts.

```css
/* MyComponent.module.css */
.container {
  border: 1px solid green;
  padding: 15px;
}
.title {
  color: darkgreen;
}
```

```jsx
// MyComponent.js
import styles from './MyComponent.module.css';

function MyComponent() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>CSS Modules Example</h2>
      <p>This component uses locally scoped styles.</p>
    </div>
  );
}
```

### D. Styled Components (CSS-in-JS)

Allows you to write actual CSS code inside your JavaScript files, creating components with styles attached.

```bash
npm install styled-components
```

```jsx
import styled from 'styled-components';

const Button = styled.button`
  background: palevioletred;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  &:hover {
    background: white;
    color: palevioletred;
  }
`;

const TomatoButton = styled(Button)`
  background: tomato;
  border-color: tomato;
`;

function MyStyledComponent() {
  return (
    <div>
      <Button>Normal Button</Button>
      <TomatoButton>Tomato Button</TomatoButton>
    </div>
  );
}
```

### E. Utility-First CSS (Tailwind CSS)

A highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
(Configure `tailwind.config.js` and import Tailwind in your main CSS file)

```jsx
function Card() {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 m-4 bg-white">
      <div className="font-bold text-xl mb-2 text-gray-800">The Coldest Sunset</div>
      <p className="text-gray-700 text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
      </p>
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
        Read More
      </button>
    </div>
  );
}
```

---

## VI. Fetching Data

### A. `fetch` API

The native browser API for making network requests. Returns a Promise.

```jsx
import React, { useState, useEffect } from 'react';

function DataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(actualData => {
        setData(actualData);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Fetched Data</h2>
      <p>Title: {data.title}</p>
      <p>Body: {data.body}</p>
    </div>
  );
}
```

### B. Axios

A popular, promise-based HTTP client for the browser and Node.js. Offers more features than `fetch` (e.g., automatic JSON transformation, interceptors).

```bash
npm install axios
```

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AxiosDataFetcher() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts/1')
      .then(response => {
        setData(response.data);
        setError(null);
      })
      .catch(err => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Fetched Data with Axios</h2>
      <p>Title: {data.title}</p>
      <p>Body: {data.body}</p>
    </div>
  );
}
```

### C. Data Fetching Hooks (e.g., `react-query`, `swr`)

Libraries like `react-query` (TanStack Query) and `swr` provide powerful hooks for data fetching, caching, synchronization, and state management, simplifying complex data fetching scenarios.

```bash
npm install @tanstack/react-query
```

```jsx
import React from 'react';
import { useQuery } from '@tanstack/react-query';

function PostDetail({ postId }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['post', postId], // Unique key for this query
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
  });

  if (isLoading) return <p>Loading post...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h3>{data.title}</h3>
      <p>{data.body}</p>
    </div>
  );
}

// Usage: <PostDetail postId={1} />
```

---

## VII. Testing React Applications

### A. Jest

A delightful JavaScript Testing Framework with a focus on simplicity. It works with projects using Babel, TypeScript, Node, React, Angular, Vue and more.

```bash
npm install --save-dev jest
```
(Often configured by default in Create React App)

### B. React Testing Library

A set of utilities that help you test React components in a way that resembles how users interact with your application. It encourages testing components based on their behavior rather than their internal implementation details.

```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom
```

### C. Unit Testing Components

Testing individual components in isolation.

```jsx
// MyComponent.js
function MyComponent({ name }) {
  return <div>Hello, {name}!</div>;
}
export default MyComponent;

// MyComponent.test.js
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

test('renders MyComponent with a name', () => {
  render(<MyComponent name="Alice" />);
  const linkElement = screen.getByText(/Hello, Alice!/i);
  expect(linkElement).toBeInTheDocument();
});
```

### D. Integration Testing

Testing how multiple components work together.

```jsx
// App.js (simplified)
import React, { useState } from 'react';
import MyComponent from './MyComponent';

function App() {
  const [show, setShow] = useState(false);
  return (
    <div>
      <button onClick={() => setShow(!show)}>Toggle</button>
      {show && <MyComponent name="Bob" />}
    </div>
  );
}
export default App;

// App.test.js
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('toggles MyComponent visibility', () => {
  render(<App />);
  const toggleButton = screen.getByText(/Toggle/i);
  fireEvent.click(toggleButton); // Click to show
  expect(screen.getByText(/Hello, Bob!/i)).toBeInTheDocument();
  fireEvent.click(toggleButton); // Click to hide
  expect(screen.queryByText(/Hello, Bob!/i)).not.toBeInTheDocument();
});
```

---

## VIII. Performance Optimization and Best Practices

### A. Memoization (`React.memo`, `useMemo`, `useCallback`)

Prevents unnecessary re-renders of components or recalculations of values.

*   **`React.memo`:** A higher-order component that memoizes a functional component. It re-renders only if its props change.

    ```jsx
    const MyMemoizedComponent = React.memo(function MyComponent(props) {
      /* render using props */
    });
    ```

*   **`useMemo`:** Memoizes a value. It only recomputes the memoized value when one of the dependencies has changed.

    ```jsx
    const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
    ```

*   **`useCallback`:** Memoizes a function. It returns a memoized version of the callback that only changes if one of the dependencies has changed. Useful for passing callbacks to optimized child components.

    ```jsx
    const memoizedCallback = useCallback(() => {
      doSomething(a, b);
    }, [a, b]);
    ```

### B. Lazy Loading and Code Splitting (`React.lazy`, `Suspense`)

Reduces the bundle size by loading components only when they are needed.

```jsx
import React, { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}
```

### C. Virtualization (for large lists)

For very long lists, rendering all items at once can be slow. Libraries like `react-window` or `react-virtualized` render only the visible items, improving performance.

### D. Immutability

Avoid direct mutation of state or props. Always create new objects or arrays when updating state to ensure React detects changes and re-renders correctly.

```jsx
// Bad: Mutating state directly
// const newItems = items;
// newItems.push(newItem);
// setItems(newItems);

// Good: Creating a new array
setItems(prevItems => [...prevItems, newItem]);
```

### E. Prop Types

Use `prop-types` library to define the type and requiredness of props passed to components. This helps catch bugs early during development.

```bash
npm install prop-types
```

```jsx
import PropTypes from 'prop-types';

function MyComponent(props) {
  return <p>Hello, {props.name}!</p>;
}

MyComponent.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number,
  isStudent: PropTypes.bool.isRequired,
  // ... more prop types
};
```

### F. Folder Structure

Organize your project files logically. Common patterns include:

*   **By Feature:** Grouping all files related to a specific feature (components, hooks, styles) in one folder.
*   **By Type:** Grouping all components in a `components` folder, all hooks in a `hooks` folder, etc.

### G. Accessibility

Ensure your React applications are usable by everyone, including people with disabilities.

*   Use semantic HTML elements.
*   Provide `alt` text for images.
*   Manage focus for keyboard navigation.
*   Use ARIA attributes when necessary.
*   Test with screen readers.
