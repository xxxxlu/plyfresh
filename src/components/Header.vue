<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <router-link to="/">
            <h1>FRESH FRESH</h1>
          </router-link>
        </div>
        <nav class="nav">
          <ul class="nav-list">
            <li class="nav-item">
              <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/products" class="nav-link">All books</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/contact" class="nav-link">Contact us</router-link>
            </li>
          </ul>
        </nav>
        <div class="cart-icon">
          <router-link to="/cart" class="cart-link">
            <span class="material-icons">shopping_cart</span>
            <span v-if="cartItemCount > 0" class="cart-count">{{ cartItemCount }}</span>
          </router-link>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    cartItemCount() {
      return this.$store.getters.totalItems
    }
  }
}
</script>

<style scoped>
.header {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.logo h1 {
  font-size: 24px;
  font-weight: bold;
  color: #3498db;
  margin: 0;
}

.nav-list {
  display: flex;
  list-style: none;
}

.nav-item {
  margin: 0 15px;
}

.nav-link {
  font-size: 16px;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-link:hover {
  color: #3498db;
}

.router-link-exact-active {
  color: #3498db;
  font-weight: bold;
}

.cart-icon {
  position: relative;
}

.cart-link {
  display: flex;
  align-items: center;
}

.material-icons {
  font-size: 24px;
}

.cart-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: #e74c3c;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    padding: 10px 0;
  }

  .nav {
    margin: 15px 0;
  }

  .nav-item {
    margin: 0 10px;
  }

  .cart-icon {
    position: absolute;
    top: 20px;
    right: 20px;
  }
}
</style>
