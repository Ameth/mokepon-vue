<template>
    <canvas ref="mapa" id="mapa"></canvas>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const mapa = ref(null)

onMounted(() => {
    // console.log(mapa.value);
    let lienzo = mapa.value.getContext("2d");
    let mapaBackground = new Image();
    mapaBackground.src = "../src/assets/mokemap.png";
    let mapaAncho = window.innerWidth - 20;
    const mapaAnchoMaximo = 800;

    if (mapaAncho > mapaAnchoMaximo) {
        mapaAncho = mapaAnchoMaximo - 20;
    }

    let mapaAlto = (mapaAncho * 600) / 800;
    mapa.value.width = mapaAncho;
    mapa.value.height = mapaAlto;
    lienzo.drawImage(mapaBackground, 0, 0, mapa.value.width, mapa.value.height);
})


</script>

<style scoped>

</style>