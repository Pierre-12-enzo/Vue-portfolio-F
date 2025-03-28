<template>
  <div>
    <h1>Stacks</h1>
    <ul>
      <li v-for="stack in stacks" :key="stack._id">
        <strong>{{ stack.name }}</strong>: {{ stack.description }}
      </li>
    </ul>
    <div>
      <input v-model="newStack.name" placeholder="Stack Name" />
      <input v-model="newStack.description" placeholder="Stack Description" />
      <button class="btn btn-primary" @click="addStack">Add Stack</button><i class="bi bi-list"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import api from '@/services/api';

const stacks = ref([]);
const newStack = ref({ name: '', description: '' });

const fetchStacks = async () => {
  try {
    const response = await api.get('/stacks');
    stacks.value = response.data;
  } catch (error) {
    console.error('Error fetching stacks:', error);
  }
};

const addStack = async () => {
  try {
    const response = await api.post('/stacks', newStack.value);
    stacks.value.push(response.data);
    newStack.value = { name: '', description: '' };
  } catch (error) {
    console.error('Error adding stack:', error);
  }
};

onMounted(() => {
  fetchStacks();
});
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  margin: 5px 0;
}
input {
  margin: 5px;
  padding: 5px;
}
button {
  padding: 5px 10px;
}
</style>
