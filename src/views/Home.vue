<template>
  <div class="home">
    <!-- Hero Banner -->
    <section class="hero">
      <div class="container">
        <div class="hero-content">
          <h1 class="hero-title">Welcome to Fresh Fresh</h1>
          <p class="hero-text">Discover your favorite books and enrich your knowledge world</p>
          <router-link to="/products" class="btn btn-primary">Browse books</router-link>
        </div>
      </div>
    </section>

    <!-- Featured Books -->
    <section class="featured">
      <div class="container">
        <h2 class="section-title">Featured Books</h2>
        <div class="book-grid">
          <div v-for="book in featuredBooks" :key="book.id" class="book-card">
            <router-link :to="`/products/${book.id}`">
              <div class="book-image">
                <img :src="book.image" :alt="book.title">
              </div>
              <div class="book-info">
                <h3 class="book-title">{{ book.title }}</h3>
                <p class="book-author">{{ book.author }}</p>
                <div class="book-rating">
                  <span class="rating-stars">
                    <span v-for="i in 5" :key="i" class="star"
                      :class="{ 'filled': i <= Math.floor(book.rating) }">★</span>
                  </span>
                  <span class="rating-value">{{ book.rating }}</span>
                </div>
                <p class="book-price">Rs.{{ book.price }}</p>
              </div>
            </router-link>
            <button @click="addToCart(book)" class="btn btn-primary add-to-cart-btn">Add to cart</button>
          </div>
        </div>
        <div class="view-all">
          <router-link to="/products" class="btn btn-secondary">View all books</router-link>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="section-title">About Us</h2>
            <p>Fresh Fresh is a professional online book sales platform. We provide all kinds of high-quality books,
              including literature, science, art, history, philosophy and other fields. We are committed to providing
              readers with the best reading experience and services. </p>
            <p>Our mission is to help readers expand their knowledge boundaries and improve their personal literacy
              through high-quality books. </p>
            <div class="about-features">
              <div class="feature">
                <h3>Selected books</h3>
                <p>We carefully select each book to ensure both quality and content</p>
              </div>
              <div class="feature">
                <h3>Fast delivery</h3>
                <p>Ship within 24 hours after placing an order, so that you can receive your favorite books as soon as
                  possible</p>
              </div>
              <div class="feature">
                <h3>Quality service</h3>
                <p>Professional customer service team to answer any questions you have</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories">
      <div class="container">
        <h2 class="section-title">Book categories</h2>
        <div class="category-grid">
          <div v-for="category in categories" :key="category.name" class="category-card">
            <router-link :to="`/products?category=${category.name}`">
              <h3 class="category-name">{{ category.name }}</h3>
              <p class="category-count">{{ category.count }}books</p>
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'Home',
  computed: {
    featuredBooks() {
      return this.$store.state.books.filter(book => book.featured).slice(0, 4)
    },
    categories() {
      const categoryMap = new Map()

      this.$store.state.books.forEach(book => {
        if (categoryMap.has(book.category)) {
          categoryMap.set(book.category, categoryMap.get(book.category) + 1)
        } else {
          categoryMap.set(book.category, 1)
        }
      })

      return Array.from(categoryMap).map(([name, count]) => ({ name, count }))
    }
  },
  methods: {
    addToCart(book) {
      this.$store.dispatch('addToCart', { book, quantity: 1 })
    }
  }
}
</script>

<style scoped>
/* Hero Section */
.hero {
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/library-background.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  padding: 100px 0;
  margin-bottom: 50px;
  text-align: center;
}

.hero-title {
  font-size: 48px;
  margin-bottom: 20px;
}

.hero-text {
  font-size: 20px;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Featured Books */
.featured {
  padding: 50px 0;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.book-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  overflow: hidden;
}

.book-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.book-image {
  height: 250px;
  overflow: hidden;
}

.book-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.book-info {
  padding: 15px;
}

.book-title {
  font-size: 18px;
  margin-bottom: 5px;
  color: #2c3e50;
}

.book-author {
  color: #7f8c8d;
  margin-bottom: 10px;
}

.book-rating {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.rating-stars {
  color: #bdc3c7;
  margin-right: 5px;
}

.star.filled {
  color: #f1c40f;
}

.rating-value {
  font-weight: bold;
  color: #f1c40f;
}

.book-price {
  font-size: 18px;
  font-weight: bold;
  color: #e74c3c;
}

.add-to-cart-btn {
  width: 100%;
  border-radius: 0;
}

.view-all {
  text-align: center;
  margin-top: 40px;
}

/* About Section */
.about {
  padding: 50px 0;
  background-color: #ecf0f1;
}

.about-content {
  display: flex;
  align-items: center;
  justify-content: center;
}

.about-text {
  max-width: 800px;
  text-align: center;
}

.about-features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.feature {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.feature h3 {
  color: #3498db;
  margin-bottom: 10px;
}

/* Categories Section */
.categories {
  padding: 50px 0;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.category-card {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  background-color: #3498db;
  color: white;
}

.category-card:hover .category-name,
.category-card:hover .category-count {
  color: white;
}

.category-name {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 5px;
}

.category-count {
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 36px;
  }

  .hero-text {
    font-size: 18px;
  }

  .about-content {
    flex-direction: column;
  }

  .about-image {
    margin-bottom: 30px;
  }
}
</style>
