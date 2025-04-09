<template>
  <div class="cart">
    <div class="container">
      <div class="decorative-border top-left"></div>
      <div class="decorative-border top-right"></div>
      <div class="decorative-border bottom-left"></div>
      <div class="decorative-border bottom-right"></div>
      <h1 class="section-title">Shopping Cart</h1>
      <div class="decorative-line"></div>

      <div v-if="cartItems.length > 0" class="cart-content">
        <!-- Cart Items -->
        <div class="cart-items">
          <div class="cart-header">
            <div class="cart-item-product">Product</div>
            <div class="cart-item-price">Unit price</div>
            <div class="cart-item-quantity">Quantity</div>
            <div class="cart-item-total">Subtotal</div>
            <div class="cart-item-actions">Actions</div>
          </div>

          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <div class="cart-item-product">
              <div class="cart-item-image">
                <img :src="item.image" :alt="item.title">
              </div>
              <div class="cart-item-details">
                <router-link :to="`/products/${item.id}`" class="cart-item-title">
                  {{ item.title }}
                </router-link>
                <p class="cart-item-author">Origin: {{ item.author }}</p>
              </div>
            </div>

            <div class="cart-item-price">
              Rs.{{ item.price }}
            </div>

            <div class="cart-item-quantity">
              <div class="quantity-control">
                <button @click="updateQuantity(item.id, item.quantity - 1)" class="quantity-btn"
                  :disabled="item.quantity <= 1">-</button>
                <input type="number" v-model.number="item.quantity" min="1" class="quantity-input"
                  @change="updateQuantity(item.id, item.quantity)">
                <button @click="updateQuantity(item.id, item.quantity + 1)" class="quantity-btn">+</button>
              </div>
            </div>

            <div class="cart-item-total">
              Rs.{{ (item.price * item.quantity).toFixed(2) }}
            </div>

            <div class="cart-item-actions">
              <button @click="removeFromCart(item.id)" class="btn btn-danger">Remove</button>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <div class="cart-summary">
          <h2 class="summary-title">Order Summary</h2>

          <div class="summary-row">
            <span>Quantity of Items:</span>
            <span>{{ totalItems }} pieces</span>
          </div>

          <div class="summary-row">
            <span>Total Price of Items:</span>
            <span>Rs.{{ cartTotal }}</span>
          </div>

          <div class="summary-row">
            <span>Shipping Fee:</span>
            <span>Free Shipping</span>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row total">
            <span>Order Total:</span>
            <span>Rs.{{ cartTotal }}</span>
          </div>

          <div class="summary-actions">
            <router-link to="/checkout" class="btn btn-success checkout-btn">
              Checkout
            </router-link>
            <router-link to="/products" class="btn btn-secondary continue-btn">
              Continue shopping
            </router-link>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="empty-cart">
        <div class="empty-cart-icon">
          <span class="material-icons">shopping_cart</span>
        </div>
        <h2>The shopping cart is empty</h2>
        <p>There are no items in your shopping cart yet. </p>
        <router-link to="/products" class="btn btn-primary">
          Browse Products
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  computed: {
    cartItems() {
      return this.$store.state.cart
    },
    totalItems() {
      return this.$store.getters.totalItems
    },
    cartTotal() {
      return this.$store.getters.cartTotal
    }
  },
  methods: {
    updateQuantity(bookId, quantity) {
      if (quantity < 1) return

      this.$store.dispatch('updateQuantity', { bookId, quantity })
    },
    removeFromCart(bookId) {
      this.$store.dispatch('removeFromCart', bookId)
    }
  }
}
</script>

<style scoped>
.cart {
  padding: 40px 0;
  font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
  background-color: #fafafa;
  position: relative;
}

.cart-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.cart-items {
  flex: 2;
  min-width: 600px;
  background-color: white;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  position: relative;
}

.cart-items:before {
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

.cart-header {
  display: flex;
  align-items: center;
  padding: 20px 15px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 600;
  color: #121212;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #ddd;
}

.cart-item:last-child {
  border-bottom: none;
}

.cart-item-product {
  flex: 3;
  display: flex;
  align-items: center;
}

.cart-item-price,
.cart-item-quantity,
.cart-item-total,
.cart-item-actions {
  flex: 1;
  text-align: center;
}

.cart-item-image {
  width: 80px;
  height: 120px;
  overflow: hidden;
  margin-right: 15px;
  border-radius: 4px;
}

.cart-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cart-item-details {
  flex: 1;
}

.cart-item-title {
  font-weight: 600;
  color: #121212;
  margin-bottom: 8px;
  display: block;
  font-family: 'Playfair Display', serif;
  transition: color 0.3s ease;
}

.cart-item-title:hover {
  color: #666666;
}

.cart-item-author {
  color: #666666;
  font-size: 14px;
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

.cart-item-price {
  font-weight: bold;
}

.quantity-control {
  display: inline-flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  overflow: hidden;
}

.quantity-btn {
  background-color: #f9f9f9;
  border: none;
  width: 30px;
  height: 30px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quantity-btn:hover {
  background-color: #121212;
  color: white;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-input {
  width: 40px;
  height: 30px;
  text-align: center;
  border: none;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  font-family: 'Playfair Display', serif;
}

.cart-item-total {
  font-weight: 600;
  color: #121212;
  font-family: 'Playfair Display', serif;
}

.cart-summary {
  flex: 1;
  min-width: 300px;
  background-color: white;
  border: 1px solid #e0e0e0;
  padding: 30px;
  align-self: flex-start;
  position: relative;
}

.cart-summary:before {
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

.summary-title {
  font-size: 22px;
  margin-bottom: 25px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  text-align: center;
  position: relative;
  padding-bottom: 15px;
}

.summary-title:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 40px;
  height: 1px;
  background-color: #121212;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
}

.summary-divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
  position: relative;
}

.summary-divider:before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 30px;
  height: 3px;
  background-color: rgba(18, 18, 18, 0.1);
}

.summary-row.total {
  font-size: 20px;
  font-weight: 700;
  color: #121212;
  font-family: 'Playfair Display', serif;
}

.summary-actions {
  margin-top: 20px;
}

.checkout-btn, .continue-btn {
  width: 100%;
  padding: 12px 20px;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border: 1px solid;
}

.checkout-btn {
  margin-bottom: 10px;
  background-color: #121212;
  border-color: #121212;
  color: white;
}

.checkout-btn:hover {
  background-color: white;
  color: #121212;
}

.continue-btn {
  background-color: white;
  border-color: #121212;
  color: #121212;
}

.continue-btn:hover {
  background-color: #f5f5f5;
}

.empty-cart {
  text-align: center;
  padding: 60px;
  background-color: white;
  border: 1px solid #e0e0e0;
  position: relative;
}

.empty-cart:before {
  content: '';
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  bottom: 20px;
  border: 1px solid rgba(18, 18, 18, 0.05);
  pointer-events: none;
  z-index: 1;
}

.empty-cart-icon {
  font-size: 80px;
  color: #bdc3c7;
  margin-bottom: 20px;
}

.empty-cart h2 {
  font-size: 26px;
  margin-bottom: 15px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.empty-cart p {
  color: #666666;
  margin-bottom: 25px;
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

@media (max-width: 992px) {
  .cart-items {
    min-width: 100%;
  }

  .cart-summary {
    min-width: 100%;
    order: -1;
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .cart-header {
    display: none;
  }

  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .cart-item>div {
    width: 100%;
    text-align: left;
    margin-bottom: 10px;
  }

  .cart-item-product {
    margin-bottom: 15px;
  }

  .cart-item-price::before,
  .cart-item-quantity::before,
  .cart-item-total::before {
    content: attr(class);
    font-weight: bold;
    margin-right: 10px;
    color: #7f8c8d;
  }

  .cart-item-actions {
    margin-top: 10px;
  }
}
</style>
