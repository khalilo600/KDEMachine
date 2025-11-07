<template>
    <div class="grid-container">
        <header class="grid-header">
            <h1>Grid Layout</h1>
        </header>
        <nav class="grid-nav">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </nav>
        <main class="grid-main">
            <h2>Main Content</h2>
            <p>This is the main content area. It takes up the most space.</p>
            <p>CSS Grid makes it easy to create complex, responsive layouts like this one.</p>
        </main>
        <aside class="grid-sidebar">
            <h3>Sidebar</h3>
            <p>This is the sidebar. It can be used for secondary content, ads, or navigation.</p>
        </aside>
        <footer class="grid-footer">
            <p>&copy; 2025 Grid Demo</p>
        </footer>
    </div>
</template>

<script setup>
// No specific script logic needed for this basic layout yet.
</script>

<style scoped>
body {
    font-family: sans-serif;
    margin: 0;
    background-color: #f4f4f4;
}

.grid-container {
    display: grid;
    grid-template-areas:
        'header header header'
        'nav nav nav'
        'main main sidebar'
        'footer footer footer';
    grid-template-columns: 1fr 1fr 250px;
    grid-gap: 10px;
    height: 100vh;
}

.grid-header, .grid-nav, .grid-main, .grid-sidebar, .grid-footer {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.grid-header {
    grid-area: header;
    background-color: #333;
    color: #fff;
    text-align: center;
}

.grid-nav {
    grid-area: nav;
    background-color: #444;
    text-align: center;
}

.grid-nav a {
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
}

.grid-main {
    grid-area: main;
}

.grid-sidebar {
    grid-area: sidebar;
}

.grid-footer {
    grid-area: footer;
    background-color: #333;
    color: #fff;
    text-align: center;
}

/* Responsive layout for smaller screens */
@media (max-width: 768px) {
    .grid-container {
        grid-template-areas:
            'header'
            'nav'
            'main'
            'sidebar'
            'footer';
        grid-template-columns: 1fr;
    }
}
</style>