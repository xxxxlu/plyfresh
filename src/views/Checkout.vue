<template>
  <div class="checkout">
    <div class="container">
      <h1 class="section-title">Checkout</h1>

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
              <p class="order-item-author">{{ item.author }}</p>
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
          Browse books
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
  padding: 20px 0;
}

.checkout-steps {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
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
  background-color: #bdc3c7;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  margin-bottom: 10px;
}

.step.active .step-number {
  background-color: #3498db;
}

.step-connector {
  width: 100px;
  height: 2px;
  background-color: #bdc3c7;
  margin: 0 10px;
}

.step-label {
  color: #7f8c8d;
  font-size: 14px;
}

.step.active .step-label {
  color: #3498db;
  font-weight: bold;
}

.checkout-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.section-subtitle {
  font-size: 20px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.order-items {
  flex: 2;
  min-width: 600px;
}

.order-item {
  display: flex;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
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
  margin-bottom: 5px;
  color: #2c3e50;
}

.order-item-author {
  color: #7f8c8d;
  margin-bottom: 15px;
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
  font-weight: bold;
  color: #e74c3c;
}

.order-summary {
  flex: 1;
  min-width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
  align-self: flex-start;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
}

.summary-divider {
  height: 1px;
  background-color: #ddd;
  margin: 15px 0;
}

.summary-row.total {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
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
}

.secure-checkout {
  margin-top: 20px;
  text-align: center;
  color: #7f8c8d;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.secure-icon {
  margin-right: 5px;
  color: #2ecc71;
}

.empty-checkout {
  text-align: center;
  padding: 50px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.empty-checkout h2 {
  font-size: 24px;
  margin-bottom: 10px;
  color: #2c3e50;
}

.empty-checkout p {
  color: #7f8c8d;
  margin-bottom: 20px;
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
