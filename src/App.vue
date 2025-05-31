<template>
  <div id="app" class="app-container">
    <!-- Navigation -->
    <Navbar v-if="!isAuthPage && !isNotFoundPage" />

    <!-- Main Content -->
    <main class="main-content" :class="{
      'auth-page': isAuthPage,
      'dashboard-page': isDashboard,
      'not-found-page': isNotFoundPage
    }">
      <router-view v-slot="{ Component, route }">
        <transition :name="transitionName" mode="out-in">
          <component :is="Component" :key="route.path" />
        </transition>
      </router-view>
    </main>

    <!-- Footer -->
    <Footer v-if="!isAuthPage && !isDashboard && !isNotFoundPage" />

    <!-- Scroll to Top Button -->
    <ScrollToTop v-if="!isAuthPage && !isNotFoundPage" />
  </div>
</template>

<script setup>
import { computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// Components
import Navbar from '@/components/layout/Navbar.vue'
import Footer from '@/components/layout/Footer.vue'
import ScrollToTop from '@/components/ui/ScrollToTop.vue'

const route = useRoute()

// Computed properties
const isAuthPage = computed(() => {
  return route.path.includes('/login') || route.path.includes('/register')
})

const isDashboard = computed(() => {
  return route.path.includes('/dashboard')
})

const isNotFoundPage = computed(() => {
  return route.name === 'NotFound'
})

const transitionName = computed(() => {
  if (isAuthPage.value || isDashboard.value) {
    return 'fade'
  }
  return 'slide-fade'
})

// Watch for route changes
watch(route, (to, from) => {
  if (to.path !== from.path) {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  updatePageTitle(to)
})

// Update page title based on route
const updatePageTitle = (route) => {
  const baseTitle = 'Portfolio2'
  const routeTitles = {
    '/': 'Home',
    '/about': 'About',
    '/portfolio': 'Portfolio',
    '/contact': 'Contact',
    '/dashboard': 'Dashboard',
    '/login': 'Login'
  }

  const pageTitle = routeTitles[route.path] || 'Page'
  document.title = `${pageTitle} | ${baseTitle}`
}

onMounted(() => {
  updatePageTitle(route)
  document.documentElement.style.scrollBehavior = 'smooth'
})
</script>

<style>
/* Global app styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  line-height: 1.6;
  color: #f8fafc;
  background: #0f172a;
  overflow-x: hidden;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
}

.main-content {
  flex: 1;
  position: relative;
  z-index: 1;
}

/* Ensure modals appear above everything */
.modal-overlay {
  z-index: 10000 !important;
}

/* Prevent body scroll when modal is open */
body.modal-open {
  overflow: hidden;
  padding-right: 15px; /* Prevent layout shift */
}

/* Modal animations */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9) translateY(-20px);
}

.main-content.auth-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
}

.main-content.dashboard-page {
  padding-top: 80px; /* Account for fixed navbar */
  min-height: calc(100vh - 80px);
}

.main-content.not-found-page {
  min-height: 100vh;
}

/* Page transitions */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(30px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Utility classes */
.gradient-text {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradient-shift 3s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.glass-effect {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}

.hover-lift {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .slide-fade-enter-from,
  .slide-fade-leave-to {
    transform: translateY(20px);
  }
}
</style>
