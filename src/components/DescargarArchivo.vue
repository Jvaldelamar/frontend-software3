<template>
  <div>
    <button
      v-if="archivo && archivo.filename"
      class="btn btn-success"
      :href="`http://localhost:3000/archivos/${archivo.filename}`"
      @click.prevent="descargar"
    >
      Descargar
    </button>
    <p v-else class="text-danger">Archivo no disponible para descarga.</p>
  </div>
</template>

<script>
export default {
  props: {
    archivo: {
      type: Object,
      required: true,
    },
  },
  methods: {
    descargar() {
      const url = `http://localhost:3000/archivos/${this.archivo.filename}`;
      window.open(url, '_blank');
    },
  },
};
</script>
