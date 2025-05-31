<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container">
      <!-- Brand/Logo -->
      <router-link to="/" class="navbar-brand">
        <div class="brand-content">
          <div class="brand-icon">💻</div>
          <span class="brand-text">Free Lance</span>
        </div>
      </router-link>

      <!-- Mobile Toggle Button -->
      <button
        class="navbar-toggler"
        @click="toggleMobileMenu"
        :class="{ 'active': isMobileMenuOpen }"
      >
        <span class="navbar-toggler-icon">
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      <!-- Navigation Menu -->
      <div class="navbar-collapse" :class="{ 'show': isMobileMenuOpen }">
        <ul class="navbar-nav">
          <li class="nav-item" v-for="item in navItems" :key="item.name">
            <a
              :href="item.href"
              class="nav-link"
              :class="{ 'active': activeSection === item.section }"
              @click="handleNavClick(item)"
            >
              <span class="nav-icon">{{ item.icon }}</span>
              {{ item.name }}
            </a>
          </li>

          <!-- Admin Login -->
          <li class="nav-item">
            <router-link
              to="/login"
              class="nav-link admin-link"
              v-if="!isAuthenticated"
            >
              <span class="nav-icon">👤</span>
              Admin
            </router-link>
            <router-link
              to="/dashboard"
              class="nav-link admin-link"
              v-else
            >
              <span class="nav-icon">📊</span>
              Dashboard
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { api } from '@/utils/api'

// Reactive data
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)
const activeSection = ref('hero')
const isAuthenticated = ref(false)

// Navigation items
const navItems = ref([
  { name: 'Home', href: '#hero', section: 'hero', icon: '🏠' },
  { name: 'About', href: '#about', section: 'about', icon: '👨‍💻' },
  { name: 'Skills', href: '#stacks', section: 'stacks', icon: '🛠️' },
  { name: 'Portfolio', href: '#works', section: 'works', icon: '💼' },
  { name: 'Game', href: '#game', section: 'game', icon: '🎮' },
  { name: 'Contact', href: '#contact', section: 'contact', icon: '📧' }
])

// Methods
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
  updateActiveSection()
}

const updateActiveSection = () => {
  const sections = navItems.value.map(item => item.section)
  const scrollPosition = window.scrollY + 100

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = document.getElementById(sections[i])
    if (section && section.offsetTop <= scrollPosition) {
      activeSection.value = sections[i]
      break
    }
  }
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleNavClick = (item) => {
  // Close mobile menu
  isMobileMenuOpen.value = false

  // Smooth scroll to section
  if (item.href.startsWith('#')) {
    const target = document.querySelector(item.href)
    if (target) {
      const offsetTop = target.offsetTop - 80 // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      })
    }
  }
}

const checkAuthStatus = async () => {
  try {
    const data = await api.checkAuth()
    isAuthenticated.value = data.authenticated
  } catch (error) {
    isAuthenticated.value = false
  }
}

// Close mobile menu when clicking outside
const handleClickOutside = (event) => {
  const navbar = document.querySelector('.navbar')
  if (navbar && !navbar.contains(event.target)) {
    isMobileMenuOpen.value = false
  }
}

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  document.addEventListener('click', handleClickOutside)

  // Check authentication status
  checkAuthStatus()

  // Initial scroll check
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: transparent;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  padding: 1rem 0;
  z-index: 1000;
}

.navbar.navbar-scrolled {
  background: rgba(15, 23, 42, 0.95);
  backdrop-filter: blur(20px);
  border-bottom-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-brand {
  text-decoration: none;
  color: #f8fafc;
  transition: all 0.3s ease;
}

.navbar-brand:hover {
  color: #6366f1;
  transform: scale(1.05);
}

.brand-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
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

.navbar-toggler {
  display: none;
  border: none;
  background: transparent;
  padding: 0.5rem;
  cursor: pointer;
}

.navbar-toggler-icon {
  width: 30px;
  height: 20px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.navbar-toggler-icon span {
  width: 100%;
  height: 2px;
  background: #f8fafc;
  border-radius: 1px;
  transition: all 0.3s ease;
  transform-origin: center;
}

.navbar-toggler.active .navbar-toggler-icon span:nth-child(1) {
  transform: rotate(45deg) translate(6px, 6px);
}

.navbar-toggler.active .navbar-toggler-icon span:nth-child(2) {
  opacity: 0;
  transform: translateX(-20px);
}

.navbar-toggler.active .navbar-toggler-icon span:nth-child(3) {
  transform: rotate(-45deg) translate(6px, -6px);
}

.navbar-collapse {
  display: flex;
}

.navbar-nav {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item .nav-link {
  color: #94a3b8;
  font-weight: 500;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  position: relative;
}

.nav-icon {
  font-size: 1rem;
}

.nav-link:hover {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.1);
  transform: translateY(-2px);
}

.nav-link.active {
  color: #6366f1;
  background: rgba(99, 102, 241, 0.15);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  background: #6366f1;
  border-radius: 50%;
}

.nav-link.admin-link {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  font-weight: 600;
}

.nav-link.admin-link:hover {
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
}

/* Mobile Styles */
@media (max-width: 768px) {
  .navbar-toggler {
    display: block;
  }

  .navbar-collapse {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(15, 23, 42, 0.98);
    backdrop-filter: blur(20px);
    border-radius: 0 0 1rem 1rem;
    padding: 1rem;
    margin-top: 1rem;
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    opacity: 0;
    visibility: hidden;
    transform: translateY(-20px);
    transition: all 0.3s ease;
  }

  .navbar-collapse.show {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .navbar-nav {
    flex-direction: column;
    align-items: stretch;
    gap: 0.25rem;
  }

  .nav-item .nav-link {
    justify-content: flex-start;
    padding: 1rem;
  }

  .nav-link.active::after {
    display: none;
  }

  .brand-content .brand-icon {
    width: 35px;
    height: 35px;
    font-size: 1rem;
  }

  .brand-text {
    font-size: 1.25rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 15px;
  }

  .navbar {
    padding: 0.75rem 0;
  }

  .navbar.navbar-scrolled {
    padding: 0.5rem 0;
  }
}
</style>
