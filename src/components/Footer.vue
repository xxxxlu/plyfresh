<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">About us</h3>
          <p>Fresh Fresh is a professional online book sales platform that provides all kinds of high-quality books. We
            are committed to providing readers with the best reading experience and services. </p>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/products">All Books</router-link></li>
            <li><router-link to="/contact">Contact Us</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Contact Information</h3>
          <p>Email: freshfresh@fresh.store</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; Copyright © {{ currentYear }} | Powered by Data Network Solutions (SMC-Private) Limited </p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 40px 0 20px;
  margin-top: 50px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
}

.footer-section {
  flex: 1;
  min-width: 250px;
  margin-bottom: 20px;
  padding-right: 20px;
}

.footer-title {
  font-size: 18px;
  margin-bottom: 15px;
  color: #3498db;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #ecf0f1;
  transition: color 0.3s;
}

.footer-links a:hover {
  color: #3498db;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #34495e;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
  }

  .footer-section {
    margin-bottom: 30px;
  }
}
</style>
