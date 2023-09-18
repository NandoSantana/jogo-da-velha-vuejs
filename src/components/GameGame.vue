<template>
  <div class="container">
    <div v-if="modalErrorRanking" class="modal">
      <div class="modal-content">
        <h2>Erro ao inserir a jogada no ranking</h2>

        <br/>
        <button @click="modalErrorRanking=false" class="start-game">Começar Jogo</button>
      </div>
    </div>
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <h2>Configuração de Jogadores</h2>
        <div>
          <label for="playerXName">Nome do Jogador X:</label>
          <input type="text" id="playerXName" class="form-control" v-model="playerXName" />
        </div>
        <br/>
        <div>
          <label for="playerOName">Nome do Jogador O:</label>
          <input type="text" id="playerOName" class="form-control" v-model="playerOName" />
        </div>
        <br/>
        <button @click="startGame" class="start-game">Começar Jogo</button>
      </div>
    </div>

    <div v-if="showModalVelha" class="modal">
      <div class="modal-content">
        <h2>Deu Velha!</h2>
        <button @click="resetGame" class="start-game">Começar Jogo</button>
      </div>
    </div>
    <div v-if="showModalWinner" class="modal">
      <div class="modal-content">
        <h2>
          Parabéns {{winner}}<br/>
          Você venceu.
        </h2>

        <button @click="endGame" class="end-game">Que tal mais uma rodada?</button>
      </div>
    </div>
    <div class="score">
      <div>{{ playerXName }} ({{ playerXScore }} pontos) contra {{ playerOName }} ({{ playerOScore }} pontos)</div>
    </div>
    <div class="row">
      <div class="col-md-6 stage">
        <BoardGame :squares="squares" :status="status" @square-click="handleClick" />
      </div>
      <div class="col-md-6 ranking">
        <RankingGame :players="RankingUpdate"/>
      </div>
    </div>
    <br />
    <button @click="resetGame" class="end-game">Continuar</button>
  </div>
</template>

<script>
import BoardGame from './BoardGame.vue';
import RankingGame from './RankingGame.vue';
import axios from 'axios';

export default {
  components: {
    BoardGame,
    RankingGame
  },
  data() {
    return {
      squares: Array(9).fill(null),
      currentPlayer: 'X',
      playerXName: '',
      playerOName: '',
      playerXScore: 0,
      playerOScore: 0,
      showModal: true,
      showModalWinner: false,
      showModalVelha: false,
      winner: null,
      modalErrorRanking: false,
      RankingUpdate: null,
    };
  },
  computed: {
    status() {
      switch (this.currentPlayer) {
        case "X":
          return `A vez de: ${this.playerXName}`;
        case "O":
          return `A vez de: ${this.playerOName}`;
        default:
          `Current player: ...`;
      }
      return `Current player:...}`;
    },
  },
  async mounted(){
    await this.atualizaRanking();
  },
  methods: {
    handleClick(index) {
      this.squares[index] = this.currentPlayer;
      const winner = this.calculateWinner();
      if (!winner && this.squares.every(cell => cell)) {
        this.showModalVelha = true; // Ative o modal de empate
      } else if (winner) {
        if (winner === 'X') {
          this.playerXScore++;
          this.winner = this.playerXName
          this.showModalWinner = true;
        } else if (winner === 'O') {
          this.playerOScore++;
          this.winner = this.playerOName
          this.showModalWinner = true;
        }
      }
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    },
    calculateWinner() {
      // Implemente a lógica para determinar o vencedor aqui
      const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
      ];

      for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (this.squares[a] && this.squares[a] === this.squares[b] && this.squares[a] === this.squares[c]) {
          return this.squares[a];
        }
      }

      return null;
    },
    resetGame() {
      this.showModalVelha = false;
      this.squares = Array(9).fill(null);
      this.currentPlayer = 'X';
    },
    startGame() {
      if (this.playerXName.trim() === '' || this.playerOName.trim() === '') {
        alert('Por favor, insira nomes válidos para os jogadores X e O.');
        return;
      }
      this.showModal = false;
    },
    async endGame() {
      this.showModalWinner = false;
      try {
        // Dados do jogador e sua pontuação (substitua com os dados reais)
        const jogador = {
          "jogadores": [
            {"nome": this.playerOName, "pontuacao": this.playerOScore},
            {"nome": this.playerXName, "pontuacao": this.playerXScore}
          ]

        };
        const headers = {
          // 'Authorization': 'Bearer SeuTokenJWT', // Exemplo de token de autorização JWT
          'Content-Type': 'application/json', // Tipo de conteúdo JSON
          // Adicione mais headers personalizados conforme necessário
        };

        // Configuração da requisição com headers
        const config = {
          headers: headers
        };

        // Realize a requisição POST para cadastrar a pontuação
        const response = await axios.post('http://127.0.0.1:8000/api/registrar-ranking', jogador, config);

        // Verifique a resposta do servidor (opcional)
        if (response.status === 200) {
          console.log('Pontuação cadastrada com sucesso!');
          await this.atualizaRanking();
        } else {
          console.error('Falha ao cadastrar a pontuação.');
        }
      } catch (error) {
        console.error('Erro ao cadastrar a pontuação:', error);
        this.modalErrorRanking = true;
      }
    },

  async atualizaRanking() {
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
      // this.dadosRecebidos = novosDados;
      this.RankingUpdate = response.data;
    }
  },

  }
}
</script>

<style scoped>
.stage {
  border: 5px dotted slategrey;
  border-radius: 20px;
  padding: 20px;
  position: relative;
  left:-10px;
}
.ranking {
  border: 1px solid red;
  border-radius: 20px;
  padding: 30px;
  position: relative;
  left:10px;
}
.end-game {
  /* Estilos para o término de um jogo */
  background-color: lightgreen; /* Cor de fundo vermelha (pode ser alterada) */
  color: #4c315b; /* Cor do texto (pode ser alterada) */
  padding: 10px 20px; /* Espaçamento interno */
  font-size: 1rem; /* Tamanho da fonte */
  border: none; /* Remova a borda */
  border-radius: 5px; /* Cantos arredondados */
  cursor: pointer; /* Mostrar o cursor de apontador ao passar o mouse */
  transition: background-color 0.3s ease; /* Efeito de transição suave na cor de fundo */

  /* Estilos adicionais conforme necessário */
}

.end-game:hover {
  background-color:  #4c315b; /* Cor de fundo ao passar o mouse (pode ser alterada) */
  color:#FFF;
}

/* Outros estilos relacionados ao término do jogo podem ser adicionados aqui */

.start-game {
  /* Estilos para o início de um jogo */
  background-color: #007bff; /* Cor de fundo azul (pode ser alterada) */
  color: #fff; /* Cor do texto (pode ser alterada) */
  padding: 10px 20px; /* Espaçamento interno */
  font-size: 1rem; /* Tamanho da fonte */
  border: none; /* Remova a borda */
  border-radius: 5px; /* Cantos arredondados */
  cursor: pointer; /* Mostrar o cursor de apontador ao passar o mouse */
  transition: background-color 0.3s ease; /* Efeito de transição suave na cor de fundo */

  /* Estilos adicionais conforme necessário */
}

.start-game:hover {
  background-color: #0056b3; /* Cor de fundo ao passar o mouse (pode ser alterada) */
}

.form-control {
  position: relative;

  align-items: center;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control:focus {
  border-color: #80bdff;
  outline: 0;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}


.modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.modal-content {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}
.content {
  /* Estilos para o conteúdo */
  font-size: 16px; /* Tamanho da fonte padrão (pode ser alterado) */
  line-height: 1.5; /* Espaçamento entre linhas */
  color: #333; /* Cor do texto (pode ser alterada) */
  margin: 0 auto; /* Centralize o conteúdo horizontalmente */
  max-width: 800px; /* Largura máxima do conteúdo (pode ser alterada) */
  padding: 20px; /* Espaçamento interno */

  /* Outros estilos específicos para o conteúdo podem ser adicionados aqui */
}
/* Estilize o jogo para ocupar a tela inteira em dispositivos móveis */
@media (max-width: 768px) {

  .ranking {
    display: none;
  }

  .stage {
    border: 5px dotted slategrey;
    border-radius: 20px;
    padding: 10px;
    position: relative;
    margin:10px;


  }


  .score {
    font-size: 18px;
  }

  .modal-content {
    width: 80%;
  }
}
</style>
