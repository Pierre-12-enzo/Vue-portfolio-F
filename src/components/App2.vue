<script setup>
import {ref} from 'vue';
const name = ref('Enzo');
const status = ref('pending');
const tasks = ref(['1','12','13','3,']);


function togglestatus () {
  if (status.value === 'pending') {
    status.value = 'inactive'
  } else if(status.value === 'active') {
    status.value = 'pending'
  } else {
    status.value = 'active'
  }
}
</script>

<template>
  <h3>{{ name }}</h3>
  <h1>Customers:</h1>
  <ul>
    <p class="h1 text-primary">Hello <i class="bi bi-list"></i></p>

    <li v-for="task in cutasks" :key="task">{{ task }}</li>
    <p class="text-primary">{{ status }}</p>
    <button v-on:click="togglestatus()" class="btn btn-primary">Change status</button>
  </ul>
  
</template>

