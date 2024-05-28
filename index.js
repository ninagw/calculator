const number1 = document.querySelector('[data-js="number1"]');
const number2 = document.querySelector('[data-js="number2"]');
const number3 = document.querySelector('[data-js="number3"]');
const number4 = document.querySelector('[data-js="number4"]');
const number5 = document.querySelector('[data-js="number5"]');
const number6 = document.querySelector('[data-js="number6"]');
const number7 = document.querySelector('[data-js="number7"]');
const number8 = document.querySelector('[data-js="number8"]');
const number9 = document.querySelector('[data-js="number9"]');

function add(num1, num2) {
  return num1 + num2;
}

const numbersOfCalculator =
  document.querySelectorAll(".number-container").length;

for (let i = 0; i < numbersOfCalculator; i++) {
  document
    .querySelectorAll(".number-container")
    [i].addEventListener("click", function () {
      alert("I got clicked!");
    });
}

function calculator(num1, num2, operator) {
  return operator(num1, num2);
}
