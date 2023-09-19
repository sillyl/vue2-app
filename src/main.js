import Vue from "vue";
import VueKonva from "vue-konva";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/css/common.scss";
import { toDark } from "@/utils/dark";
import leafletMap from "@/utils";

// toDark(true)
Vue.config.productionTip = false;
Vue.prototype.$leafletMap = leafletMap;

Vue.use(VueKonva);
Vue.use(ElementUI);
// Vue.use(VideoPlayer);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
