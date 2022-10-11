import { ref, reactive, computed, onMounted, onUnmounted } from "vue";

export const useReziseMap = () => {
  // Comprobar el ancho del mapa de forma dinámica

  const anchoVentana = ref(window.innerWidth);

  let mapaAncho = ref(anchoVentana.value - 20);
  const mapaAnchoMaximo = 800;

  if (mapaAncho.value > mapaAnchoMaximo) {
    mapaAncho.value = mapaAnchoMaximo - 20;
  }

  let mapaAlto = ref((mapaAncho.value * 600) / 800);

  function update(event) {
    anchoVentana.value = event.target.innerWidth;
  }

  window.addEventListener("resize", update);

  // onMounted(() => window.addEventListener("resize", update));
  // onUnmounted(() => window.removeEventListener('mousemove', update))

  return { mapaAncho, mapaAlto };
};

export const store = reactive({
  jugadores: [],
  miEnemigo: null,
  indexAtak: 0,
  unirseAlJuego(nombre) {
    this.jugadores.push(nombre);
  },
  miMokepon() {
    return this.jugadores[0];
  },
});
