<template>
  <div class="pagina-inicio">
    <div class="contenido">
      <!-- Aquí listamos las tarjetas -->
      <div class="tarjetas-container">
        <div class="card" v-for="archivo in archivosSubidos" :key="archivo._id">
          <div class="card-imagen">
            <!-- Mostrar vista previa de acuerdo al tipo de archivo -->
            <template v-if="esImagen(archivo)">
              <img :src="`http://localhost:3000/uploads/${archivo.filename}`" alt="Miniatura" class="miniatura" />
            </template>
            <template v-else-if="esVideo(archivo)">
              <video :src="`http://localhost:3000/uploads/${archivo.filename}`" controls class="miniatura-video"></video>
            </template>
            <template v-else-if="esPDF(archivo)">
              <embed :src="`http://localhost:3000/uploads/${archivo.filename}`" type="application/pdf" class="vista-previa-pdf"/>
            </template>
            <template v-else>
              <div class="icono-archivo">📄</div>
            </template>
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ archivo.originalName }}</h5>
            <p class="card-text">Tema relacionado con el archivo: {{ archivo.originalName }}</p>
            <a :href="`http://localhost:3000/uploads/${archivo.filename}`" class="btn btn-primary" target="_blank">Ver archivo</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api"; // Asumiendo que estás utilizando esta API

export default {
  data() {
    return {
      archivosSubidos: [],
    };
  },
  methods: {
    async obtenerArchivos() {
      try {
        const response = await api.get("/archivos");
        this.archivosSubidos = response.data; // Guardamos los archivos subidos
      } catch (error) {
        console.error("Error al obtener archivos:", error);
      }
    },

    esImagen(archivo) {
      return /\.(jpg|jpeg|png|gif|bmp|svg)$/i.test(archivo.filename);
    },
    esVideo(archivo) {
      return /\.(mp4|webm|ogg|avi|mkv)$/i.test(archivo.filename);
    },
    esPDF(archivo) {
      return /\.pdf$/i.test(archivo.filename);
    },
  },
  mounted() {
    this.obtenerArchivos(); // Obtenemos los archivos al cargar la página
  },
};
</script>

<style scoped>
/* Asegúrate de tener el estilo adecuado para las tarjetas */
.tarjetas-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  width: 250px;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.card-imagen img,
.card-imagen video,
.card-imagen embed {
  width: 100%;
  height: auto;
  border-radius: 15px;
}

.card-body {
  padding: 15px;
}

.card-title {
  font-size: 1.2rem;
  font-weight: bold;
}

.card-text {
  font-size: 1rem;
  margin-bottom: 10px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  text-decoration: none;
  padding: 8px 15px;
}

.icono-archivo {
  font-size: 2rem;
  color: #555;
  margin-right: 10px;
}
</style>
