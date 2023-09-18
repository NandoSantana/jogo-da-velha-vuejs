import Vue from 'vue'
import App from './App.vue'
import RankingTotal from './views/RankingTotal.vue'

import VueRouter from 'vue-router'
// import Game from "@/views/GamePage.vue";
import GamePage from "./views/GamePage.vue";

Vue.use(VueRouter)


const router = new VueRouter({
  mode:'history',
  // base: process.env.BASE_URL,
  routes: [
    // Defina suas rotas aqui
    {
      path: '/',
      component: GamePage // Importe o componente Vue correspondente
    },
    {
      path: '/ranking-total',
      component: RankingTotal
    },
  ]
})




Vue.config.productionTip = false

new Vue({
  el: '#app',
  router, // Certifique-se de adicionar o router à instância do Vue
  render: h => h(App)
})
// new Vue({
//   render: h => h(App),
//   router
// }).$mount('#app')
