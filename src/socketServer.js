// const io = require("socket.io")();

// import { Server } from "socket.io";

// const io = new Server(3000, { cors: { origin: "*" } });

// io.on("connection", (socket) => {
//   console.log("made socket connection", socket.id);

//   socket.emit("saludar", "Hola vue");

//   socket.on("saludar", (mensaje) => {
//     console.log("client is subscribing to timer with interval ", mensaje);

//     //   name = clientName;
//     //   io.emit("name", name);
//   });
// });

// console.log(io.httpServer);
import express from "express";
import { createServer } from "http";
import path from "path";
// import { Server } from "socket.io";

const app = express();
const httpServer = createServer(app);

app.set("port", 3000);

httpServer.listen(app.get("port"), () => {
  console.log("Servidor corriendo en el puerto " + app.get("port"));
});

// const io = new Server({ cors: { origin: "*" } });

// io.on("connection", (socket) => {
//   console.log(`connect ${socket.id}`);

//   socket.on("disconnect", () => {
//     console.log(`disconnect ${socket.id}`);
//   });
// });

// io.listen(4000);
