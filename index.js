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
    let firstInputValue = calculator.dataset.firstInputValue;
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

      key.classList.add("is-active");
      calculator.dataset.previousKeyType = "operator"; //add attribute
      calculator.dataset.operator = action;
    }

    if (action === "clear") {
      console.log("clear key!");

      if (key.textContent === "AC") {
        calculator.dataset.firstInputValue = "";
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
      // let firstInputValue = calculator.dataset.firstInputValue;
      // const operator = calculator.dataset.operator;
      // const secondInputValue = displayedNumber;

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

      // calculator.dataset.modifiedValue = secondValue; //set modifiedValue attribute
      // calculator.dataset.previousKeyType = "solve";
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

  // if (operator === "add") {
  //   result = n1 + n2;
  // } else if (operator === "subtract") {
  //   result = n1 - n2;
  // } else if (operator === "multiply") {
  //   result = n1 * n2;
  // } else if (operator === "divide") {
  //   result = n1 / n2;
  // }
  return result;
}

// const number1 = document.querySelector('[data-js="number1"]');
// const number2 = document.querySelector('[data-js="number2"]');
// const number3 = document.querySelector('[data-js="number3"]');
// const number4 = document.querySelector('[data-js="number4"]');
// const number5 = document.querySelector('[data-js="number5"]');
// const number6 = document.querySelector('[data-js="number6"]');
// const number7 = document.querySelector('[data-js="number7"]');
// const number8 = document.querySelector('[data-js="number8"]');
// const number9 = document.querySelector('[data-js="number9"]');
// const addOperator = document.querySelector('[data-js="add"]');

// // number1.addEventListener("click", function () {
// //   return console.log("1");
// // });

// // number2.addEventListener("click", function () {
// //   return console.log("2");
// // });

// // function add(num1, num2) {
// //   return num1 + num2;
// // }

// const numbersOfCalculator =
//   document.querySelectorAll(".number-container").length;

// for (let i = 0; i < numbersOfCalculator; i++) {
//   document
//     .querySelectorAll(".number-container")
//     [i].addEventListener("click", function () {
//       const buttonInnerHTML = this.innerHTML;
//       // console.log(buttonInnerHTML);

//       switch (buttonInnerHTML) {
//         case number1:
//           // const one = document.createElement("p");
//           // one.append(display);
//           display.textContent = "1";
//           break;

//         default:
//           break;
//       }
//     });
// }

// // function calculator(num1, num2, operator) {
// //   return operator(num1, num2);
// // }
