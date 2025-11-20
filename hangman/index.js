const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const lettersDiv = document.getElementById("letters");
const word = document.getElementById("word");
const failCountSpan = document.getElementById("fail-count");
const hangmanImg = document.getElementById("img");
const loserModal = document.getElementById("lose");
const winModal = document.getElementById("win");
const restartButton = document.getElementById("loser-restart");
const randomWords = ["Hello", "Tur", "HOP coding"];
const randomNumber = Math.floor(Math.random() * randomWords.length);
const randomWord = randomWords[randomNumber];
const clickedLetters = [];
let failCount = 0;

for (let i = 0; i < alphabet.length; i++) {
  const button = document.createElement("button");
  button.innerHTML = alphabet[i];
  button.addEventListener("click", function () {
    button.disabled = true;
    clickedLetters.push(alphabet[i].toLowerCase());
    displayWord();
    console.log(clickedLetters);
    if (
      randomWord.toLowerCase().includes(alphabet[i].toLowerCase()) === false
    ) {
      failCount = failCount + 1;
      failCountSpan.innerHTML = failCount;
      hangmanImg.src = `./${failCount}.jpg`;
    }
    isLose();
    isWin();
  });
  lettersDiv.appendChild(button);
}

function displayWord() {
  let display = "";
  for (let i = 0; i < randomWord.length; i++) {
    if (
      randomWord[i] === " " ||
      clickedLetters.includes(randomWord[i].toLowerCase())
    ) {
      display = display + randomWord[i];
    } else {
      display = display + "_";
    }
  }
  word.innerHTML = display;
}

function isLose() {
  if (failCount === 7) {
    loserModal.style.visibility = "visible";
  }
}

function isWin() {
  if (word.innerHTML.toLowerCase() === randomWord.toLowerCase()) {
    winModal.style.visibility = "visible";
  }
}

function restartGame() {
  window.location.reload();
}

restartButton.addEventListener("click", function () {
  restartGame();
});

displayWord();
