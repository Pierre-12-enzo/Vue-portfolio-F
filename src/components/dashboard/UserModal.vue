<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3>{{ isEdit ? 'Edit User' : 'Add New User' }}</h3>
        <button @click="closeModal" class="close-btn">✕</button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-row">
          <div class="form-group">
            <label for="firstName">First Name *</label>
            <input
              id="firstName"
              v-model="form.firstName"
              type="text"
              placeholder="John"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="lastName">Last Name *</label>
            <input
              id="lastName"
              v-model="form.lastName"
              type="text"
              placeholder="Doe"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="username">Username *</label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              placeholder="johndoe"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="email">Email *</label>
            <input
              id="email"
              v-model="form.email"
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="role">Role *</label>
            <select id="role" v-model="form.role" required>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div class="form-group" v-if="!isEdit">
            <label for="password">Password *</label>
            <input
              id="password"
              v-model="form.password"
              type="password"
              placeholder="••••••••"
              :required="!isEdit"
            />
          </div>
        </div>

        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea
            id="bio"
            v-model="form.bio"
            placeholder="Brief bio about the user..."
            rows="3"
          ></textarea>
        </div>

        <div class="form-section">
          <h4>Social Links</h4>
          <div class="form-row">
            <div class="form-group">
              <label for="github">GitHub</label>
              <input
                id="github"
                v-model="form.socialLinks.github"
                type="url"
                placeholder="https://github.com/username"
              />
            </div>
            
            <div class="form-group">
              <label for="linkedin">LinkedIn</label>
              <input
                id="linkedin"
                v-model="form.socialLinks.linkedin"
                type="url"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="twitter">Twitter</label>
              <input
                id="twitter"
                v-model="form.socialLinks.twitter"
                type="url"
                placeholder="https://twitter.com/username"
              />
            </div>
            
            <div class="form-group">
              <label for="website">Website</label>
              <input
                id="website"
                v-model="form.socialLinks.website"
                type="url"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        <div class="form-checkboxes">
          <label class="checkbox-label">
            <input v-model="form.isActive" type="checkbox" />
            <span class="checkmark"></span>
            Active User
          </label>
        </div>

        <div class="modal-actions">
          <button type="button" @click="closeModal" class="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : (isEdit ? 'Update User' : 'Create User') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close', 'save'])

const loading = ref(false)

const form = reactive({
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  role: 'user',
  bio: '',
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: '',
    website: ''
  },
  isActive: true
})

// Watch for user prop changes
watch(() => props.user, (newUser) => {
  if (newUser) {
    Object.assign(form, {
      firstName: newUser.firstName || '',
      lastName: newUser.lastName || '',
      username: newUser.username || '',
      email: newUser.email || '',
      password: '', // Never populate password
      role: newUser.role || 'user',
      bio: newUser.bio || '',
      socialLinks: {
        github: newUser.socialLinks?.github || '',
        linkedin: newUser.socialLinks?.linkedin || '',
        twitter: newUser.socialLinks?.twitter || '',
        website: newUser.socialLinks?.website || ''
      },
      isActive: newUser.isActive !== undefined ? newUser.isActive : true
    })
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const handleSubmit = async () => {
  try {
    loading.value = true
    
    // Prepare data for API
    const userData = { ...form }
    
    // Remove password if editing and it's empty
    if (props.isEdit && !userData.password) {
      delete userData.password
    }
    
    emit('save', userData)
  } catch (error) {
    console.error('Error saving user:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
}

.modal-container {
  background: #1e293b;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.modal-header h3 {
  color: #f8fafc;
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.close-btn {
  background: none;
  border: none;
  color: #94a3b8;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 0.25rem;
  transition: all 0.3s ease;
}

.close-btn:hover {
  color: #f8fafc;
  background: rgba(255, 255, 255, 0.1);
}

.modal-form {
  padding: 1.5rem;
}

.form-section {
  margin-bottom: 2rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.form-section h4 {
  color: #f8fafc;
  margin: 0 0 1rem 0;
  font-size: 1rem;
  font-weight: 600;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  color: #f8fafc;
  font-weight: 500;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 0.75rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  color: #f8fafc;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #6366f1;
  background: rgba(255, 255, 255, 0.1);
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #94a3b8;
}

.form-group select option {
  background: #1e293b;
  color: #f8fafc;
}

.form-checkboxes {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f8fafc;
  cursor: pointer;
  font-size: 0.9rem;
}

.checkbox-label input[type="checkbox"] {
  width: auto;
  margin: 0;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.btn {
  padding: 0.75rem 1.5rem;
  font-weight: 600;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 5px 15px rgba(99, 102, 241, 0.4);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Responsive */
@media (max-width: 768px) {
  .modal-container {
    margin: 1rem;
    max-height: calc(100vh - 2rem);
  }
  
  .form-row {
    grid-template-columns: 1fr;
  }
  
  .form-checkboxes {
    flex-direction: column;
    gap: 1rem;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}
</style>
