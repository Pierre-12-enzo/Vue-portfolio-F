<template>
  <div class="dashboard-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">👥 Manage Users</h1>
        <p class="page-subtitle">User management and permissions</p>
        <div class="header-actions">
          <button @click="showAddModal = true" class="btn btn-primary">
            ➕ Add New User
          </button>
          <router-link to="/dashboard" class="btn btn-outline">
            ← Back to Dashboard
          </router-link>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="loading-container">
        <div class="spinner">⏳</div>
        <p>Loading users...</p>
      </div>

      <!-- Users Table -->
      <div v-else class="users-table-container">
        <div class="table-header">
          <h3>System Users ({{ users.length }})</h3>
          <div class="table-filters">
            <select v-model="filterRole" class="filter-select">
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <select v-model="filterStatus" class="filter-select">
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div class="table-responsive">
          <table class="users-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Created</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in filteredUsers" :key="user._id" class="user-row">
                <td>
                  <div class="user-info">
                    <div class="user-avatar">
                      {{ user.firstName?.charAt(0) }}{{ user.lastName?.charAt(0) }}
                    </div>
                    <div>
                      <div class="user-name">{{ user.firstName }} {{ user.lastName }}</div>
                      <div class="user-username">@{{ user.username }}</div>
                    </div>
                  </div>
                </td>
                <td>{{ user.email }}</td>
                <td>
                  <span class="role-badge" :class="getRoleClass(user.role)">
                    {{ user.role }}
                  </span>
                </td>
                <td>
                  <button
                    @click="toggleStatus(user)"
                    class="status-toggle"
                    :class="{ active: user.isActive }"
                  >
                    {{ user.isActive ? 'Active' : 'Inactive' }}
                  </button>
                </td>
                <td>{{ formatDate(user.createdAt) }}</td>
                <td>
                  <div class="action-buttons">
                    <button @click="editUser(user)" class="btn-action edit" title="Edit">✏️</button>
                    <button @click="deleteUser(user)" class="btn-action delete" title="Delete">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Empty State -->
        <div v-if="filteredUsers.length === 0" class="empty-state">
          <div class="empty-icon">👤</div>
          <h3>No users found</h3>
          <p>{{ users.length === 0 ? 'No users created yet.' : 'No users match your filters.' }}</p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <UserModal
      v-if="showAddModal || showEditModal"
      :user="selectedUser"
      :isEdit="showEditModal"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { api } from '@/utils/api'
import UserModal from '@/components/dashboard/UserModal.vue'

// Reactive data
const loading = ref(true)
const users = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const selectedUser = ref(null)
const filterRole = ref('')
const filterStatus = ref('')

// Computed properties
const filteredUsers = computed(() => {
  let filtered = users.value

  if (filterRole.value) {
    filtered = filtered.filter(user => user.role === filterRole.value)
  }

  if (filterStatus.value) {
    const isActive = filterStatus.value === 'active'
    filtered = filtered.filter(user => user.isActive === isActive)
  }

  return filtered
})

// Methods
const fetchUsers = async () => {
  try {
    loading.value = true
    const data = await api.dashboard.getUsers()
    users.value = data
  } catch (error) {
    console.error('Error fetching users:', error)
    alert('❌ Failed to load users')
  } finally {
    loading.value = false
  }
}

const editUser = (user) => {
  selectedUser.value = { ...user }
  showEditModal.value = true
}

const deleteUser = async (user) => {
  if (!confirm(`Are you sure you want to delete "${user.firstName} ${user.lastName}"?`)) return

  try {
    await api.dashboard.deleteUser(user._id)
    users.value = users.value.filter(u => u._id !== user._id)
    alert('✅ User deleted successfully!')
  } catch (error) {
    console.error('Error deleting user:', error)
    alert('❌ Failed to delete user')
  }
}

const toggleStatus = async (user) => {
  try {
    const updatedUser = await api.dashboard.updateUser(user._id, {
      ...user,
      isActive: !user.isActive
    })

    const index = users.value.findIndex(u => u._id === user._id)
    if (index !== -1) {
      users.value[index] = updatedUser
    }
  } catch (error) {
    console.error('Error updating user:', error)
    alert('❌ Failed to update user')
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  selectedUser.value = null
}

const handleSave = async (userData) => {
  try {
    if (showEditModal.value) {
      // Update existing user
      const updatedUser = await api.dashboard.updateUser(selectedUser.value._id, userData)
      const index = users.value.findIndex(u => u._id === selectedUser.value._id)
      if (index !== -1) {
        users.value[index] = updatedUser
      }
      alert('✅ User updated successfully!')
    } else {
      // Create new user
      const newUser = await api.dashboard.createUser(userData)
      users.value.push(newUser)
      alert('✅ User created successfully!')
    }
    closeModal()
  } catch (error) {
    console.error('Error saving user:', error)
    alert('❌ Failed to save user')
  }
}

const getRoleClass = (role) => {
  const classes = {
    'admin': 'role-admin',
    'user': 'role-user'
  }
  return classes[role] || 'role-user'
}

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString()
}

// Lifecycle hooks
onMounted(() => {
  fetchUsers()
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

.users-table-container {
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

.users-table {
  width: 100%;
  border-collapse: collapse;
}

.users-table th {
  background: rgba(255, 255, 255, 0.05);
  color: #94a3b8;
  font-weight: 600;
  padding: 1rem;
  text-align: left;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.users-table td {
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  color: #f8fafc;
}

.user-row:hover {
  background: rgba(255, 255, 255, 0.02);
}

.user-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 0.9rem;
}

.user-name {
  font-weight: 600;
  margin-bottom: 0.25rem;
}

.user-username {
  font-size: 0.8rem;
  color: #94a3b8;
}

.role-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.role-admin {
  background: rgba(239, 68, 68, 0.2);
  color: #ef4444;
}

.role-user {
  background: rgba(99, 102, 241, 0.2);
  color: #6366f1;
}

.status-toggle {
  padding: 0.25rem 0.75rem;
  border-radius: 1rem;
  font-size: 0.8rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.status-toggle.active {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.status-toggle:not(.active) {
  background: rgba(107, 114, 128, 0.2);
  color: #6b7280;
}

.status-toggle:hover {
  transform: scale(1.05);
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

  .users-table {
    font-size: 0.9rem;
  }

  .users-table th,
  .users-table td {
    padding: 0.75rem 0.5rem;
  }

  .user-info {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
}
</style>
