<template>
  <div class="dashboard-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">💼 Manage Works</h1>
        <p class="page-subtitle">Manage your portfolio projects and showcases</p>
        <div class="header-actions">
          <button @click="showAddModal = true" class="btn btn-primary">
            ➕ Add New Project
          </button>
          <router-link to="/dashboard" class="btn btn-outline">
            ← Back to Dashboard
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner">⏳</div>
        <p>Loading projects...</p>
      </div>

      <!-- Works Grid -->
      <div v-else class="works-container">
        <div class="works-header">
          <h3>Portfolio Projects ({{ works.length }})</h3>
          <div class="works-filters">
            <select v-model="filterCategory" class="filter-select">
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
            <select v-model="filterStatus" class="filter-select">
              <option value="">All Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
        </div>

        <div class="works-grid">
          <div v-for="work in filteredWorks" :key="work._id" class="work-card glass-effect">
            <div class="work-image">
              <img
                :src="work.mainImage?.url || 'https://via.placeholder.com/400x250'"
                :alt="work.title"
              />
              <div class="work-overlay">
                <div class="work-actions">
                  <button
                    v-if="work.links?.live"
                    @click="openLink(work.links.live)"
                    class="action-btn"
                    title="View Live"
                  >
                    👁️
                  </button>
                  <button
                    v-if="work.links?.github"
                    @click="openLink(work.links.github)"
                    class="action-btn"
                    title="View Code"
                  >
                    🔗
                  </button>
                </div>
              </div>
            </div>

            <div class="work-content">
              <div class="work-meta">
                <span class="work-category" :class="getCategoryClass(work.category)">
                  {{ work.category }}
                </span>
                <span class="work-status" :class="getStatusClass(work.status)">
                  {{ work.status }}
                </span>
              </div>

              <h4 class="work-title">{{ work.title }}</h4>
              <p class="work-description">
                {{ work.shortDescription || work.description.substring(0, 100) + '...' }}
              </p>

              <div class="work-technologies">
                <span
                  v-for="tech in work.technologies.slice(0, 3)"
                  :key="tech._id"
                  class="tech-tag"
                  :style="{ backgroundColor: tech.color + '20', color: tech.color }"
                >
                  {{ tech.name }}
                </span>
                <span
                  v-if="work.technologies.length > 3"
                  class="tech-tag more-tech"
                >
                  +{{ work.technologies.length - 3 }}
                </span>
              </div>

              <div class="work-footer">
                <div class="work-featured">
                  <button
                    @click="toggleFeatured(work)"
                    class="toggle-btn"
                    :class="{ active: work.featured }"
                    title="Toggle Featured"
                  >
                    {{ work.featured ? '⭐' : '☆' }}
                  </button>
                </div>

                <div class="work-admin-actions">
                  <button @click="editWork(work)" class="btn-action edit" title="Edit">
                    ✏️
                  </button>
                  <button @click="deleteWork(work)" class="btn-action delete" title="Delete">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="filteredWorks.length === 0" class="empty-state">
          <div class="empty-icon">📭</div>
          <h3>No projects found</h3>
          <p>{{ works.length === 0 ? 'No projects created yet.' : 'No projects match your filters.' }}</p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <WorkModal
      v-if="showAddModal || showEditModal"
      :work="selectedWork"
      :isEdit="showEditModal"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '@/utils/api'
import WorkModal from '@/components/dashboard/WorkModal.vue'

// Reactive data
const loading = ref(true)
const works = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedWork = ref(null)
const filterCategory = ref('')
const filterStatus = ref('')

// Computed properties
const categories = computed(() => {
  return [...new Set(works.value.map(work => work.category))]
})

const filteredWorks = computed(() => {
  let filtered = works.value

  if (filterCategory.value) {
    filtered = filtered.filter(work => work.category === filterCategory.value)
  }

  if (filterStatus.value) {
    filtered = filtered.filter(work => work.status === filterStatus.value)
  }

  return filtered
})

// Methods
const fetchWorks = async () => {
  try {
    loading.value = true
    const data = await api.dashboard.getWorks()
    works.value = data
  } catch (error) {
    console.error('Error fetching works:', error)
    alert('❌ Failed to load projects')
  } finally {
    loading.value = false
  }
}

const editWork = (work) => {
  selectedWork.value = { ...work }
  showEditModal.value = true
}

const deleteWork = async (work) => {
  if (!confirm(`Are you sure you want to delete "${work.title}"?`)) return

  try {
    await api.dashboard.deleteWork(work._id)
    works.value = works.value.filter(w => w._id !== work._id)
    alert('✅ Project deleted successfully!')
  } catch (error) {
    console.error('Error deleting work:', error)
    alert('❌ Failed to delete project')
  }
}

const toggleFeatured = async (work) => {
  try {
    const updatedWork = await api.dashboard.updateWork(work._id, {
      ...work,
      featured: !work.featured
    })

    const index = works.value.findIndex(w => w._id === work._id)
    if (index !== -1) {
      works.value[index] = updatedWork
    }
  } catch (error) {
    console.error('Error updating work:', error)
    alert('❌ Failed to update project')
  }
}

const openLink = (url) => {
  window.open(url, '_blank', 'noopener,noreferrer')
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  selectedWork.value = null
}

const handleSave = async (workData) => {
  try {
    if (showEditModal.value) {
      // Update existing work
      const updatedWork = await api.dashboard.updateWork(selectedWork.value._id, workData)
      const index = works.value.findIndex(w => w._id === selectedWork.value._id)
      if (index !== -1) {
        works.value[index] = updatedWork
      }
      alert('✅ Project updated successfully!')
    } else {
      // Create new work
      const newWork = await api.dashboard.createWork(workData)
      works.value.push(newWork)
      alert('✅ Project created successfully!')
    }
    closeModal()
  } catch (error) {
    console.error('Error saving work:', error)
    alert('❌ Failed to save project')
  }
}

const getCategoryClass = (category) => {
  const classes = {
    'Web Development': 'category-web',
    'Mobile App': 'category-mobile',
    'Desktop App': 'category-desktop',
    'API': 'category-api',
    'Design': 'category-design',
    'Other': 'category-other'
  }
  return classes[category] || 'category-other'
}

const getStatusClass = (status) => {
  const classes = {
    'Planning': 'status-planning',
    'In Progress': 'status-progress',
    'Completed': 'status-completed',
    'On Hold': 'status-hold'
  }
  return classes[status] || 'status-planning'
}

// Lifecycle hooks
onMounted(() => {
  fetchWorks()
})
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 2rem 0 4rem 0;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  margin-bottom: 3rem;
}

.page-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #f8fafc;
}

.page-subtitle {
  color: #94a3b8;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

.header-actions {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 0.75rem;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
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
  color: #f8fafc;
  text-decoration: none;
}

.loading-container {
  text-align: center;
  padding: 4rem 2rem;
  color: #94a3b8;
}

.spinner {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.works-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
}

.works-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.works-header h3 {
  color: #f8fafc;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.works-filters {
  display: flex;
  gap: 1rem;
}

.filter-select {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: #f8fafc;
  font-size: 0.9rem;
}

.filter-select option {
  background: #1e293b;
  color: #f8fafc;
}

.works-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.work-card {
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.work-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.work-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.work-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.work-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.work-card:hover .work-overlay {
  opacity: 1;
}

.work-card:hover .work-image img {
  transform: scale(1.1);
}

.work-actions {
  display: flex;
  gap: 1rem;
}

.action-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.action-btn:hover {
  background: #6366f1;
  border-color: #6366f1;
  transform: scale(1.1);
}

.work-content {
  padding: 1.5rem;
}

.work-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.work-category, .work-status {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Category badges */
.category-web { background: rgba(99, 102, 241, 0.2); color: #6366f1; }
.category-mobile { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
.category-desktop { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
.category-api { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.category-design { background: rgba(236, 72, 153, 0.2); color: #ec4899; }
.category-other { background: rgba(107, 114, 128, 0.2); color: #6b7280; }

/* Status badges */
.status-planning { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.status-progress { background: rgba(99, 102, 241, 0.2); color: #6366f1; }
.status-completed { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
.status-hold { background: rgba(107, 114, 128, 0.2); color: #6b7280; }

.work-title {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
  color: #f8fafc;
}

.work-description {
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.work-technologies {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.tech-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.more-tech {
  background: rgba(255, 255, 255, 0.1);
  color: #94a3b8;
}

.work-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.toggle-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
}

.toggle-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.toggle-btn.active {
  color: #fbbf24;
}

.work-admin-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-action {
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.btn-action.edit {
  background: rgba(99, 102, 241, 0.2);
  color: #6366f1;
}

.btn-action.edit:hover {
  background: rgba(99, 102, 241, 0.3);
  transform: scale(1.1);
}

.btn-action.delete {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.btn-action.delete:hover {
  background: rgba(239, 68, 68, 0.3);
  transform: scale(1.1);
}

.empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: #94a3b8;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h3 {
  color: #f8fafc;
  margin-bottom: 0.5rem;
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .header-actions {
    flex-direction: column;
  }

  .works-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .works-filters {
    flex-direction: column;
  }

  .works-grid {
    grid-template-columns: 1fr;
  }

  .work-meta {
    flex-direction: column;
    gap: 0.5rem;
    align-items: flex-start;
  }
}
</style>
