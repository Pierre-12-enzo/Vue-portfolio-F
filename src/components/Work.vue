<script setup>
import { reactive, onMounted } from 'vue';
import axios from 'axios';
import Singlework from '@/components/Singlework.vue';
import PulseLoader from 'vue-spinner/src/BounceLoader.vue';

const state = reactive({
  works: [],
  isLoading: true,
});

// Fetch works on mount
onMounted(async () => {
  try {
    const response = await axios.get('api/works');
    state.works = response.data;
  } catch (error) {
    console.error('Error fetching works:', error);
  } finally {
    state.isLoading = false;
  }
});

// Hover effect logic for the button
const handleMouseMove = (event) => {
  const button = event.target;
  const rect = button.getBoundingClientRect();
  const x = event.clientX - rect.left - rect.width / 2;
  const y = event.clientY - rect.top - rect.height / 2;
  button.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
};

const handleMouseLeave = (event) => {
  const button = event.target;
  button.style.transform = 'translate(0, 0)';
};
</script>
<template>
    <section id="main" class="p-4">
      <div class="container">
        <!-- Show loader while fetching -->
        <div v-if="state.isLoading" class="text-center">
          <PulseLoader :color="'#007bff'" :size="20" />
        </div>
  
        <!-- Main content -->
        <div v-else>
          <!-- What I Do -->
          <div class="row p-5">
            <div class="col-lg-5 col-md-6">
              <p class="p-4 text-bold left">WHAT I DO :</p>
              <a
                href="#about"
                class="button-hover py-5 px-4"
                @mousemove="handleMouseMove"
                @mouseleave="handleMouseLeave"
              >
                About me
              </a>
            </div>
            <div class="col">
              <p class="p-4 main-text">
                I am a web developer with experience in building dynamic and responsive websites. I specialize in HTML, CSS, JavaScript, and enjoy learning new technologies. My goal is to create user-friendly websites that provide a great user experience.
              </p>
            </div>
          </div>
  
          <!-- Latest Work -->
          <p class="h5">Latest Work</p>
          <Singlework
            v-for="work in state.works"
            :key="work._id"
            :work="work"
          />
        </div>
      </div>
    </section>
  </template>
<style scoped>
/* Main section */
#main .container .row {
  border-bottom: 2px solid #cfcece;
}

.main-text {
  font-size: 1.2em;
  font-family: 'Poppins', sans-serif;
}

.left {
  font-weight: bolder;
  font-size: 2rem;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

/* Hover button */
.button-hover {
  text-decoration: none;
  width: 210px;
  height: 190px;
  border-radius: 50%;
  font-size: 1.2rem;
  border: none;
  box-shadow: 0 4px rgba(0, 0, 0, 0.3);
  background-color: var(--primary-color);
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.3s ease;
  cursor: pointer;
}
</style>
  