import { createApp } from "vue";
import { createPinia } from "pinia";
// import io from "socket.io-client";

import App from "./App.vue";
import router from "./router";

// import './assets/main.css'

const app = createApp(App);

// app.config.globalProperties.$soketio = io("http://localhost:3000");

app.use(createPinia());
app.use(router);

app.mount("#app");
