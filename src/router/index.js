import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
  ],
});

// router.beforeEach((to, from) => {
//   console.log("from", from);
//   console.log("to", to);
//   // if (to.name == "about") {
//   //   // return { name: "sesion" };
//   //   return false;
//   // }
//   if (to.meta.requireMoke) {
//     // to.meta.requiresAuth = false;
//     return {
//       name: "home",
//     };
//   }
//   return true;
// });

export default router;
