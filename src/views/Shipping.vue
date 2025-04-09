<template>
  <div class="shipping">
    <div class="container">
      <div class="decorative-border top-left"></div>
      <div class="decorative-border top-right"></div>
      <div class="decorative-border bottom-left"></div>
      <div class="decorative-border bottom-right"></div>
      <h1 class="section-title">Shipping Information</h1>
      <div class="decorative-line"></div>

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
              <router-link to="/products" class="btn btn-primary">
                Browse Products
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

.shipping-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
}

.shipping-form {
  flex: 2;
  min-width: 600px;
  background-color: white;
  border: 1px solid #e0e0e0;
  padding: 30px;
  position: relative;
}

.shipping-form:before {
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
  margin-bottom: 8px;
  font-weight: 600;
  color: #121212;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
}

.required {
  color: #121212;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #e0e0e0;
  font-size: 16px;
  font-family: 'Playfair Display', serif;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #121212;
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
  padding: 20px;
  border: 1px solid #e0e0e0;
  cursor: pointer;
  transition: all 0.3s;
  text-align: center;
  position: relative;
}

.payment-label:before {
  content: '';
  position: absolute;
  top: 5px;
  left: 5px;
  right: 5px;
  bottom: 5px;
  border: 1px solid rgba(18, 18, 18, 0);
  transition: border-color 0.3s ease;
  pointer-events: none;
}

.payment-method input:checked+.payment-label {
  border-color: #121212;
}

.payment-method input:checked+.payment-label:before {
  border-color: rgba(18, 18, 18, 0.1);
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
  font-weight: 600;
  color: #121212;
  font-family: 'Playfair Display', serif;
  margin-top: 10px;
  letter-spacing: 0.5px;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.back-btn,
.proceed-btn {
  padding: 12px 25px;
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

.proceed-btn:disabled {
  background-color: #cccccc;
  border-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
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
  font-weight: 600;
  font-family: 'Playfair Display', serif;
}

.summary-divider {
  height: 1px;
  background-color: #e0e0e0;
  margin: 20px 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 16px;
}

.summary-row.total {
  font-size: 20px;
  font-weight: 700;
  color: #121212;
  font-family: 'Playfair Display', serif;
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
