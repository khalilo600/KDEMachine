<template>
    <header>
        <nav>
            <div class="logo">Your Logo</div>
            <ul>
                <li><a href="#features">Features</a></li>
                <li><a href="#testimonials">Testimonials</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>

    <section class="hero">
        <div class="hero-content">
            <h1>Achieve Your Goals with Our Amazing Product</h1>
            <p>A concise and compelling message that highlights the main benefit of your product or service.</p>
            <button class="cta-button">Get Started Today!</button>
        </div>
    </section>

    <section id="features" class="features">
        <h2>Key Features</h2>
        <div class="feature-grid">
            <div class="feature-item">
                <h3>Feature 1</h3>
                <p>Benefit of feature 1 that solves a user problem.</p>
            </div>
            <div class="feature-item">
                <h3>Feature 2</h3>
                <p>Benefit of feature 2 that enhances user experience.</p>
            </div>
            <div class="feature-item">
                <h3>Feature 3</h3>
                <p>Benefit of feature 3 that provides unique value.</p>
            </div>
        </div>
    </section>

    <section id="testimonials" class="testimonials">
        <h2>What Our Customers Say</h2>
        <div class="testimonial-item">
            <p>"This product changed my life! Highly recommend to everyone."</p>
            <span>- Happy Customer A</span>
        </div>
        <div class="testimonial-item">
            <p>"Incredible results and fantastic support. Couldn't be happier!"</p>
            <span>- Satisfied User B</span>
        </div>
    </section>

    <section id="contact" class="contact">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of satisfied customers today.</p>
        <button class="cta-button">Sign Up Now!</button>
    </section>

    <footer>
        <p>&copy; 2025 Landing Page Demo. All rights reserved.</p>
    </footer>
</template>

<script setup>
// No specific script logic needed for this basic layout yet.
</script>

<style scoped>
/**
 * This stylesheet provides the styling for the landing page demo.
 * It defines a clean and modern design with a prominent hero section,
 * clear calls to action, and well-structured content sections.
 */

/* --- General Body and Typography Styles -- */
body {
    font-family: 'Arial', sans-serif;
    margin: 0;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
}

/* --- Header and Navigation Styles -- */
header {
    background-color: #fff;
    padding: 15px 0;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.logo {
    font-size: 1.8em;
    font-weight: bold;
    color: #333;
}

nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
}

nav ul li {
    margin-left: 25px;
}

nav ul li a {
    text-decoration: none;
    color: #555;
    font-weight: bold;
    transition: color 0.3s ease;
}

nav ul li a:hover {
    color: #007bff;
}

/* --- Hero Section Styles -- */
.hero {
    /* A background image with a semi-transparent overlay to make the text more readable. */
    background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://via.placeholder.com/1500x800/007bff/ffffff?text=Hero+Image') no-repeat center center/cover;
    color: #fff;
    text-align: center;
    padding: 100px 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
}

.hero-content {
    max-width: 800px;
}

.hero h1 {
    font-size: 3.5em;
    margin-bottom: 20px;
}

.hero p {
    font-size: 1.3em;
    margin-bottom: 30px;
}

/* --- Call to Action (CTA) Button Styles -- */
.cta-button {
    background-color: #28a745; /* Green */
    color: #fff;
    padding: 15px 30px;
    font-size: 1.2em;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.3s ease;
}

.cta-button:hover {
    background-color: #218838;
}

/* --- General Section Styles -- */
section {
    padding: 60px 20px;
    text-align: center;
    max-width: 1200px;
    margin: 0 auto;
}

section h2 {
    font-size: 2.5em;
    margin-bottom: 40px;
    color: #333;
}

/* --- Features Section Styles -- */
.features {
    background-color: #fff;
}

.feature-grid {
    /* Use CSS Grid to create a responsive grid of features. */
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 30px;
    margin-top: 30px;
}

.feature-item {
    background-color: #f9f9f9;
    padding: 30px;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}

.feature-item h3 {
    color: #007bff;
    margin-bottom: 15px;
}

/* --- Testimonials Section Styles -- */
.testimonials {
    background-color: #e9ecef;
}

.testimonial-item {
    max-width: 700px;
    margin: 0 auto 30px auto;
    font-style: italic;
    color: #555;
}

.testimonial-item p {
    font-size: 1.1em;
    margin-bottom: 10px;
}

.testimonial-item span {
    font-weight: bold;
    color: #333;
}

/* --- Contact Section Styles -- */
.contact {
    background-color: #fff;
    padding-bottom: 80px;
}

/* --- Footer Styles -- */
footer {
    background-color: #333;
    color: #fff;
    text-align: center;
    padding: 25px 0;
}

/* --- Responsive Adjustments -- */
@media (max-width: 768px) {
    .hero h1 {
        font-size: 2.5em;
    }

    .hero p {
        font-size: 1.1em;
    }

    nav {
        flex-direction: column;
    }

    nav ul {
        margin-top: 15px;
    }

    nav ul li {
        margin: 0 10px;
    }
}
</style>