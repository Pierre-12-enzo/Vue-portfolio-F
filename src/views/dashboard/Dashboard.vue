<template>
  <div class="dashboard">
    <div class="container">
      <div class="dashboard-header">
        <h1 class="dashboard-title">📊 Dashboard</h1>
        <p class="dashboard-subtitle">Manage your portfolio content</p>
      </div>

      <div class="dashboard-stats">
        <div class="stat-card glass-effect">
          <div class="stat-icon">🛠️</div>
          <div class="stat-content">
            <div class="stat-number">{{ stats.stacks }}</div>
            <div class="stat-label">Technology Stacks</div>
          </div>
        </div>

        <div class="stat-card glass-effect">
          <div class="stat-icon">💼</div>
          <div class="stat-content">
            <div class="stat-number">{{ stats.works }}</div>
            <div class="stat-label">Portfolio Projects</div>
          </div>
        </div>

        <div class="stat-card glass-effect">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <div class="stat-number">{{ stats.users }}</div>
            <div class="stat-label">Total Users</div>
          </div>
        </div>

        <div class="stat-card glass-effect">
          <div class="stat-icon">⭐</div>
          <div class="stat-content">
            <div class="stat-number">{{ stats.featured }}</div>
            <div class="stat-label">Featured Items</div>
          </div>
        </div>
      </div>

      <div class="dashboard-actions">
        <h2 class="section-title">Quick Actions</h2>
        <div class="action-grid">
          <router-link to="/dashboard/stacks" class="action-card glass-effect hover-lift">
            <div class="action-icon">🛠️</div>
            <h3>Manage Stacks</h3>
            <p>Add, edit, or remove technology stacks</p>
          </router-link>

          <router-link to="/dashboard/works" class="action-card glass-effect hover-lift">
            <div class="action-icon">💼</div>
            <h3>Manage Works</h3>
            <p>Manage your portfolio projects</p>
          </router-link>

          <router-link to="/dashboard/users" class="action-card glass-effect hover-lift">
            <div class="action-icon">👥</div>
            <h3>Manage Users</h3>
            <p>User management and permissions</p>
          </router-link>

          <router-link to="/dashboard/settings" class="action-card glass-effect hover-lift">
            <div class="action-icon">⚙️</div>
            <h3>Settings</h3>
            <p>Profile and application settings</p>
          </router-link>
        </div>
      </div>

      <div class="dashboard-footer">
        <div class="footer-actions">
          <router-link to="/" class="btn btn-outline">
            🏠 View Portfolio
          </router-link>
          <button @click="handleLogout" class="btn btn-danger">
            🚪 Logout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { api } from '@/utils/api'

const router = useRouter()

const stats = ref({
  stacks: 0,
  works: 0,
  users: 0,
  featured: 0
})

const fetchStats = async () => {
  try {
    // Fetch stacks
    const stacksData = await api.dashboard.getStacks()
    stats.value.stacks = stacksData.length
    stats.value.featured += stacksData.filter(s => s.featured).length

    // Fetch works
    const worksData = await api.dashboard.getWorks()
    stats.value.works = worksData.length
    stats.value.featured += worksData.filter(w => w.featured).length

    // Fetch users
    const usersData = await api.dashboard.getUsers()
    stats.value.users = usersData.length
  } catch (error) {
    console.error('Error fetching stats:', error)
    // Set default values if API fails
    stats.value = { stacks: 0, works: 0, users: 0, featured: 0 }
  }
}

const handleLogout = async () => {
  try {
    await api.signout()
    alert('✅ Logged out successfully!')
    router.push('/')
  } catch (error) {
    console.error('Logout error:', error)
    alert('❌ Logout failed. Please try again.')
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 2rem 0 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 3rem;
}

.dashboard-title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dashboard-subtitle {
  color: #94a3b8;
  font-size: 1.1rem;
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.stat-card {
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #f8fafc;
  margin-bottom: 0.25rem;
}

.stat-label {
  color: #94a3b8;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.dashboard-actions {
  margin-bottom: 3rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #f8fafc;
}

.action-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.action-card {
  padding: 2rem;
  border-radius: 1rem;
  text-decoration: none;
  color: #f8fafc;
  transition: all 0.3s ease;
  text-align: center;
}

.action-card:hover {
  color: #f8fafc;
  text-decoration: none;
}

.action-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.action-card h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #f8fafc;
}

.action-card p {
  color: #94a3b8;
  margin: 0;
}

.dashboard-footer {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.footer-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
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

.btn-outline {
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: #f8fafc;
  background: transparent;
}

.btn-outline:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
  color: #f8fafc;
  text-decoration: none;
}

.btn-danger {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  color: white;
}

.btn-danger:hover {
  background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
  transform: translateY(-2px);
}

/* Responsive */
@media (max-width: 768px) {
  .dashboard-title {
    font-size: 2rem;
  }

  .dashboard-stats {
    grid-template-columns: 1fr;
  }

  .action-grid {
    grid-template-columns: 1fr;
  }

  .footer-actions {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 200px;
    justify-content: center;
  }
}
</style>
