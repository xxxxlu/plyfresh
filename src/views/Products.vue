<template>
  <div class="products">
    <div class="container">
      <h1 class="section-title">All books</h1>

      <!-- Filters -->
      <div class="filters">
        <div class="filter-group">
          <label for="category">Category:</label>
          <select id="category" v-model="selectedCategory" class="filter-select">
            <option value="">All categories</option>
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
          <input type="text" id="search" v-model="searchQuery" placeholder="Search for book title or author..."
            class="search-input">
        </div>
      </div>

      <!-- Books Grid -->
      <div v-if="filteredBooks.length > 0" class="book-grid">
        <div v-for="book in filteredBooks" :key="book.id" class="book-card">
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
                </span> <span class="rating-value">{{ book.rating }}</span>
              </div>
              <p class="book-price">Rs.{{ book.price }}</p>
            </div>
          </router-link>
          <button @click="addToCart(book)" class="btn btn-primary add-to-cart-btn">Add to cart</button>
        </div>
      </div>

      <!-- No Results -->
      <div v-else class="no-results">
        <p>No books matching the criteria were found. </p>
        <button @click="resetFilters" class="btn btn-secondary">Reset filter</button>
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
  padding: 20px 0;
}

.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-bottom: 30px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.filter-group {
  flex: 1;
  min-width: 200px;
}

.filter-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #2c3e50;
}

.filter-select,
.search-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.book-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
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

.no-results {
  text-align: center;
  padding: 50px 0;
}

.no-results p {
  font-size: 18px;
  margin-bottom: 20px;
  color: #7f8c8d;
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
