<template>
  <div class="computer-page">
    <button @click="goBack" class="back-button">← Volver</button>
    <h1>Partes del Computador</h1>
    <p class="intro-text">
      Un computador está compuesto por diversas partes que trabajan juntas para realizar tareas y operaciones. A continuación, se describen las principales partes del computador:
    </p>

    <div class="component-section" v-for="(component, index) in components" :key="index">
      <h2>{{ component.title }}</h2>
      <p>{{ component.description }}</p>
      <img :src="component.image" :alt="component.alt" width="400" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComputadoraPage',
  data() {
    return {
      components: [
        {
          title: '1. Unidad Central de Proceso (CPU)',
          description: 'La CPU, también conocida como el "cerebro" del computador, es responsable de ejecutar las instrucciones de los programas. Realiza operaciones aritméticas y lógicas, y controla el flujo de información.',
          image: 'https://www.totalphase.com/media/blog/2022/08/Intel-CPU1.jpg',
          alt: 'CPU'
        },
        {
          title: '2. Placa Base (Motherboard)',
          description: 'La placa base es la tarjeta principal del computador. Conecta todos los componentes, incluidos la CPU, la memoria, las unidades de almacenamiento y otros periféricos. Facilita la comunicación entre ellos.',
          image: 'https://compuservicedelnoroeste.com/wp-content/uploads/2020/10/Las_5_caracteristicas_mas_importantes_a_considerar_al_momento_de_elegir_una_motherboard-1024x591.jpg',
          alt: 'Placa Base'
        },
        {
          title: '3. Memoria RAM',
          description: 'La memoria RAM (Random Access Memory) es un tipo de memoria volátil que almacena datos e instrucciones que la CPU necesita de manera inmediata. Cuanta más RAM tenga un computador, mejor podrá ejecutar múltiples tareas al mismo tiempo.',
          image: 'https://concepto.de/wp-content/uploads/2018/09/RAM1-e1537470543923-800x400.jpg',
          alt: 'Memoria RAM'
        },
        {
          title: '4. Disco Duro (HDD) o Unidad de Estado Sólido (SSD)',
          description: 'El disco duro (HDD) o la unidad de estado sólido (SSD) son dispositivos de almacenamiento que guardan el sistema operativo, aplicaciones y archivos del usuario. Los SSD son más rápidos y confiables en comparación con los HDD.',
          image: 'https://compubit.com.co/wp-content/uploads/2023/09/62d97da689bf557dde504b8b-1-1024x576.jpg',
          alt: 'Disco Duro'
        },
        {
          title: '5. Tarjeta Gráfica (GPU)',
          description: 'La tarjeta gráfica se encarga de procesar y renderizar gráficos y videos. Es especialmente importante para juegos, diseño gráfico y aplicaciones de edición de video.',
          image: 'https://d34vmoxq6ylzee.cloudfront.net/magefan_blog/20.1.jpg',
          alt: 'Tarjeta Gráfica'
        },
        {
          title: '6. Fuente de Alimentación',
          description: 'La fuente de alimentación convierte la corriente alterna de la pared en corriente continua y distribuye la energía a todos los componentes del computador.',
          image: 'https://www.areatecnologia.com/informatica/imagenes/fuente-de-alimentacion-pc.jpg',
          alt: 'Fuente de Alimentación'
        },
        {
          title: '7. Periféricos',
          description: 'Los periféricos son dispositivos externos que permiten interactuar con el computador. Ejemplos incluyen el teclado, el mouse, la impresora y los altavoces.',
          image: 'https://cuentitisaguda.com/wp-content/uploads/2021/05/tipos-de-perifericos.jpg',
          alt: 'Periféricos'
        }
      ]
    };
  },
  methods: {
    goBack() {
      window.history.back();
    }
  }
};
</script>

<style scoped>
.computer-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1c1c1e url('https://www.pixelstalk.net/wp-content/uploads/2016/06/HD-Background-Digital-Technology.jpg') no-repeat center center fixed;
  background-size: cover;
  color: #f5f5f5;
  padding: 30px;
  font-family: Arial, sans-serif;
  position: relative;
}

.back-button {
  position: absolute;
  top: 20px;
  left: 20px;
  padding: 10px 20px;
  font-size: 16px;
  color: #00d8ff;
  background-color: transparent;
  border: 2px solid #00d8ff;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s ease;
  text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.5);
}

.back-button:hover {
  background-color: #00d8ff;
  color: #1c1c1e;
  box-shadow: 0px 0px 15px #00d8ff;
}

h1 {
  text-align: center;
  font-size: 2.5em;
  color: #00d8ff;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px #000;
}

.intro-text {
  text-align: center;
  font-size: 1.2em;
  margin-bottom: 30px;
}

.component-section {
  background: rgba(0, 0, 0, 0.8);
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  max-width: 600px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
}

h2 {
  color: #f5f5f5;
  font-size: 1.8em;
  margin-top: 0;
}

p {
  font-size: 1em;
  line-height: 1.6;
  color: #ddd;
}

img {
  display: block;
  margin: 20px auto;
  max-width: 100%;
  border: 2px solid #00d8ff;
  border-radius: 5px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);
}
</style>
