# CSS Transitions and Animations

CSS transitions and animations allow you to add motion and interactivity to your web pages. They can be used to create a wide variety of effects, from simple hover effects to complex animations.

## CSS Transitions

CSS transitions allow you to smoothly change the value of a CSS property over a given duration. They are triggered when the value of a property changes, such as when a user hovers over an element.

### The `transition` Property

The `transition` property is a shorthand property for four other transition properties:

*   `transition-property`: Specifies the name of the CSS property the transition effect is for (e.g., `width`, `color`).
*   `transition-duration`: Specifies how many seconds or milliseconds a transition effect takes to complete.
*   `transition-timing-function`: Specifies the speed curve of the transition effect (e.g., `ease`, `linear`, `ease-in-out`).
*   `transition-delay`: Specifies a delay (in seconds or milliseconds) for the transition effect.

### Example

```css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  transition: width 2s;
}

.box:hover {
  width: 300px;
}
```

In this example, when you hover over the `.box` element, its width will smoothly transition from 100px to 300px over a period of 2 seconds.

## CSS Animations

CSS animations are more powerful than transitions. They allow you to create complex animations with multiple steps, and they can be triggered automatically when the page loads.

### The `@keyframes` Rule

To create a CSS animation, you first need to define the animation using the `@keyframes` rule. The `@keyframes` rule specifies the styles that will be applied at different points in the animation.

```css
@keyframes example {
  from {background-color: red;}
  to {background-color: yellow;}
}
```

This will create an animation called `example` that changes the background color of an element from red to yellow.

### The `animation` Property

Once you have defined the animation with `@keyframes`, you can apply it to an element using the `animation` property. The `animation` property is a shorthand property for several other animation properties:

*   `animation-name`: Specifies the name of the `@keyframes` animation.
*   `animation-duration`: Specifies how long an animation should take to complete one cycle.
*   `animation-timing-function`: Specifies the speed curve of the animation.
*   `animation-delay`: Specifies a delay for the start of an animation.
*   `animation-iteration-count`: Specifies the number of times an animation should be played.
*   `animation-direction`: Specifies whether an animation should be played forwards, backwards or in alternate cycles.

### Example

```css
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  animation-name: example;
  animation-duration: 4s;
}

@keyframes example {
  0%   {background-color: red;}
  25%  {background-color: yellow;}
  50%  {background-color: blue;}
  100% {background-color: green;}
}
```

In this example, the background color of the `.box` element will animate through four different colors over a period of 4 seconds.

Transitions and animations can add a lot of visual appeal to your website. By using them thoughtfully, you can create a more engaging and interactive user experience.
