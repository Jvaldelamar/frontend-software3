import { createRouter, createWebHistory } from 'vue-router';
import FileManager from '../views/FileManager.vue'; // Componente contenedor para gestión de archivos
import ComputadoraPage from '../views/ComputadoraPage.vue';
import OfimaticaPage from '../views/OfimaticaPage.vue';
import RoboticaPage from '../views/RoboticaPage.vue';

const routes = [
  {
    path: '/',
    name: 'FileManager', // Página principal para gestionar archivos
    component: FileManager,
  },
  {
    path: '/upload',
    name: 'SubirArchivo',
    component: () => import('../components/SubirArchivo.vue'), // Página para subir archivos
  },
  {
    path: '/delete',
    name: 'EliminarArchivo',
    component: () => import('../components/EliminarArchivo.vue'), // Página para eliminar archivos
  },
  {
    path: '/download',
    name: 'DescargarArchivo',
    component: () => import('../components/DescargarArchivo.vue'), // Página para descargar archivos
  },
  {
    path: '/comment',
    name: 'ComentarioArchivo',
    component: () => import('../components/ComentarioArchivo.vue'), // Página para comentar sobre archivos
  },
  {
    path: '/info/computadora',
    name: 'Computadora',
    component: ComputadoraPage
  },
  {
    path: '/info/ofimatica',
    name: 'Ofimatica',
    component: OfimaticaPage
  },
  {
    path: '/info/robotica',
    name: 'Robotica',
    component: RoboticaPage
  },
  {
    path: '/credits',
    name: 'CreditsPage',
    component: () => import('../components/CreditsPage.vue'), // Página de créditos
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
