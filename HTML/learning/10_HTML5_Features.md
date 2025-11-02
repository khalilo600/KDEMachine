# HTML5 Features

HTML5 is the latest version of the HTML standard, and it introduced a wide range of new features and improvements. These features provide better support for multimedia, form controls, and APIs, and they allow for the creation of more powerful and interactive web applications.

## New Semantic Elements

As discussed in the previous section, HTML5 introduced a number of new semantic elements that help to give a more meaningful structure to web pages. These include `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, and `<footer>`.

## New Form Input Types

HTML5 introduced several new input types for forms, which provide better input control and validation.

*   `email`: For email addresses.
*   `url`: For URLs.
*   `number`: For numerical values.
*   `range`: For a range of numbers.
*   `date`, `month`, `week`, `time`, `datetime`, `datetime-local`: For date and time values.
*   `search`: For search fields.
*   `color`: For color pickers.

## Video and Audio

HTML5 introduced the `<video>` and `<audio>` elements, which provide a standard way to embed video and audio in web pages without relying on third-party plugins like Flash.

### Video Example

```html
<video controls width="640" height="360">
  <source src="movie.mp4" type="video/mp4">
  <source src="movie.ogg" type="video/ogg">
  Your browser does not support the video tag.
</video>
```

### Audio Example

```html
<audio controls>
  <source src="horse.ogg" type="audio/ogg">
  <source src="horse.mp3" type="audio/mpeg">
  Your browser does not support the audio element.
</audio>
```

## Canvas

The `<canvas>` element is used to draw graphics on a web page using JavaScript. It can be used for rendering graphs, creating photo compositions, or doing animations.

```html
<canvas id="myCanvas" width="200" height="100"></canvas>
```

## Scalable Vector Graphics (SVG)

HTML5 has built-in support for SVG. SVG is a language for describing 2D graphics in XML. SVG images can be scaled to any size without losing quality, and they can be manipulated with JavaScript and CSS.

## Geolocation

The HTML5 Geolocation API is used to get the geographical position of a user. This can be used to provide location-based services, such as showing the user's position on a map.

## Web Storage

HTML5 introduced two new mechanisms for storing data on the client-side: `localStorage` and `sessionStorage`. These are more secure and faster than using cookies.

*   `localStorage`: Stores data with no expiration date.
*   `sessionStorage`: Stores data for one session (the data is lost when the browser tab is closed).

These are just some of the many new features that were introduced in HTML5. By using these features, you can create more modern, powerful, and interactive web applications.
