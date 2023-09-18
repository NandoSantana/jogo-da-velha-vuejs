<template>


<!--    <router-view></router-view>-->
        <GameGame />

</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'
import GameGame from "../components/GameGame.vue";

export default {
  name: 'GamePage',
  components: {

    GameGame
  }
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
