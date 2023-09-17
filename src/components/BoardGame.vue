<template>
  <div class="container">
    <div class="status">{{ status }}</div>
    <center style="display: inline-flex;">

    <div class="board-row" v-for="row in 3" :key="row">
      <SquareGame
          v-for="col in 3"
          :key="col"
          :value="squares[(row - 1) * 3 + col - 1]"
          @click="handleClick((row - 1) * 3 + col - 1)"
      />
    </div>
    </center>

  </div>
</template>

<script>
import SquareGame from './SquareGame.vue';

export default {
  components: {
    SquareGame
  },
  props: ['squares', 'status'],
  methods: {
    handleClick(index) {
      if (!this.squares[index]) {
        this.$emit('square-click', index);
      }
    }
  }
}
</script>

<style scoped>
/* Estilize o tabuleiro conforme desejar */
.board-row {
  display: inline-grid;
  align-items: start; /* Centralize horizontalmente as linhas do tabuleiro */
}
</style>
