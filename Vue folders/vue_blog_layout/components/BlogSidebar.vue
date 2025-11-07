<template>
    <aside class="sidebar">
        <div class="widget">
            <h3>About Me</h3>
            <p>A short blurb about the author or blog. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="widget">
            <h3>Categories</h3>
            <ul>
                <li><a href="#">Web Development</a></li>
                <li><a href="#">Design</a></li>
                <li><a href="#">Tutorials</a></li>
                <li><a href="#">Life Hacks</a></li>
            </ul>
        </div>
        <div class="widget">
            <h3>Recent Posts</h3>
            <ul>
                <li><a href="#">Latest Post Title</a></li>
                <li><a href="#">Another Recent Post</a></li>
                <li><a href="#">Old but Gold</a></li>
            </ul>
        </div>
    </aside>
</template>

<script setup>
// No specific script logic needed for the sidebar.
</script>

<style scoped>
.sidebar {
    /* The 'flex: 1' property makes the sidebar take up less space than the main content. */
    flex: 1;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* --- Widget Styles (within Sidebar) -- */
.widget {
    margin-bottom: 30px;
}

.widget h3 {
    color: #333;
    border-bottom: 2px solid #eee;
    padding-bottom: 10px;
    margin-top: 0;
}

.widget ul {
    list-style: none;
    padding: 0;
}

.widget ul li {
    margin-bottom: 8px;
}

.widget ul li a {
    color: #007bff;
    text-decoration: none;
}

.widget ul li a:hover {
    text-decoration: underline;
}

/* --- Responsive Adjustments -- */
@media (max-width: 768px) {
    .sidebar {
        /* Allow both to take full width. */
        flex: auto;
    }
}
</style>