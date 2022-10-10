import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMokeponStore = defineStore("mokepon", () => {
  const jugadores = ref([]);

  const cant = ref(0);

  const unirseAlJuego = (nombre) => {
    jugadores.value.push(nombre);
  };

  const increment = () => {
    cant.value++;
  };

  return { jugadores, unirseAlJuego, cant, increment };
});
