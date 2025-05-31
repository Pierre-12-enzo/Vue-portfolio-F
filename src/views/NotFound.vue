<template>
  <div class="not-found-page">
    <div class="container">
      <div class="not-found-content">
        <div class="error-animation">
          <div class="error-number">4</div>
          <div class="error-icon">🔍</div>
          <div class="error-number">4</div>
        </div>
        
        <h1 class="error-title">Page Not Found</h1>
        <p class="error-description">
          Oops! The page you're looking for doesn't exist. 
          It might have been moved, deleted, or you entered the wrong URL.
        </p>
        
        <div class="error-actions">
          <router-link to="/" class="btn btn-primary">
            🏠 Go Home
          </router-link>
          <button @click="goBack" class="btn btn-outline">
            ← Go Back
          </button>
        </div>
        
        <div class="helpful-links">
          <h3>You might be looking for:</h3>
          <ul>
            <li><a href="#hero">🏠 Home</a></li>
            <li><a href="#stacks">🛠️ Skills</a></li>
            <li><a href="#works">💼 Portfolio</a></li>
            <li><a href="#contact">📧 Contact</a></li>
            <li><router-link to="/login">👤 Admin Login</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const goBack = () => {
  if (window.history.length > 1) {
    router.go(-1)
  } else {
    router.push('/')
  }
}
</script>

<style scoped>
.not-found-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
}

.container {
  max-width: 600px;
  width: 100%;
}

.not-found-content {
  text-align: center;
  color: #f8fafc;
}

.error-animation {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
  font-size: 6rem;
  font-weight: 800;
}

.error-number {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: bounce 2s ease-in-out infinite;
}

.error-icon {
  font-size: 4rem;
  animation: rotate 3s ease-in-out infinite;
}

.error-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #f8fafc;
}

.error-description {
  font-size: 1.1rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 2rem;
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 2rem;
  font-weight: 600;
  border-radius: 0.75rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 1rem;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
  color: white;
  text-decoration: none;
}

.btn-outline {
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #f8fafc;
  background: transparent;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.helpful-links {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.helpful-links h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #f8fafc;
}

.helpful-links ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.helpful-links li {
  margin-bottom: 0.75rem;
}

.helpful-links a {
  color: #94a3b8;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 1rem;
}

.helpful-links a:hover {
  color: #6366f1;
}

/* Animations */
@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-10deg);
  }
  75% {
    transform: rotate(10deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .error-animation {
    font-size: 4rem;
  }
  
  .error-icon {
    font-size: 3rem;
  }
  
  .error-title {
    font-size: 2rem;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .error-animation {
    font-size: 3rem;
    gap: 0.5rem;
  }
  
  .error-icon {
    font-size: 2rem;
  }
  
  .helpful-links {
    padding: 1.5rem;
  }
}
</style>
