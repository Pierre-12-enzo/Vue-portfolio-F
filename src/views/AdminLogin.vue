<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import axios from 'axios';

const router = useRouter();

const errormsg = reactive({
  show: false,
  message: ''
});

const state = reactive({
  admin: '',
  password: '',
  message: '',
  passwordInvalid: false,
});

// Ref for form
const formRef = ref(null);
const formPasswordRef = ref(null);
const toast = useToast();

// Watch for password validation
const validatePassword = () => {
  if (state.password.length < 6 || state.password.length > 16) {
    state.passwordInvalid = true;
  } else {
    state.passwordInvalid = false;
  }
};

const handleSubmit = async () => {
  const form = formRef.value;
  validatePassword();
  if (state.passwordInvalid) {
    form.classList.add('was-validated');
    return;
  }

  try {
    const response = await axios.post('/api/signin', {
      username: state.admin,
      password: state.password
    });

    state.message = response.data.message;

    if (state.message === 'Logged in') {
      errormsg.show = false;
      toast(state.message, { timeout: 2000 });
      router.push('/dashboard');
    }
  }catch (error) {
  console.error('Signin Request Error:', error);

  if (error.response) {
    errormsg.show = true;
    errormsg.message = error.response.data.message || 'Unknown error';
    
  } else if (error.request) {
    console.error('No response received from the server:', error.request);
    errormsg.message = 'No response from server.';
  } else {
    console.error('Axios error message:', error.message);
    errormsg.message = 'An error occurred.';
  }
}

};
</script>

<template>
  <div>
    <!-- Login Form -->
    <div class="container">
      <div class="justify-content-center text-center pt-5 h1" style="font-family: italic;">Admin Panel</div>
      <div class="login-container mt-5 bg-white">
        <h2 class="text-center mb-4">Login Here</h2>
        <form ref="formRef" @submit.prevent="handleSubmit" novalidate>
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              v-model="state.admin"
              class="form-control"
              id="username"
              required
            />
            <div class="invalid-feedback">Invalid Username</div>
            <div class="valid-feedback">Correct Username</div>
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              placeholder="Enter Password"
              type="password"
              class="form-control"
              v-model="state.password"
              id="password"
              ref="formPasswordRef"
              @input="validatePassword"
              required
            />
            <div v-if="state.passwordInvalid" class="invalid-feedback">Password must be between 6 and 16 characters.</div>
            <div class="valid-feedback">Correct Password</div>
          </div>
          <button type="submit" class="btn btn-primary w-100">Login</button>
          <div v-if="errormsg.show" class="alert alert-danger mt-3">{{ errormsg.message }}</div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
}
.Vue-Toastification__toast-body.my-toast-class {
  background-color: red;
}
</style>
