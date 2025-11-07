<template>
    <article class="blog-post" :data-category="post.category">
        <h2>{{ post.title }}</h2>
        <p class="post-meta">Published on {{ post.date }} by {{ post.author }}</p>
        <img :src="post.image" :alt="post.imageAlt">
        <p>{{ post.paragraph1 }}</p>
        <p v-if="post.paragraph2">{{ post.paragraph2 }}</p>
        <a href="#" class="read-more">Read More</a>
    </article>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    post: {
        type: Object,
        required: true,
        default: () => ({})
    }
});
</script>

<style scoped>
/* --- Blog Post Styles -- */
.blog-post {
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
}

.blog-post:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.blog-post h2 {
    color: #007bff;
    margin-top: 0;
    font-size: 2em;
}

.blog-post .post-meta {
    font-size: 0.9em;
    color: #777;
    margin-bottom: 15px;
}

.blog-post img {
    max-width: 100%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 20px;
}

.blog-post p {
    margin-bottom: 15px;
}

.blog-post .read-more {
    display: inline-block;
    background-color: #28a745;
    color: #fff;
    padding: 8px 15px;
    border-radius: 5px;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.blog-post .read-more:hover {
    background-color: #218838;
}
</style>