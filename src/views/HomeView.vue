<script setup>
import { ref, watch, } from 'vue';
import { useRouter } from 'vue-router'
import TarjetaMokeponVue from '@/components/TarjetaMokepon.vue';
import { crearMokepon, ubicarMokepon, datasession } from '@/utils/funciones.js'
import { ataquesHipodoge, ataquesCapipepo, ataquesRatigueya } from '@/utils/ataques.js'
import { store } from '@/stores/store.js'
import IconGit from '@/components/IconGit.vue'
// import { wsReiniciarJuego } from '@/services/socket.js'

const router = useRouter()
// const mokeponStore = useMokeponStore();

const mokepones = [];
const mascotaActual = ref('')

const hipodoge = crearMokepon(
  "Hipodoge",
  "/src/assets/tierra.png",
  5,
  ataquesHipodoge
);

const capipepo = crearMokepon(
  "Capipepo",
  "/src/assets/agua.png",
  5,
  ataquesCapipepo
);

const ratigueya = crearMokepon(
  "Ratigueya",
  "/src/assets/fuego.png",
  5,
  ataquesRatigueya
);

mokepones.push(hipodoge, capipepo, ratigueya);

const seleccionarMascota = () => {
  const seleccion = mokepones.find((mascota) => mascota.nombre === mascotaActual.value);
  if (seleccion) {
    store.unirseAlJuego(seleccion)
    ubicarMokepon(seleccion)
    // ajustarTamanoMokepon(seleccion)
    // mokeponStore.unirseAlJuego(seleccion.nombre)
    // console.log("Jugadores desde Home:", store.jugadores.length);
    // console.log("Listado desde Home:", store.jugadores);
    router.push({ name: 'map' })
  } else {
    alert("Debe seleccionar una mascota")
  }
}

// onMounted(() => {
//   const moke = datasession.getItem("id_moke")
//   if (moke) {
//     console.log("Desconectar:", moke);
//     datasession.removeItem("id_moke")
//     wsReiniciarJuego(moke)
//   }
// }),

// const textButton = computed(() => {
//   return mascotaActual.value !== "" ? `¡A jugar con mi ${mascotaActual.value}` : "¡A jugar!";
// })

watch(mascotaActual, (newValue) => { console.log("Seleccionada:", newValue) })

</script>

<template>
  <section id="seleccionar-mascota">
    <h1 class="titulo">{{store.title}}</h1>

    <h2 class="subtitulo">Elige tu Mokepon:</h2>

    <div id="tarjetas" class="tarjetas">
      <TarjetaMokeponVue v-for="(mokepon, index) in mokepones" :key="index" :mokepon="mokepon"
        v-model="mascotaActual" />
    </div>
    <button id="boton-mascota" @click="seleccionarMascota">¡A jugar!</button>
    <div>
      <IconGit />
    </div>
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