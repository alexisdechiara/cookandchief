import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import "./assets/tailwind.css";
import contenteditable from 'vue-contenteditable'

Vue.config.productionTip = false;
Vue.use(contenteditable)

new Vue({
  router,
  store,
  contenteditable,
  render: (h) => h(App),
}).$mount("#app");
