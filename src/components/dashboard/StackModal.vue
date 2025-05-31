<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3>{{ isEdit ? 'Edit Stack' : 'Add New Stack' }}</h3>
        <button @click="closeModal" class="close-btn">✕</button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-row">
          <div class="form-group">
            <label for="name">Stack Name *</label>
            <input
              id="name"
              v-model="form.name"
              type="text"
              placeholder="e.g., Vue.js"
              required
            />
          </div>

          <div class="form-group">
            <label for="category">Category *</label>
            <select id="category" v-model="form.category" required>
              <option value="">Select Category</option>
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
              <option value="Mobile">Mobile</option>
              <option value="Design">Design</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div class="form-group">
          <label for="description">Description *</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Brief description of the technology..."
            rows="3"
            required
          ></textarea>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="proficiencyLevel">Proficiency Level *</label>
            <select id="proficiencyLevel" v-model="form.proficiencyLevel" required>
              <option value="">Select Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div class="form-group">
            <label for="yearsOfExperience">Years of Experience</label>
            <input
              id="yearsOfExperience"
              v-model.number="form.yearsOfExperience"
              type="number"
              min="0"
              max="20"
              placeholder="0"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="color">Color</label>
            <div class="color-input-group">
              <input
                id="color"
                v-model="form.color"
                type="color"
                class="color-picker"
              />
              <input
                v-model="form.color"
                type="text"
                placeholder="#6366f1"
                class="color-text"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="link">Documentation Link</label>
            <input
              id="link"
              v-model="form.link"
              type="url"
              placeholder="https://vuejs.org"
            />
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="order">Display Order</label>
            <input
              id="order"
              v-model.number="form.order"
              type="number"
              min="0"
              placeholder="0"
            />
          </div>
        </div>

        <div class="form-checkboxes">
          <label class="checkbox-label">
            <input v-model="form.featured" type="checkbox" />
            <span class="checkmark"></span>
            Featured Stack
          </label>

          <label class="checkbox-label">
            <input v-model="form.isActive" type="checkbox" />
            <span class="checkmark"></span>
            Active
          </label>
        </div>

        <div class="modal-actions">
          <button type="button" @click="closeModal" class="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            {{ loading ? 'Saving...' : (isEdit ? 'Update Stack' : 'Create Stack') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  stack: {
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
  name: '',
  description: '',
  category: '',
  proficiencyLevel: 'Intermediate',
  color: '#6366f1',
  link: '',
  yearsOfExperience: 0,
  featured: false,
  isActive: true,
  order: 0
})

// Watch for stack prop changes
watch(() => props.stack, (newStack) => {
  if (newStack) {
    Object.assign(form, {
      name: newStack.name || '',
      description: newStack.description || '',
      category: newStack.category || '',
      proficiencyLevel: newStack.proficiencyLevel || 'Intermediate',
      color: newStack.color || '#6366f1',
      link: newStack.link || '',
      yearsOfExperience: newStack.yearsOfExperience || 0,
      featured: newStack.featured || false,
      isActive: newStack.isActive !== undefined ? newStack.isActive : true,
      order: newStack.order || 0
    })
  }
}, { immediate: true })

const closeModal = () => {
  emit('close')
}

const handleSubmit = async () => {
  try {
    loading.value = true
    emit('save', { ...form })
  } catch (error) {
    console.error('Error saving stack:', error)
  } finally {
    loading.value = false
  }
}

// Prevent body scroll when modal is open
onMounted(() => {
  document.body.classList.add('modal-open')
})

onUnmounted(() => {
  document.body.classList.remove('modal-open')
})
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  overflow-y: auto;
}

.modal-container {
  background: #1e293b;
  border-radius: 1rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  margin: auto;
  position: relative;
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

.color-input-group {
  display: flex;
  gap: 0.5rem;
}

.color-picker {
  width: 60px;
  height: 40px;
  padding: 0;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.5rem;
  cursor: pointer;
}

.color-text {
  flex: 1;
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
