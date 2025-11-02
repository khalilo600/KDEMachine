# React Components and Props

Components are the building blocks of a React application. A component is a self-contained, reusable piece of UI that can have its own state and logic. Props are used to pass data from a parent component to a child component.

## Components

There are two main types of components in React: functional components and class components.

### Functional Components

A functional component is a simple JavaScript function that returns a React element.

```jsx
import React from 'react';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

export default Welcome;
```

Functional components are the recommended way to create components in modern React.

### Class Components

A class component is a JavaScript class that extends the `React.Component` class. It must have a `render()` method that returns a React element.

```jsx
import React from 'react';

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export default Welcome;
```

Class components are still supported in React, but they are generally not as popular as functional components.

## Props

Props (short for properties) are used to pass data from a parent component to a child component. Props are read-only, which means that a child component cannot modify the props it receives from its parent.

### Passing Props

You can pass props to a component by adding them as attributes to the component's JSX tag.

```jsx
<Welcome name="John" />
```

### Accessing Props

In a functional component, you can access props as the first argument to the function.

```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

In a class component, you can access props using `this.props`.

```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## Composing Components

Components can be composed together to create more complex UIs. A component can render other components in its output.

```jsx
function App() {
  return (
    <div>
      <Welcome name="Sara" />
      <Welcome name="Cahal" />
      <Welcome name="Edite" />
    </div>
  );
}
```

## Prop Types

As your application grows, it can be helpful to use prop types to ensure that your components are receiving the correct type of props. You can use the `prop-types` library to define the prop types for your components.

```jsx
import PropTypes from 'prop-types';

function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}

Welcome.propTypes = {
  name: PropTypes.string.isRequired
};
```

If you pass a prop with an incorrect type, you will see a warning in the console.

Components and props are fundamental concepts in React. By mastering these concepts, you will be able to create complex and reusable UIs with ease.
