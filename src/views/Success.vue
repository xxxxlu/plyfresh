<template>
  <div class="success">
    <div class="container">
      <div class="decorative-border top-left"></div>
      <div class="decorative-border top-right"></div>
      <div class="decorative-border bottom-left"></div>
      <div class="decorative-border bottom-right"></div>
      <h1 class="section-title">Order completed</h1>
      <div class="decorative-line"></div>

      <!-- Checkout Steps -->
      <div class="checkout-steps">
        <div class="step completed">
          <div class="step-number">1</div>
          <div class="step-label">Shopping cart confirmation</div>
        </div>
        <div class="step-connector completed"></div>
        <div class="step completed">
          <div class="step-number">2</div>
          <div class="step-label">Shipping information</div>
        </div>
        <div class="step-connector completed"></div>
        <div class="step active">
          <div class="step-number">3</div>
          <div class="step-label">Complete order</div>
        </div>
      </div>

      <div class="success-content">
        <div class="success-message">
          <div class="success-icon">
            <span class="material-icons">check_circle</span>
          </div>
          <h2>Order submitted successfully! </h2>
          <p>Your order number: <strong>{{ orderNumber }}</strong></p>
          <p class="success-text">Thank you for your purchase! We have received your order and will process it as soon
            as possible. A confirmation email has been sent to your email. </p>
        </div>

        <div class="order-details">
          <h2 class="section-subtitle">Order details</h2>

          <div class="order-info">
            <div class="order-info-section">
              <h3>Delivery information</h3>
              <p>
                <strong>{{ customer.lastName }}{{ customer.firstName }}</strong><br>
                {{ customer.address }}<br>
                {{ customer.city }}, {{ customer.state }} {{ customer.zip }}<br>
                {{ customer.phone }}<br>
                {{ customer.email }}
              </p>
            </div>

            <div class="order-info-section">
              <h3>Payment method</h3>
              <p>{{ paymentMethodName }}</p>
            </div>

            <div class="order-info-section">
              <h3>Estimated delivery time</h3>
              <p>{{ deliveryDate }}</p>
            </div>
          </div>

          <div class="order-items">
            <h3>Purchased items</h3>

            <div class="order-item" v-for="item in cartItems" :key="item.id">
              <div class="order-item-image">
                <img :src="item.image" :alt="item.title">
              </div>
              <div class="order-item-info">
                <h4 class="order-item-title">{{ item.title }}</h4>
                <p class="order-item-author">Origin: {{ item.author }}</p>
                <div class="order-item-price-qty">
                  <span class="order-item-price">Rs.{{ item.price }}</span>
                  <span class="order-item-qty">× {{ item.quantity }}</span>
                  <span class="order-item-total">Rs.{{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>

          <div class="order-summary">
            <div class="summary-row">
              <span>Item quantity:</span>
              <span>{{ totalItems }} items</span>
            </div>
            <div class="summary-row">
              <span>Total product price:</span>
              <span>Rs.{{ cartTotal }}</span>
            </div>
            <div class="summary-row">
              <span>Shipping fee:</span>
              <span>Free shipping</span>
            </div>
            <div class="summary-divider"></div>
            <div class="summary-row total"> <span>Order total:</span>
              <span>Rs.{{ cartTotal }}</span>
            </div>
          </div>
        </div>

        <div class="success-actions">
          <router-link to="/products" class="btn btn-primary" @click="continueShopping">
            Continue shopping
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Success',
  data() {
    return {
      orderNumber: this.generateOrderNumber()
    }
  },
  computed: {
    cartItems() {
      return this.$store.state.cart
    },
    totalItems() {
      return this.$store.getters.totalItems
    },
    cartTotal() {
      return this.$store.getters.cartTotal
    },
    customer() {
      return this.$store.state.checkoutInfo?.customer || {}
    },
    paymentMethod() {
      return this.$store.state.checkoutInfo?.paymentMethod || 'alipay'
    },
    paymentMethodName() {
      const methods = {
        easypaisapay: 'easypaisapay',
        jazzcash: 'jazzcash',
      }
      return methods[this.paymentMethod] || 'easypaisapay'
    },
    deliveryDate() {
      const today = new Date()
      const deliveryDate = new Date(today)
      deliveryDate.setDate(today.getDate() + 3)

      return deliveryDate.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }
  },
  methods: {
    generateOrderNumber() {
      const prefix = 'BS'
      const timestamp = new Date().getTime().toString().slice(-8)
      const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
      return `${prefix}${timestamp}${random}`
    },
    continueShopping() {
      // Clear cart after order is complete
      this.$store.dispatch('clearCart')
    }
  },
  created() {
    // If cart is empty or no checkout info, redirect to home
    if (this.cartItems.length === 0 || !this.$store.state.checkoutInfo) {
      this.$router.push('/')
    }
  },
  beforeRouteLeave(to, from, next) {
    // Clear cart when navigating away from success page
    this.$store.dispatch('clearCart')
    next()
  }
}
</script>

<style scoped>
.success {
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

.step.completed .step-number {
  background-color: #121212;
  opacity: 0.8;
}

.step-connector {
  width: 100px;
  height: 1px;
  background-color: #cccccc;
  margin: 0 15px;
}

.step-connector.completed {
  background-color: #121212;
  opacity: 0.8;
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

.step.completed .step-label {
  color: #121212;
  font-weight: 600;
  opacity: 0.8;
}

.success-content {
  max-width: 800px;
  margin: 0 auto;
}

.success-message {
  background-color: white;
  border: 1px solid #e0e0e0;
  padding: 40px;
  text-align: center;
  margin-bottom: 40px;
  position: relative;
}

.success-message:before {
  content: '';
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border: 1px solid rgba(18, 18, 18, 0.05);
  pointer-events: none;
}

.success-icon {
  font-size: 70px;
  color: #121212;
  margin-bottom: 25px;
}

.success-message h2 {
  font-size: 28px;
  color: #121212;
  margin-bottom: 15px;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.success-text {
  font-size: 16px;
  color: #666666;
  margin-top: 20px;
  font-family: 'Playfair Display', serif;
  line-height: 1.6;
}

.order-details {
  background-color: white;
  border: 1px solid #e0e0e0;
  padding: 40px;
  margin-bottom: 40px;
  position: relative;
}

.order-details:before {
  content: '';
  position: absolute;
  top: 15px;
  left: 15px;
  right: 15px;
  bottom: 15px;
  border: 1px solid rgba(18, 18, 18, 0.05);
  pointer-events: none;
}

.section-subtitle {
  font-size: 24px;
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

.decorative-line {
  height: 1px;
  width: 120px;
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

.order-info {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 30px;
  gap: 20px;
}

.order-info-section {
  flex: 1;
  min-width: 200px;
}

.order-info-section h3 {
  font-size: 18px;
  color: #121212;
  margin-bottom: 12px;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.order-items {
  margin-bottom: 30px;
}

.order-items h3 {
  font-size: 18px;
  color: #121212;
  margin-bottom: 18px;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  padding-bottom: 8px;
}

.order-items h3:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 1px;
  background-color: #121212;
}

.order-item {
  display: flex;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;
}

.order-item:last-child {
  border-bottom: none;
}

.order-item-image {
  width: 60px;
  height: 90px;
  overflow: hidden;
  margin-right: 15px;
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
  font-size: 16px;
  margin-bottom: 6px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}

.order-item-author {
  color: #666666;
  font-size: 14px;
  margin-bottom: 10px;
  font-family: 'Playfair Display', serif;
  font-style: italic;
}

.order-item-price-qty {
  display: flex;
  justify-content: space-between;
  max-width: 300px;
}

.order-item-price {
  color: #666666;
  font-family: 'Playfair Display', serif;
}

.order-item-qty {
  color: #666666;
  font-family: 'Playfair Display', serif;
}

.order-item-total {
  font-weight: 600;
  color: #121212;
  font-family: 'Playfair Display', serif;
}

.order-summary {
  background-color: #f9f9f9;
  padding: 25px;
  border: 1px solid #e0e0e0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-size: 16px;
}

.success-actions .btn {
  padding: 12px 30px;
  font-size: 16px;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
  background-color: #121212;
  border-color: #121212;
  color: white;
  transition: all 0.3s ease;
}

.success-actions .btn:hover {
  background-color: white;
  color: #121212;
}

.summary-divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 18px 0;
}

.summary-row.total {
  font-size: 20px;
  font-weight: 700;
  color: #121212;
  font-family: 'Playfair Display', serif;
}

.success-actions {
  text-align: center;
  margin-top: 40px;
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

  .order-info {
    flex-direction: column;
  }

  .order-info-section {
    margin-bottom: 20px;
  }

  .order-item {
    flex-direction: column;
  }

  .order-item-image {
    width: 100%;
    height: 150px;
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>
