<template>
  <div>
    <h1 class="centralizado">Cadastro</h1>
    <h2 class="centralizado">{{ foto.titulo }}</h2>
    <h2 v-if="foto._id" class="centralizado">Alterando</h2>
    <h2 v-else class="centralizado">Incluindo</h2>
    <validation-observer v-slot="{ handleSubmit }">
      <form @submit.prevent="handleSubmit(grava)">
        <div class="controle">
          <label for="titulo">TÍTULO</label>
          <validation-provider
            rules="required|min:3|max:30"
            v-slot="{ errors }"
          >
            <input
              name="titulo"
              id="titulo"
              autocomplete="off"
              v-model.lazy="foto.titulo"
            />
            <span class="erro" v-show="errors">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="controle">
          <label for="url">URL</label>
          <validation-provider rules="required" v-slot="{ errors }">
            <input
              name="url"
              id="url"
              autocomplete="off"
              v-model.lazy="foto.url"
            />
            <imagem-responsiva
              v-show="foto.url"
              :url="foto.url"
              :titulo="foto.titulo"
            />
            <span class="erro" v-show="errors">{{ errors[0] }}</span>
          </validation-provider>
        </div>
        <div class="controle">
          <label for="descricao">DESCRIÇÃO</label>
          <textarea
            id="descricao"
            autocomplete="off"
            v-model="foto.descricao"
          ></textarea>
        </div>
        <div class="centralizado">
          <meu-botao rotulo="GRAVAR" tipo="submit" />
          <router-link :to="{ name: 'home' }"
            ><meu-botao rotulo="VOLTAR" tipo="button"
          /></router-link>
        </div>
      </form>
    </validation-observer>
  </div>
</template>

<script>
import ImagemResponsiva from "../shared/imagem-responsiva/ImagemResponsiva.vue";
import Botao from "../shared/botao/Botao.vue";
import Foto from "../../domain/foto/Foto";
import FotoService from "../../domain/foto/FotoService";

export default {
  components: {
    "imagem-responsiva": ImagemResponsiva,
    "meu-botao": Botao,
  },
  data() {
    return {
      foto: new Foto(),
      id: this.$route.params.id,
    };
  },
  methods: {
    grava() {
      this.service.cadastra(this.foto).then(
        () => {
          if (this.id) this.$router.push({ name: "home" });
          this.foto = new Foto();
        },
        (err) => console.log(err)
      );
    },
  },
  created() {
    this.service = new FotoService(this.$resource);

    if (this.id) {
      this.service.busca(this.id).then((foto) => (this.foto = foto));
    }
  },
};
</script>
<style scoped>
.centralizado {
  text-align: center;
}
.controle {
  font-size: 1.2em;
  margin-bottom: 20px;
}
.controle label {
  display: block;
  font-weight: bold;
}

.controle label + span input,
.controle textarea {
  width: 100%;
  font-size: inherit;
  border-radius: 5px;
}

.centralizado {
  text-align: center;
}

.erro {
  color: red;
}
</style>
