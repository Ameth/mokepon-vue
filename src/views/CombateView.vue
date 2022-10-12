<script setup>
import { ref, onMounted, watch, toRef } from 'vue';
import { useRouter } from 'vue-router'
import { store } from '@/stores/store.js'
import { wsEnviarAtaque, wsReiniciarJuego, onSocket } from '@/services/socket.js'

const socket = onSocket()
const router = useRouter()

const mascotaJugador = store.miMokepon();
// console.log("Mi Mokepon:", mascotaJugador.ataques);
const mascotaEnemigoActual = toRef(store, "miEnemigo")
const indexAtak = ref(0)

// console.log(mascotaEnemigoActual.value);

const isHidden = ref(true)
const isActiveModal = ref(false)

const ataqueJugador = ref([]);
const ataqueEnemigo = ref([]);

const ataqueJugadorView = ref([])
const ataqueEnemigoView = ref([])

const mensajeCombate = ref("Mucha suerte")
const victoriasJugador = ref(0);
const victoriasEnemigo = ref(0);

const enviarAtaque = () => {
    // console.log("Entro aqui");
    wsEnviarAtaque({
        ataque: ataqueJugador.value,
        id: mascotaJugador.id,
        idEnemigo: mascotaEnemigoActual.value.id
    })
}


const ejecutarAtaque = (e) => {
    // console.log(e);
    const btn = e.target;
    if (btn.textContent === "Agua 💧") {
        ataqueJugador.value.push("AGUA");
        btn.style.background = "#112f58";
        btn.disabled = true;
    } else if (btn.textContent === "Tierra 🌱") {
        ataqueJugador.value.push("TIERRA");
        btn.style.background = "#112f58";
        btn.disabled = true;
    } else {
        ataqueJugador.value.push("FUEGO");
        btn.style.background = "#112f58";
        btn.disabled = true;
    }
    // console.log("Jugador", ataqueJugador);
    // ataqueAleatorioEnemigo();
    enviarAtaque();
    isActiveModal.value = true;
    combateEnLinea();
}

const crearMensaje = (resultado, ataqueActualJugador, ataqueActualEnemigo) => {
    // Crear el mensaje con el resultado de cada uno de los ataques y mostrar con qué atacó cada jugador
    mensajeCombate.value = resultado;
    ataqueJugadorView.value.push(ataqueActualJugador);
    ataqueEnemigoView.value.push(ataqueActualEnemigo);
}

const revisarVictorias = () => {
    // Verificar si gano el jugador o el enemigo
    if (victoriasEnemigo.value === victoriasJugador.value) {
        mensajeCombate.value = "¡EMPATE! 😌";
        isHidden.value = false
    } else if (victoriasJugador.value > victoriasEnemigo.value) {
        mensajeCombate.value = "¡GANASTE! 😎";
        isHidden.value = false
    } else {
        mensajeCombate.value = "¡PERDISTE! 😭";
        isHidden.value = false
    }
}

const combateEnLinea = () => {
    // Comparar cada uno de lo ataques para verificar el resultado por cada uno
    if (
        ataqueJugador.value.length > indexAtak.value &&
        ataqueEnemigo.value.length > indexAtak.value &&
        ataqueJugador.value.length === ataqueEnemigo.value.length
    ) {
        isActiveModal.value = false;
        if (ataqueJugador.value[indexAtak.value] === ataqueEnemigo.value[indexAtak.value]) {
            crearMensaje(
                "EMPATE",
                ataqueJugador.value[indexAtak.value] + "🟡",
                ataqueEnemigo.value[indexAtak.value] + "🟡"
            );
        } else if (
            ataqueJugador.value[indexAtak.value] === "FUEGO" &&
            ataqueEnemigo.value[indexAtak.value] === "TIERRA"
        ) {
            crearMensaje(
                "GANASTE",
                ataqueJugador.value[indexAtak.value] + "✅",
                ataqueEnemigo.value[indexAtak.value] + "❌"
            );
            victoriasJugador.value++;
        } else if (
            ataqueJugador.value[indexAtak.value] === "TIERRA" &&
            ataqueEnemigo.value[indexAtak.value] === "AGUA"
        ) {
            crearMensaje(
                "GANASTE",
                ataqueJugador.value[indexAtak.value] + "✅",
                ataqueEnemigo.value[indexAtak.value] + "❌"
            );
            victoriasJugador.value++;
        } else if (
            ataqueJugador.value[indexAtak.value] === "AGUA" &&
            ataqueEnemigo.value[indexAtak.value] === "FUEGO"
        ) {
            crearMensaje(
                "GANASTE",
                ataqueJugador.value[indexAtak.value] + "✅",
                ataqueEnemigo.value[indexAtak.value] + "❌"
            );
            victoriasJugador.value++;
        } else {
            crearMensaje(
                "PERDISTE",
                ataqueJugador.value[indexAtak.value] + "❌",
                ataqueEnemigo.value[indexAtak.value] + "✅"
            );
            victoriasEnemigo.value++;
        }

        indexAtak.value++;

        if (ataqueJugador.value.length === 5) {
            revisarVictorias();
        }
    }
}

const reset = () => {
    wsReiniciarJuego(mascotaJugador.id)
    router.push({ name: 'home' })
}

onMounted(() => {

    socket.on("recibirAtaque", ({ ataques, id }) => {
        // console.log({ ataques, id });
        if (mascotaEnemigoActual.value.id === id) {
            // console.log("Me atacaron con:", ataques);
            ataqueEnemigo.value = ataques;
            combateEnLinea();
        }
    })

})

</script>


<template>
    <section id="seleccionar-ataque">
        <h1 class="titulo">{{store.title}}</h1>

        <h2 class="subtitulo">Elige tu ataque:</h2>

        <div id="tarjetas-ataques" class="tarjetas-ataques" @click="ejecutarAtaque">
            <button class="boton-de-ataque" v-for="ataque in mascotaJugador.ataques">{{
            ataque.nombre === "💧"
            ? "Agua"
            : ataque.nombre === "🌱"
            ? "Tierra"
            : "Fuego"}} {{ataque.nombre}}</button>
        </div>

        <div id="mensajes">
            <p id="resultado">{{mensajeCombate}}</p>

            <section id="reiniciar" :class="{hidden: isHidden}">
                <button id="boton-reiniciar" @click="reset">Reiniciar</button>
            </section>
        </div>

        <div class="ataques">
            <div class="ataques-jugador">
                <p id="vidas-jugador">{{victoriasJugador}}</p>
                <div id="mascota-jugador" class="mascota-seleccionada">
                    <img :src="mascotaJugador.imagen" :alt="mascotaJugador.nombre">
                    <p>{{mascotaJugador.nombre}}</p>
                </div>
                <div id="ataques-del-jugador">
                    <p v-for="ataque in ataqueJugadorView">{{ataque}}</p>
                </div>
            </div>
            <div class="ataques-enemigo">
                <p id="vidas-enemigo">{{victoriasEnemigo}}</p>
                <div id="mascota-enemigo" class="mascota-seleccionada">
                    <img :src="mascotaEnemigoActual.imagen" :alt="mascotaEnemigoActual.nombre">
                    <p>{{mascotaEnemigoActual.nombre}}</p>
                </div>
                <div id="ataques-del-enemigo">
                    <p v-for="ataque in ataqueEnemigoView">{{ataque}}</p>
                </div>
            </div>
        </div>
    </section>
    <section id="modal-esperal">
        <div class="overlay" id="overlay" :class="{active: isActiveModal}">
        </div>
        <div class="modal" id="modal" :class="{active: isActiveModal}">
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
    cursor: pointer;
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

.boton-de-ataque {
    background-color: #11468f;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 20px;
    border-color: transparent;
    width: 100px;
    color: white;
    font-family: "Poppins", sans-serif;
    cursor: pointer;
    margin-right: 10px;
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

.hidden {
    display: none;
}
</style>
