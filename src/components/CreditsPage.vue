<template>
  <div class="credits">
    <!-- Botón de regreso (parte superior izquierda) -->
    <button @click="goBack" class="back-button">Volver</button>

    <h1>Créditos</h1>
    <p>Este proyecto fue desarrollado por:</p>
    
    <!-- Lista de tarjetas -->
    <div class="credit-cards">
      <div class="card">
        <img src="/images/josedaniel.jpg" alt="Jose Daniel Almanza Avila" class="profile-pic" />
        <p>Jose Daniel Almanza Avila - Documentación</p>
      </div>
      <div class="card">
        <img src="/images/dormaria.jpeg" alt="Dor Maria Luna Genes" class="profile-pic" />
        <p>Dor Maria Luna Genes - Documentación</p>
      </div>
      <div class="card">
        <img src="/images/fabioandres.jpeg" alt="Fabio Andres Galeano Santamaria" class="profile-pic" />
        <p>Fabio Andres Galeano Santamaria - Desarrollador</p>
      </div>
      <div class="card">
        <img src="/images/valdelamar.jpg" alt="Jesus David Valdelamar Vega" class="profile-pic" />
        <p>Jesus David Valdelamar Vega - Desarrollador</p>
      </div>
      <div class="card">
        <img src="/images/josega.jpg" alt="Jose Gabriel Manjarrez Hernandez" class="profile-pic" />
        <p>Jose Gabriel Manjarrez Hernandez - Visualizador</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CreditsPage',
  methods: {
    goBack() {
      // Función para ir a la página anterior
      window.history.back();
    }
  }
};
</script>

<style scoped>
/* Fondo degradado azul claro para toda la página */
body {
  background: linear-gradient(135deg, #f0f9ff, #cbebff); /* Fondo azul claro a azul más intenso */
  font-family: 'Poppins', sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Contenedor de créditos */
.credits {
  padding: 30px;
  max-width: 1200px;
  margin: 50px auto;
  background: linear-gradient(135deg, #f0f9ff, #cbebff); /* Fondo blanco con opacidad */
  border-radius: 15px;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
}

/* Estilo del título */
.credits h1 {
  color: #003366;
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 600;
  letter-spacing: 1px;
}

.credits p {
  font-size: 1.3rem;
  margin-bottom: 30px;
  color: #444;
}

/* Disposición de tarjetas en una sola fila con ajuste */
.credit-cards {
  display: flex;
  flex-wrap: wrap; /* Permite que las tarjetas se acomoden si es necesario */
  justify-content: space-evenly;
  gap: 20px;
  margin-top: 30px;
  width: 100%;
}

/* Estilo de cada tarjeta */
.card {
  background-color: #fff;
  padding: 20px;
  width: 200px; /* Ajustamos el tamaño para que quepan 5 tarjetas */
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  transition: transform 0.3s ease-in-out;
  border: 2px solid #00f2fe;
}

.card:hover {
  transform: translateY(-8px); /* Efecto de elevación al pasar el mouse */
}

/* Estilo de las imágenes más grandes */
.profile-pic {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid #007bff;
}

/* Estilo del botón de regreso */
.back-button {
  position: absolute;
  top: 30px;
  left: 30px;
  background-color: #003366;
  color: white;
  border: none;
  padding: 12px 20px;
  font-size: 1.1rem;
  border-radius: 5px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #2a91e6;
  color: #003366;
}
</style>
