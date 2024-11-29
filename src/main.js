import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; 
import store from './store'; // Importa el store configurado
import 'font-awesome/css/font-awesome.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap'; // Para incluir funcionalidad JavaScript de Bootstrap, como modales y tooltips

const app = createApp(App);

// Configura Vuex y Vue Router
app.use(router);
app.use(store);

app.mount('#app');
