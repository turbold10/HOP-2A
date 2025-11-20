const startGameButton = document.getElementById("start-button");
const playerScore = document.getElementById("score"); //<span id="score">0</span>

let gameSecond = 5;
let previousHoleId = null;
let gameInterval = null;
let timeInterval = null;

function setupGame() {
  const gameContainer = document.getElementById("game-container");

  for (let i = 0; i < 9; i++) {
    const hole = document.createElement("div");
    hole.classList.add("hole");
    hole.id = i.toString();

    const mole = document.createElement("div");
    mole.classList.add("mole");
    mole.style.display = "none";

    mole.addEventListener("click", function () {
      playerScore.innerText = Number(playerScore.innerText) + 1;
    });

    hole.appendChild(mole);

    gameContainer.appendChild(hole);
  }
}

function showRandomMole() {
  hidePreviousMole();

  const randomNumber = Math.floor(Math.random() * 9);
  console.log(randomNumber, "random hiisen too!!");

  const randomHole = document.getElementById(randomNumber);
  const randomMole = randomHole.querySelector(".mole");
  randomMole.style.display = "block";
  previousHoleId = randomNumber;
}

function hidePreviousMole() {
  if (previousHoleId !== null) {
    const previousHole = document.getElementById(previousHoleId);
    const previousMole = previousHole.querySelector(".mole");
    previousMole.style.display = "none";
  }
}

function timer() {
  gameSecond = gameSecond - 1;
  const timerElement = document.getElementById("timer"); //<span id="timer">30 sec</span>
  timerElement.innerHTML = `${gameSecond} sec`;

  if (gameSecond <= 0) {
    clearInterval(timeInterval);
    clearInterval(gameInterval);
    const lastMolesHole = document.getElementById(previousHoleId);
    lastMolesHole.querySelector(".mole").style.display = "none";

    const playerTotalScore = document.getElementById("score");
    alert(`Tanii niit avsan onoo ${playerTotalScore.innerHTML}`);
  }
}

function restartGame() {
  for (let i = 0; i < 9; i++) {
    const hole = document.getElementById(i);
    const mole = hole.querySelector(".mole");
    mole.style.display = "none";
  }

  clearInterval(timeInterval);
  clearInterval(gameInterval);

  gameSecond = 5;
  const timerElement = document.getElementById("timer"); //<span id="timer">30 sec</span>

  timerElement.innerHTML = `${5} sec`;
  playerScore.innerHTML = "0";
}

startGameButton.addEventListener("click", function () {
  restartGame();
  showRandomMole();
  gameInterval = setInterval(showRandomMole, 1000);
  timeInterval = setInterval(timer, 1000);
});

window.onload = setupGame;
