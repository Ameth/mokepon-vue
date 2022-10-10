<template>
    <canvas ref="mapa" id="mapa"></canvas>
    <button @mousedown="moverArriba" @mouseup="detenerMovimiento">🔺</button>
    <div>
        <button @mousedown="moverIzquierda" @mouseup="detenerMovimiento">◀</button>
        <button @mousedown="moverAbajo" @mouseup="detenerMovimiento">🔻</button>
        <button @mousedown="moverDerecha" @mouseup="detenerMovimiento">▶</button>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUpdate } from 'vue'
import Mokepon from '@/utils/Mokepon.js'
import { ataquesHipodoge, ataquesCapipepo, ataquesRatigueya } from '@/utils/ataques.js'
import { store } from '@/stores/store.js'
import { wsUnirseAlJuego, wsActualizarPosicion, onSocket } from '@/services/socket.js'
import { crearMokepon, dibujarMokepon } from '@/utils/funciones.js'

const mapa = ref(null)

let intervalo;

let mokeponesEnemigos = [];

const socket = onSocket()

// const mokeponStore = useMokeponStore();

// const { jugadores } = storeToRefs(mokeponStore);

const mascotaJugador = store.jugadores[0];
console.log("Objeto mascota:", mascotaJugador);
wsUnirseAlJuego(mascotaJugador)

// console.log({ ...mascotaJugador, ataques: [...mascotaJugador.ataques] });

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


    intervalo = setInterval(dibujarCanvas, 50);

    window.addEventListener("keydown", moverConTeclado);
    window.addEventListener("keyup", detenerMovimiento);

    function dibujarCanvas() {
        // Muestra las mascotas seleccionadas en el mapa
        // console.log(mascotaJugador);
        mascotaJugador.x = mascotaJugador.x + mascotaJugador.velocidadX;
        mascotaJugador.y = mascotaJugador.y + mascotaJugador.velocidadY;

        lienzo.clearRect(0, 0, mapa.value.clientWidth, mapa.value.height);
        lienzo.drawImage(mapaBackground, 0, 0, mapa.value.width, mapa.value.height);
        lienzo.drawImage(mascotaJugador.mapaImagen, mascotaJugador.x, mascotaJugador.y, mascotaJugador.ancho, mascotaJugador.alto);
        // mascotaJugador.dibujar();
        // mascotaEnemigo.dibujar();
        enviarPosicionEnLinea(mascotaJugador.x, mascotaJugador.y);
        console.log(mokeponesEnemigos);
        mokeponesEnemigos.forEach((enemigo) => {
            // enemigo.dibujar();
            // enemigo.mapaImagen = new Image();
            // enemigo.mapaImagen.src = enemigo.imagen;
            // console.log("Mi enemigo renderizado:", enemigo);
            dibujarMokepon(enemigo, lienzo)
            // enemigo.dibujar(lienzo);
            // lienzo.drawImage(enemigo.mapaImagen, enemigo.x, enemigo.y, enemigo.ancho, enemigo.alto);
            // revisarColision(enemigo);
        });
        if (mascotaJugador.velocidadX !== 0 || mascotaJugador.velocidadY !== 0) {
            // revisarColision();
            detenerEnBordesDelMapa();
            // enviarPosicionEnLinea(mascotaJugador.x, mascotaJugador.y);
        }

        // console.log("Dibujando");
    }
})

function enviarPosicionEnLinea(x, y) {
    // Enviar la posicion del jugador en linea

    wsActualizarPosicion({
        posX: x,
        posY: y
    })
}

socket.on("allPos", (enemigos) => {
    mokeponesEnemigos = enemigos.filter((enemigo) => {
        // console.log("Mis enemigos:", enemigos);
        if (enemigo.id !== socket.id) {
            const nombreMokepon = enemigo.nombre;
            let mokeponEnemigo;
            if (nombreMokepon === "Hipodoge") {
                mokeponEnemigo = crearMokepon(
                    "Hipodoge",
                    "/src/assets/tierra.png",
                    5,
                    ataquesHipodoge,
                    enemigo.id
                );
            } else if (nombreMokepon === "Capipepo") {
                mokeponEnemigo = crearMokepon(
                    "Capipepo",
                    "/src/assets/agua.png",
                    5,
                    ataquesCapipepo,
                    enemigo.id
                );
            } else if (nombreMokepon === "Ratigueya") {
                mokeponEnemigo = crearMokepon(
                    "Ratigueya",
                    "/src/assets/fuego.png",
                    5,
                    ataquesRatigueya,
                    enemigo.id
                );
            }

            if (enemigo.x) {
                mokeponEnemigo.x = enemigo.x;
                mokeponEnemigo.y = enemigo.y;
            }

            // console.log("Mi enemigo enviado:", mokeponEnemigo);

            return mokeponEnemigo;
        }

    });

    // console.log("Mis enemigos:", mokeponesEnemigos);
})


function moverDerecha() {
    mascotaJugador.velocidadX = 5;
}

function moverIzquierda() {
    mascotaJugador.velocidadX = -5;
}

function moverArriba() {
    mascotaJugador.velocidadY = -5;
}

function moverAbajo() {
    mascotaJugador.velocidadY = 5;
}

function detenerMovimiento() {
    mascotaJugador.velocidadX = 0;
    mascotaJugador.velocidadY = 0;
}

function moverConTeclado(event) {
    switch (event.keyCode) {
        case 37: // Flecha izquierda
            moverIzquierda();
            break;
        case 38: // Flecha arriba
            moverArriba();
            break;
        case 39: // Flecha derecha
            moverDerecha();
            break;
        case 40: // Flecha abajo
            moverAbajo();
            break;
        default:
            break;
    }
}

function detenerEnBordesDelMapa() {
    // Verificar si las mascotas ya llegaron al borde del mapa

    const arribaMapa = 0;
    const abajoMapa = mapa.value.height - mascotaJugador.alto;
    const derechaMapa = mapa.value.width;
    const izquierdaMapa = 0;

    const arribaJugador = mascotaJugador.y;
    const derechaJugador = mascotaJugador.x + mascotaJugador.ancho;
    const izquierdaJugador = mascotaJugador.x;

    if (arribaJugador < arribaMapa) {
        mascotaJugador.y = arribaMapa;
    }

    if (arribaJugador > abajoMapa) {
        mascotaJugador.y = abajoMapa;
    }

    if (derechaJugador > derechaMapa) {
        mascotaJugador.x = derechaMapa - mascotaJugador.ancho;
    }

    if (izquierdaJugador < izquierdaMapa) {
        mascotaJugador.x = izquierdaMapa;
    }

    // console.log(abajoJugador, mascotaJugador.y);
}



</script>

<style scoped>
button {
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

button:hover {
    background-color: #5d8bf4;
}
</style>