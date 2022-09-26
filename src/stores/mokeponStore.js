import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMokeponStore = defineStore("mokepon", () => {
  const jugadores = ref([]);

  const unirseAlJuego = (nombre) => {
    jugadores.value.push({
      nombre,
    });
  };

  return { jugadores, unirseAlJuego };
});
