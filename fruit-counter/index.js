const fruitInput = document.querySelector("#fruit-input");
const addFruitButton = document.getElementsByClassName("add-fruit-button")[0];
const fruits = document.querySelector(".fruits");
const diffrentFruitCount = document.getElementById("different-fruit-count");
const totalFruitCountSpan = document.getElementById("total-fruit-count");

let fruitCount = diffrentFruitCount.innerText;
let totalFruitCount = totalFruitCountSpan.innerText;

function addFruit() {
  const newFruit = document.createElement("div");
  const fruitValue = fruitInput.value;

  newFruit.innerHTML = `${fruitValue} <span>count</span> <span id="fruit-amount">1</span> <button id="add-fruit-amount">add</button>`;
  fruits.appendChild(newFruit);

  fruitCount = Number(fruitCount) + 1;
  diffrentFruitCount.innerText = fruitCount;
  totalFruitCountSpan.innerText = fruitCount;

  const addFruitAmountButton = newFruit.querySelector("#add-fruit-amount");

  addFruitAmountButton.addEventListener("click", function () {
    let totalFruitCount = totalFruitCountSpan.innerText;
    const fruitAmountSpan = newFruit.querySelector("#fruit-amount");
    let fruitAmount = fruitAmountSpan.innerText;

    fruitAmount = Number(fruitAmount) + 1;
    fruitAmountSpan.innerText = fruitAmount;
    totalFruitCountSpan.innerText = Number(totalFruitCount) + 1;
  });
}

addFruitButton.addEventListener("click", addFruit);
