# React Hooks

Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class. Hooks are a powerful and expressive way to write React components, and they have quickly become the preferred way to write components in modern React.

## Why Hooks?

Hooks solve a variety of seemingly unconnected problems in React that have been encountered over five years of writing and maintaining tens of thousands of components. Whether you're learning React, use it daily, or even prefer a different library with a similar component model, you might recognize some of these problems.

*   **It's hard to reuse stateful logic between components.** Hooks allow you to extract stateful logic from a component so it can be tested independently and reused. Hooks allow you to reuse stateful logic without changing your component hierarchy.
*   **Complex components become hard to understand.** Hooks let you split one component into smaller functions based on what pieces are related (such as setting up a subscription or fetching data), rather than forcing a split based on lifecycle methods.
*   **Classes confuse both people and machines.** Hooks let you use more of React's features without classes. Conceptually, React components have always been closer to functions. Hooks embrace functions, but without sacrificing the practical power of React.

## The `useState` Hook

The `useState` hook is the most common and basic hook. It allows you to add state to a functional component.

```jsx
import React, { useState } from 'react';

function Example() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

The `useState` hook returns an array with two elements: the current state value, and a function that you can use to update the state.

## The `useEffect` Hook

The `useEffect` hook allows you to perform side effects in a functional component. It is a combination of `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount`.

```jsx
import React, { useState, useEffect } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## Other Hooks

There are a number of other built-in hooks that you can use in your components.

*   `useContext`: Allows you to subscribe to React context without introducing nesting.
*   `useReducer`: An alternative to `useState`. Accepts a reducer of type `(state, action) => newState`, and returns the current state paired with a `dispatch` method.
*   `useCallback`: Returns a memoized callback.
*   `useMemo`: Returns a memoized value.
*   `useRef`: Returns a mutable ref object whose `.current` property is initialized to the passed argument (`initialValue`).

## Rules of Hooks

There are two important rules that you need to follow when using hooks:

1.  **Only call hooks at the top level.** Don't call hooks inside loops, conditions, or nested functions.
2.  **Only call hooks from React functions.** Don't call hooks from regular JavaScript functions.

Hooks are a powerful and flexible way to write React components. By using hooks, you can write more reusable, readable, and maintainable code.
