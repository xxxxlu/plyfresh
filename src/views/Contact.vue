<template>
  <div class="contact full-width-section">
    <div class="decorative-border top-left"></div>
    <div class="decorative-border top-right"></div>
    <div class="decorative-border bottom-left"></div>
    <div class="decorative-border bottom-right"></div>
    <div class="contact-wrapper">
      <h1 class="section-title">Contact Us</h1>
      <div class="decorative-line"></div>

      <div class="contact-content">
        <!-- Contact Form -->
        <div class="contact-form-container">
          <h2 class="section-subtitle">Connect With Us</h2>
          <p class="contact-desc">We value your thoughts and inquiries about our fresh product collection. Please share your message below, and our PlyFresh team will respond promptly.</p>

          <form @submit.prevent="submitContactForm" class="contact-form">
            <div class="form-group">
              <label for="name">Name <span class="required">*</span></label>
              <input type="text" id="name" v-model="contactForm.name" required class="form-control">
            </div>

            <div class="form-group">
              <label for="email">Email <span class="required">*</span></label>
              <input type="email" id="email" v-model="contactForm.email" required class="form-control">
            </div>

            <div class="form-group">
              <label for="phone">Phone</label>
              <input type="tel" id="phone" v-model="contactForm.phone" class="form-control">
            </div>

            <div class="form-group">
              <label for="subject">Subject <span class="required">*</span></label>
              <select id="subject" v-model="contactForm.subject" required class="form-control">
                <option value="">Please select a subject</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Product Recommendation">Product Recommendation</option>
                <option value="Customer Feedback">Customer Feedback</option>
                <option value="Supplier Partnership">Supplier Partnership</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Message content <span class="required">*</span></label>
              <textarea id="message" v-model="contactForm.message" required class="form-control" rows="5"></textarea>
            </div>

            <div v-if="formSubmitted" class="form-success">
              <div class="success-icon">
                <span class="material-icons">check_circle</span>
              </div>
              <p>Thank you for your message! We will get back to you as soon as possible. </p>
            </div>

            <button type="submit" class="btn btn-primary submit-btn" :disabled="formSubmitting">
              {{ formSubmitting ? 'Submitting...' : 'Submit message' }}
            </button>
          </form>
        </div>

        <!-- Contact Info -->
        <div class="contact-info">
          <h2 class="section-subtitle">Contact Details</h2>

          <div class="info-item">
            <div class="info-icon">
              <span class="material-icons">email</span>
            </div>
            <div class="info-content">
              <h3>Email</h3>
              <p>plyfrsh@plyfresh.store</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <span class="material-icons">access</span>
            </div>
            <div class="info-content">
              <h3>Store Hours</h3>
              <p>Monday to Friday: 9:00 - 18:00</p>
              <p>Saturday to Sunday: 10:00 - 16:00</p>
            </div>
          </div>

          <div class="social-media">
            <h3>PlyFresh Community</h3>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <img src="../assets/easypaisa.png" alt="easypaisa">
              </a>
              <a href="#" class="social-icon">
                <img src="../assets/jazzcash.png" alt="jazzcash">
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  data() {
    return {
      contactForm: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      },
      formSubmitting: false,
      formSubmitted: false
    }
  },
  methods: {
    submitContactForm() {
      this.formSubmitting = true

      // Simulate API call
      setTimeout(() => {
        // Reset form after successful submission
        this.contactForm = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        }

        this.formSubmitting = false
        this.formSubmitted = true

        // Reset success message after 5 seconds
        setTimeout(() => {
          this.formSubmitted = false
        }, 5000)
      }, 1500)
    }
  }
}
</script>

<style scoped>
.contact {
  padding: 60px 40px;
  font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  background-color: #fafafa;
}

.contact-wrapper {
  max-width: 1280px;
  margin: 0 auto;
  width: 100%;
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 50px;
  width: 100%;
}

.contact-form-container {
  flex: 2;
  min-width: 500px;
  background-color: white;
  border: 1px solid #e0e0e0;
  padding: 40px;
  position: relative;
}

.contact-form-container:before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid rgba(18, 18, 18, 0.05);
  pointer-events: none;
}

.section-title {
  text-align: center;
  margin-bottom: 20px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  font-weight: 700;
  position: relative;
  letter-spacing: 1px;
}

.decorative-line {
  height: 1px;
  width: 150px;
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

.section-subtitle {
  font-size: 24px;
  margin-bottom: 20px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  position: relative;
  display: inline-block;
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

.contact-desc {
  color: #666666;
  margin-bottom: 30px;
  line-height: 1.6;
  font-style: italic;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #121212;
  font-family: 'Playfair Display', serif;
}

.required {
  color: #121212;
}

.form-control {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 0;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  outline: none;
  border-color: #121212;
}

textarea.form-control {
  resize: vertical;
}

.submit-btn {
  padding: 15px 30px;
  margin-top: 20px;
  background-color: #121212;
  color: white;
  border: 1px solid #121212;
  transition: all 0.3s ease;
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.submit-btn:hover {
  background-color: white;
  color: #121212;
}

.submit-btn:before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background-color: rgba(18, 18, 18, 0.05);
  transition: left 0.3s ease;
}

.submit-btn:hover:before {
  left: 0;
}

.form-success {
  background-color: #f5f5f5;
  color: #121212;
  padding: 20px;
  border-left: 2px solid #121212;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
}

.success-icon {
  margin-right: 15px;
  color: #121212;
}

.contact-info {
  flex: 1;
  min-width: 300px;
  background-color: white;
  border: 1px solid #e0e0e0;
  padding: 40px;
  position: relative;
}

.contact-info:before {
  content: '';
  position: absolute;
  top: 10px;
  left: 10px;
  right: 10px;
  bottom: 10px;
  border: 1px solid rgba(18, 18, 18, 0.05);
  pointer-events: none;
}

.info-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 25px;
}

.info-icon {
  margin-right: 15px;
  width: 40px;
  height: 40px;
  background-color: #121212;
  color: white;
  border-radius: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.info-icon:before {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  right: 3px;
  bottom: 3px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  pointer-events: none;
}

.info-content h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  font-weight: 600;
}

.info-content p {
  color: #666666;
  margin-bottom: 5px;
  line-height: 1.5;
}

.social-media {
  margin-top: 30px;
}

.social-media h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #121212;
  font-family: 'Playfair Display', serif;
  position: relative;
  display: inline-block;
  padding-bottom: 8px;
}

.social-media h3:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 30px;
  height: 1px;
  background-color: #121212;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 0;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  transition: all 0.3s ease;
  border: 1px solid #e0e0e0;
}

.social-icon:hover {
  transform: translateY(-3px);
  background-color: #121212;
}

.social-icon:hover img {
  filter: invert(1);
}

.social-icon img {
  width: 24px;
  height: 24px;
}

.map-container {
  margin-top: 30px;
  margin-bottom: 50px;
}

.map {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.map img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

@media (max-width: 992px) {
  .contact-form-container {
    min-width: 100%;
  }

  .contact-info {
    min-width: 100%;
  }
}

@media (max-width: 768px) {
  .map {
    height: 300px;
  }
}
</style>
