<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Login Card -->
      <div class="login-card glass-effect">
        <!-- Header -->
        <div class="login-header">
          <div class="login-icon">🔐</div>
          <h2 class="login-title">Admin Login</h2>
          <p class="login-subtitle">Access your portfolio dashboard</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="login-form">
          <!-- Username Field -->
          <div class="form-group">
            <label for="username" class="form-label">
              👤 Username or Email
            </label>
            <input
              id="username"
              v-model="form.username"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': errors.username }"
              placeholder="Enter your username or email"
              required
            />
            <div v-if="errors.username" class="invalid-feedback">
              {{ errors.username }}
            </div>
          </div>

          <!-- Password Field -->
          <div class="form-group">
            <label for="password" class="form-label">
              🔒 Password
            </label>
            <div class="password-input">
              <input
                id="password"
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="form-control"
                :class="{ 'is-invalid': errors.password }"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                class="password-toggle"
                @click="togglePassword"
              >
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <div v-if="errors.password" class="invalid-feedback">
              {{ errors.password }}
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-primary btn-login"
            :disabled="loading"
          >
            <span v-if="loading">⏳ Signing In...</span>
            <span v-else>🚀 Sign In</span>
          </button>

          <!-- Error Message -->
          <div v-if="errorMessage" class="alert alert-danger">
            ⚠️ {{ errorMessage }}
          </div>
        </form>

        <!-- Footer -->
        <div class="login-footer">
          <router-link to="/" class="back-link">
            ← Back to Portfolio
          </router-link>
        </div>
      </div>

      <!-- Demo Credentials -->
      <div class="demo-credentials">
        <div class="demo-card glass-effect">
          <h6>ℹ️ Demo Credentials</h6>
          <p><strong>Username:</strong> admin</p>
          <p><strong>Password:</strong> admin123</p>
          <small>For demonstration purposes only</small>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { api } from '@/utils/api'

const router = useRouter()
const route = useRoute()

// Reactive data
const loading = ref(false)
const showPassword = ref(false)
const errorMessage = ref('')

const form = reactive({
  username: '',
  password: ''
})

const errors = reactive({
  username: '',
  password: ''
})

// Methods
const validateForm = () => {
  errors.username = ''
  errors.password = ''

  let isValid = true

  if (!form.username.trim()) {
    errors.username = 'Username or email is required'
    isValid = false
  }

  if (!form.password) {
    errors.password = 'Password is required'
    isValid = false
  } else if (form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  try {
    loading.value = true
    errorMessage.value = ''

    const data = await api.signin({
      username: form.username.trim(),
      password: form.password
    })

    if (data.user) {
      alert(`✅ Welcome back, ${data.user.firstName}!`)

      // Redirect to intended page or dashboard
      const redirectTo = route.query.redirect || '/dashboard'
      router.push(redirectTo)
    }

  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.message || 'Login failed. Please try again.'
  } finally {
    loading.value = false
  }
}

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

// Auto-focus username field
onMounted(() => {
  const usernameInput = document.getElementById('username')
  if (usernameInput) {
    usernameInput.focus()
  }
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 1rem;
  position: relative;
  overflow: hidden;
}

.login-container {
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 1;
}

.login-card {
  padding: 2.5rem;
  border-radius: 1.5rem;
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
}

.login-header {
  text-align: center;
  margin-bottom: 2rem;
}

.login-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
  font-size: 2rem;
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.login-subtitle {
  color: #94a3b8;
  margin-bottom: 0;
}

.login-form .form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #f8fafc;
}

.form-control {
  width: 100%;
  padding: 0.875rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 0.75rem;
  color: #f8fafc;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.form-control::placeholder {
  color: #94a3b8;
}

.form-control:focus {
  background: rgba(255, 255, 255, 0.15);
  border-color: #6366f1;
  box-shadow: 0 0 0 0.2rem rgba(99, 102, 241, 0.25);
  outline: none;
}

.form-control.is-invalid {
  border-color: #ef4444;
  box-shadow: 0 0 0 0.2rem rgba(239, 68, 68, 0.25);
}

.password-input {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #94a3b8;
  cursor: pointer;
  padding: 0.25rem;
  transition: color 0.3s ease;
}

.password-toggle:hover {
  color: #6366f1;
}

.invalid-feedback {
  color: #ef4444;
  font-size: 0.875rem;
  margin-top: 0.25rem;
}

.btn-login {
  width: 100%;
  padding: 0.875rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 0.75rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  border: none;
  color: white;
  transition: all 0.3s ease;
  cursor: pointer;
}

.btn-login:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(99, 102, 241, 0.4);
}

.btn-login:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.alert {
  margin-top: 1rem;
  padding: 0.875rem;
  border-radius: 0.75rem;
  border: none;
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
  border: 1px solid rgba(239, 68, 68, 0.3);
}

.login-footer {
  text-align: center;
  margin-top: 2rem;
}

.back-link {
  color: #94a3b8;
  text-decoration: none;
  transition: all 0.3s ease;
}

.back-link:hover {
  color: #6366f1;
  transform: translateX(-3px);
}

.demo-credentials {
  margin-top: 2rem;
}

.demo-card {
  padding: 1.5rem;
  border-radius: 1rem;
  text-align: center;
}

.demo-card h6 {
  color: #6366f1;
  margin-bottom: 1rem;
}

.demo-card p {
  margin-bottom: 0.5rem;
  color: #f8fafc;
}

.demo-card strong {
  color: #6366f1;
}

.demo-card small {
  color: #94a3b8;
  font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 480px) {
  .login-card {
    padding: 2rem 1.5rem;
  }

  .login-icon {
    width: 60px;
    height: 60px;
    font-size: 1.5rem;
  }

  .login-title {
    font-size: 1.75rem;
  }
}
</style>
