import { createRouter, createWebHistory } from 'vue-router'

// Import views
import Home from '@/views/Home.vue'
import Login from '@/views/auth/Login.vue'
import Dashboard from '@/views/dashboard/Dashboard.vue'
import DashboardStacks from '@/views/dashboard/Stacks.vue'
import DashboardWorks from '@/views/dashboard/Works.vue'
import DashboardUsers from '@/views/dashboard/Users.vue'
import DashboardSettings from '@/views/dashboard/Settings.vue'
import NotFound from '@/views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: 'Home',
      description: 'Welcome to my portfolio'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: 'Login',
      description: 'Admin login page',
      guest: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: {
      title: 'Dashboard',
      description: 'Admin dashboard',
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/stacks',
    name: 'DashboardStacks',
    component: DashboardStacks,
    meta: {
      title: 'Manage Stacks',
      description: 'Manage technology stacks',
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/works',
    name: 'DashboardWorks',
    component: DashboardWorks,
    meta: {
      title: 'Manage Works',
      description: 'Manage portfolio projects',
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/users',
    name: 'DashboardUsers',
    component: DashboardUsers,
    meta: {
      title: 'Manage Users',
      description: 'User management',
      requiresAuth: true
    }
  },
  {
    path: '/dashboard/settings',
    name: 'DashboardSettings',
    component: DashboardSettings,
    meta: {
      title: 'Settings',
      description: 'User settings and profile',
      requiresAuth: true
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist'
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
        top: 80
      }
    } else {
      return { top: 0 }
    }
  }
})

// Import API utility
import { api } from '@/utils/api'

// Authentication check function
const checkAuth = async () => {
  try {
    const data = await api.checkAuth()
    return data.authenticated
  } catch (error) {
    return false
  }
}

// Navigation guards
router.beforeEach(async (to, from, next) => {
  // Check if route requires authentication
  if (to.meta.requiresAuth) {
    const isAuthenticated = await checkAuth()

    if (!isAuthenticated) {
      next({
        name: 'Login',
        query: { redirect: to.fullPath }
      })
      return
    }
  }

  // Redirect authenticated users away from guest-only pages
  if (to.meta.guest) {
    const isAuthenticated = await checkAuth()

    if (isAuthenticated) {
      next({ name: 'Dashboard' })
      return
    }
  }

  // Update document title
  if (to.meta.title) {
    document.title = `${to.meta.title} | Enzo-portfolio`
  }

  next()
})

export default router
