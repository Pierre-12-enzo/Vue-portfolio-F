<script setup>
import { RouterView } from 'vue-router';
import { setupCustomjs } from '@/assets/js/custom';
import { ref, watch, nextTick, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const loading = ref(true); // Loading state to control spinner visibility

// Function to handle setup and loading state
const initializePage = async () => {
  loading.value = true; // Show the spinner
  await nextTick();
  setupCustomjs();
  loading.value = false; // Hide the spinner after setup
};

// Run the initializePage function when the component is mounted
onMounted(() => {
  initializePage();
});

// Watch for route changes to reinitialize the script
watch(route, () => {
  initializePage();
});
</script>

<template>
  <!-- Loading Spinner -->
  <div v-if="loading" class="d-flex justify-content-center align-items-center" style="height: 100vh;">
    <div class="spinner-border text-success" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>

  <!-- Main content, visible only when loading is false -->
  <div v-else>
    <RouterView/>
  </div>
</template>
