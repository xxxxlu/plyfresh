<template>
  <div class="product-detail">
    <div class="container" v-if="book">
      <!-- Breadcrumb -->
      <div class="breadcrumb">
        <router-link to="/">Home</router-link> &gt;
        <router-link to="/products">All products</router-link> &gt;
        <span>{{ book.title }}</span>
      </div>

      <div class="product-content">
        <!-- Product Image -->
        <div class="product-image">
          <img :src="book.image" :alt="book.title">
        </div>

        <!-- Product Info -->
        <div class="product-info">
          <h1 class="product-title">{{ book.title }}</h1>
          <p class="product-author">Origin: {{ book.author }}</p>

          <div class="product-rating">
            <span class="rating-stars">
              <span v-for="i in 5" :key="i" class="star" :class="{ 'filled': i <= Math.floor(book.rating) }">★</span>
            </span>
            <span class="rating-value">{{ book.rating }}</span>
            <span class="rating-count">({{ randomReviewCount }} reviews)</span>
          </div>

          <div class="product-category">
            Type: <router-link :to="`/products?category=${book.category}`">{{ book.category }}</router-link>
          </div>

          <div class="product-price">
            <span class="price">Rs.{{ book.price }}</span>
            <span class="original-price" v-if="hasDiscount">Rs.{{ (book.price * 1.2).toFixed(2) }}</span>
            <span class="discount" v-if="hasDiscount">20% off</span>
          </div>

          <div class="product-availability" v-if="book.available">
            <span class="available">In stock</span>
          </div>
          <div class="product-availability" v-else>
            <span class="unavailable">Not in stock</span>
          </div>

          <div class="product-actions">
            <div class="quantity-control">
              <button @click="decrementQuantity" class="quantity-btn" :disabled="quantity <= 1">-</button>
              <input type="number" v-model.number="quantity" min="1" class="quantity-input">
              <button @click="incrementQuantity" class="quantity-btn">+</button>
            </div>
            <button @click="addToCart" class="btn btn-primary add-to-cart-btn" :disabled="!book.available">
              Add to cart
            </button>
          </div>
        </div>
      </div>

      <!-- Product Description -->
      <div class="product-description">
        <div class="decorative-corner top-left"></div>
        <div class="decorative-corner top-right"></div>
        <div class="decorative-corner bottom-left"></div>
        <div class="decorative-corner bottom-right"></div>
        <h2>Product details</h2>
        <div class="decorative-line"></div>
        <p>{{ book.description }}</p>
      </div>

      <!-- Related Products -->
      <div class="related-books">
        <h2>You may also like</h2>
        <div class="decorative-line"></div>
        <div class="book-grid">
          <div v-for="relatedBook in relatedBooks" :key="relatedBook.id" class="book-card">
            <router-link :to="`/products/${relatedBook.id}`">
              <div class="book-image">
                <img :src="relatedBook.image" :alt="relatedBook.title">
              </div>
              <div class="book-info">
                <h3 class="book-title">{{ relatedBook.title }}</h3>
                <p class="book-author">Origin: {{ relatedBook.author }}</p>
                <p class="book-price">Rs.{{ relatedBook.price }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading or Not Found -->
    <div v-else class="not-found">
      <p>The product does not exist or has been removed. </p>
      <router-link to="/products" class="btn btn-primary">Browse all products</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductDetail',
  data() {
    return {
      quantity: 1,
      hasDiscount: true
    }
  },
  computed: {
    bookId() {
      return parseInt(this.$route.params.id)
    },
    book() {
      return this.$store.state.books.find(book => book.id === this.bookId)
    },
    relatedBooks() {
      if (!this.book) return []

      return this.$store.state.books
        .filter(book =>
          book.id !== this.bookId &&
          (book.category === this.book.category || book.author === this.book.author)
        )
        .slice(0, 4)
    },
    randomReviewCount() {
      return Math.floor(Math.random() * 200) + 50
    }
  },
  methods: {
    incrementQuantity() {
      this.quantity++
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--
      }
    },
    addToCart() {
      if (!this.book || !this.book.available) return

      this.$store.dispatch('addToCart', {
        book: this.book,
        quantity: this.quantity
      })
    }
  },
  watch: {
    '$route.params.id'() {
      // Reset quantity when navigating to a different book
      this.quantity = 1

      // Scroll to top when navigation changes
      window.scrollTo(0, 0)
    }
  }
}
</script>

<style scoped>
.product-detail {
  padding: 40px 0;
  font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
  background-color: #fafafa;
}

.breadcrumb {
  margin-bottom: 30px;
  font-size: 14px;
  color: #666666;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
}

.breadcrumb a {
  color: #3498db;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.product-content {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-bottom: 60px;
  position: relative;
}

.product-image {
  flex: 1;
  min-width: 300px;
  max-width: 450px;
  background-color: white;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  position: relative;
}

.product-image:before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid rgba(18, 18, 18, 0.05);
  pointer-events: none;
  z-index: 1;
}

.product-image img {
  width: 100%;
  height: auto;
  display: block;
}

.product-info {
  flex: 1;
  min-width: 300px;
}

.product-title {
  font-size: 32px;
  margin-bottom: 15px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  position: relative;
  padding-bottom: 15px;
}

.product-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 50px;
  height: 1px;
  background-color: #121212;
}

.product-author {
  font-size: 18px;
  color: #666666;
  margin-bottom: 20px;
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

.product-rating {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.rating-stars {
  font-size: 20px;
  color: #bdc3c7;
  margin-right: 5px;
}

.star.filled {
  color: #f1c40f;
}

.rating-value {
  font-weight: bold;
  font-size: 18px;
  color: #f1c40f;
  margin-right: 5px;
}

.rating-count {
  color: #7f8c8d;
}

.product-category {
  margin-bottom: 15px;
  color: #7f8c8d;
}

.product-category a {
  color: #3498db;
}

.product-category a:hover {
  text-decoration: underline;
}

.product-price {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.price {
  font-size: 28px;
  font-weight: bold;
  color: #e74c3c;
  margin-right: 10px;
}

.original-price {
  font-size: 18px;
  text-decoration: line-through;
  color: #7f8c8d;
  margin-right: 10px;
}

.discount {
  padding: 3px 8px;
  background-color: #e74c3c;
  color: white;
  border-radius: 4px;
  font-size: 14px;
}

.product-availability {
  margin-bottom: 20px;
}

.available {
  color: #2ecc71;
  font-weight: bold;
}

.unavailable {
  color: #e74c3c;
  font-weight: bold;
}

.product-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.quantity-control {
  display: flex;
  align-items: center;
  border: 1px solid #ddd;
  border-radius: 4px;
  overflow: hidden;
}

.quantity-btn {
  background-color: #f7f7f7;
  border: none;
  width: 40px;
  height: 40px;
  font-size: 18px;
  cursor: pointer;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  width: 50px;
  height: 40px;
  text-align: center;
  border: none;
  border-left: 1px solid #ddd;
  border-right: 1px solid #ddd;
}

.add-to-cart-btn {
  padding: 12px 30px;
  height: 44px;
  background-color: #121212;
  color: white;
  border: 1px solid #121212;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: white;
  color: #121212;
}

.add-to-cart-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.product-description {
  background-color: white;
  padding: 40px;
  border: 1px solid #e0e0e0;
  margin-bottom: 60px;
  position: relative;
}

.decorative-corner {
  position: absolute;
  width: 30px;
  height: 30px;
  border-color: rgba(18, 18, 18, 0.15);
}

.top-left {
  top: 15px;
  left: 15px;
  border-top: 1px solid;
  border-left: 1px solid;
}

.top-right {
  top: 15px;
  right: 15px;
  border-top: 1px solid;
  border-right: 1px solid;
}

.bottom-left {
  bottom: 15px;
  left: 15px;
  border-bottom: 1px solid;
  border-left: 1px solid;
}

.bottom-right {
  bottom: 15px;
  right: 15px;
  border-bottom: 1px solid;
  border-right: 1px solid;
}

.product-description h2 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  text-align: center;
}

.decorative-line {
  height: 1px;
  width: 100px;
  background-color: rgba(18, 18, 18, 0.3);
  margin: 0 auto 30px;
}

.product-description p {
  line-height: 1.8;
  color: #333;
  font-family: 'Playfair Display', serif;
  font-size: 16px;
}

.related-books {
  margin-bottom: 60px;
}

.related-books h2 {
  font-size: 28px;
  margin-bottom: 15px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  text-align: center;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

.book-card {
  background-color: white;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  transition: transform 0.3s;
  position: relative;
}

.book-card:before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border: 1px solid rgba(18, 18, 18, 0.05);
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-card:hover:before {
  opacity: 1;
}

.book-image {
  height: 200px;
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
  font-size: 16px;
  margin-bottom: 8px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}

.book-author {
  color: #666666;
  font-size: 14px;
  margin-bottom: 8px;
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

.book-price {
  font-weight: bold;
  color: #121212;
  font-family: 'Playfair Display', serif;
}

.not-found {
  text-align: center;
  padding: 50px 0;
}

.not-found p {
  font-size: 18px;
  margin-bottom: 20px;
  color: #7f8c8d;
}

@media (max-width: 768px) {
  .product-content {
    flex-direction: column;
    align-items: center;
  }

  .product-image {
    max-width: 100%;
  }

  .product-info {
    width: 100%;
  }
}
</style>
