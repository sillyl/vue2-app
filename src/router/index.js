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
    component: () => import(/* webpackChunkName: "VideoPlayer" */ "@/components/VideoPlay/JMuxerVideo.vue"),
  },
  {
    path: "/h264LivePlayer",
    name: "h264LivePlayer",
    component: () => import(/* webpackChunkName: "VideoPlayer" */ "@/components/h264LivePlayer/Index.vue"),
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
    path: "/TestLaochenBili",
    name: "TestLaochenBili",
    component: () => import(/* webpackChunkName: "ThreePage" */ "@/views/Three/TestLaochenBili/Raycaster.vue"),
  },
  {
    path: "/TestExampleWebglDae",
    name: "TestExampleWebglDae",
    component: () => import(/* webpackChunkName: "ThreePage" */ "@/views/Three/TestExampleWebglObj.vue"),
  },
  {
    path: "/TestExampleWebglObj",
    name: "TestExampleWebglObj",
    component: () => import(/* webpackChunkName: "ThreePage" */ "@/views/Three/TestExampleWebglObj.vue"),
  },
  {
    path: "/TestExampleWebglGltf",
    name: "TestExampleWebglGltf",
    component: () => import(/* webpackChunkName: "ThreePage" */ "@/views/Three/TestExampleWebglGltf.vue"),
  },
  {
    path: "/leaflet",
    name: "Leaflet",
    component: () => import(/* webpackChunkName: "Leaflet" */ "@/views/Leaflet/Index.vue"),
  },
  {
    path: "/three",
    name: "Three",
    component: () => import(/* webpackChunkName: "ThreePage" */ "@/views/Three/Index.vue"),
  },
  {
    path: "/three/Dianyun",
    name: "Three",
    component: () => import(/* webpackChunkName: "ThreePage" */ "@/views/Three/Dianyun.vue"),
  },
  {
    path: "/three/testone",
    name: "Three",
    component: () => import(/* webpackChunkName: "ThreePage" */ "@/views/Three/TestOne/TestOne.vue"),
  },
  {
    path: "/terminal",
    name: "Terminal",
    component: () => import(/* webpackChunkName: "VideoPlayer" */ "@/components/Terminal/Index.vue"),
  },
  {
    path: "/layoutDrag",
    name: "LayoutDrag",
    component: () => import(/* webpackChunkName: "LayoutDrag" */ "@/views/Drag/Test.vue"),
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
