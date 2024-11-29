<template>
  <div class="comment-form">
    <h2>Deja tu comentario</h2>
    <!-- Campo para el título -->
    <input v-model="cardTitle" type="text" placeholder="Título de la tarjeta" required />
    <!-- Área para el comentario -->
    <textarea v-model="comentario" placeholder="Escribe tu comentario aquí..." required></textarea>
    <!-- Botón de envío -->
    <button @click="agregarComentario">Enviar Comentario</button>
    <!-- Mensaje de confirmación o error -->
    <p v-if="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script>
import api from '../services/api'; // Asegúrate de que el archivo de servicio de API esté configurado correctamente.

export default {
  data() {
    return {
      cardTitle: '', // Campo para el título de la tarjeta
      comentario: '', // Campo para el comentario
      mensaje: '', // Mensaje de confirmación o error
    };
  },
  methods: {
    async agregarComentario() {
      try {
        // Llama a la API para agregar el comentario
        await api.post('/comentarios', {
          archivoId: this.$route.params.archivoId, // Obtiene el ID del archivo desde la ruta
          comentario: this.comentario,
          titulo: this.cardTitle,
          autor: 'Usuario', // Puedes reemplazarlo con datos dinámicos si tienes autenticación
        });
        // Mensaje de éxito
        this.mensaje = 'Comentario enviado correctamente.';
        // Limpia los campos
        this.cardTitle = '';
        this.comentario = '';
      } catch (error) {
        // Manejo de errores
        console.error('Error al agregar el comentario:', error);
        this.mensaje = 'Error al enviar el comentario. Inténtalo de nuevo.';
      }
    },
  },
};
</script>

<style scoped>
.comment-form {
  margin: 20px auto;
  padding: 20px;
  max-width: 600px;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.comment-form input,
.comment-form textarea {
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.comment-form textarea {
  resize: none;
}

.comment-form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.comment-form button:hover {
  background-color: #0056b3;
}

.comment-form p {
  margin-top: 10px;
  color: green;
  font-size: 14px;
}
</style>
