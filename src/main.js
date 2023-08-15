import Vue from "vue";
import VueKonva from "vue-konva";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { toDark } from "@/utils/dark";

// toDark(true)
Vue.config.productionTip = false;

Vue.use(VueKonva);
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
