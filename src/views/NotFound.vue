<script setup>

</script> 
<template>
    
    <div class="container">
        <div class="error-number">404</div>
        <div class="error-message">Oops! Page not found.</div>
        <p>Sorry, the page you are looking for does not exist. You may have mistyped the address or the page may have moved.</p>
        <a href="/" class="btn btn-primary">Go to Homepage</a>
      </div>
    
</template>
    <style scoped>
     body {
          background-color: #f8f9fa;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          text-align: center;
        }
        .error-number {
          font-size: 10rem;
          font-weight: 700;
          color: #dc3545;
        }
        .error-message {
          font-size: 1.5rem;
          margin-bottom: 1rem;
        }
        .btn-primary {
          background-color: #007bff;
          border-color: #007bff;
        }
    </style>