let moveSpeed = 3, gravity = 0.5;
let witch = document.querySelector('.witch');
let img = document.getElementById('witch-1');
let soundPoint = new Audio('./assets/sounds/point.mp3');
let soundDie = new Audio('./assets/sounds/die.mp3');
let sound = new Audio('./assets/sounds/sound.mp3');

let witchProps = witch.getBoundingClientRect();

let background = document.querySelector('.background').getBoundingClientRect();

let scoreVal = document.querySelector('.score_val');
let message = document.querySelector('.message');
let scoreTitle = document.querySelector('.score_title');

let gameState = 'Start';

img.style.display = 'none';
message.classList.add('messageStyle');

document.addEventListener('keydown', (e) => {
  if (e.key == 'Enter' && gameState != 'Play') {
    document.querySelectorAll('.pipe_sprite').forEach((e) => {
      e.remove();
    });

    img.style.display = 'block';
    witch.style.top = '40vh';
    gameState = 'Play';
    message.innerHTML = '';
    scoreTitle.innerHTML = 'Score : ';
    scoreVal.innerHTML = '0';
    message.classList.remove('messageStyle');
    play();
  }
});

function play() {
  function move() {
    if (gameState != 'Play') return;

    let pipeSprite = document.querySelectorAll('.pipe_sprite');

    pipeSprite.forEach((element) => {
      let pipeSpriteProps = element.getBoundingClientRect();
      witchProps = witch.getBoundingClientRect();

      if (pipeSpriteProps.right <= 0) {
        element.remove();
      } else {
        if (witchProps.left < pipeSpriteProps.left + pipeSpriteProps.width && witchProps.left + witchProps.width > pipeSpriteProps.left && witchProps.top < pipeSpriteProps.top + pipeSpriteProps.height && witchProps.top + witchProps.height > pipeSpriteProps.top) {
          gameState = 'End';
          message.innerHTML = 'Game Over'.fontcolor('#ff5100') + '<br>Press Enter To Restart';
          message.classList.add('messageStyle');
          img.style.display = 'none';
          soundDie.play();
          return
        } else {
          if (pipeSpriteProps.right < witchProps.left && pipeSpriteProps.right + moveSpeed >= witchProps.left && element.increase_score == '1') {
            scoreVal.innerHTML =+ scoreVal.innerHTML + 1;
            soundPoint.play();
          }
          element.style.left = pipeSpriteProps.left - moveSpeed + 'px';
        }
      }
      sound.play();
    });
    requestAnimationFrame(move);
  }
  requestAnimationFrame(move);

  let witchDy = 0;
  function applyGravity() {
    if (gameState != 'Play') return;
    witchDy = witchDy + gravity;
    document.addEventListener('keydown', (e) => {
      if (e.key == 'ArrowUp' || e.key == ' ') {
        img.src = './assets/img/witch-1.png';
        witchDy = -7.6;
      }
    });

    document.addEventListener('keyup', (e) => {
      if (e.key == 'ArrowUp' || e.key == ' ') {
        img.src = './assets/img/witch-2.png';
      }
    });

    if (witchProps.top <= 0 || witchProps.bottom >= background.bottom) {
      gameState = 'End';
      message.style.left = '28vw';
      window.location.reload();
      message.classList.remove('messageStyle');
      return;
    }
    witch.style.top = witchProps.top + witchDy + 'px';
    witchProps = witch.getBoundingClientRect();
    requestAnimationFrame(applyGravity);
  }
  requestAnimationFrame(applyGravity);

  let pipeSeparation = 0;
  let pipeGap = 35;

  function createPipe () {
    if (gameState != 'Play') return;

    if (pipeSeparation > 115) {
      pipeSeparation = 0;

      let pipePosi = Math.floor(Math.random() * 43) + 8;
      let pipeSpriteInv = document.createElement('div');

      pipeSpriteInv.className = 'pipe_sprite';
      pipeSpriteInv.style.top = pipePosi - 70 + 'vh';
      pipeSpriteInv.style.left = '100vw';

      document.body.appendChild(pipeSpriteInv);

      let pipeSprite = document.createElement('div');

      pipeSprite.className = 'pipe_sprite';
      pipeSprite.style.top = pipePosi + pipeGap + 'vh';
      pipeSprite.style.left = '100vw';
      pipeSprite.increase_score = '1';

      document.body.appendChild(pipeSprite);
    }
    pipeSeparation++;
    requestAnimationFrame(createPipe);
  }
  requestAnimationFrame(createPipe);
}