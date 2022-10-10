import { reactive } from "vue";

export const store = reactive({
  jugadores: [],
  cant: 0,
  unirseAlJuego(nombre) {
    this.jugadores.push(nombre);
  },
  sumar() {
    this.cant++;
  },
});
