<template>
    <BlogHeader />

    <div class="container">
        <main class="main-content">
            <BlogPost
                v-for="(post, index) in blogPosts"
                :key="index"
                :post="post"
            />
        </main>

        <BlogSidebar />
    </div>

    <BlogFooter />
</template>

<script setup>
import { ref } from 'vue';
import BlogHeader from './components/BlogHeader.vue';
import BlogFooter from './components/BlogFooter.vue';
import BlogSidebar from './components/BlogSidebar.vue';
import BlogPost from './components/BlogPost.vue';

const blogPosts = ref([
    {
        title: 'First Blog Post Title',
        date: 'October 26, 2025',
        author: 'John Doe',
        image: 'https://via.placeholder.com/600x300/FF5733/FFFFFF?text=Blog+Image+1',
        imageAlt: 'Blog Post Image 1',
        paragraph1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        paragraph2: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        category: 'web development'
    },
    {
        title: 'Second Blog Post Title',
        date: 'October 20, 2025',
        author: 'Jane Smith',
        image: 'https://via.placeholder.com/600x300/33FF57/FFFFFF?text=Blog+Image+2',
        imageAlt: 'Blog Post Image 2',
        paragraph1: 'Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.',
        paragraph2: 'Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus auctor mattis. Aliquam sit amet justo eu ante egestas feugiat. Quisque eu sem scelerisque diam gravida adipiscing.',
        category: 'design'
    },
    {
        title: 'Third Blog Post Title',
        date: 'October 15, 2025',
        author: 'Alex Johnson',
        image: 'https://via.placeholder.com/600x300/3357FF/FFFFFF?text=Blog+Image+3',
        imageAlt: 'Blog Post Image 3',
        paragraph1: 'This is a tutorial post. Here we will learn how to do something amazing. Follow the steps carefully to achieve the best results.',
        paragraph2: '',
        category: 'tutorials'
    },
    {
        title: 'Fourth Blog Post Title',
        date: 'October 10, 2025',
        author: 'Sarah Lee',
        image: 'https://via.placeholder.com/600x300/FF33A1/FFFFFF?text=Blog+Image+4',
        imageAlt: 'Blog Post Image 4',
        paragraph1: 'Discover some amazing life hacks that will make your daily routine much easier. These tips are simple yet effective.',
        paragraph2: '',
        category: 'life hacks'
    }
]);
</script>

<style scoped>
/* --- General Body and Typography Styles -- */
body {
    font-family: 'Georgia', serif;
    margin: 0;
    line-height: 1.6;
    color: #333;
    background-color: #f8f8f8;
}

/* --- Main Container Styles -- */
.container {
    /* Use Flexbox to create the two-column layout. */
    display: flex;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    gap: 30px; /* Space between main content and sidebar. */
}

/* --- Main Content Area Styles -- */
.main-content {
    /* The 'flex: 3' property makes the main content take up more space than the sidebar. */
    flex: 3;
    background-color: #fff;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

/* --- Responsive Adjustments -- */
@media (max-width: 768px) {
    .container {
        /* On smaller screens, stack the main content and sidebar vertically. */
        flex-direction: column;
    }

    .main-content {
        /* Allow both to take full width. */
        flex: auto;
    }
}
</style>