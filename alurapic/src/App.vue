<template>
  <div class="corpo">
    <meu-menu :rotas="routes"></meu-menu>
    <transition name="pagina">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { routes } from "./routes";
import Menu from "./components/shared/menu/Menu.vue";

export default {
  components: {
    "meu-menu": Menu,
  },
  data() {
    return {
      routes,
    };
  },
};
</script>

<style>
.corpo {
  font-family: Helvetica, sans-serif;
  width: 96%;
  margin: 0 auto;
}

.pagina-enter /* antes do elemenro ser incluído ou removido, estado atual */,
.pagina-leave-active /* quando o elemento esta sendo removido */ {
  opacity: 0;
}

.pagina-enter-active, /* quando o elemento esta sendo incluído */
.pagina-leave-active {
  transition: opacity 0.4s;
}
</style>
