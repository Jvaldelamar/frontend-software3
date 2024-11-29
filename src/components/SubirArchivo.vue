<template>
  <div class="archivo-uploader">
    <div class="contenedor">
      <!-- Botón para regresar -->
  <button @click="irAPaginaPrincipal" class="boton boton-atras">← Volver</button>

      <!-- Formulario para subir archivo -->
      <div class="formulario">
        <h2 class="titulo">Gestión de Archivos</h2>
        <input type="file" @change="handleFileChange" class="input-file" />
        <div class="botones">
          <button @click="subirArchivo" class="boton">Subir archivo</button>
          <select v-model="archivoAEliminar" class="seleccion-archivo">
            <option v-for="archivo in archivosSubidos" :key="archivo._id" :value="archivo._id">
              {{ archivo.originalName }}
            </option>
          </select>
          <button @click="eliminarArchivoSeleccionado" class="boton boton-eliminar">
            Eliminar archivo
          </button>
        </div>
      </div>

      <!-- Mensajes de estado -->
      <div class="mensajes">
        <p v-if="subiendo" class="mensaje mensaje-info">Subiendo archivo...</p>
        <p v-if="subido" class="mensaje mensaje-exito">¡Archivo subido con éxito!</p>
        <p v-if="error" class="mensaje mensaje-error">Hubo un error al procesar la solicitud. Inténtalo de nuevo.</p>
        <p v-if="archivoEliminado" class="mensaje mensaje-exito">¡Archivo eliminado con éxito!</p>
      </div>

      <!-- Mostrar archivos subidos -->
      <div v-if="archivosSubidos.length > 0" class="lista-archivos">
        <h3 class="titulo">Archivos Subidos</h3>
        <ul>
          <li v-for="archivo in archivosSubidos" :key="archivo._id" class="archivo">
            <div class="archivo-contenido">
              <!-- Vista previa dinámica -->
              <template v-if="esImagen(archivo)">
                <img
                  :src="`http://localhost:3000/uploads/${archivo.filename}`"
                  alt="Miniatura"
                  class="miniatura"
                />
              </template>
              <template v-else-if="esVideo(archivo)">
                <video
                  :src="`http://localhost:3000/uploads/${archivo.filename}`"
                  controls
                  class="miniatura-video"
                ></video>
              </template>
              <template v-else-if="esPDF(archivo)">
                <embed
                  :src="`http://localhost:3000/uploads/${archivo.filename}`"
                  type="application/pdf"
                  class="vista-previa-pdf"
                />
              </template>
              <template v-else>
                <div class="icono-archivo">📄</div>
              </template>

              <span class="archivo-nombre">{{ archivo.originalName }}</span>
            </div>
            <!-- Botones para acciones -->
            <button @click="verArchivo(archivo)" class="boton boton-ver">
              Ver archivo
            </button>
            <button @click="descargarArchivo(archivo)" class="boton boton-descargar">
              Descargar archivo
            </button>
            <button @click="abrirModal(archivo)" class="boton boton-compartir">
              Compartir archivo
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Modal para compartir archivo -->
    <div v-if="mostrarModal" class="modal-compartir">
      <div class="modal-contenido">
        <h3>Compartir {{ archivoCompartir.originalName }}</h3>
        <a
          :href="`https://www.facebook.com/sharer/sharer.php?u=${archivoURL}`"
          target="_blank"
          class="boton-compartir-modal"
        >
          Compartir en Facebook
        </a>
        <a
          :href="`https://wa.me/?text=${mensajeCompartir}`"
          target="_blank"
          class="boton-compartir-modal"
        >
          Compartir en WhatsApp
        </a>
        <a
          :href="`mailto:?subject=Archivo Compartido&body=${mensajeCompartir}`"
          class="boton-compartir-modal"
        >
          Compartir vía Gmail
        </a>
        <button @click="cerrarModal" class="boton-cerrar-modal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";  // Asegúrate de que la ruta sea correcta

export default {
  data() {
    return {
      archivo: null,
      archivoAEliminar: null,
      subiendo: false,
      subido: false,
      error: false,
      archivoEliminado: false,
      archivosSubidos: [],
      mostrarModal: false,
      archivoCompartir: null,
    };
  },
  computed: {
    archivoURL() {
      return this.archivoCompartir
        ? `http://localhost:3000/uploads/${this.archivoCompartir.filename}`
        : "";
    },
    mensajeCompartir() {
      return this.archivoCompartir
        ? `¡Mira este archivo que comparto contigo! ${this.archivoCompartir.originalName}: ${this.archivoURL}`
        : "";
    },
  },
  methods: {
    handleFileChange(event) {
      if (event.target.files && event.target.files[0]) {
        this.archivo = event.target.files[0];
      }
    },
    async subirArchivo() {
      if (!this.archivo) {
        alert("Por favor, selecciona un archivo antes de subirlo.");
        return;
      }
      this.subiendo = true;
      this.subido = false;
      this.error = false;

      const formData = new FormData();
      formData.append("archivo", this.archivo);

      try {
        const response = await api.post("/archivos/subir", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        this.subiendo = false;
        this.subido = true;
        this.archivosSubidos.push(response.data);
      } catch (error) {
        this.subiendo = false;
        this.error = true;
      }
    },
    async obtenerArchivos() {
      try {
        const response = await api.get("/archivos");
        this.archivosSubidos = response.data;
      } catch (error) {
        console.error("Error al obtener archivos:", error);
      }
    },
    async eliminarArchivoSeleccionado() {
      if (!this.archivoAEliminar) {
        alert("Selecciona un archivo para eliminar.");
        return;
      }

      try {
        await api.delete(`/archivos/${this.archivoAEliminar}`);
        this.archivosSubidos = this.archivosSubidos.filter(
          (archivo) => archivo._id !== this.archivoAEliminar
        );
        this.archivoAEliminar = null;
        this.archivoEliminado = true;
        setTimeout(() => {
          this.archivoEliminado = false;
        }, 3000);
      } catch (error) {
        alert("Error al eliminar el archivo.");
      }
    },
    abrirModal(archivo) {
      this.archivoCompartir = archivo;
      this.mostrarModal = true;
    },
    cerrarModal() {
      this.mostrarModal = false;
    },
    verArchivo(archivo) {
      const archivoURL = `http://localhost:3000/uploads/${archivo.filename}`;
      window.open(archivoURL, "_blank");
    },
    descargarArchivo(archivo) {
      const archivoURL = `http://localhost:3000/uploads/${archivo.filename}`;
      const enlace = document.createElement("a");
      enlace.href = archivoURL;
      enlace.download = archivo.originalName;
      enlace.click();
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
    // Método para navegar a la página principal
    irAPaginaPrincipal() {
      this.$router.push({ name: 'FileManager' });
    }
  },
  mounted() {
    this.obtenerArchivos();
  },
};
</script>

<style scoped>
/* Estilo general de la aplicación */
.archivo-uploader {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #f0f9ff, #cbebff);
  font-family: Arial, sans-serif;
}

/* Contenedor principal */
.contenedor {
  max-width: 800px;
  padding: 30px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
}

/* Botón de regreso */
.boton-atras {
  position: absolute;
  top: -15px;
  left: -15px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.boton-atras:hover {
  background-color: #0056b3;
}
/* Títulos */
.titulo {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

/* Formulario */
.formulario {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.input-file,
.seleccion-archivo {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
}

.botones {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* Botones */
.boton {
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

.boton:hover {
  background-color: #0056b3;
}

.boton-eliminar {
  background-color: #dc3545;
}

.boton-eliminar:hover {
  background-color: #a71d2a;
}

.boton-ver {
  background-color: #28a745;
}

.boton-ver:hover {
  background-color: #1e7e34;
}

.boton-descargar {
  background-color: #ffc107;
  color: #333;
}

.boton-descargar:hover {
  background-color: #e0a800;
}
.modal-compartir {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-contenido {
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}
.boton-compartir-modal {
  display: block;
  margin: 10px 0;
  padding: 10px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
}
.boton-cerrar-modal {
  margin-top: 15px;
  background: #dc3545;
  color: white;
  border: none;
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
}

/* Lista de archivos */
.lista-archivos ul {
  list-style: none;
  padding: 0;
}

.archivo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.archivo-contenido {
  display: flex;
  align-items: center;
  gap: 10px;
}

.miniatura {
  width: 50px;
  height: 50px;
  object-fit: cover;
}

.miniatura-video {
  width: 100px;
  height: 60px;
}

.vista-previa-pdf {
  width: 80px;
  height: 100px;
}

.icono-archivo {
  font-size: 1.5rem;
}

.archivo-nombre {
  flex: 1;
  margin-left: 10px;
}

/* Mensajes de estado */
.mensajes {
  margin-top: 20px;
}

.mensaje {
  text-align: center;
  font-weight: bold;
  padding: 10px;
  margin-top: 10px;
}

.mensaje-info {
  color: #17a2b8;
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
}

.mensaje-exito {
  color: #28a745;
  background-color: #d4edda;
  border: 1px solid #c3e6cb;
}

.mensaje-error {
  color: #dc3545;
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
}
</style>
