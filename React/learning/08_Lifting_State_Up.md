# Lifting State Up in React

Often, several components need to reflect the same changing data. In such cases, it is recommended to lift the shared state up to their closest common ancestor. This is known as "lifting state up".

## The Problem

Imagine you have two components that need to share the same state. For example, you might have a temperature input component and a component that displays whether the water would boil at that temperature.

If both components maintain their own state, it can be difficult to keep them in sync. If the user changes the temperature in the input component, the other component will not be aware of the change.

## The Solution

The solution is to lift the state up to the closest common ancestor of the two components. In this case, the common ancestor would be a `Calculator` component.

The `Calculator` component would then be responsible for managing the state and passing it down to the two child components as props.

### Example

Here is an example of how to lift state up:

```jsx
function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature}
               onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.state = {temperature: '', scale: 'c'};
  }

  handleCelsiusChange(temperature) {
    this.setState({scale: 'c', temperature});
  }

  handleFahrenheitChange(temperature) {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={celsius}
          onTemperatureChange={this.handleCelsiusChange} />
        <TemperatureInput
          scale="f"
          temperature={fahrenheit}
          onTemperatureChange={this.handleFahrenheitChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}
```

In this example, the `Calculator` component is the single source of truth for the temperature. It passes the temperature down to the `TemperatureInput` components as a prop, and it also passes down a function that the `TemperatureInput` components can call to update the temperature.

## Benefits of Lifting State Up

*   **Single Source of Truth:** By having a single source of truth for the state, you can avoid inconsistencies and make your code easier to reason about.
*   **Easier to Debug:** When you have a single source of truth, it is much easier to debug your application. You can simply look at the state of the parent component to see what is going on.
*   **More Reusable Components:** By lifting state up, you can make your child components more reusable. The child components are no longer responsible for managing their own state, so they can be used in a variety of different contexts.

Lifting state up is a fundamental concept in React. By understanding how to use it effectively, you can create more robust and maintainable applications.
