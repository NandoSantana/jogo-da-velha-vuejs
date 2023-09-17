<template>
  <div>
    <h2>Ranking de Jogadores</h2>
    <ol>
      <li v-for="(player, index) in rankedPlayers" :key="index">
        {{ player.nome }} - Pontuação: {{ player.pontuacao }}
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: [
        { nome: "Jogador 1", pontuacao: 100 },
        { nome: "Jogador 2", pontuacao: 75 },
        { nome: "Jogador 3", pontuacao: 120 },
        // Adicione mais jogadores conforme necessário
      ]
    };
  },
  computed: {
    rankedPlayers() {
      // Classifique os jogadores em ordem decrescente de pontuação
      return this.players.slice().sort((a, b) => b.pontuacao - a.pontuacao);
    }
  }
};
</script>

<style scoped>
/* Estilize o componente conforme necessário */
</style>
