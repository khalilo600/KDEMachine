# Forms in React

In React, forms are handled a bit differently than they are in plain HTML. In HTML, form elements like `<input>`, `<textarea>`, and `<select>` typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with `setState()`.

This is known as a "controlled component".

## Controlled Components

A controlled component is a component where the form data is handled by the React component's state. The component renders a form element and controls what happens in that form element on subsequent user input.

### Example

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

In this example, the `value` of the input field is controlled by the `this.state.value` property. When the user types in the input field, the `handleChange` method is called, which updates the state. When the form is submitted, the `handleSubmit` method is called, which can then access the value from the state.

## The `textarea` Tag

In HTML, a `<textarea>` element defines its text by its children. In React, a `<textarea>` uses a `value` attribute instead. This makes it behave very similarly to a single-line input.

```jsx
<textarea value={this.state.value} onChange={this.handleChange} />
```

## The `select` Tag

In HTML, a `<select>` tag creates a drop-down list. In React, instead of using the `selected` attribute on the `<option>` tag, you use a `value` attribute on the root `<select>` tag. This is more convenient because you only need to update the value in one place.

```jsx
<select value={this.state.value} onChange={this.handleChange}>
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option value="coconut">Coconut</option>
  <option value="mango">Mango</option>
</select>
```

## Handling Multiple Inputs

When you have multiple controlled inputs, you can add a `name` attribute to each element and let the handler function choose what to do based on the value of `event.target.name`.

```jsx
handleInputChange(event) {
  const target = event.target;
  const value = target.type === 'checkbox' ? target.checked : target.value;
  const name = target.name;

  this.setState({
    [name]: value
  });
}
```

## Uncontrolled Components

In some cases, it can be tedious to write a controlled component for every form element. In these cases, you can use an uncontrolled component. An uncontrolled component is a component where the form data is handled by the DOM itself.

To write an uncontrolled component, you can use a `ref` to get form values from the DOM.

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.input = React.createRef();
  }

  handleSubmit = (event) => {
    alert('A name was submitted: ' + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

While uncontrolled components can be useful in some cases, it is generally recommended to use controlled components whenever possible.

Forms are a fundamental part of most web applications. By understanding how to handle forms in React, you can create dynamic and interactive UIs that allow users to input and submit data.
