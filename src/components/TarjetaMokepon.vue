<template>
    <input @click="seleccionar" ref="mascota" type="radio" name="mascota" :id="mokepon.nombre" class="check-mascota"
        :value="mokepon.nombre" />
    <label class="tarjeta-de-mokepon" :for="mokepon.nombre">
        <p>{{mokepon.nombre}}</p>
        <img :src="mokepon.imagen" :alt="mokepon.nombre">
    </label>
</template>

<script setup>
import { useMokeponStore } from '@/stores/mokeponStore.js'
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
    mokepon: Object,
    modelValue: String
})

const mascota = ref(null);


const emit = defineEmits(["update:modelValue"])

const seleccionar = (e) => {
    // console.log(e.target.value);
    emit("update:modelValue", e.target.value);
}



const mokeponStore = useMokeponStore();

const { jugadores } = storeToRefs(mokeponStore);
const { unirseAlJuego } = mokeponStore;

// const seleccionar = () => {
//     unirseAlJuego(props.mokepon.nombre)
//     console.log(jugadores.value);
// }

onMounted(() => {

    // console.log(mascota.value.id)
})

// watch(chkMascota, (newValue) => {
//     console.log(newValue)
// })




</script>

<style scoped>
.tarjeta-de-mokepon {
    width: 180px;
    height: 100px;
    background: #27a36d;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    cursor: pointer;
}

.tarjeta-de-mokepon img {
    width: 80px;
}

input {
    display: none;
}

input:checked+label {
    background-color: #96ce82;
}
</style>