<script setup>
import Nav from './Dash_panel/Nav.vue';
import Sidenav from './Dash_panel/Sidenav.vue';
import { onMounted, reactive, ref } from 'vue';
import axios from 'axios';

const state = reactive({
    works: [],
    loading: true
})
const work = reactive({
    name: '',
    description: '',
    link: '',
    message: ''
})
const editWork = reactive({
    name: '',
    description: '',
    link: '',
    message: ''
})
const deleteWork = reactive({
    message: '',
    _id: ''
}) 
const isSidebarOpen = ref(false); // Sidebar toggle state

// Function to toggle sidebar
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};
const total = ref([]);
//Total
async function totals() {
    try {
        const response = await axios.get('/api/count');
    total.value = response.data;
    } catch (error) {
        console.error('Error fetching Total:', error);
    }
    
} 
//fetching works
async function fetchWorks() {
    try{
    const response = await axios.get('/api/dashboard/works');
    state.works = response.data;
    state.loading = false;

    } catch(err) {
        console.log(err);
    }
}
//Adding Works
async function AddWorks() {
    try{
        const response = await axios.post('/api/dashboard/works',{
            name: work.name,
            description: work.description,
            link: work.link
        });
        
        work.message = response.data.message;
        fetchWorks();
        totals();
    } catch(err) {
        console.log(err);
    }
}
//Editing works
//getting works
function puttingWorks(work){
    editWork._id = work._id;
    editWork.name = work.name;
    editWork.description = work.description;
    editWork.link = work.link;
}
//Editing works
async function editWorks() {
    try{
        const response = await axios.put(`/api/dashboard/works/${editWork._id}`, {
            name: editWork.name,
            description: editWork.description,
            link: editWork.link
        });
        editWork.message = response.data.message
        fetchWorks();
    } catch(err) {
        console.log(err);
    }
}
//Deleting works
async function deleteWorks(work) {
    deleteWork._id = work._id;
    try{
        const confirm = window.confirm(`Are you sure you want to delete this Work?`);
        if (confirm) {
        const response = await axios.delete(`/api/dashboard/works/${deleteWork._id}`);
        deleteWork.message = response.data.message
        fetchWorks();
        totals();
    }   
} catch (err) {
    console.log(err);
}
}

onMounted(() => {
    fetchWorks();
    totals();
})

</script>
<template>
     <!--Main content-->
     <Nav :toggleSidebar="toggleSidebar"/>
     <div class="wrapper">
        <!--Side nav-->
        <Sidenav :class="{ open: isSidebarOpen }"/>
       
        <div :class="['main', { 'main-expanded': isSidebarOpen }]">
            <div class="container">
                <div class="mb-3">
                        <h3 class="fw-bold fs-4 mb-5 mt-4 mx-3">View Works  <button style="background-color: #8b0841; border: none;" class="btn btn-primary">
                            {{ total.totalWorks * 1 }}
                        </button></h3>
                </div>
                <div class="container">
                <table class="table table-striped table-hover">
                    <thead>
                        <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Link</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                        <tr v-for="work in state.works" :key="work._id">
                        <td>{{ work._id }}</td>
                        <td>{{ work.name }}</td>
                        <td>{{ work.description }}</td>
                        <td>{{ work.link }}</td>
                        <td><button data-bs-toggle="modal" @click="puttingWorks(work)" data-bs-target="#editForm" class="btn  btn-outline-primary"><i class="bi bi-pencil-square"></i></button></td>
                        <td><button  class="btn btn-outline-danger" @click="deleteWorks(work)"><i class="bi bi-trash"></i>  </button></td>
                    </tr>
                    </tbody>
                    
                    
                </table>
                </div>
            </div>

</div>
</div>
<button class="btn btn-success rounded-circle py-2 px-3 m-3 add"
                data-bs-toggle="modal" data-bs-target="#addForm" >
                    <i class="bi bi-plus"></i></button>


      <!--Modals--> 



      <!--Add Form-->

    <div class="modal fade" id="addForm" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <form class="form" @submit.prevent="AddWorks">
          <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel">Add New Latest Work</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
                <div class="mb-3">
                    <label for="name">Work Name</label>
                    <input type="text" class="form-control" required="required" v-model="work.name">
                </div>
                <div class="mb-3">
                    <label for="name">Work Description</label>
                    <textarea id="message"  name="message" rows="6" v-model="work.description" cols="60" placeholder="Enter your message here..."></textarea>
                </div>
                <div class="mb-3">
                    <label for="name">Work Link</label>
                    <input type="text" class="form-control" required="required" v-model="work.link">
                </div>
           
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Add Work</button>
          </div>
        </form>
        </div>
      </div>
    </div>  
    
    <!--Update form-->
    <div class="modal fade" id="editForm" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <form class="form" @submit.prevent="editWorks">
          <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel">Update this work {{ work._id }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
                <div class="mb-3">
                    <label for="name">Work Name</label>
                    <input type="text" class="form-control" required="required" v-model="editWork.name">
                </div>
                <div class="mb-3">
                    <label for="name">Work Description</label>
                    <textarea id="message"  name="message" rows="6" v-model="editWork.description" cols="60" placeholder="Enter your message here..."></textarea>
                </div>
                <div class="mb-3">
                    <label for="name">Work Link</label>
                    <input type="text" class="form-control" required="required" v-model="editWork.link">
                </div>
           
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Save</button>
          </div>
        </form>
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
.add {
    position: fixed;
    right: 0;
    bottom: 0;
}
.add i {
    font-size: 35px;
}
</style>