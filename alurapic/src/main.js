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

Vue.http.options.root = process.env.API_URL ? process.env.API_URL : 'http://localhost:3000';

Vue.http.interceptors.push((req, next) => {

  // é possível colocar informações no header antes do envio da requisição
  req.headers.set('Authorization', 'informação de segurança aqui');
  console.log('Lidando com o request');

  next(res => {
    console.log('Lidando com a resposta')
    // é possível acessar os dados da reposta e realizar transformações antes
    console.log(res.body);
  });

});

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
