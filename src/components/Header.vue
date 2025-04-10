<template>
  <header class="header">
    <div class="header-content">
        <div class="logo">
          <router-link to="/">
            <img src="../assets/plyfresh-logo.svg" alt="PlyFresh">
            <span class="logo-subtitle">Est. 2025</span>
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
  border-bottom: 1px solid #121212;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 10px 0;
  width: 100%;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 40px;
  max-width: 100%;
  margin: 0 auto;
}

.logo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.logo h1 {
  font-size: 28px;
  font-weight: bold;
  color: #121212;
  margin: 0;
  font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
  letter-spacing: 2px;
}

.logo-subtitle {
  font-size: 12px;
  color: #666;
  font-style: italic;
  letter-spacing: 1px;
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

.nav-link {
  font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
  position: relative;
}

.nav-link:hover {
  color: #666;
}

.nav-link:after {
  content: '';
  position: absolute;
  width: 0;
  height: 1px;
  bottom: -3px;
  left: 0;
  background-color: #121212;
  transition: width 0.3s;
}

.nav-link:hover:after {
  width: 100%;
}

.router-link-exact-active {
  color: #121212;
  font-weight: bold;
}

.router-link-exact-active:after {
  width: 100%;
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
  background-color: #121212;
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
