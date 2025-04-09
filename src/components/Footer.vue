<template>
  <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3 class="footer-title">About Us</h3>
          <p>PlyFresh is a curated collection of premium fresh products carefully selected for discerning customers. We specialize in high-quality, seasonal produce that nourishes the body and delights the palate.</p>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Quick Links</h3>
          <ul class="footer-links">
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/products">PlyFresh Collection</router-link></li>
            <li><router-link to="/contact">Contact Us</router-link></li>
          </ul>
        </div>
        <div class="footer-section">
          <h3 class="footer-title">Contact Information</h3>
          <p>Email: plyfrsh@plyfresh.store</p>
          <p>Hours: Monday-Friday 9am-6pm</p>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; Copyright © {{ currentYear }} | Powered by Data Network Solutions (SMC-Private) Limited</p>
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
  background-color: #121212;
  color: #f5f5f5;
  padding: 40px 0 20px;
  margin-top: 50px;
  font-family: 'Playfair Display', 'Times New Roman', Georgia, serif;
  width: 100%;
  position: relative;
  overflow: hidden;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 30px;
  padding: 0 40px;
  max-width: 100%;
  position: relative;
}

.footer-content:before,
.footer-content:after {
  content: '';
  position: absolute;
  width: 150px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.1);
}

.footer-content:before {
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}

.footer-content:after {
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
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
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 1px;
  position: relative;
  display: inline-block;
}

.footer-title:after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 40px;
  height: 1px;
  background-color: #ffffff;
}

.footer-links {
  list-style: none;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #f5f5f5;
  transition: color 0.3s;
  position: relative;
  padding-left: 15px;
  display: inline-block;
}

.footer-links a:before {
  content: '—';
  position: absolute;
  left: 0;
  color: #666;
}

.footer-links a:hover {
  color: #cccccc;
}

.footer-bottom {
  text-align: center;
  padding: 20px 40px 0;
  border-top: 1px solid #333;
  font-style: italic;
  font-size: 14px;
  color: #cccccc;
  width: 100%;
  box-sizing: border-box;
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
