<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <div class="footer-brand">
            <div class="brand-icon">💻</div>
            <span class="brand-text">Dusenge Enzo</span>
          </div>
          <p class="footer-description">
            Building amazing digital experiences with modern web technologies.
          </p>
          <div class="social-links">
            <a href="https://github.com/Pierre-12-enzo" target="_blank" rel="noopener noreferrer" class="social-link">
              🔗 GitHub
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" class="social-link">
              💼 LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" class="social-link">
              🐦 Twitter
            </a>
            <a href="mailto:your.email@example.com" class="social-link">
              📧 Email
            </a>
          </div>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">Quick Links</h4>
          <ul class="footer-links">
            <li><a href="#hero">🏠 Home</a></li>
            <li><a href="#stacks">🛠️ Skills</a></li>
            <li><a href="#works">💼 Portfolio</a></li>
            <li><a href="#contact">📧 Contact</a></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h4 class="footer-title">Technologies</h4>
          <ul class="footer-links">
            <li><a href="#">Vue.js</a></li>
            <li><a href="#">Node.js</a></li>
            <li><a href="#">MongoDB</a></li>
            <li><a href="#">Express.js</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="footer-copyright">
          <p>&copy; {{ currentYear }} Portfolio. Made with ❤️ using MEVN Stack.</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer {
  background: #0f172a;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 3rem 0 1rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  margin-bottom: 2rem;
}

.footer-section {
  color: #f8fafc;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.brand-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.brand-text {
  font-size: 1.5rem;
  font-weight: 700;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-description {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  color: #94a3b8;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  font-size: 0.9rem;
}

.social-link:hover {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(99, 102, 241, 0.3);
  transform: translateY(-2px);
}

.footer-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #f8fafc;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 0.5rem;
}

.footer-links a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #6366f1;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding-top: 1.5rem;
  text-align: center;
}

.footer-copyright p {
  color: #94a3b8;
  margin: 0;
  font-size: 0.9rem;
}

/* Responsive */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .social-links {
    justify-content: center;
  }
  
  .footer {
    padding: 2rem 0 1rem;
  }
}

@media (max-width: 480px) {
  .social-links {
    flex-direction: column;
    align-items: center;
  }
  
  .social-link {
    width: 100%;
    text-align: center;
    max-width: 200px;
  }
}
</style>
