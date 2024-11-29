import { createStore } from 'vuex';
import api from '../services/api'; // Asegúrate de tener el archivo api.js en services

const store = createStore({
  state: {
    archivos: [], // Lista de archivos
  },
  mutations: {
    setArchivos(state, archivos) {
      state.archivos = archivos;
    },
    agregarArchivo(state, archivo) {
      state.archivos.push(archivo);
    },
  },
  actions: {
    async obtenerArchivos({ commit }) {
      try {
        const response = await api.get('/archivos'); // Ajusta la URL según tu backend
        commit('setArchivos', response.data);
      } catch (error) {
        console.error('Error al obtener archivos:', error);
      }
    },
    async subirArchivo({ commit }, archivo) {
      try {
        const response = await api.post('/archivos/subir', archivo); // Ajusta la URL según tu backend
        commit('agregarArchivo', response.data);
      } catch (error) {
        console.error('Error al subir archivo:', error);
      }
    },
  },
  getters: {
    archivos: (state) => state.archivos,
  },
});

export default store;
