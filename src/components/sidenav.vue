<script setup>
import { onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { setupCustomjs } from '@/assets/js/custom';

const route = useRoute();

// Call the function on mount
onMounted(() => {
  setupCustomjs();
});

// Watch for route changes to reinitialize the script
watch(route, () => {
  setupCustomjs();
});
</script>

<template>
     <button class="primary me-3" id="topbtn"><i class="bi bi-list"></i></button>
    <div class="sidenav" id="sidenav">
        <a id="closebtn" class="closebtn">&times;</a>
        <a href="#">Home</a>
        <a href="#about">About</a>
        <a href="#stack">Stack</a>
        <a href="#contact">Contact</a>
    </div>
</template>
<style scoped>
/*Sidenavigation*/

.sidenav {
    height: 100%;
  width: 0;
  position: fixed;
  z-index: 100;
  box-shadow: 4px 12px 40px 6px rgba(0, 0, 0, .09);
  top: 0;
  right: 0;
  background-color: var(--main-color);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}
.sidenav a{
    padding: 8px 8px 8px 32px;
    text-decoration: none;
    font-size: 25px;
    color: #818181;
    display: block;
    transition: 0.3s;
}
.sidenav a:hover {
    color: #f1f1f1;
  }
.sidenav .closebtn {
    position: absolute;
    top: 0;
    left: 0;
    font-size: 36px;
    cursor: pointer;
  }
@media screen and (max-height: 450px) {
    .sidenav {padding-top: 15px;}
    .sidenav a {font-size: 18px;}
  }

.primary {
    display: none;
    position: fixed;
    top: 5%;
    right: 0;
    width: 70px;
    height: 70px;
    border-radius: 50px;
    background-color: var(--main-color);
    color: #fff;
    border: none;
    font-size: 1.57rem;
    animation: fade-up .7s;
    outline: none;
    z-index: 100;
}
.primary:hover {
     background-color: var(--main-color);
}
/*end of side navigation*/
</style>