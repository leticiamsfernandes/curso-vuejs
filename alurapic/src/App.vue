<template>
  <div>
    <h1>{{ titulo }}</h1>
    <ul>
      <li v-for="foto of fotos" :key="foto.id">
        <img :src="foto.url" :alt="foto.titulo" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      titulo: "Alurapic",
      fotos: [
        {
          id: 1,
          url: "https://matsudapet.com.br/blog/wp-content/uploads/2019/08/shutterstock_559799125-compressed.jpg",
          titulo: "Cachorro",
        },
        {
          id: 2,
          url: "https://matsudapet.com.br/blog/wp-content/uploads/2019/08/shutterstock_559799125-compressed.jpg",
          titulo: "Cachorrão",
        },
      ]
    };
  },
};
</script>

<style>
</style>
