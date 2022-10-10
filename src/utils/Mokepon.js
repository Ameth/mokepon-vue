import { aleatorio } from "@/utils/funciones.js";

class Mokepon {
  constructor(nombre, imagen, vidas, ataques = [], id = null) {
    this.id = id;
    this.nombre = nombre;
    this.imagen = imagen;
    this.vidas = vidas;
    this.ataques = ataques;
    this.ancho = 100;
    this.alto = 100;
    this.x = 100; //mapa ? aleatorio(10, mapa.width - this.ancho) : 0;
    this.y = 200; //mapa ? aleatorio(10, mapa.height - this.alto) : 0;
    this.mapaImagen = new Image();
    this.mapaImagen.src = imagen;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  dibujar(lienzo) {
    lienzo.drawImage(this.mapaImagen, this.x, this.y, this.ancho, this.alto);
  }
}

export default Mokepon;
