import Vue from 'vue'
import App from './App.vue'
import VueResource from 'vue-resource';
import VueRouter from 'vue-router';
import { routes } from './routes';
import './directives/Transform';
import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required, min, max } from "vee-validate/dist/rules";
import { localize } from "vee-validate";
import pt_BR from "vee-validate/dist/locale/pt_BR.json";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/css/teste.css";
import "./assets/js/teste.js";
import "bootstrap/dist/js/bootstrap.js";

Vue.use(VueResource);
Vue.use(VueRouter);
Vue.component("validation-provider", ValidationProvider);
Vue.component("validation-observer", ValidationObserver);

Vue.http.options.root = "http://localhost:3000";

localize("pt_BR", pt_BR);

extend("required", {
  ...required,
});

extend("min", {
  ...min,
});

extend("max", {
  ...max,
});

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  el: '#app',
  router,
  render: h => h(App),
  components: {
    ValidationProvider,
    ValidationObserver
  }
})
