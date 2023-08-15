/* eslint-disable prettier/prettier */
import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  // {
  //   path: "/about",
  //   name: "about",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  // },
  {
    path: "/cesiumViewer",
    name: "cesiumViewer",
    component: () => import(/* webpackChunkName: "about" */ "@/components/CesiumViewer/Index.vue"),
  },
  {
    path: "/VideoPlayer",
    name: "VideoPlayer",
    component: () => import(/* webpackChunkName: "about" */ "@/components/VideoPlayer/Index.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
