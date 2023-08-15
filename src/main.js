import Vue from "vue";
import VueKonva from "vue-konva";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/common.scss";
import VideoPlayer from "vue-video-player";
import "vue-video-player/src/custom-theme.css";
import "video.js/dist/video-js.css";
import { toDark } from "@/utils/dark";

// toDark(true)
Vue.config.productionTip = false;

Vue.use(VueKonva);
Vue.use(ElementUI);
Vue.use(VideoPlayer);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
