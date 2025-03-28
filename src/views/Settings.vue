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
    User: {}
})
//fetching User data
async function fetchUser() {
    try{
        const response = await axios.get('/api/dashboard/profile');
        state.User = response.data;
    } catch (error) {
        console.error(error);
    }
}
//Editing user
async function editUser() {
    try{
        const response = await axios.put('/api/dashboard/profile', {
           firstname: state.User.firstname,
           lastname: state.User.lastname,
           email: state.User.email,
           password: state.User.password,
           role: state.User.role,
           username: state.User.username
        });
        state.User = response.data;
        fetchUser();
    } catch (err) {
        console.log(err)
    }
}
onMounted(() => {
    fetchUser();
})
</script>

<template>
    <!--Main content-->
    <Nav :toggleSidebar="toggleSidebar"/>
     <div class="wrapper">
        <!--Side nav-->
        <Sidenav :class="{ open: isSidebarOpen }"/>
       
        <div :class="['main', { 'main-expanded': isSidebarOpen }]">
            <div class="container-fluid">
                <div class="d-flex justify-content-center align-items-center mt-3">
                    <div class="avatar py-3 px-4">
                        {{ state.User.username?.charAt(0).toUpperCase() || '' }}
                    </div>
                </div>
                <!-- Guide -->
                <div class="container p-2">
                    <h2>Admin Settings</h2>
                    <p class="text-primary">Change your info...</p>
                </div>
                <!-- Form Container -->
                <form @submit.prevent="editUser">
                    <div class="row p-2">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="username" class="h2 text-dark">Username</label>
                                <input type="text" class="form-control" id="username" v-model="state.User.username" />
                            </div>
                            <div class="form-group">
                                <label for="password" class="h2 text-dark">Password</label>
                                <input type="password" class="form-control" id="password" v-model="state.User.password" />
                            </div>
                            <div class="form-group">
                                <label for="email" class="h2 text-dark">Email</label>
                                <input type="email" class="form-control" id="email" v-model="state.User.email" />
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label for="firstname" class="h2 text-dark">First Name</label>
                                <input type="text" id="firstname" class="form-control" v-model="state.User.firstname" />
                            </div>
                            <div class="form-group">
                                <label for="lastname" class="h2 text-dark">Last Name</label>
                                <input type="text" class="form-control" id="lastname" v-model="state.User.lastname" />
                            </div>
                            <div class="form-group">
                                <label for="role" class="h2 text-dark">Role</label>
                                <input type="text" class="form-control" id="role" v-model="state.User.role" />
                            </div>
                        </div>
                    </div>
                    <div class="d-flex justify-content-center align-items-center mt-3">
                        <input type="submit" class="btn btn-primary" value="Save Changes">
                    </div>
                </form>
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

.btn-primary {
    transition: 0.4s;
}

.btn-primary:hover {
    transform: translateY(-5px) scale(1.1);
}

.avatar {
    border-radius: 50%;
    background-color: green;
    color: #fff;
    font-size: 2.5rem;
    text-align: center;
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}
.form-control:focus {
    border-color: #8b0841;
    box-shadow: 0 0 5px rgba(0, 123, 255, 0.5);
    background: transparent;
    outline: none;
}
</style>
