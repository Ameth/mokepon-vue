export const aleatorio = (min, max) => {
  // Generar un número aleatorio entre dos números, inclusives
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const moverConTeclado = (event) => {
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
};

export const crearMokepon = (
  nombre,
  imagen,
  vidas,
  ataques = [],
  id = null
) => {
  const moke = {
    id,
    nombre,
    imagen,
    vidas,
    ataques,
    ancho: 100,
    alto: 100,
    x: 100,
    y: 200,
    mapaImagen: new Image(),
    // mapaImagen.src= imagen,
    velocidadX: 0,
    velocidadY: 0,
  };

  moke.mapaImagen.src = moke.imagen;

  return moke;
};

export const dibujarMokepon = (mokepon, lienzo) => {
  mokepon.mapaImagen = new Image();
  mokepon.mapaImagen.src = mokepon.imagen;
  lienzo.drawImage(
    mokepon.mapaImagen,
    mokepon.x,
    mokepon.y,
    mokepon.ancho,
    mokepon.alto
  );
};