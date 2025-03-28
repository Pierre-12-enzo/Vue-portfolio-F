<script setup>
import {onMounted, ref, onBeforeUnmount} from 'vue';
import axios from 'axios';
import Sidenav from './Dash_panel/Sidenav.vue';
import Nav from './Dash_panel/Nav.vue';

const welcome = "Welcome";
const User = ref([]);
const progress = ref({ stackProgress: 0, workProgress: 0 });
let progressInterval;
const total = ref([]);

const isSidebarOpen = ref(false); // Sidebar toggle state

// Function to toggle sidebar
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
//Total
async function totals() {
    try {
        const response = await axios.get('/api/count');
    total.value = response.data;
    } catch (error) {
        console.error('Error fetching Total:', error);
    }
    
}

//fetch Progress bars
const fetchProgress = async () => {
    try {
        const response = await axios.get('/api/progress');
        progress.value = response.data;
    } catch (error) {
        console.error('Error fetching progress:', error);
    }
};
//fetching User data
async function user() {
    try{
        const response = await axios.get('/api/dashboard/profile');
        User.value = response.data;
    } catch (error) {
        console.error(error);
    }
}
onMounted(() => {
   user();
   fetchProgress();
   totals();

   // Set up periodic fetch every 10 seconds (adjust as needed)
   progressInterval = setInterval(() => {
        fetchProgress();
    }, 10000);
})
onBeforeUnmount(() => {
    // Clear interval on component unmount
    clearInterval(progressInterval);
});
</script>
<template>
     <!--Main content-->
     <Nav :toggleSidebar="toggleSidebar"/>
     <div class="wrapper">
        <!--Side nav-->
        <Sidenav :class="{ open: isSidebarOpen }"/>
       
        <div :class="['main', { 'main-expanded': isSidebarOpen }]">
               
            <div class="container-fluid">
                <div class="my-4">
                        <h3 class="h1 text-primary">
                            <!--Welcome message-->
                            {{ welcome.toUpperCase() }}
                <span class="fw-bold fs-4 mb-5 mt-3" style="color: #000;"> {{ User.username }} !!</span><br>
                        </h3>
                </div>
                <div class="row">
                    <div class="col-12 col-md-5">
                        <div class="card border-0">
                            <div class="card-body py-4">
                            <h5 class="mb-2 fw-bold">
                                Total Stacks
                            </h5>
                            <p class="mb-2 fw-bold">
                                {{ total.totalStacks }}
                            </p>
                            <div class="mb-0">
                                <span class="badge text-success me-2">
                                       {{progress.stackProgress}}%
                                </span>
                                <span class="fw-bold">
                                        This year
                                </span>
                            </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-12 col-md-5">
                        <div class="card border-0">
                            <div class="card-body py-4">
                                    <h5 class="mb-2 fw-bold">
                                        Total Works
                                    </h5>
                                    <p class="mb-2 fw-bold">
                                       {{ total.totalWorks }}
                                    </p>
                                    <div class="mb-0">
                                        <span class="badge text-success me-2">
                                               {{ progress.workProgress }}%
                                         </span>
                                        <span class="fw-bold">
                                                 This year
                                        </span>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="my-4">
                        <h3 class="h1 fw-bold" style="color: #000;">
                            My Progress:
                        </h3>
                </div>

            <div class="container">

                <div class="row">

                    <div class="col-10 col-md-4">
                            <p class="h3 text-primary">Stack</p>
                            <div class="progress" style="height: 25px;">
                                <div class="progress-bar" :style="{ width: progress.stackProgress + '%' }">
                                   <p class="lead pt-2">{{ progress.stackProgress }}%</p>
                                </div>
                            </div>
                    </div>
                    <div class="col-10 col-md-4">
                            <p class="h3 text-primary">Work</p>
                            <div class="progress" style="height: 25px;">
                                <div class="progress-bar" :style="{ width: progress.workProgress + '%' }">
                                    <p class="lead pt-2">{{ progress.workProgress }}%</p>
                                </div>
                            </div>
                     </div>
                    </div>
                    </div>
                    
    
                    
            </div>
         </div>
        </div> 
                          
</template>
<style scoped>

.wrapper{
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
.card{
    background-color: #f5f5f5f5;
    transition: .4s;
    cursor: pointer;
    color: #000;
    margin-bottom: 1rem;
}
.card:hover{
    background-color: #f9f9f9;
    color: #000;
    transform: translateY(-10.5px);
}
.progress-bar {
    background-color: var(--primary-color);
    box-shadow: 10px 5px 15px rgba(33,37,41,.1);
    font-size: 10px;
}
.progress-bar p {
    font-size: 25px;
}
.text-success{
    background-color: #8b0841;
    padding: 0.25rem 0.3;
    color: #FFF !important;
    border-radius: 5px;
}
.content{
    flex: 1 1 auto;
}
</style>