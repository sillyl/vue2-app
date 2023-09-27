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
  // {
  //   path: "/videoPlayer",
  //   name: "VideoPlayer",
  //   component: () => import(/* webpackChunkName: "about" */ "@/views/Video/Index.vue"),
  //   // component: () => import(/* webpackChunkName: "about" */ "@/components/VideoPlayer/Index.vue"),
  // },
  {
    path: "/wfs",
    name: "Wfs",
    // component: () => import(/* webpackChunkName: "about" */ "@/components/Wfs/Index.vue"),
    component: () => import(/* webpackChunkName: "about" */ "@/views/Video/Index.vue"),
  },
  {
    path: "/cssTest",
    name: "CssTest",
    // component: () => import(/* webpackChunkName: "about" */ "@/components/Wfs/Index.vue"),
    component: () => import(/* webpackChunkName: "about" */ "@/components/cssTest/Index.vue"),
  },
  {
    path: "/buttonOptions",
    name: "ButtonOptions",
    // component: () => import(/* webpackChunkName: "about" */ "@/components/Wfs/Index.vue"),
    component: () => import(/* webpackChunkName: "about" */ "@/components/ButtonOptions/Demo.vue"),
  },
  {
    path: "/demo",
    name: "TreeTable",
    component: () => import(/* webpackChunkName: "about" */ "@/components/TreeTable/demo.vue"),
  },
  {
    path: "/videoPlayer",
    name: "VideoPlayer",
    component: () => import(/* webpackChunkName: "VideoPlayer" */ "@/components/VideoPlayer/Index.vue"),
  },
  {
    path: "/videoPlayerDemo",
    name: "VideoPlayerDemo",
    component: () => import(/* webpackChunkName: "VideoPlayer" */ "@/components/VideoPlayer/Demo.vue"),
  },
  {
    path: "/videoPlayerTest",
    name: "VideoPlayerTest",
    component: () => import(/* webpackChunkName: "VideoPlayer" */ "@/components/VideoPlayer/Test.vue"),
  },
  {
    path: "/webrtcSteamer",
    name: "webrtcSteamer",
    component: () => import(/* webpackChunkName: "webrtcSteamer" */ "@/views/ShowWebrtc/Index.vue"),
  },
  {
    path: "/webrtcSteamer_test",
    name: "webrtcSteamerTest",
    component: () => import(/* webpackChunkName: "webrtcSteamer" */ "@/components/Webrtc/Test.vue"),
  },
  {
    path: "/leaflet",
    name: "Leaflet",
    component: () => import(/* webpackChunkName: "Leaflet" */ "@/views/Leaflet/Index.vue"),
  },
  {
    path: "/three",
    name: "Three",
    component: () => import(/* webpackChunkName: "Three" */ "@/views/Three/Index.vue"),
  },
  {
    path: "/three/test",
    name: "Three",
    component: () => import(/* webpackChunkName: "Three" */ "@/views/Three/Test.vue"),
  },
  {
    path: "/three/testone",
    name: "Three",
    component: () => import(/* webpackChunkName: "Three" */ "@/views/Three/TestOne/TestOne.vue"),
  },
  {
    path: "/terminal",
    name: "Terminal",
    component: () => import(/* webpackChunkName: "VideoPlayer" */ "@/components/Terminal/Index.vue"),
  },
  {
    path: '/notFound',
    name: 'NotFound',
    meta: {
      title: 'Page not found',
      isLogin: false
    },
    component: () => import(/* webpackChunkName: "NotFound" */ '@/components/NotFound/Index.vue')
  },
  // 所有未定义路由，全部重定向到notFound页
  {
    path: '*',
    redirect: '/notFound'
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
