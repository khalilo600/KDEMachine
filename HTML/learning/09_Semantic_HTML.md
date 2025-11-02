# Semantic HTML

Semantic HTML is the use of HTML markup to reinforce the semantics, or meaning, of the information in webpages and web applications rather than merely to define its presentation or look. Semantic HTML is processed by traditional web browsers as well as by many other web agents. CSS is used to suggest its presentation to human users.

## Why is Semantic HTML Important?

*   **Accessibility:** Semantic HTML makes web pages more accessible for people with disabilities, especially for those who use screen readers. Screen readers can use the semantic tags to better understand the structure of the page and navigate it more easily.
*   **SEO (Search Engine Optimization):** Search engines like Google use semantic HTML to understand the content of a web page. By using semantic tags, you can help search engines to better index your site and rank it higher in search results.
*   **Maintainability:** Semantic HTML makes the code easier to read and maintain. When you use semantic tags, you are giving a clear indication of the purpose of each element, which makes it easier for other developers (and yourself) to understand the code.
*   **Future Compatibility:** Semantic HTML is more likely to be compatible with future web technologies. As new devices and browsers are developed, they will be better able to understand and interpret semantic HTML.

## Examples of Semantic Elements

HTML5 introduced a number of new semantic elements that make it easier to structure your pages in a meaningful way.

*   `<header>`: Defines a header for a document or a section.
*   `<nav>`: Defines a set of navigation links.
*   `<main>`: Defines the main content of a document.
*   `<article>`: Defines a self-contained piece of content, such as a blog post or a news article.
*   `<section>`: Defines a section in a document.
*   `<aside>`: Defines content aside from the content it is placed in (like a sidebar).
*   `<footer>`: Defines a footer for a document or a section.
*   `<figure>` and `<figcaption>`: Used to group a figure (e.g., an image) with a caption.

### Example of a Page Layout with Semantic Elements

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Semantic Page</title>
</head>
<body>

  <header>
    <h1>My Website</h1>
    <nav>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>My First Blog Post</h2>
      <p>This is the content of my first blog post.</p>
    </article>

    <section>
      <h2>Related Articles</h2>
      <ul>
        <li><a href="/blog/post-2">My Second Blog Post</a></li>
        <li><a href="/blog/post-3">My Third Blog Post</a></li>
      </ul>
    </section>
  </main>

  <aside>
    <h2>About the Author</h2>
    <p>I am a web developer who loves to write about HTML.</p>
  </aside>

  <footer>
    <p>&copy; 2025 My Website</p>
  </footer>

</body>
</html>
```

By using semantic elements, you are providing a clear and meaningful structure to your page, which is beneficial for accessibility, SEO, and maintainability.
