<script setup>
import { RouterLink, RouterView } from 'vue-router'
// import { useCounterStore } from '@/stores/counter.js'
import { storeToRefs } from "pinia";


// const counterStore = useCounterStore();

// const { count } = storeToRefs(counterStore);


</script>

<template>
  <RouterView />
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Fredoka+One&family=Poppins:wght@300&display=swap");

body {
  font-family: "Poppins", sans-serif;
  background-color: #181818;
}

.titulo {
  color: white;
  font-size: 32px;
  font-family: "Fredoka One", cursive;
}

.subtitulo {
  color: white;
  font-size: 20px;
}
</style>
