<template>
    <section id="ver-mapa">
        <h1 class="titulo">Recorre el mapa con tu Mokepon!</h1>
        <Mapa />
        <button onmouseup="detenerMovimiento()" ontouchend="detenerMovimiento()" onmousedown="moverArriba()"
            ontouchstart="moverArriba()">🔺</button>
        <div>
            <button onmouseup="detenerMovimiento()" ontouchend="detenerMovimiento()" onmousedown="moverIzquierda()"
                ontouchstart="moverIzquierda()">◀</button>
            <button onmouseup="detenerMovimiento()" ontouchend="detenerMovimiento()" onmousedown="moverAbajo()"
                ontouchstart="moverAbajo()">🔻</button>
            <button onmouseup="detenerMovimiento()" ontouchend="detenerMovimiento()" onmousedown="moverDerecha()"
                ontouchstart="moverDerecha()">▶</button>
        </div>
    </section>
</template>

<script setup>
import Mapa from '@/components/Mapa.vue'

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

#ver-mapa button {
    width: 80px;
    height: 40px;
    border-radius: 8px;
    background: transparent;
    border: 2px solid white;
    color: white;
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    margin-top: 10px;
}

#ver-mapa button:hover {
    background-color: #5d8bf4;
}
</style>