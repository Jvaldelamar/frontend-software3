<!-- src/views/InfoPage.vue -->
<template>
    <div class="info-page">
      <h2>Información sobre {{ category }}</h2>
      <p>Aquí se muestra información detallada sobre el tema seleccionado: {{ category }}.</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'InfoPage',
    computed: {
      // Definimos "category" solo en computed, eliminando el duplicado
      category() {
        return this.$route.params.category;
      }
    }
  };
  </script>
  
  <style scoped>
  .info-page {
    padding: 20px;
    text-align: left;
  }
  </style>
  