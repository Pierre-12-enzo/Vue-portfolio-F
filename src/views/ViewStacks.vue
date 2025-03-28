<script setup>
import Nav from "./Dash_panel/Nav.vue";
import Sidenav from './Dash_panel/Sidenav.vue';
import { onMounted, reactive, ref } from 'vue';
import Editor from "@/components/Editor.vue";
import axios from 'axios';



//toggle sidebar
const isSidebarOpen = ref(false); // Sidebar toggle state

// Function to toggle sidebar
const toggleSidebar = () => {
    isSidebarOpen.value = !isSidebarOpen.value;
};


//Total
const total = ref([]);
async function totals() {
    try {
        const response = await axios.get('/api/count');
    total.value = response.data;
    } catch (error) {
        console.error('Error fetching Total:', error);
    }
    
}

//fetching stacks
const state = reactive({
    stacks: [],
    message: '',
    isLoading: false
})

async function fetchStacks() {
    try{
    const response = await axios.get('/api/dashboard/stacks');
    state.stacks = [...response.data];
    state.message = response.data.message;
    } catch (err) {
        console.log(err);
        state.message = response.data.message;
    }
}

function ToggleshowFullDescription (stack) {
    stack.showFullDescription = !stack.showFullDescription;
}
function ToggleshowFulllink (stack) {
    stack.showFullDescription2 = !stack.showFullDescription2;
}
const stack = reactive({
    name: '',
    description: '',
    link: '',
    message: '',
    showFullDescription: false,
    showFullDescription2: false
})
//Adding Stacks
async function AddStacks() {
    try{
         stack.description = stack.description.trim(); // Ensure no unwanted spaces
        const stackData = {
            name: stack.name,
            description: stack.description,
            link: stack.link
        }
        const response = await axios.post('/api/dashboard/stacks', stackData);
        
        stack.message = response.data.message;
        fetchStacks();
        totals();
        // **Reset input fields**
        stack.name = "";
        stack.description = "";
        stack.link = "";
    } catch(err) {
        console.log(err);
    }
}
//Editing Stacks
const editStack = reactive({
    name: '',
    description: '',
    link: '',
    message: ''
})

 //Putting Stacks
 function puttingStacks(stack){
    editStack._id = stack._id;
    editStack.name = stack.name;
    editStack.description = stack.description;
    editStack.link = stack.link;
}
//Updating Stacks
async function editStacks() {
    try{
        const response = await axios.put(`/api/dashboard/stacks/${editStack._id}`, {
            name: editStack.name,
            description: editStack.description,
            link: editStack.link

        });
        editStack.message = response.data.message;
        fetchStacks();


    } catch(err) {
        console.log(err);
    }
}

//Deleting Stacks
const deleteStack = reactive({
    message: '',
    _id: ''
})


async function deleteStacks(stack) {
    deleteStack._id = stack._id;
    try{
        const confirm = window.confirm(`Are you sure you want to delete this Stack?`);
        if (confirm) {
        const response = await axios.delete(`/api/dashboard/stacks/${deleteStack._id}`);
        deleteStack.message = response.data.message
        fetchStacks();
        totals();
    }   
} catch (err) {
    console.log(err);
}
}



onMounted(() => {
    totals();
    fetchStacks();
})
</script>

<template>

   <!--Main content-->
   <Nav :toggleSidebar="toggleSidebar"/>
     <div class="wrapper">
        <!--Side nav-->
        <Sidenav :class="{ open: isSidebarOpen }"/>
        
        <!--Main content-->
        <div :class="['main', { 'main-expanded': isSidebarOpen }]">

        <div class="container">
           <div class="mb-3">
                <h3 class="fw-bold fs-4 mb-5 mt-4 mx-3">View Stacks <button style="background-color: #8b0841; border: none;" class="btn btn-primary">
                {{ total.totalStacks * 1 }}
                 </button>
                </h3>
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
                        <tr v-for="stack in state.stacks" :key="stack._id">
                        <td>{{ stack._id.substring(0,10) }}</td>
                        <td>{{ stack.name }}</td>
                        <td @click="ToggleshowFullDescription(stack)">
                         <span v-html="stack.showFullDescription ? stack.description : stack.description.substring(0, 50) + '...'"></span>
                         </td>

                        <td @click="ToggleshowFulllink(stack)">
                            {{ stack.showFullDescription2 ? stack.link : stack.link.substring(0, 20) + '...' }}
                        
                        </td>
                        <td><button data-bs-toggle="modal" @click="puttingStacks(stack)" data-bs-target="#editForm" class="btn  btn-outline-primary"><i class="bi bi-pencil-square"></i></button></td>
                        <td><button  class="btn btn-outline-danger" @click="deleteStacks(stack)"><i class="bi bi-trash"></i>  </button></td>
                    </tr>
                    </tbody>
                    
                    
                </table>
                </div>
        </div>
        </div>

        <!--Adding button-->
<button class="btn btn-success rounded-circle py-2 px-3 m-3 add"
                data-bs-toggle="modal" data-bs-target="#addForm" >
                    <i class="bi bi-plus"></i>
</button>
        </div>

        <!--Add Form-->

<div class="modal fade" id="addForm" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <form class="form" @submit.prevent="AddStacks">
          <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel">Add New Latest Stack</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
                <div class="mb-3">
                    <label for="name">Stack Name</label>
                    <input type="text" class="form-control" required="required" v-model="stack.name">
                </div>
                <div class="mb-3">
                    <label for="name">Stack Description</label>
                    <Editor v-model="stack.description" width="100%" height="150px"/>
    
                </div>
                <div class="mb-3">
                    <label for="name">Stack Link or Image</label>
                    <input type="text" class="form-control" required="required" v-model="stack.link">
                </div>
           
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success" data-bs-dismiss="modal">Add Stack</button>
          </div>
        </form>
        </div>
      </div>
    </div> 
    <!--Update Form-->
<div class="modal fade" id="editForm" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <form class="form" @submit.prevent="editStacks">
          <div class="modal-header">
            <h5 class="modal-title" id="myModalLabel">Update this Stack</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            
                <div class="mb-3">
                    <label for="name">Stack Name</label>
                    <input type="text" class="form-control" required="required" v-model="editStack.name">
                </div>
                <div class="mb-3">
                    <label for="name">Stack Description</label>
                    <Editor v-model="editStack.description" /> 
                      
                               
                </div>
                <div class="mb-3">
                    <label for="name">Stack Link</label>
                    <input type="text" class="form-control" required="required" v-model="editStack.link">
                </div>
           
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            <button type="submit" class="btn btn-success"data-bs-dismiss="modal">Save</button>
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