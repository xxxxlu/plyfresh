<template>
  <div class="contact">
    <div class="container">
      <h1 class="section-title">Contact Us</h1>

      <div class="contact-content">
        <!-- Contact Form -->
        <div class="contact-form-container">
          <h2 class="section-subtitle">Leave a message to us</h2>
          <p class="contact-desc">If you have any questions, suggestions or cooperation intentions, please fill out the
            form below and we will reply to you as soon as possible. </p>

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
                <option value="Order Inquiry">Order Inquiry</option>
                <option value="Product Consultation">Product Consultation</option>
                <option value="Complaint Suggestion">Complaint Suggestion</option>
                <option value="Cooperation Negotiation">Cooperation Negotiation</option>
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
          <h2 class="section-subtitle">Contact information</h2>

          <div class="info-item">
            <div class="info-icon">
              <span class="material-icons">location_on</span>
            </div>
            <div class="info-content">
              <h3>Address</h3>
              <p>No. 28, Zhongguancun Street, Haidian District, Beijing</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <span class="material-icons">phone</span>
            </div>
            <div class="info-content">
              <h3>Phone</h3>
              <p>(010) 12345678</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <span class="material-icons">email</span>
            </div>
            <div class="info-content">
              <h3>Email</h3>
              <p>freshfresh@fresh.store</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">
              <span class="material-icons">access_time</span>
            </div>
            <div class="info-content">
              <h3>Business hours</h3>
              <p>Monday to Friday: 9:00 - 18:00</p>
              <p>Saturday to Sunday: 10:00 - 16:00</p>
            </div>
          </div>

          <div class="social-media">
            <h3>Follow us</h3>
            <div class="social-icons">
              <a href="#" class="social-icon">
                <img src="/images/weibo.png" alt="Weibo">
              </a>
              <a href="#" class="social-icon">
                <img src="/images/wechat.png" alt="WeChat">
              </a>
              <a href="#" class="social-icon">
                <img src="/images/douyin.png" alt="Douyin">
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Map -->
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
  padding: 20px 0;
}

.contact-content {
  display: flex;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 50px;
}

.contact-form-container {
  flex: 2;
  min-width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
}

.section-subtitle {
  font-size: 22px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.contact-desc {
  color: #7f8c8d;
  margin-bottom: 25px;
}

.form-group {
  margin-bottom: 20px;
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

textarea.form-control {
  resize: vertical;
}

.submit-btn {
  padding: 12px 30px;
  margin-top: 10px;
}

.form-success {
  background-color: #e8f8f5;
  color: #2ecc71;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.success-icon {
  margin-right: 10px;
  color: #2ecc71;
}

.contact-info {
  flex: 1;
  min-width: 300px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  padding: 30px;
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
  background-color: #3498db;
  color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-content h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: #2c3e50;
}

.info-content p {
  color: #7f8c8d;
  margin-bottom: 5px;
}

.social-media {
  margin-top: 30px;
}

.social-media h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: #2c3e50;
}

.social-icons {
  display: flex;
  gap: 15px;
}

.social-icon {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  transition: transform 0.3s;
}

.social-icon:hover {
  transform: translateY(-3px);
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
