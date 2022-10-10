<template>
    <section id="ver-mapa">
        <h1 class="titulo">Recorre el mapa con tu Mokepon!</h1>
        <Mapa />
        <button @click="saludar">Saludar</button>
    </section>
</template>

<script setup>
import Mapa from '@/components/Mapa.vue'
import { toRef, ref, onMounted } from 'vue';
// import { useMokeponStore } from '@/stores/mokeponStore.js'
// import { storeToRefs } from "pinia";
import { store } from '@/stores/store.js'
import { wsSetDisplayName } from '@/services/socket.js'

const saludar = () => {
    wsSetDisplayName("Hola socket")
}

// const mokeponStore = useMokeponStore();

// const { jugadores, cant } = storeToRefs(mokeponStore);
// const { increment } = mokeponStore;

// console.log("Jugadores desde Mapa:", store.jugadores)
// console.log("Jugadores en Store:", jugadores.value)



</script>

<style scoped>
#ver-mapa {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

#seleccionar-ataque {
    display: flex;
    flex-direction: column;
    align-items: center;
}

@media (max-width: 360px) {
    #ver-mapa :deep(div) {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
}
</style>