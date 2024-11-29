<template>
    <div>
      <button @click="eliminarArchivo">Eliminar archivo</button>
    </div>
  </template>
  
  <script>
  import api from '../services/api';
  
  export default {
    props: {
      archivoId: String,
    },
    methods: {
      async eliminarArchivo() {
        try {
          await api.delete(`/archivos/${this.archivoId}`);
          console.log('Archivo eliminado');
        } catch (error) {
          console.error('Error al eliminar archivo:', error);
        }
      },
    },
  };
  </script>
  