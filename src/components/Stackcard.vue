<script setup>
import stack from '@/components/stack.vue';
import axios from 'axios';
import { onMounted, ref } from 'vue';

const stacks = ref([]);

onMounted(async () => {
    try {
        const response = await axios.get('api/stacks');
        stacks.value = response.data;       
    } catch (error) {
        console.error('Error fetching stacks');
    }
});

</script>
<template>
      <!--Stack section -->
 <center><p style="font-size: 2.0rem; font-weight: bold;">MY STACK</p></center>  
<section id="stack" class="p-5 mt-0">
 <div class="container">
   
   <div class="row mt-4 stack">
   
      
      <stack v-for="stack in stacks" :key="stack._id" :stack="stack"/>
      
        

    </div>
    </div>
    </section>
</template>
