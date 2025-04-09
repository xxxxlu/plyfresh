<template>
  <div class="home">
    <!-- Hero Banner -->
    <section class="hero full-width-section">
      <div class="hero-image left-image">
        <img src="https://m.media-amazon.com/images/I/91Yq7gGLYDL._AC_UL640_FMwebp_QL65_.jpg" alt="Featured product left">
      </div>
      <div class="hero-image right-image">
        <img src="https://m.media-amazon.com/images/I/71lvR+0unJL._AC_UL640_FMwebp_QL65_.jpg" alt="Featured product right">
      </div>
      <div class="decorative-border top-left"></div>
      <div class="decorative-border top-right"></div>
      <div class="decorative-border bottom-left"></div>
      <div class="decorative-border bottom-right"></div>
      <div class="hero-content">
        <div class="decorative-line"></div>
        <h1 class="hero-title">Welcome to PlyFresh</h1>
        <p class="hero-text">Discover nature's freshest offerings carefully selected to nourish and delight</p>
        <router-link to="/products" class="btn btn-primary">Explore Collection</router-link>
        <div class="decorative-line"></div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="featured">
      <div class="container">
        <h2 class="section-title">Featured Fresh Products</h2>
        <div class="product-grid">
          <div v-for="book in featuredBooks" :key="book.id" class="book-card product-card">
            <router-link :to="`/products/${book.id}`">
              <div class="product-image">
                <img :src="book.image" :alt="book.title">
              </div>
              <div class="product-info">
                <h3 class="product-title">{{ book.title }}</h3>
                <p class="product-origin">{{ book.author }}</p>
                <div class="product-rating">
                  <span class="rating-stars">
                    <span v-for="i in 5" :key="i" class="star"
                      :class="{ 'filled': i <= Math.floor(book.rating) }">★</span>
                  </span>
                  <span class="rating-value">{{ book.rating }}</span>
                </div>
                <p class="product-price">Rs.{{ book.price }}</p>
              </div>
            </router-link>
            <button @click="addToCart(book)" class="btn btn-primary add-to-cart-btn">Add to cart</button>
          </div>
        </div>
        <div class="view-all">
          <router-link to="/products" class="btn btn-secondary">Browse All Products</router-link>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section class="about full-width-section">
      <div class="about-content">
        <div class="about-text">
          <h2 class="section-title">About PlyFresh</h2>
          <p>PlyFresh is a sanctuary for fresh product enthusiasts. We carefully curate a collection of exceptional fresh products that are locally sourced and sustainably grown.</p>
          <p>Our mission is to provide the freshest products in their most sublime forms, offering customers an opportunity to discover flavors that delight, nourish, and transform.</p>
          <div class="about-features">
            <div class="feature">
              <h3>Fresh Selection</h3>
              <p>Each product is thoughtfully selected for its freshness and nutritional value</p>
            </div>
            <div class="feature">
              <h3>Eco-Friendly Packaging</h3>
              <p>Products are carefully wrapped in sustainable materials and delivered in elegant packaging</p>
            </div>
            <div class="feature">
              <h3>Expert Selection</h3>
              <p>Our knowledgeable staff offers personalized recommendations and seasonal insights</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories full-width-section">
      <div class="section-content">
        <h2 class="section-title">Product Categories</h2>
        <div class="category-grid">
          <div v-for="category in categories" :key="category.name" class="category-card product-card">
            <router-link :to="`/products?category=${category.name}`">
              <h3 class="category-name">{{ category.name }}</h3>
              <p class="category-count">{{ category.count }} items</p>
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
  background: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('/images/library-background.jpg');
  background-size: cover;
  background-position: center;
  color: white;
  text-align: center;
  padding: 0;
  position: relative;
  width: 100vw;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  overflow: hidden;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.hero-image {
  position: absolute;
  height: 80%;
  z-index: 0;
  opacity: 0.7;
  transition: all 0.3s ease;
}

.hero-image img {
  height: 100%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.left-image {
  left: 40px;
}

.right-image {
  right: 40px;
}

.hero:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.5);
}

.decorative-border {
  position: absolute;
  width: 50px;
  height: 50px;
  border-color: rgba(255, 255, 255, 0.4);
  z-index: 1;
}

.top-left {
  top: 30px;
  left: 30px;
  border-top: 1px solid;
  border-left: 1px solid;
}

.top-right {
  top: 30px;
  right: 30px;
  border-top: 1px solid;
  border-right: 1px solid;
}

.bottom-left {
  bottom: 30px;
  left: 30px;
  border-bottom: 1px solid;
  border-left: 1px solid;
}

.bottom-right {
  bottom: 30px;
  right: 30px;
  border-bottom: 1px solid;
  border-right: 1px solid;
}

.decorative-line {
  height: 1px;
  width: 150px;
  background-color: rgba(255, 255, 255, 0.5);
  margin: 20px auto;
}

.hero-title {
  font-size: 65px;
  margin-bottom: 25px;
  font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
  font-weight: 700;
  letter-spacing: 3px;
  line-height: 1.2;
  position: relative;
  display: inline-block;
  text-transform: capitalize;
}

.hero-text {
  font-size: 20px;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
  font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
  line-height: 1.8;
  font-style: italic;
  letter-spacing: 1px;
  color: rgba(255, 255, 255, 0.9);
}

.hero-content {
  position: relative;
  padding: 30px;
  max-width: 900px;
  margin: 0 auto;
  box-sizing: border-box;
  z-index: 2;
  animation: fadeIn 1.5s ease-in-out;
  background: rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(5px);
}

.hero-left-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 40%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
}

.hero-right-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 40%;
  height: 100%;
  background-size: cover;
  background-position: center;
  z-index: 1;
}

/* Featured Products */
.featured {
  padding: 50px 0;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
  margin-top: 30px;
}

.product-card {
  background-color: white;
  border: 1px solid #e0e0e0;
  transition: transform 0.3s, border-color 0.3s;
  overflow: hidden;
  position: relative;
}

.product-card {
  position: relative;
}

.product-card:before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid rgba(18, 18, 18, 0.05);
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover:before {
  opacity: 1;
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: #121212;
}

.product-card:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background-color: #121212;
  transition: width 0.3s ease;
}

.product-card:hover:after {
  width: 100%;
}

.product-image {
  height: 250px;
  overflow: hidden;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 15px;
}

.product-title {
  font-size: 18px;
  margin-bottom: 5px;
  color: #121212;
  font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
  font-weight: 600;
}

.product-origin {
  color: #666666;
  margin-bottom: 10px;
  font-style: italic;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.rating-stars {
  color: #bdc3c7;
  margin-right: 5px;
}

.star.filled {
  color: #121212;
}

.rating-value {
  font-weight: bold;
  color: #121212;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #121212;
}

.add-to-cart-btn {
  width: 100%;
  border-radius: 0;
}

.view-all {
  text-align: center;
  margin-top: 40px;
}

.section-title {
  text-align: center;
  position: relative;
  margin-bottom: 50px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 700;
  padding-bottom: 15px;
}

.section-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 1px;
  background-color: #121212;
}

/* About Section */
.about {
  padding: 70px 40px;
  background-color: #f5f5f5;
  position: relative;
  width: 100%;
  box-sizing: border-box;
}

.about:before {
  content: '"';
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Playfair Display', serif;
  font-size: 120px;
  color: #e0e0e0;
  z-index: 0;
}

.about-content {
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 1280px;
  margin: 0 auto;
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
  padding: 30px;
  border: 1px solid #e0e0e0;
  position: relative;
  transition: transform 0.3s ease;
}

.feature:hover {
  transform: translateY(-5px);
}

.feature h3 {
  color: #121212;
  margin-bottom: 15px;
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  position: relative;
  padding-bottom: 10px;
}

.feature h3:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 1px;
  background-color: #121212;
}

/* Categories Section */
.categories {
  padding: 50px 40px;
  width: 100%;
  box-sizing: border-box;
}

.section-content {
  max-width: 1280px;
  margin: 0 auto;
}

.category-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.category-card {
  background-color: white;
  padding: 30px 20px;
  border: 1px solid #e0e0e0;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-5px);
  border-color: #121212;
}

.category-card:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: #121212;
  transition: height 0.3s ease;
  z-index: 0;
}

.category-card:hover:before {
  height: 100%;
}

.category-card a {
  position: relative;
  z-index: 1;
}

.category-card:hover .category-name,
.category-card:hover .category-count {
  color: white;
}

.category-name {
  font-size: 20px;
  color: #121212;
  margin-bottom: 8px;
  font-family: 'Playfair Display', serif;
  transition: color 0.3s ease;
}

.category-count {
  color: #666666;
  font-style: italic;
  transition: color 0.3s ease;
}

@media (max-width: 768px) {
  .hero {
    height: 100vh; /* Keep full height on mobile */
  }
  
  .hero-title {
    font-size: 36px;
  }

  .hero-text {
    font-size: 18px;
  }
  
  .hero-image {
    display: none; /* Hide side images on mobile */
  }

  .about-content {
    flex-direction: column;
  }

  .about-image {
    margin-bottom: 30px;
  }
}

/* Animation for hero content */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Literary elements */
.full-width-section {
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
}

/* Fresh styling */
.about-text p {
  position: relative;
  padding: 0 20px;
  line-height: 1.8;
}

.about-text p:before,
.about-text p:after {
  content: '';
  position: absolute;
  height: 20px;
  width: 20px;
  opacity: 0.2;
}

.about-text p:before {
  left: 0;
  top: 0;
  border-top: 1px solid #121212;
  border-left: 1px solid #121212;
}

.about-text p:after {
  right: 0;
  bottom: 0;
  border-bottom: 1px solid #121212;
  border-right: 1px solid #121212;
}
</style>
