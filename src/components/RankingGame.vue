<template>
  <div>
    <h2>Ranking de Jogadores</h2>
    <ol style="text-align: left;">
      <li v-for="(player, i) in players" :key="i">
        {{i}}
        - Pontuação: {{ players[i][0].points }}
      </li>
    </ol>
  </div>
</template>

<script>
// import axios from "axios";

export default {
  props: ['players'],
  data() {
    return {
      // players: [
      //
      // ]
    };
  },

};
</script>

<style scoped>
/* Estilize o componente conforme necessário */
</style>
