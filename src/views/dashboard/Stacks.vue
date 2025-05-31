<template>
  <div class="dashboard-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">🛠️ Manage Stacks</h1>
        <p class="page-subtitle">Manage your technology stacks and skills</p>
        <div class="header-actions">
          <button @click="showAddModal = true" class="btn btn-primary">
            ➕ Add New Stack
          </button>
          <router-link to="/dashboard" class="btn btn-outline">
            ← Back to Dashboard
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner">⏳</div>
        <p>Loading stacks...</p>
      </div>

      <!-- Stacks Table -->
      <div v-else class="stacks-table-container">
        <div class="table-header">
          <h3>Technology Stacks ({{ stacks.length }})</h3>
          <div class="table-filters">
            <select v-model="filterCategory" class="filter-select">
              <option value="">All Categories</option>
              <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
            </select>
            <select v-model="filterLevel" class="filter-select">
              <option value="">All Levels</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="stacks-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Level</th>
                <th>Experience</th>
                <th>Featured</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stack in filteredStacks" :key="stack._id" class="stack-row">
                <td>
                  <div class="stack-info">
                    <div class="stack-color" :style="{ backgroundColor: stack.color }"></div>
                    <div>
                      <div class="stack-name">{{ stack.name }}</div>
                      <div class="stack-description">{{ stack.description.substring(0, 50) }}...</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span class="category-badge" :class="getCategoryClass(stack.category)">
                    {{ stack.category }}
                  </span>
                </td>
                <td>
                  <span class="level-badge" :class="getLevelClass(stack.proficiencyLevel)">
                    {{ stack.proficiencyLevel }}
                  </span>
                </td>
                <td>{{ stack.yearsOfExperience }}+ years</td>
                <td>
                  <button
                    @click="toggleFeatured(stack)"
                    class="toggle-btn"
                    :class="{ active: stack.featured }"
                  >
                    {{ stack.featured ? '⭐' : '☆' }}
                  </button>
                </td>
                <td>
                  <span class="status-badge" :class="{ active: stack.isActive }">
                    {{ stack.isActive ? 'Active' : 'Inactive' }}
                  </span>
                </td>
                <td>
                  <div class="action-buttons">
                    <button @click="editStack(stack)" class="btn-action edit">✏️</button>
                    <button @click="deleteStack(stack)" class="btn-action delete">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredStacks.length === 0" class="empty-state">
          <div class="empty-icon">📭</div>
          <h3>No stacks found</h3>
          <p>{{ stacks.length === 0 ? 'No stacks created yet.' : 'No stacks match your filters.' }}</p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <StackModal
      v-if="showAddModal || showEditModal"
      :stack="selectedStack"
      :isEdit="showEditModal"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '@/utils/api'
import StackModal from '@/components/dashboard/StackModal.vue'

// Reactive data
const loading = ref(true)
const stacks = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedStack = ref(null)
const filterCategory = ref('')
const filterLevel = ref('')

// Computed properties
const categories = computed(() => {
  return [...new Set(stacks.value.map(stack => stack.category))]
})

const filteredStacks = computed(() => {
  let filtered = stacks.value

  if (filterCategory.value) {
    filtered = filtered.filter(stack => stack.category === filterCategory.value)
  }

  if (filterLevel.value) {
    filtered = filtered.filter(stack => stack.proficiencyLevel === filterLevel.value)
  }

  return filtered
})

// Methods
const fetchStacks = async () => {
  try {
    loading.value = true
    const data = await api.dashboard.getStacks()
    stacks.value = data
  } catch (error) {
    console.error('Error fetching stacks:', error)
    alert('❌ Failed to load stacks')
  } finally {
    loading.value = false
  }
}

const editStack = (stack) => {
  selectedStack.value = { ...stack }
  showEditModal.value = true
}

const deleteStack = async (stack) => {
  if (!confirm(`Are you sure you want to delete "${stack.name}"?`)) return

  try {
    await api.dashboard.deleteStack(stack._id)
    stacks.value = stacks.value.filter(s => s._id !== stack._id)
    alert('✅ Stack deleted successfully!')
  } catch (error) {
    console.error('Error deleting stack:', error)
    alert('❌ Failed to delete stack')
  }
}

const toggleFeatured = async (stack) => {
  try {
    const updatedStack = await api.dashboard.updateStack(stack._id, {
      ...stack,
      featured: !stack.featured
    })

    const index = stacks.value.findIndex(s => s._id === stack._id)
    if (index !== -1) {
      stacks.value[index] = updatedStack
    }
  } catch (error) {
    console.error('Error updating stack:', error)
    alert('❌ Failed to update stack')
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  selectedStack.value = null
}

const handleSave = async (stackData) => {
  try {
    if (showEditModal.value) {
      // Update existing stack
      const updatedStack = await api.dashboard.updateStack(selectedStack.value._id, stackData)
      const index = stacks.value.findIndex(s => s._id === selectedStack.value._id)
      if (index !== -1) {
        stacks.value[index] = updatedStack
      }
      alert('✅ Stack updated successfully!')
    } else {
      // Create new stack
      const newStack = await api.dashboard.createStack(stackData)
      stacks.value.push(newStack)
      alert('✅ Stack created successfully!')
    }
    closeModal()
  } catch (error) {
    console.error('Error saving stack:', error)
    alert('❌ Failed to save stack')
  }
}

const getCategoryClass = (category) => {
  const classes = {
    'Frontend': 'category-frontend',
    'Backend': 'category-backend',
    'Database': 'category-database',
    'DevOps': 'category-devops',
    'Mobile': 'category-mobile',
    'Design': 'category-design',
    'Other': 'category-other'
  }
  return classes[category] || 'category-other'
}

const getLevelClass = (level) => {
  const classes = {
    'Beginner': 'level-beginner',
    'Intermediate': 'level-intermediate',
    'Advanced': 'level-advanced',
    'Expert': 'level-expert'
  }
  return classes[level] || 'level-intermediate'
}

// Lifecycle hooks
onMounted(() => {
  fetchStacks()
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

.stacks-table-container {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.table-header h3 {
  color: #f8fafc;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.table-filters {
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

.table-responsive {
  overflow-x: auto;
}

.stacks-table {
  width: 100%;
  border-collapse: collapse;
}

.stacks-table th {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  font-weight: 600;
  padding: 1rem;
  text-align: left;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.stacks-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #f8fafc;
}

.stack-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.stack-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.stack-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  flex-shrink: 0;
}

.stack-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.stack-description {
  font-size: 0.8rem;
  color: #94a3b8;
}

.category-badge, .level-badge, .status-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Category badges */
.category-frontend { background: rgba(99, 102, 241, 0.2); color: #6366f1; }
.category-backend { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
.category-database { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.category-devops { background: rgba(239, 68, 68, 0.2); color: #ef4444; }
.category-mobile { background: rgba(168, 85, 247, 0.2); color: #a855f7; }
.category-design { background: rgba(236, 72, 153, 0.2); color: #ec4899; }
.category-other { background: rgba(107, 114, 128, 0.2); color: #6b7280; }

/* Level badges */
.level-beginner { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
.level-intermediate { background: rgba(245, 158, 11, 0.2); color: #f59e0b; }
.level-advanced { background: rgba(99, 102, 241, 0.2); color: #6366f1; }
.level-expert { background: rgba(239, 68, 68, 0.2); color: #ef4444; }

/* Status badge */
.status-badge.active { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
.status-badge:not(.active) { background: rgba(107, 114, 128, 0.2); color: #6b7280; }

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

.action-buttons {
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

  .table-header {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }

  .table-filters {
    flex-direction: column;
  }

  .stacks-table {
    font-size: 0.9rem;
  }

  .stacks-table th,
  .stacks-table td {
    padding: 0.75rem 0.5rem;
  }

  .stack-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
