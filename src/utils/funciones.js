export const aleatorio = (min, max) => {
  // Generar un número aleatorio entre dos números, inclusives
  return Math.floor(Math.random() * (max - min + 1) + min);
};
