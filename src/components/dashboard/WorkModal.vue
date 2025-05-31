<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h3>{{ isEdit ? 'Edit Project' : 'Add New Project' }}</h3>
        <button @click="closeModal" class="close-btn">✕</button>
      </div>

      <form @submit.prevent="handleSubmit" class="modal-form">
        <div class="form-row">
          <div class="form-group">
            <label for="title">Project Title *</label>
            <input
              id="title"
              v-model="form.title"
              type="text"
              placeholder="e.g., Portfolio Website"
              required
            />
          </div>

          <div class="form-group">
            <label for="category">Category *</label>
            <select id="category" v-model="form.category" required>
              <option value="">Select Category</option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Desktop App">Desktop App</option>
              <option value="API">API</option>
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
            placeholder="Detailed description of the project..."
            rows="3"
            required
          ></textarea>
        </div>

        <div class="form-group">
          <label for="shortDescription">Short Description</label>
          <input
            id="shortDescription"
            v-model="form.shortDescription"
            type="text"
            placeholder="Brief one-line description..."
          />
        </div>

        <div class="form-row">
          <div class="form-group">
            <label for="status">Status *</label>
            <select id="status" v-model="form.status" required>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>

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

        <div class="form-section">
          <h4>Project Links</h4>
          <div class="form-row">
            <div class="form-group">
              <label for="liveLink">Live Demo URL</label>
              <input
                id="liveLink"
                v-model="form.links.live"
                type="url"
                placeholder="https://example.com"
              />
            </div>

            <div class="form-group">
              <label for="githubLink">GitHub URL</label>
              <input
                id="githubLink"
                v-model="form.links.github"
                type="url"
                placeholder="https://github.com/username/repo"
              />
            </div>
          </div>

          <div class="form-group">
            <label for="docLink">Documentation URL</label>
            <input
              id="docLink"
              v-model="form.links.documentation"
              type="url"
              placeholder="https://docs.example.com"
            />
          </div>
        </div>

        <div class="form-section">
          <h4>Project Image</h4>
          <div class="form-group">
            <label for="imageUrl">Main Image URL</label>
            <input
              id="imageUrl"
              v-model="form.mainImageUrl"
              type="url"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div class="form-checkboxes">
          <label class="checkbox-label">
            <input v-model="form.featured" type="checkbox" />
            <span class="checkmark"></span>
            Featured Project
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
            {{ loading ? 'Saving...' : (isEdit ? 'Update Project' : 'Create Project') }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  work: {
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
  title: '',
  description: '',
  shortDescription: '',
  category: 'Web Development',
  status: 'Completed',
  links: {
    live: '',
    github: '',
    documentation: ''
  },
  mainImageUrl: '',
  featured: false,
  isActive: true,
  order: 0
})

// Watch for work prop changes
watch(() => props.work, (newWork) => {
  if (newWork) {
    Object.assign(form, {
      title: newWork.title || '',
      description: newWork.description || '',
      shortDescription: newWork.shortDescription || '',
      category: newWork.category || 'Web Development',
      status: newWork.status || 'Completed',
      links: {
        live: newWork.links?.live || '',
        github: newWork.links?.github || '',
        documentation: newWork.links?.documentation || ''
      },
      mainImageUrl: newWork.mainImage?.url || '',
      featured: newWork.featured || false,
      isActive: newWork.isActive !== undefined ? newWork.isActive : true,
      order: newWork.order || 0
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
    const workData = {
      ...form,
      images: form.mainImageUrl ? [{ url: form.mainImageUrl, isMain: true }] : [],
      technologies: [] // Will be handled separately
    }

    // Remove mainImageUrl as it's now in images array
    delete workData.mainImageUrl

    emit('save', workData)
  } catch (error) {
    console.error('Error saving work:', error)
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
  max-width: 700px;
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
