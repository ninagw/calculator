const calculator = document.querySelector(".calculator");
const keys = document.querySelector(".keys-container");
const display = document.querySelector(".display");

keys.addEventListener("click", function (event) {
  if (event.target.matches("button")) {
    const key = event.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNumber = display.textContent;
    const previousKeyType = calculator.dataset.previousKeyType;
    const firstInputValue = calculator.dataset.firstInputValue;
    const operator = calculator.dataset.operator;
    const secondInputValue = displayedNumber;

    // if no action is found it must be a number and shown on display:
    if (!action) {
      if (
        displayedNumber === "0" ||
        previousKeyType === "operator" ||
        previousKeyType === "solve"
      ) {
        display.textContent = keyContent;
      } else {
        display.textContent = displayedNumber + keyContent;
      }
      calculator.dataset.previousKeyType = "number";
    }

    if (
      action === "add" ||
      action === "subtract" ||
      action === "multiply" ||
      action === "divide"
    ) {
      console.log("operator key!");
      key.classList.add("is-active");

      if (
        firstInputValue &&
        operator &&
        previousKeyType !== "operator" &&
        previousKeyType !== "solve"
      ) {
        const calculatedValue = calculate(
          firstInputValue,
          secondInputValue,
          operator
        );
        display.textContent = calculatedValue;
        calculator.dataset.firstInputValue = calculatedValue; //update new calculated value as firstInputValue
      } else {
        calculator.dataset.firstInputValue = displayedNumber; //if there is no calculation, set the displayedNumber as firstInputValue
      }

      calculator.dataset.previousKeyType = "operator"; //add attribute
      calculator.dataset.operator = action;
    }

    if (action === "clear") {
      console.log("clear key!");

      if (key.textContent === "AC") {
        calculator.dataset.firstInputValue = "";
        calculator.dataset.modifiedValue = "";
        calculator.dataset.operator = "";
        calculator.dataset.previousKeyType = "";
      } else {
        key.textContent = "AC";
      }

      display.textContent = "0";
      calculator.dataset.previousKeyType = "clear";
    }

    if (action === "solve") {
      console.log("equal key!");

      //error handling: only calculate if firstInputValue is given and a number pressed
      if (firstInputValue) {
        if (previousKeyType === "solve") {
          firstInputValue = displayedNumber;
          secondInputValue = calculator.dataset.modifiedValue;
        }

        display.textContent = calculate(
          firstInputValue,
          secondInputValue,
          operator
        );
      }

      // reset state for next calculation
      calculator.dataset.firstInputValue = "0";
      calculator.dataset.operator = "";
      calculator.dataset.previousKeyType = "solve";
    }

    // remove .is-active from all keys
    Array.from(key.parentNode.children).forEach((k) =>
      k.classList.remove("is-active")
    );
  }
});

function calculate(num1, num2, operator) {
  let result = "";

  switch (operator) {
    case "add":
      result = parseFloat(num1) + parseFloat(num2); //parseFloat is used to convert the string into a float (a number with decimal places)
      break;
    case "subtract":
      result = parseFloat(num1) - parseFloat(num2);
      break;
    case "multiply":
      result = parseFloat(num1) * parseFloat(num2);
      break;
    case "divide":
      result = parseFloat(num1) / parseFloat(num2);
      break;
    default:
      break;
  }

  return result;
}
