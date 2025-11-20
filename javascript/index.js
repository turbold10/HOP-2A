const calculateButton = document.getElementById("calculate");

function calculate() {
  const num1 = Number(document.getElementById("input1").value);
  const num2 = Number(document.getElementById("input2").value);
  const operator = document.getElementById("operator").value;
  const resultElement = document.getElementById("result");

  let result;

  if (operator === "+") {
    result = num1 + num2;
  } else if (operator === "-") {
    result = num1 - num2;
  } else if (operator === "*") {
    result = num1 * num2;
  } else if (operator === "/") {
    result = num1 / num2;
  }

  resultElement.textContent = `Result: ${result}`;
}

calculateButton.addEventListener("click", calculate);
