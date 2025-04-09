<template>
  <div class="shipping">
    <div class="container">
      <h1 class="section-title">Shipping Information</h1>

      <!-- Checkout Steps -->
      <div class="checkout-steps">
        <div class="step completed">
          <div class="step-number">1</div>
          <div class="step-label">Shopping Cart Confirmation</div>
        </div>
        <div class="step-connector completed"></div>
        <div class="step active">
          <div class="step-number">2</div>
          <div class="step-label">Shipping Information</div>
        </div>
        <div class="step-connector"></div>
        <div class="step">
          <div class="step-number">3</div>
          <div class="step-label">Complete Order</div>
        </div>
      </div>

      <div class="shipping-content">
        <!-- Shipping Form -->
        <div class="shipping-form">
          <form @submit.prevent="submitForm">
            <div class="form-section">
              <h2 class="section-subtitle">Shipping address</h2>

              <div class="form-row">
                <div class="form-group">
                  <label for="firstName">Last name <span class="required">*</span></label>
                  <input type="text" id="firstName" v-model="customer.firstName" required class="form-control">
                </div>
                <div class="form-group">
                  <label for="lastName">Name <span class="required">*</span></label>
                  <input type="text" id="lastName" v-model="customer.lastName" required class="form-control">
                </div>
              </div>

              <div class="form-group">
                <label for="email">Email <span class="required">*</span></label>
                <input type="email" id="email" v-model="customer.email" required class="form-control">
              </div>

              <div class="form-group">
                <label for="phone">Phone <span class="required">*</span></label>
                <input type="tel" id="phone" v-model="customer.phone" required class="form-control">
              </div>

              <div class="form-group">
                <label for="address">Address <span class="required">*</span></label>
                <input type="text" id="address" v-model="customer.address" required class="form-control">
              </div>

              <div class="form-row">
                <div class="form-group">
                  <label for="city">City <span class="required">*</span></label>
                  <input type="text" id="city" v-model="customer.city" required class="form-control">
                </div>
                <div class="form-group">
                  <label for="state">Province <span class="required">*</span></label>
                  <input type="text" id="state" v-model="customer.state" required class="form-control">
                </div>
                <div class="form-group">
                  <label for="zip">Postcode <span class="required">*</span></label>
                  <input type="text" id="zip" v-model="customer.zip" required class="form-control">
                </div>
              </div>
            </div>

            <div class="form-section">
              <h2 class="section-subtitle">Payment</h2>

              <div class="payment-methods">
                <div class="payment-method">
                  <input type="radio" id="easypaisa" value="alieasypaisapay" v-model="paymentMethod" name="payment">
                  <label for="easypaisa" class="payment-label">
                    <div class="payment-logo">
                      <img src="../assets/easypaisa.png" alt="easypaisa">
                    </div>
                    <div class="payment-name">Easypaisa</div>
                  </label>
                </div>

                <div class="payment-method">
                  <input type="radio" id="jazzcash" value="jazzcash" v-model="paymentMethod" name="payment">
                  <label for="jazzcash" class="payment-label">
                    <div class="payment-logo">
                      <img src="../assets/jazzcash.png" alt="jazzcash">
                    </div>
                    <div class="payment-name">Jazzcash</div>
                  </label>
                </div>
              </div>
            </div>

            <div class="form-actions">
              <router-link to="/checkout" class="btn btn-secondary back-btn">
                return
              </router-link>
              <button type="submit" class="btn btn-success proceed-btn" :disabled="!formIsValid">
                continue
              </button>
            </div>
          </form>
        </div>

        <!-- Order Summary -->
        <div class="order-summary">
          <h2 class="section-subtitle">Order Summary</h2>

          <div class="summary-items">
            <div class="summary-item" v-for="item in cartItems" :key="item.id">
              <div class="summary-item-name">
                {{ item.title }} <span class="summary-item-qty">× {{ item.quantity }}</span>
              </div>
              <div class="summary-item-price">Rs.{{ (item.price * item.quantity).toFixed(2) }}</div>
            </div>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row">
            <span>Item quantity:</span>
            <span>{{ totalItems }} items</span>
          </div>

          <div class="summary-row">
            <span>Total price of goods:</span>
            <span>Rs.{{ cartTotal }}</span>
          </div>

          <div class="summary-row">
            <span>Shipping fee:</span>
            <span>Free shipping</span>
          </div>

          <div class="summary-divider"></div>

          <div class="summary-row total">
            <span>Order total:</span>
            <span>Rs.{{ cartTotal }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Shipping',
  data() {
    return {
      customer: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zip: ''
      },
      paymentMethod: 'alipay'
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
    formIsValid() {
      return this.customer.firstName &&
        this.customer.lastName &&
        this.customer.email &&
        this.customer.phone &&
        this.customer.address &&
        this.customer.city &&
        this.customer.state &&
        this.customer.zip &&
        this.paymentMethod
    }
  },
  methods: {
    submitForm() {
      if (!this.formIsValid) return

      // Save checkout info to store
      this.$store.dispatch('setCheckoutInfo', {
        customer: this.customer,
        paymentMethod: this.paymentMethod
      })

      // Navigate to success page
      this.$router.push('/checkout/success')
    }
  },
  created() {
    // If cart is empty, redirect to cart page
    if (this.cartItems.length === 0) {
      this.$router.push('/cart')
    }

    // Pre-fill form with data from store if available
    if (this.$store.state.checkoutInfo) {
      const storeInfo = this.$store.state.checkoutInfo
      if (storeInfo.customer) {
        this.customer = { ...storeInfo.customer }
      }
      if (storeInfo.paymentMethod) {
        this.paymentMethod = storeInfo.paymentMethod
      }
    }
  }
}
</script>

<style scoped>
.shipping {
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

.shipping-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.shipping-form {
  flex: 2;
  min-width: 600px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 20px;
}

.section-subtitle {
  font-size: 20px;
  margin-bottom: 20px;
  color: #2c3e50;
}

.form-section {
  margin-bottom: 30px;
}

.form-row {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.form-group {
  flex: 1;
  min-width: 200px;
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
  color: #2c3e50;
}

.required {
  color: #e74c3c;
}

.form-control {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.payment-methods {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}

.payment-method {
  flex: 1;
  min-width: 150px;
}

.payment-method input {
  display: none;
}

.payment-label {
  display: block;
  padding: 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
}

.payment-method input:checked+.payment-label {
  border-color: #3498db;
  box-shadow: 0 0 10px rgba(52, 152, 219, 0.3);
}

.payment-logo {
  height: 40px;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.payment-logo img {
  max-height: 100%;
}

.payment-name {
  font-weight: bold;
  color: #2c3e50;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.back-btn,
.proceed-btn {
  padding: 10px 30px;
}

.proceed-btn:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
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

.summary-items {
  margin-bottom: 20px;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.summary-item-name {
  flex: 2;
}

.summary-item-qty {
  color: #7f8c8d;
  margin-left: 5px;
}

.summary-item-price {
  flex: 1;
  text-align: right;
  font-weight: bold;
}

.summary-divider {
  height: 1px;
  background-color: #ddd;
  margin: 15px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
}

.summary-row.total {
  font-size: 20px;
  font-weight: bold;
  color: #e74c3c;
}

@media (max-width: 992px) {
  .shipping-form {
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

  .form-row {
    flex-direction: column;
  }

  .form-group {
    width: 100%;
  }

  .payment-methods {
    flex-direction: column;
  }

  .payment-method {
    width: 100%;
  }
}
</style>
