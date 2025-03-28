<script setup>
import { RouterLink, useRouter } from 'vue-router';
import {defineProps} from 'vue';
import axios from 'axios';

const router = useRouter();
const props = defineProps({
    toggleSidebar: Function,
});
//Logging Out
const Logout = async () => {
    try {
        const response = await axios.post('/api/logout');
        if (response.status === 200) {
            console.log('Logged out successfully');
            router.push('/'); // Redirect to home or login
        } else {
            console.error('Failed to log out:', response.data.message);
        }
    } catch (error) {
        console.error('Logout error:', error.response ? error.response.data : error.message);
    }
};
</script>
<template>

<nav class="navbar navbar-expand fixed-top px-4 py-3">
    <div class="d-flex">
                <button id="toggle-btn" class="dash d-none d-lg-block" type="button">
                    <i class="bi bi-speedometer2"></i>
                </button>
                <div class="sidebar-logo d-sm-block">
                    <a to="#">Dashboard</a>
                </div>
                <button id="toggle-btn" class="sidebar-toggler" @click="toggleSidebar">
                    <i class="bi bi-speedometer2 d-lg-none"></i>
            </button>
                <form class="d-none d-md-flex ms-4">
                    <input class="form-control border-0" type="search" placeholder="Search">
                </form>
                </div>
                <div class="navbar-collapse collapse">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item dropdown">
                            <RouterLink to="#" class="nav-icon p-3" data-bs-toggle="dropdown">
                               <button class="btn"><i class="bi bi-person mr-3"></i> User Profile</button>
                            </RouterLink>
                            <div class="dropdown-menu dropdown-menu-end rounded">
                               <RouterLink to="/dashboard/settings" class="dropdown-item">
                                 <i class="bi bi-gear mr-3"></i>
                                <span>Settings</span>
                               </RouterLink>
                               <a href="#" @click.prevent="Logout" class="dropdown-item">
                                <i class="bi bi-box-arrow-right"></i>
                               <span>logout</span>
                               </a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
</template>
<style scoped>

.navbar{
    background-color: #f5f5f5f5;
    box-shadow: 10px 5px 15px var(--primary-color);
}
.navbar-expand .navbar-collapse{
    min-width: 200px;
}
.nav-icon:hover {
    color: #8b0841;
    background-color: white;
    border-radius: 10px;
    transition: all .25s ease-in-out;
}
#toggle-btn{
    background-color: transparent;
    cursor: pointer;
    border: 0;
    padding: 0.5rem 1.1rem; 
}
#toggle-btn i{
    font-size: 1.5rem;
    color: var(--primary-color);
}
.sidebar-logo{
    margin: auto 0;
}
.sidebar-logo a{
    color: var(--primary-color);
    font-weight: 600;
    font-size: 1.5rem;
}
</style>
<script>
(function ($) {
    // Sidebar Toggler
    $('.bi-speedometer2').click(function () {
        $('.sidebar, .content').toggleClass("open");
        return false;
    });
})
</script>