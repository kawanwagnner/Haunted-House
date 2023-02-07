var canvas = document.getElementById("canva");
var ctx = canvas.getContext("2d");

// EFEITO DA CÂMERA SEGUIR O JOGADOR.
// let cam = {
//   x: 0,
//   y: 0,
//   width: cnv.width,
//   height: cnv.height,
//   leftEdge: function () {
//     return this.x + this.width * 0.25;
//   },

//   rightEdge: function () {
//     return this.x + this.width * 0.75;
//   },

//   topEdge: function () {
//     return this.x + this.width * 0.25;
//   },

//   bottomEdge: function () {
//     return this.x + this.width * 0.75;
//   },
// };

// //centralizar a câmera
// cam.x = (gameWorld.width - cam.width) / 2;
// cam.y = (gameWorld.height - cam.height) / 2;

var canvas_width = "1000";
var canvas_height = "600";

const personagem_width = 50;
const personagem_height = 80;

const backgorundWidth = 1024;
const backgorundHeight = 576;
var troca = 0;

var camera = { x: 0, y: 0 };

var keydown = [];
var debugar = false;
var x = 0;
var y = canvas_height - personagem_height;
var sprite = null;

// Inimigos
var inimigo1 = {
  ativado: false,
  direcao: "left",
  velocidade: 2,
  instancia: null,
  x: canvas_width,
  y: canvas_height - 80,
  largura: 50,
  altura: 80,
};

var inimigo2 = {
  ativado: false,
  direcao: "left",
  velocidade: 1,
  instancia: null,
  x: canvas_width,
  y: canvas_height - 80,
  altura: 80,
  largura: 50,
};

window.addEventListener("keydown", function (e) {
  keydown[e.key] = true;
  if (debugar) {
    console.log(e.key);
  }
});

window.addEventListener("keyup", function (e) {
  keydown[e.key] = false;
});

ctx.fillStyle = "rgba(0,100,220,0.1)";
nochao = true;

var MORTE = false;

var forcaPulo = 0;
var gravidade = 0.09;
setInterval(() => {
  y -= forcaPulo;
  forcaPulo -= gravidade;
}, 10);

function criarAvatar() {
  return canvas.getContext("2d");
}

function loopX(inimigo) {
  // Ínicio COLISãO

  // Limites jogador
  let jogadorDireita = x + personagem_width;
  let jogadorEsquerda = x;

  let jogadorCima = y + 25;
  let jogadorBaixo = y - personagem_height;

  // Limites inimigo
  let inimigoDireita = inimigo.x + inimigo.largura;
  let inimigoEsquerda = inimigo.x;

  let inimigoCima = inimigo.y;
  let inimigoBaixo = inimigo.y - inimigo.largura;

  // Colisão X
  let colisaoX =
    jogadorDireita >= inimigoEsquerda && jogadorEsquerda < inimigoDireita;

  // Colisão Y
  let colisaoY = jogadorBaixo <= inimigoCima && jogadorCima > inimigoBaixo;

  jogadorBaixo <= inimigoCima && jogadorBaixo <= inimigoCima;
  if (colisaoX && colisaoY) {
    setTimeout(() => {
      const playerLoser = document.querySelector(".player-loser");
      const playAgain = document.querySelector(".play-again");

      playerLoser.style.display = "block";
      playAgain.addEventListener("click", (e) => {
        location.href = "index.html";
        clearInterval(loopX());
      });
    }, 3000);

    animacao(personagem_dead, "dead");
    keydown = false;
  }

  if (x > inimigo.x) {
    inimigo.direcao = "right";
  } else {
    inimigo.direcao = "left";
  }
  if (inimigo.direcao == "left") {
    inimigo.x -= inimigo.velocidade;
  } else {
    inimigo.x += inimigo.velocidade;
  }
  if (inimigo) {
    inimigo.instancia = criarAvatar();
    inimigo.ativado = true;
  }
  inimigo.instancia.fillRect(inimigo.x, inimigo.y, 50, 80);
}

function pararAnimacao() {
  if (typeof sprite != "undefined") {
    clearInterval(sprite);
  } else {
    return false;
  }
}

function animacao(personagem, tipo) {
  let time = 100;
  pararAnimacao();
  if (tipo == "run") {
    if (troca == 896) {
      troca = 0;
    }
  }

  if (tipo == "dead") {
    if (MORTE) {
      return "Está morto!";
    }
    if (troca == 384) {
      troca = 0;
    }
    MORTE = true;
    time = 500;

    setTimeout(() => {
      ctx.clearRect(0, 0, canvas_width, canvas_height);
      ctx.drawImage(
        personagem,
        0,
        0,
        128,
        128,
        x - 20,
        Math.max(canvas_height - 130, 0),
        128,
        128
      );

      setTimeout(() => {
        ctx.clearRect(0, 0, canvas_width, canvas_height);
        ctx.drawImage(
          personagem,
          128,
          0,
          128,
          128,
          x - 20,
          Math.max(canvas_height - 130, 0),
          128,
          128
        );

        troca += 128;
        setTimeout(() => {
          ctx.clearRect(0, 0, canvas_width, canvas_height);
          ctx.drawImage(
            personagem,
            256,
            0,
            128,
            128,
            x - 20,
            Math.max(canvas_height - 130, 0),
            128,
            128
          );

          setTimeout(() => {
            ctx.clearRect(0, 0, canvas_width, canvas_height);
            ctx.drawImage(
              personagem,
              384,
              0,
              128,
              128,
              x - 20,
              Math.max(canvas_height - 130, 0),
              128,
              128
            );
          }, time + 100);
        }, time);
      }, time);
    }, time);
    troca += 128;
    return 0;
  }

  sprite = setInterval(() => {
    if (troca == 896) {
      troca = 0;
    }

    troca += 128;
    ctx.clearRect(0, 0, canvas_width, canvas_height);
    ctx.drawImage(
      personagem,
      troca,
      0,
      128,
      128,
      x - 20,
      Math.max(canvas_height - 130, 0),
      128,
      128
    );
  }, time);
  run.right = true;
  run.left = true;
}

function pular() {
  forcaPulo = 4.7;
}

function andarNivel() {
  ctx.translate(-canvas_width, 0);
}

var resp;
var run = {
  left: false,
  right: false,
  top: false,
  bottom: false,
};

function desativarTeclas(
  left = false,
  right = false,
  top = false,
  bottom = false
) {
  run.left = left;
  run.right = left;
  run.top = left;
  run.bottom = left;
}

const diretorio =
  "file:///C:/Users/Web%20Front%20End/Documents/GitHub/game_javascript/img/designersAldeia/personagem/";
const personagem_run = new Image();
personagem_run.src = diretorio + "Run.png";

const personagem_jump = new Image();
personagem_jump.src = diretorio + "Jump.png";

const personagem_dead = new Image();
personagem_dead.src = diretorio + "Dead.png";

function animar() {
  // Background;
  function fundo() {
    const backgorund = new Image();
    backgorund.src =
      "file:///C:/Users/Web%20Front%20End/Documents/GitHub/game_javascript/img/designersAldeia/placeholder.png";

    ctx.clearRect(0, 0, canvas_width, canvas_height);
    ctx.fillStyle = "red";
    ctx.drawImage(
      backgorund,
      0,
      0,
      backgorundWidth,
      backgorundHeight,
      0,
      0,
      canvas_width,
      canvas_height
    );
  }

  // Palyer Parado;
  function playerIdle(corte) {
    const playerIdle = new Image();
    playerIdle.src = diretorio + "idle.png";

    const playerIdle_width = 1600;
    const playerIdle_heigth = 200;

    const larguraSprite = playerIdle.width / NumeroDeSprites;
    const alturaSprite = playerIdle.height / NumeroDeSprites;
    const positionX = playerIdle_width * 0;
    const oneSprite = playerIdle_width / 8;
    const NumeroDeSprites = 8;

    ctx.drawImage(
      playerIdle,
      40,
      0,
      playerIdle_width,
      playerIdle_heigth,
      0,
      0,
      canvas_width,
      canvas_height
    );

    let animando = setInterval(() => {
      oneSprite++;
      if (oneSprite > 8) oneSprite = 0;
      positionX = playerIdle * oneSprite;
      ctx.drawImage(
        playerIdle,
        40,
        0,
        playerIdle_width,
        playerIdle_heigth,
        0,
        0,
        canvas_width,
        canvas_height
      );
    });
  }

  fundo();
  playerIdle();

  if (keydown["ArrowRight"]) {
    x = x + 10;
    if (!run.right) {
      ctx.animacao(personagem_run, "run", "right");
      run.right = true;
    }
  }

  if (keydown["ArrowLeft"]) {
    x = x - 10;
    if (!run.left) {
      animacao(personagem_run, "run", "left");
    }
  }

  if (keydown["ArrowUp"]) {
    // Cima
    if (y >= canvas_height - personagem_height) {
      pular();
      if (run.top) {
        animacao(personagem_jump, "jump", "top");
        run.top = true;
      }
    }
  }

  if (keydown["ArrowDown"]) {
    y = y + 10;
    // Baixo
  }
  //colisa canvas
  if (x >= canvas_width - personagem_width) {
    x = canvas_width - personagem_width;
    //andarNivel();
  }

  if (x <= 0) {
    x = 0;
  }

  if (y >= canvas_height - personagem_height) {
    y = canvas_height - personagem_height;
  }

  if (x >= canvas_width / 4 || inimigo1.ativado) {
    loopX(inimigo1);
    loopX(inimigo2);
  }
  requestAnimationFrame(animar);
}

animar();
