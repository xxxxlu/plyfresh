<template>
  <div class="products">
    <div class="decorative-border top-left"></div>
    <div class="decorative-border top-right"></div>
    <div class="decorative-border bottom-left"></div>
    <div class="decorative-border bottom-right"></div>
    <div class="container">
      <h1 class="section-title">PlyFresh Collection</h1>
      <div class="decorative-line"></div>

      <!-- Filters -->
      <div class="filters">
        <div class="filter-group">
          <label for="category">Category:</label>
          <select id="category" v-model="selectedCategory" class="filter-select">
            <option value="">All Categories</option>
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="sort">Sort:</label>
          <select id="sort" v-model="sortBy" class="filter-select">
            <option value="title">By book title</option>
            <option value="priceAsc">Price (low to high)</option>
            <option value="priceDesc">Price (high to low)</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <div class="filter-group">
          <label for="search">Search:</label>
          <input type="text" id="search" v-model="searchQuery" placeholder="Search by title or author..."
            class="search-input">
        </div>
      </div>

      <!-- Books Grid -->
      <div v-if="filteredBooks.length > 0" class="product-grid">
        <div v-for="book in filteredBooks" :key="book.id" class="product-card elegant-card">
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
                </span> <span class="rating-value">{{ book.rating }}</span>
              </div>
              <p class="product-price">Rs.{{ book.price }}</p>
            </div>
          </router-link>
          <button @click="addToCart(book)" class="btn btn-primary add-to-cart-btn">Add to cart</button>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="no-results">
        <div class="decorative-quote-mark left"></div>
        <p>No products match your selected criteria.</p>
        <div class="decorative-quote-mark right"></div>
        <button @click="resetFilters" class="btn btn-secondary">Reset Filters</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Products',
  data() {
    return {
      selectedCategory: '',
      sortBy: 'title',
      searchQuery: ''
    }
  },
  computed: {
    books() {
      return this.$store.state.books
    },
    categories() {
      const uniqueCategories = new Set()
      this.books.forEach(book => uniqueCategories.add(book.category))
      return Array.from(uniqueCategories).sort()
    },
    filteredBooks() {
      let result = [...this.books]

      // Apply category filter
      if (this.selectedCategory) {
        result = result.filter(book => book.category === this.selectedCategory)
      }

      // Apply search query
      if (this.searchQuery.trim() !== '') {
        const query = this.searchQuery.toLowerCase()
        result = result.filter(book =>
          book.title.toLowerCase().includes(query) ||
          book.author.toLowerCase().includes(query) ||
          book.description.toLowerCase().includes(query)
        )
      }

      // Apply sorting
      switch (this.sortBy) {
        case 'title':
          result.sort((a, b) => a.title.localeCompare(b.title))
          break
        case 'priceAsc':
          result.sort((a, b) => a.price - b.price)
          break
        case 'priceDesc':
          result.sort((a, b) => b.price - a.price)
          break
        case 'rating':
          result.sort((a, b) => b.rating - a.rating)
          break
      }

      return result
    }
  },
  methods: {
    addToCart(book) {
      this.$store.dispatch('addToCart', { book, quantity: 1 })
    },
    resetFilters() {
      this.selectedCategory = ''
      this.sortBy = 'title'
      this.searchQuery = ''
    }
  },
  created() {
    // Check if category is provided in the URL query
    const category = this.$route.query.category
    if (category && this.categories.includes(category)) {
      this.selectedCategory = category
    }
  }
}
</script>

<style scoped>
.products {
  padding: 60px 40px;
  font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
  position: relative;
  background-color: #fafafa;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 40px;
  padding: 30px;
  background-color: white;
  border: 1px solid #e0e0e0;
  position: relative;
}

.filters:before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid rgba(18, 18, 18, 0.05);
  pointer-events: none;
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #121212;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
}

.filter-select,
.search-input {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 0;
  font-size: 16px;
  font-family: 'Playfair Display', serif;
  transition: border-color 0.3s ease;
}

.filter-select:focus,
.search-input:focus {
  outline: none;
  border-color: #121212;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
}

.product-card {
  background-color: white;
  border: 1px solid #e0e0e0;
  transition: transform 0.3s, border-color 0.3s;
  overflow: hidden;
  position: relative;
}

.elegant-card {
  position: relative;
}

.elegant-card:before {
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

.elegant-card:hover:before {
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
  height: 1px;
  background-color: #121212;
  transition: width 0.3s ease;
}

.product-card:hover:after {
  width: 100%;
}

.product-image {
  height: 250px;
  overflow: hidden;
  position: relative;
}

.product-image:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0) 80%, rgba(0,0,0,0.05) 100%);
  pointer-events: none;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.product-info {
  padding: 20px 15px;
  position: relative;
}

.product-section-title {
  text-align: center;
  margin-bottom: 20px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 700;
  position: relative;
  letter-spacing: 1px;
}

.decorative-line {
  height: 1px;
  width: 150px;
  background-color: rgba(18, 18, 18, 0.3);
  margin: 0 auto 40px;
}

.decorative-border {
  position: absolute;
  width: 50px;
  height: 50px;
  border-color: rgba(18, 18, 18, 0.15);
  z-index: 1;
}

.top-left {
  top: 20px;
  left: 20px;
  border-top: 1px solid;
  border-left: 1px solid;
}

.top-right {
  top: 20px;
  right: 20px;
  border-top: 1px solid;
  border-right: 1px solid;
}

.bottom-left {
  bottom: 20px;
  left: 20px;
  border-bottom: 1px solid;
  border-left: 1px solid;
}

.bottom-right {
  bottom: 20px;
  right: 20px;
  border-bottom: 1px solid;
  border-right: 1px solid;
}

.product-title {
  font-size: 18px;
  margin-bottom: 8px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  position: relative;
  display: inline-block;
}

.product-title:after {
  content: '';
  position: absolute;
  bottom: -3px;
  left: 0;
  width: 30px;
  height: 1px;
  background-color: rgba(18, 18, 18, 0.3);
  transition: width 0.3s ease;
}

.product-card:hover .product-title:after {
  width: 100%;
}

.product-origin {
  color: #666666;
  margin-bottom: 10px;
  font-style: italic;
  letter-spacing: 0.5px;
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
  letter-spacing: 0.5px;
}

.add-to-cart-btn {
  width: 100%;
  border-radius: 0;
}

.no-results {
  text-align: center;
  padding: 60px 0;
  position: relative;
}

.no-results p {
  font-size: 20px;
  margin-bottom: 30px;
  color: #666666;
  font-family: 'Playfair Display', serif;
  font-style: italic;
  position: relative;
  display: inline-block;
  padding: 0 40px;
}

.decorative-quote-mark {
  position: absolute;
  width: 20px;
  height: 20px;
  opacity: 0.2;
}

.decorative-quote-mark.left {
  top: 60px;
  left: calc(50% - 100px);
  border-top: 1px solid #121212;
  border-left: 1px solid #121212;
}

.decorative-quote-mark.right {
  bottom: 70px;
  right: calc(50% - 100px);
  border-bottom: 1px solid #121212;
  border-right: 1px solid #121212;
}

@media (max-width: 768px) {
  .filters {
    flex-direction: column;
    gap: 15px;
  }

  .filter-group {
    width: 100%;
  }
}
</style>
