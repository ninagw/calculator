const numbersOfCalculator =
  document.querySelectorAll(".number-container").length;

for (let i = 0; i < numbersOfCalculator; i++) {
  document
    .querySelectorAll(".number-container")
    [i].addEventListener("click", function () {
      alert("I got clicked!");
    });
}
