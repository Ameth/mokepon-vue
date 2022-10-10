<script setup>
import { ref, onMounted, watch, toRef } from 'vue';
import { store } from '@/stores/store.js'


const mascotaJugador = store.miMokepon();
// console.log("Mi Mokepon:", mascotaJugador);
const mascotaEnemigoActual = toRef(store, "miEnemigo")

// console.log(mascotaEnemigoActual.value);

const mascotaContainer = ref(null);
const mascotaEnemigoContainer = ref(null);

onMounted(() => {
    mascotaContainer.value.innerHTML = `<img src="${mascotaJugador.imagen}" alt="${mascotaJugador.nombre}">
    <p>${mascotaJugador.nombre}</p>`;

    mascotaEnemigoContainer.value.innerHTML = `<img src="${mascotaEnemigoActual.value.imagen}" alt="${mascotaEnemigoActual.value.nombre}">
    <p>${mascotaEnemigoActual.value.nombre}</p>`;
    // console.log(mascotaEnemigo.value);
})

</script>


<template>
    <section id="seleccionar-ataque">
        <h1 class="titulo">MOKEPON!</h1>

        <h2 class="subtitulo">Elige tu ataque:</h2>

        <div id="tarjetas-ataques" class="tarjetas-ataques">
        </div>

        <div id="mensajes">
            <p id="resultado">Mucha suerte</p>

            <section id="reiniciar">
                <button id="boton-reiniciar">Reiniciar</button>
            </section>
        </div>

        <div class="ataques">
            <div class="ataques-jugador">
                <p id="vidas-jugador">0</p>
                <div ref="mascotaContainer" id="mascota-jugador" class="mascota-seleccionada"></div>
                <div id="ataques-del-jugador"></div>
            </div>
            <div class="ataques-enemigo">
                <p id="vidas-enemigo">0</p>
                <div ref="mascotaEnemigoContainer" id="mascota-enemigo" class="mascota-seleccionada"></div>
                <div id="ataques-del-enemigo"></div>
            </div>
        </div>
    </section>
    <section id="modal-esperal">
        <div class="overlay" id="overlay">
        </div>
        <div class="modal" id="modal">
            <div class="modal-content">
                <p>Esperando ataque del enemigo...</p>
            </div>
        </div>
    </section>
</template>

<style>
#seleccionar-ataque {
    display: flex;
    flex-direction: column;
    align-items: center;
}

#mensajes {
    width: 280px;
    background: #eeeeee;
    padding: 20px;
    margin-top: 20px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
}

#boton-reiniciar {
    width: 100px;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    border-color: #11468f;
    color: #11468f;
    font-family: "Poppins", sans-serif;
}

.ataques {
    display: grid;
    grid-template-columns: 100px 100px;
    color: white;
}

#vidas-jugador,
#vidas-enemigo {
    font-size: 32px;
    margin-bottom: 0;
}

.ataques-jugador,
.ataques-enemigo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.mascota-seleccionada img {
    width: 80px;
}

.mascota-seleccionada p {
    margin: 0px;
}

.modal {
    width: 200px;
    height: 200px;
    background: white;
    padding: 2em;
    border-radius: 0.5em;
    text-align: center;
    z-index: 2;
    /* transform: translateY(-3000px); */
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    overflow: auto;
    /* display: flex; */
    display: none;
    justify-content: center;
    flex-direction: column;
}

.modal-content {
    display: flex;
}

.modal-content p {
    align-self: center;
}

.overlay {
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    /*transition: 300s ease-in;*/
    /*opacity: 0;*/
    /*visibility: hidden;*/
    display: none;
}

.active {
    display: flex;
}

@media (max-width: 560px) {

    .tarjetas,
    .tarjetas-ataques {
        flex-direction: column;
    }
}
</style>
