const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");

let currentValue = "";
let previousValue = "";
let operator = null;

buttons.forEach(button => {
button.addEventListener("click", () => {
    const value = button.textContent;

    if (!isNaN(value) || value === ".") {
    appendNumber(value);
    }
    else if (value === "AC") {
    clearAll();
    }
    else if (value === "DEL") {
    deleteLast();
    }
    else if (value === "=") {
    calculate();
    }
    else {
    chooseOperator(value);
    }
});
});

function appendNumber(number) {
if (number === "." && currentValue.includes(".")) return;
currentValue += number;
updateDisplay(currentValue);
}

function chooseOperator(op) {
if (currentValue === "") return;
if (previousValue !== "") {
    calculate();
}
operator = op;
previousValue = currentValue;
currentValue = "";
}

function calculate() {
if (previousValue === "" || currentValue === "") return;

let result;
const prev = parseFloat(previousValue);
const curr = parseFloat(currentValue);

switch (operator) {
    case "+":
    result = prev + curr;
    break;
    case "−":
    result = prev - curr;
    break;
    case "×":
      result = prev * curr;
    break;
    case "÷":
    if (curr === 0) {
        alert("Cannot divide by zero");
        clearAll();
        return;
    }
    result = prev / curr;
    break;
    default:
    return;
}

currentValue = result.toString();
operator = null;
previousValue = "";
updateDisplay(currentValue);
}

function clearAll() {
currentValue = "";
previousValue = "";
operator = null;
updateDisplay("0");
}

function deleteLast() {
currentValue = currentValue.slice(0, -1);
updateDisplay(currentValue || "0");
}

function updateDisplay(value) {
display.textContent = value;
}
