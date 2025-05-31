// API configuration and utilities

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// Create a fetch wrapper with proper configuration
export const apiRequest = async (endpoint, options = {}) => {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`

  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    },
    ...options
  }

  try {
    const response = await fetch(url, config)

    // Handle different response types
    const contentType = response.headers.get('content-type')
    let data

    if (contentType && contentType.includes('application/json')) {
      data = await response.json()
    } else {
      data = await response.text()
    }

    if (!response.ok) {
      throw new Error(data.message || data || `HTTP error! status: ${response.status}`)
    }

    return data
  } catch (error) {
    console.error('API Request Error:', error)
    throw error
  }
}

// Specific API methods
export const api = {
  // Authentication
  signin: (credentials) => apiRequest('/api/signin', {
    method: 'POST',
    body: JSON.stringify(credentials)
  }),

  signout: () => apiRequest('/api/signout', {
    method: 'POST'
  }),

  checkAuth: () => apiRequest('/api/check-auth'),

  // Public data
  getStacks: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return apiRequest(`/api/stacks${query ? `?${query}` : ''}`)
  },

  getWorks: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return apiRequest(`/api/works${query ? `?${query}` : ''}`)
  },

  getWork: (id) => apiRequest(`/api/works/${id}`),

  contact: (formData) => apiRequest('/api/contact', {
    method: 'POST',
    body: JSON.stringify(formData)
  }),

  // Dashboard (protected)
  dashboard: {
    // Stacks
    getStacks: () => apiRequest('/api/dashboard/stacks'),
    createStack: (data) => apiRequest('/api/dashboard/stacks', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateStack: (id, data) => apiRequest(`/api/dashboard/stacks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    deleteStack: (id) => apiRequest(`/api/dashboard/stacks/${id}`, {
      method: 'DELETE'
    }),

    // Works
    getWorks: () => apiRequest('/api/dashboard/works'),
    createWork: (data) => apiRequest('/api/dashboard/works', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateWork: (id, data) => apiRequest(`/api/dashboard/works/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    deleteWork: (id) => apiRequest(`/api/dashboard/works/${id}`, {
      method: 'DELETE'
    }),

    // Users
    getUsers: () => apiRequest('/api/dashboard/users'),
    createUser: (data) => apiRequest('/api/dashboard/users', {
      method: 'POST',
      body: JSON.stringify(data)
    }),
    updateUser: (id, data) => apiRequest(`/api/dashboard/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data)
    }),
    deleteUser: (id) => apiRequest(`/api/dashboard/users/${id}`, {
      method: 'DELETE'
    }),

    // Profile
    getProfile: () => apiRequest('/api/dashboard/profile'),
    updateProfile: (data) => apiRequest('/api/dashboard/profile', {
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }
}

export default api
