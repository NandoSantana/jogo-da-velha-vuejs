<template>
  <div id="app">
    <a href="/" class="menu">Home</a><img alt="Vue logo" src="./assets/logo.png" style="position: relative;z-index: 99"><a href="/ranking-total" class="menu">Ranking</a>
    <router-view></router-view>
<!--    <Game></Game>-->
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css'

// import Game from './components/GameGame.vue';
export default {
  name: 'App',

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
.menu {
  background-color: darkseagreen;
  width: 240px !important;
  height: 50px;
  margin-left: -70px;
  margin-right: -80px;
  padding: 10px;
  display: inline-block;
  color: #fff;
  text-decoration: none;
}
</style>
