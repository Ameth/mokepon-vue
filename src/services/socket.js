import { ref } from "vue";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000/");
// const socket = io("https://mokepon-socket.herokuapp.com/");

socket.on("connect", () => {
  console.log(`connect ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log("disconnect");
});

export function onSocket() {
  return socket;
}

export function wsSetDisplayName(value) {
  socket.emit("saludar", value);
}

export function wsUnirseAlJuego(mokepon) {
  socket.emit("joinGame", mokepon);
}

export function wsActualizarPosicion(pos) {
  socket.emit("pos", { ...pos });
}

export function wsEnviarAtaque(ataque) {
  socket.emit("atacar", ataque);
}

export function wsReiniciarJuego(id) {
  socket.emit("reset", id);
}

// export function wsRecibirPosicion() {
//   return socket.on("allPos", { enemigos });
// }
