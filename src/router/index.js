import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { store } from "@/stores/store.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requireMoke: false,
      },
    },
    {
      path: "/map",
      name: "map",
      component: () => import("../views/MapaView.vue"),
      meta: {
        requireMoke: true,
      },
    },
    {
      path: "/battle",
      name: "batalla",
      component: () => import("../views/CombateView.vue"),
      meta: {
        requireMoke: true,
      },
    },
  ],
});

router.beforeEach((to, from) => {
  // console.log("from", from);
  // console.log("to", to);
  // console.log("Cuenta actual:", store.jugadores.length);
  // if (to.name == "about") {
  //   // return { name: "sesion" };
  //   return false;
  // }
  if (to.meta.requireMoke && store.jugadores.length == 0) {
    // to.meta.requiresAuth = false;
    return {
      name: "home",
    };
  }
  return true;
});

export default router;
