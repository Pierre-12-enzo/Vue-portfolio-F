import './assets/main.css';
import router from './routes';

import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // Import Bootstrap Icons CSS



import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';



import { createApp } from 'vue';
import App from './App.vue';
const app = createApp(App)


app.use(router);
app.use(Toast);


app.mount('#app');

