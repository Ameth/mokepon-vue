<script setup>
import { ref, computed, watch } from 'vue';
import { RouterLink } from 'vue-router'
import TarjetaMokeponVue from '@/components/TarjetaMokepon.vue';
import Mokepon from '@/utils/Mokepon.js'
import { ataquesHipodoge, ataquesCapipepo, ataquesRatigueya } from '@/utils/ataques.js'
import { useMokeponStore } from '@/stores/mokeponStore.js'
import { storeToRefs } from "pinia";

const mokepones = [];

const mokeponStore = useMokeponStore();

const hipodoge = new Mokepon(
  "Hipodoge",
  "/src/assets/tierra.png",
  5,
  ataquesHipodoge
);

const capipepo = new Mokepon(
  "Capipepo",
  "/src/assets/agua.png",
  5,
  ataquesCapipepo
);
const ratigueya = new Mokepon(
  "Ratigueya",
  "/src/assets/fuego.png",
  5,
  ataquesRatigueya
);

mokepones.push(hipodoge, capipepo, ratigueya);

// const seleccionarMascota = (nombre) => {
//   console.log(nombre)
// }

const mascotaActual = ref('')
// const textButton = computed(() => {
//   return mascotaActual.value !== "" ? `¡A jugar con mi ${mascotaActual.value}` : "¡A jugar!";
// })

watch(mascotaActual, (newValue) => { console.log("Seleccionada:", newValue) })

</script>

<template>
  <section id="seleccionar-mascota">
    <h1 class="titulo">MOKEPON!</h1>

    <h2 class="subtitulo">Elige tu Mokepon:</h2>

    <div id="tarjetas" class="tarjetas">
      <TarjetaMokeponVue v-for="(mokepon, index) in mokepones" :key="index" :mokepon="mokepon"
        v-model="mascotaActual" />
    </div>
    <button id="boton-mascota" @click="$router.push('/map')">¡A jugar!</button>

  </section>
</template>

<style scoped>
#seleccionar-mascota {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.tarjetas,
.tarjetas-ataques {
  display: flex;
  gap: 10px;
}

#boton-mascota {
  width: 180px;
  height: 40px;
  border-radius: 20px;
  background: transparent;
  border: 2px solid white;
  color: white;
  font-family: "Poppins", sans-serif;
  margin-top: 30px;
  cursor: pointer;
}
</style>