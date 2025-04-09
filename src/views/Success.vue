<template>
  <div class="success">
    <div class="container">
      <h1 class="section-title">Order completed</h1>

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
                <p class="order-item-author">{{ item.author }}</p>
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

.step.completed .step-number {
  background-color: #2ecc71;
}

.step-connector {
  width: 100px;
  height: 2px;
  background-color: #bdc3c7;
  margin: 0 10px;
}

.step-connector.completed {
  background-color: #2ecc71;
}

.step-label {
  color: #7f8c8d;
  font-size: 14px;
}

.step.active .step-label {
  color: #3498db;
  font-weight: bold;
}

.step.completed .step-label {
  color: #2ecc71;
  font-weight: bold;
}

.success-content {
  max-width: 800px;
  margin: 0 auto;
}

.success-message {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
  text-align: center;
  margin-bottom: 30px;
}

.success-icon {
  font-size: 80px;
  color: #2ecc71;
  margin-bottom: 20px;
}

.success-message h2 {
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 15px;
}

.success-text {
  font-size: 16px;
  color: #7f8c8d;
  margin-top: 20px;
}

.order-details {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
  margin-bottom: 30px;
}

.section-subtitle {
  font-size: 22px;
  margin-bottom: 20px;
  color: #2c3e50;
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
  color: #2c3e50;
  margin-bottom: 10px;
}

.order-items {
  margin-bottom: 30px;
}

.order-items h3 {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 15px;
}

.order-item {
  display: flex;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
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
  margin-bottom: 5px;
  color: #2c3e50;
}

.order-item-author {
  color: #7f8c8d;
  font-size: 14px;
  margin-bottom: 10px;
}

.order-item-price-qty {
  display: flex;
  justify-content: space-between;
  max-width: 300px;
}

.order-item-price {
  color: #7f8c8d;
}

.order-item-qty {
  color: #7f8c8d;
}

.order-item-total {
  font-weight: bold;
  color: #e74c3c;
}

.order-summary {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 4px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
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

.success-actions {
  text-align: center;
  margin-top: 30px;
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
