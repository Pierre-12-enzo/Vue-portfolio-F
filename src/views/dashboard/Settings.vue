<template>
  <div class="dashboard-page">
    <div class="container">
      <div class="page-header">
        <h1 class="page-title">⚙️ Settings</h1>
        <p class="page-subtitle">Profile and application settings</p>
      </div>

      <div class="page-content">
        <div class="content-placeholder glass-effect">
          <div class="placeholder-icon">🚧</div>
          <h3>Coming Soon</h3>
          <p>Settings interface will be implemented here.</p>
          <p>Features will include:</p>
          <ul>
            <li>✅ Profile management</li>
            <li>✅ Change password</li>
            <li>✅ Social media links</li>
            <li>✅ Email preferences</li>
            <li>✅ Theme settings</li>
            <li>✅ Application configuration</li>
          </ul>
          <router-link to="/dashboard" class="btn btn-primary">
            ← Back to Dashboard
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Settings logic will be implemented here
</script>

<style scoped>
.dashboard-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  padding: 2rem 0 4rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-header {
  text-align: center;
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
}

.content-placeholder {
  max-width: 600px;
  margin: 0 auto;
  padding: 3rem;
  border-radius: 1rem;
  text-align: center;
}

.placeholder-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.content-placeholder h3 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #f8fafc;
}

.content-placeholder p {
  color: #94a3b8;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.content-placeholder ul {
  text-align: left;
  color: #94a3b8;
  margin-bottom: 2rem;
}

.content-placeholder li {
  margin-bottom: 0.5rem;
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
</style>
