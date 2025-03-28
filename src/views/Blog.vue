<script setup>
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import Sidenav from './Dash_panel/Sidenav.vue';
import Nav from './Dash_panel/Nav.vue';

const isSidebarOpen = ref(false); // Sidebar toggle state

// Function to toggle sidebar
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};

const state = reactive({
    Work: [],
    stacks: [],
    isLoading: false
})
//fetch work 
const works = async () => {
    try {
        state.Work = [];
    const response = await axios.get('/api/dashboard/works');
    state.Work = response.data;
    } catch (error) {
        console.error(error.message);
    }
}
//fetch stack
const stacks = async () => {
    try{
    const response = await axios.get('/api/dashboard/stacks');
    state.stacks = response.data;
    state.message = response.data.message;
    } catch (err) {
        console.log(err);
        state.message = response.data.message;
    }
}
onMounted(() => {
    works();
    stacks();
})
</script>
<template>
     <!--Main content-->
     <Nav :toggleSidebar="toggleSidebar"/>
     <div class="wrapper">
        <!--Side nav-->
        <Sidenav :class="{ open: isSidebarOpen }"/>
       
        <div :class="['main', { 'main-expanded': isSidebarOpen }]">
            <div class="container p-3">
                <h3 class="h1">
                           See The Blog
                        </h3>
                        <p class="lead fw-bold p-2">Works:</p>
         <div class="row p-5" v-for="work in state.Work" :key="work._id">
            <div class="col-lg-5 col-md-6">
                <p class="p-4 text-bold text-danger left">{{ work.name }}</p>
                <div class="cursor"></div>
            </div>
            <div class="col">
                <p class="p-4 main-text">{{work.description}}</p>
              <a :href="work.link">{{ work.link }}</a>
            </div>
        </div>

        <p class="lead fw-bold p-2">Stacks:</p>
        <div class="row mt-4 stack">
            <div v-for="stack in state.stacks" :key="stack._id" class="col-lg-4 col-md-6 flip-container" onclick="this.querySelector('.stack-item').classList.toggle('flipped')">
                <div class="stack-item">
                    <div class="stack-item__front-side">
                            <p class="pt-1 h5">{{ stack.name }}</p>
                            <img :src="stack.link"/>
                       
                    </div>
                    <div class="stack-item__back-side p-3">
                        <p class="h2">{{ stack.name }}</p>
                        <p v-html="stack.description" class="stack-tex">
                        </p>
                    </div>
                </div>
            </div>
            <div class="custom-cursor">Tap to read</div>
        </div>
        </div>

        </div>
    </div>
</template>
<style scoped>
.wrapper {
    display: flex;
}

.main{
    margin-left: 20%;
    margin-top: 7%;
    flex-direction: column;
    min-height: 100vh;
    width: 100%;
    overflow: hidden;
    transition: all 0.3s ease-in-out;
    background-color: #ffff;
    min-width: 0;
}
@media (max-width: 768px) {
  .sidebar {
    margin-top: 15%;
    position: relative;
  }
  .main {
    margin-top: 15%;
    margin-left: 0%;
  }
}
.row {
    border-bottom: 2px solid #cfcece;
}
.main-text {
    font-size: 1.2em;
    font-family: 'Poppins' sans-serif;

}
 .left {
    font-weight: bolder;
    font-size: 2rem;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
/* stack section */
.flip-container {
            perspective: 1000px;
            margin: 20px;
            transition: .5s ease-in;
        }
.flip-container:hover {
     cursor: pointer;
    transform: translateY(-20px);
    transition: .5s ease-in;
        }
.flip-container:hover .custom-cursor  {
    display: block;
}

        .stack-item {
            position: relative;
            width: 100%;
            height: 400px;
            transform-style: preserve-3d;
            transition: transform 0.6s;
        }

        .flipped {
            transform: rotateX(180deg);
        }

        .stack-item__front-side,
        .stack-item__back-side {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 10px;
            box-shadow: 4px 12px 40px rgba(0, 0, 0, 0.1);
        }

        .stack-item__front-side {
            background-color: #f9f9f9;
            display: block;
            align-items: center;
            justify-content: center;
        }

        .stack-item__back-side {
            background-color: #f9f9f9;
            color: #000;
            align-items: center;
            justify-content: center;
            transform: rotateX(180deg);
        }
/* Custom Cursor */
.custom-cursor {
            position: fixed;
            width: 100px;
            height: 40px;
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            font-size: 14px;
            text-align: center;
            line-height: 40px;
            border-radius: 20px;
            pointer-events: none;
            mix-blend-mode: difference;
            transform: translate(-50%, -50%);
            display: none;
            z-index: 1000;
        }
</style>