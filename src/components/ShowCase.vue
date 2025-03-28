<script setup>
import { setupCustomjs } from '@/assets/js/custom';
import { watch, nextTick, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const isDark = ref(localStorage.getItem("darkMode") === "true");

const toggleDarkMode = () => {
  isDark.value = !isDark.value;
  document.body.classList.toggle("dark", isDark.value);
  localStorage.setItem("darkMode", isDark.value);
};

onMounted(() => {
  if (isDark.value) document.body.classList.add("dark");
});


const route = useRoute();

onMounted(async () => {
  await nextTick();
  setupCustomjs();
});
// Watch for route changes to reinitialize the script
watch(route, async () => {
  await nextTick();
  setupCustomjs();
});

</script>
<template>
<section id="showcase">

<div class="banner-overlay">

 <nav class="navbar navbar-expand-md p-4">
     <a href="#" class="nav-brand">
         free-lance-developer
     </a>
     <!--toggler button-->
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu"><i class="bi bi-list p-1" style="font-size: 1.8rem;border-radius: 5px;;"></i></button>
     
     <!--collapse navigation-->
     <div class="collapse navbar-collapse" id="navmenu">
       <ul class="navbar-nav ms-auto">
         <li class="nav-item">
             <a href="#about" class="nav-link">About</a>
         </li>
         <li class="nav-item">
             <a href="#stack" class="nav-link">Stack</a>
         </li>
         <li class="nav-item">
             <a href="#contact" class="nav-link contact">Contact</a>
         </li>
         <li>
            <div :class="{ 'dark-mode': isDark }">
    <button @click="toggleDarkMode" class="btn btn-primary">
      {{ isDark ? "Light Mode" : "Dark Mode" }}
    </button>
    <slot />
  </div>
</li>
         <div class="cursor"></div>
     </ul>  
     </div>
     
 </nav>
</div>
</section>
</template>
<style scoped>
/* Dark mode styling */
.dark-mode {
  background-color: #121212;
  color: white;
}
.dark-mode .btn-primary {
  background-color: #bb86fc;
  border-color: #bb86fc;
}

#showcase {
    position: relative;
    width: 100%;
    height: 100vh;
    background-image: url('../assets/images/R-Image_91.jpg');
    display: flex;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: top(20px);
    background-attachment: fixed;
    clip-path: circle(150vh at 50% -50vh);
}
.banner-overlay{
    width: 100%;
    height: 100vh;
    z-index: 2;
    background-color: rgba(0,0,0,.46);
    max-width: 1920px;
    overflow: hidden;
}
.nav-link {
    color: #fff;
    font-size: 1.17em;
    opacity: 0.8;
    transition: transform .3s ease-in-out;
}
.nav-link:hover {
    color: #fff;
    opacity: 1;
    transform: translateY(-5px);
}
.cursor {
    position: fixed;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: #fff;
    transition: 0.2s;
    transform: translate(-50%,-50%);
    pointer-events: none;
    mix-blend-mode: difference;
}

.nav-link:hover ~ .cursor {
    transform: scale(6);
}
.contact {
    background-color: var(--primary-color);
    color: #fff;
    border-radius: 10px;
    opacity: 0.8;
    transition: transform .3s;
    width: 80px;
    
}
.contact:hover {
    transform: scale(1.11);
    opacity: 1;
    color: #fff;
}
</style>