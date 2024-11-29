<template>
  <div class="home">
    <!-- Barra de búsqueda y opciones -->
    <div class="header-container">
      <div class="credits-bar">
        <button class="credits-button" @click="goToCredits">
          <i class="fa fa-info-circle" aria-hidden="true"></i> Créditos
        </button>
      </div>
      <div class="search-container">
        <input
          type="text"
          placeholder="Buscar..."
          class="search-input"
          v-model="searchTerm"
          @keyup.enter="handleSearch"
        />
      </div>
      <div class="user-info">
        <img src="https://img.freepik.com/vector-premium/imagen-perfil-avatar-hombre-aislada-fondo-imagen-profil-avatar-hombre_1293239-4866.jpg?semt=ais_hybrid" alt="Avatar" class="user-avatar" />
        <span class="user-name">Daniel Pérez</span>
        <div class="notification-container" @click="toggleNotifications">
          <i class="fa fa-bell notification-icon" aria-hidden="true"></i>
          <div class="notification-badge">2</div>
          <div v-if="showNotificationMessage" class="notification-dropdown">
            <ul>
              <li v-for="(notification, index) in notifications" :key="index">
                {{ notification }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!-- Logo agregado al lado de los créditos -->
      <div class="credits-logo">
        <img src="\images\Escudo UNICORDOBA blanco.png" alt="Logo" class="logo" />
      </div>
      <div class="credits-logo">
        <img src="\images\Acreditada doble.png" alt="Logo" class="logo" />
      </div>
    </div>

    <!-- Botones de acción y gestión de archivos -->
    <div class="action-buttons">
      <router-link to="/upload">
        <button class="action-button">Gestión De Archivos</button>
      </router-link>
    </div>

    <!-- Contenedor de tarjetas en 2 filas de 3 columnas -->
    <div class="cards-container">
      <div v-for="(card, index) in filteredCards" :key="index" class="card">
        <img 
          :src="card.image" 
          alt="Imagen de tarjeta" 
          class="card-image" 
          @click="redirectToFileManagement"
        />
        <h3>{{ card.title }}</h3>
        <button @click="openCommentForm(card)">Comentar</button>
      </div>
    </div>

    <!-- Formulario de comentarios -->
    <div v-if="selectedCard" class="comment-form-overlay">
      <div class="comment-form">
        <h2>Deja tu comentario en "{{ selectedCard.title }}"</h2>
        <textarea v-model="comentario" placeholder="Escribe tu comentario aquí..." required></textarea>
        <button @click="agregarComentario">Enviar Comentario</button>
        <button @click="closeCommentForm">Cerrar</button>
        <p v-if="mensaje">{{ mensaje }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../services/api";

export default {
  name: "HomePage",
  data() {
    return {
      comentario: "",
      mensaje: "",
      selectedCard: null,
      searchTerm: "",
      showNotificationMessage: false,
      notifications: [
        "Notificación 1: Tienes una nueva tarea pendiente.",
        "Notificación 2: Recuerda revisar tus correos.",
      ],
      cards: [
        { title: "Partes del computador", image: "/computer.JPG", id: 1 },
        { title: "Ofimática", image: "/office.JPG", id: 2 },
        { title: "Robótica", image: "/robot.JPG", id: 3 },
        { title: "Programación", image: "/programming.JPG", id: 4 },
        { title: "Inteligencia Artificial", image: "/ai.JPG", id: 5 },
        { title: "Ciberseguridad", image: "/cybersecurity.JPG", id: 6 },
      ],
    };
  },
  computed: {
    filteredCards() {
      return this.cards.filter((card) =>
        card.title.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
  },
  methods: {
    handleSearch() {
      console.log("Buscar:", this.searchTerm);
    },
    goToCredits() {
      this.$router.push({ name: "CreditsPage" });
    },
    toggleNotifications() {
      this.showNotificationMessage = !this.showNotificationMessage;
    },
    login() {
      alert("Iniciando sesión...");
    },
    redirectToFileManagement() {
      this.$router.push("/upload");
    },
    openCommentForm(card) {
      this.selectedCard = card;
    },
    closeCommentForm() {
      this.selectedCard = null;
      this.comentario = "";
      this.mensaje = "";
    },
    async agregarComentario() {
      if (!this.comentario.trim()) {
        this.mensaje = "El comentario no puede estar vacío.";
        return;
      }
      try {
        await api.post("/comentarios", {
          archivoId: this.selectedCard.id,
          comentario: this.comentario,
          titulo: this.selectedCard.title,
          autor: "Usuario",
        });
        this.mensaje = "Comentario enviado correctamente.";
        this.comentario = "";
      } catch (error) {
        console.error("Error al agregar el comentario:", error);
        this.mensaje = "Error al enviar el comentario. Inténtalo de nuevo.";
      }
    },
  },
};
</script>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(180deg, white, #ffe5d4);
  min-height: 100vh;
  min-width: 100vw;
  padding: 20px;
  box-sizing: border-box;
}

.header-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #b2f5ea;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.credits-bar {
  margin-right: auto;
}

.credits-button {
  padding: 5px 8px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.credits-button:hover {
  background-color: #0056b3;
}

.search-container {
  display: flex;
  align-items: center;
  gap: 10px;
}

.search-input {
  padding: 8px;
  width: 250px;
  border: 2px solid #007bff;
  border-radius: 20px;
  font-size: 14px;
  transition: border-color 0.3s;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
}

.notification-container {
  position: relative;
}

.notification-badge {
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 3px 6px;
  font-size: 12px;
  position: absolute;
  top: -5px;
  right: -10px;
}

.notification-dropdown {
  position: absolute;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 150px;
  z-index: 1000;
  top: 40px;
  right: 0;
}
.credits-logo {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 40px;  /* Ajusta el tamaño del logo */
  height: 40px;
  margin-left: 15px;
}

.action-buttons {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.action-button {
  padding: 10px 15px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.action-button:hover {
  background-color: #0056b3;
}

.comment-button {
  background-color: #f39c12;
}

.comment-button:hover {
  background-color: #e67e22;
}

.cards-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  width: 100%;
  padding: 20px 0;
}

/* Estilos para el formulario de comentarios */
.comment-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.comment-form {
  background-color: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

.comment-form textarea {
  width: 100%;
  padding: 10px;
  height: 100px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.comment-form button {
  padding: 10px 15px;
  border: none;
  background-color: #28a745;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.comment-form button:hover {
  background-color: #218838;
}
</style>
