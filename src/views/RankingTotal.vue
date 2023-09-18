<template>
  <div class="container">

    <RankingGame :players="RankingUpdate" />
  </div>
<!--  :players="RankingUpdate"-->

</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

import RankingGame from '../components/RankingGame.vue';
import axios from "axios";
export default {
  name: 'RankingTotal',
  components: {
    RankingGame
  },
  data() {
    return {
      RankingUpdate: null,
    }
  },
  async mounted() {

    const headers = {
      'Content-Type': 'application/json', // Tipo de conteúdo JSON
      // Adicione mais headers personalizados conforme necessário
    };
    // Configuração da requisição com headers
    const config = {
      headers: headers
    };
    // Realize a requisição POST para cadastrar a pontuação
    const response = await axios.get('http://127.0.0.1:8000/api/top-five-ranking', '', config);
    // Verifique a resposta do servidor (opcional)
    if (response.status === 200) {
      console.log('Pontuação resgatada com sucesso!');
      this.RankingUpdate = response.data;
    }
  },



}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
