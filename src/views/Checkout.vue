<template>
  <div class="checkout">
    <div class="container">
      <div class="decorative-border top-left"></div>
      <div class="decorative-border top-right"></div>
      <div class="decorative-border bottom-left"></div>
      <div class="decorative-border bottom-right"></div>
      <h1 class="section-title">Checkout</h1>
      <div class="decorative-line"></div>

      <!-- Checkout Steps -->
      <div class="checkout-steps">
        <div class="step active">
          <div class="step-number">1</div>
          <div class="step-label">Shopping cart confirmation</div>
        </div>
        <div class="step-connector"></div>
        <div class="step">
          <div class="step-number">2</div>
          <div class="step-label">Shipping information</div>
        </div>
        <div class="step-connector"></div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-label">Complete order</div>
        </div>
      </div>

      <div v-if="cartItems.length > 0" class="checkout-content">
        <!-- Order Items -->
        <div class="order-items">
          <h2 class="section-subtitle">Order items</h2>

          <div class="order-item" v-for="item in cartItems" :key="item.id">
            <div class="order-item-image">
              <img :src="item.image" :alt="item.title">
            </div>
            <div class="order-item-info">
              <h3 class="order-item-title">{{ item.title }}</h3>
              <p class="order-item-author">Origin: {{ item.author }}</p>
              <div class="order-item-price-qty">
                <span class="order-item-price">Rs.{{ item.price }}</span>
                <span class="order-item-qty">× {{ item.quantity }}</span>
              </div>
              <div class="order-item-total">
                Subtotal: <span>Rs.{{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="order-summary">
          <h2 class="section-subtitle">Order Summary</h2>

          <div class="summary-row">
            <span>Quantity of Items:</span>
            <span>{{ totalItems }} 件</span>
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
            <span>Order total:</span>
            <span>Rs.{{ cartTotal }}</span>
          </div>

          <div class="summary-actions">
            <router-link to="/checkout/shipping" class="btn btn-success proceed-btn">
              Continue
            </router-link>
            <router-link to="/cart" class="btn btn-secondary back-btn">
              Return to shopping cart
            </router-link>
          </div>

          <div class="secure-checkout">
            <div class="secure-icon">
              <span class="material-icons">lock</span>
            </div>
            <p>Secure payment, data encryption protection</p>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="empty-checkout">
        <h2>Your shopping cart is empty</h2>
        <p>Please add items to the shopping cart before checking out. </p>
        <router-link to="/products" class="btn btn-primary">
          Browse Products
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Checkout',
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
  created() {
    // If cart is empty, redirect to cart page
    if (this.cartItems.length === 0) {
      this.$router.push('/cart')
    }
  }
}
</script>

<style scoped>
.checkout {
  padding: 40px 0;
  font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
  background-color: #fafafa;
  position: relative;
}

.checkout-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 50px;
  font-family: 'Playfair Display', serif;
}

.step {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.step-number {
  width: 40px;
  height: 40px;
  background-color: #666666;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 600;
  margin-bottom: 10px;
  position: relative;
}

.step-number:before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.step.active .step-number {
  background-color: #121212;
}

.step-connector {
  width: 100px;
  height: 1px;
  background-color: #cccccc;
  margin: 0 15px;
}

.step-label {
  color: #666666;
  font-size: 14px;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
}

.step.active .step-label {
  color: #121212;
  font-weight: 600;
}

.checkout-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.section-subtitle {
  font-size: 22px;
  margin-bottom: 25px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  position: relative;
  padding-bottom: 10px;
}

.section-subtitle:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 1px;
  background-color: #121212;
}

.order-items {
  flex: 2;
  min-width: 600px;
}

.order-item {
  display: flex;
  padding: 25px;
  background-color: white;
  border: 1px solid #e0e0e0;
  margin-bottom: 20px;
  position: relative;
}

.order-item:before {
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

.order-item-image {
  width: 80px;
  height: 120px;
  overflow: hidden;
  margin-right: 20px;
  border-radius: 4px;
}

.order-item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.order-item-info {
  flex: 1;
}

.order-item-title {
  font-size: 18px;
  margin-bottom: 8px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}

.order-item-author {
  color: #666666;
  margin-bottom: 15px;
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

.order-item-price-qty {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.order-item-price {
  font-weight: bold;
}

.order-item-total {
  text-align: right;
  font-weight: 600;
  color: #121212;
  font-family: 'Playfair Display', serif;
}

.order-summary {
  flex: 1;
  min-width: 300px;
  background-color: white;
  border: 1px solid #e0e0e0;
  padding: 30px;
  align-self: flex-start;
  position: relative;
}

.order-summary:before {
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
}

.summary-row.total {
  font-size: 20px;
  font-weight: 700;
  color: #121212;
  font-family: 'Playfair Display', serif;
}

.summary-actions {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.proceed-btn,
.back-btn {
  width: 100%;
  padding: 12px 20px;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  border: 1px solid;
  margin-bottom: 10px;
}

.proceed-btn {
  background-color: #121212;
  border-color: #121212;
  color: white;
}

.proceed-btn:hover {
  background-color: white;
  color: #121212;
}

.back-btn {
  background-color: white;
  border-color: #121212;
  color: #121212;
}

.back-btn:hover {
  background-color: #f5f5f5;
}

.secure-checkout {
  margin-top: 30px;
  text-align: center;
  color: #666666;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

.secure-icon {
  margin-right: 8px;
  color: #121212;
}

.empty-checkout {
  text-align: center;
  padding: 60px;
  background-color: white;
  border: 1px solid #e0e0e0;
  position: relative;
}

.empty-checkout:before {
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

.empty-checkout h2 {
  font-size: 26px;
  margin-bottom: 15px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.empty-checkout p {
  color: #666666;
  margin-bottom: 25px;
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

@media (max-width: 992px) {
  .order-items {
    min-width: 100%;
  }

  .order-summary {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .checkout-steps {
    flex-direction: column;
    gap: 10px;
  }

  .step-connector {
    width: 2px;
    height: 20px;
    margin: 5px 0;
  }

  .order-item {
    flex-direction: column;
  }

  .order-item-image {
    width: 100%;
    height: 200px;
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>
