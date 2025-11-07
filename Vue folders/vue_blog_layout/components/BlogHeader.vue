<template>
    <header>
        <h1>My Awesome Blog</h1>
        <nav>
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Archive</a>
        </nav>
    </header>
</template>

<script setup>
// No specific script logic needed for the header.
</script>

<style scoped>
header {
    background-color: #222;
    color: #fff;
    padding: 20px 0;
    text-align: center;
    margin-bottom: 20px;
}

header h1 {
    margin: 0;
    font-size: 2.8em;
}

header nav a {
    color: #fff;
    text-decoration: none;
    margin: 0 15px;
    font-weight: bold;
}

header nav a:hover {
    text-decoration: underline;
}
</style>