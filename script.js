function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) {
    if (b === 0) return "Nice try (no /0)";
    return a / b;
}

function operate(op, a, b) {
    a = Number(a);
    b = Number(b);

    switch (op) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "*": return multiply(a, b);
        case "/": return divide(a, b);
    }
}

let firstNumber = null;
let currentOperator = null;
let displayValue = "0";
let shouldResetDisplay = false;

function updateDisplay() {
    document.getElementById("display").value = displayValue;
}

function inputNumber(num) {
    if (displayValue === "0" || shouldResetDisplay) {
        displayValue = num;
        shouldResetDisplay = false;
    } else {
        displayValue += num;
    }
    updateDisplay();
}

function inputDecimal() {
    if (shouldResetDisplay) {
        displayValue = "0.";
        shouldResetDisplay = false;
        updateDisplay();
        return;
    }

    if (!displayValue.includes(".")) {
        displayValue += ".";
    }

    updateDisplay();
}

function setOperator(op) {
    if (shouldResetDisplay && currentOperator !== null) {
        currentOperator = op;
        return;
    }

    if (currentOperator !== null) {
        calculate();
    }

    firstNumber = displayValue;
    currentOperator = op;
    shouldResetDisplay = true;
}

function calculate() {
    if (currentOperator === null || firstNumber === null) return;

    let secondNumber = displayValue;

    let result = operate(currentOperator, firstNumber, secondNumber);

    if (typeof result === "string") {
        displayValue = result;
        updateDisplay();
        resetCalculator();
        return;
    }

    result = Math.round(result * 100000) / 100000;

    displayValue = result.toString();

    firstNumber = displayValue;
    currentOperator = null;
    shouldResetDisplay = true;

    updateDisplay();
}

function clearCalculator() {
    displayValue = "0";
    firstNumber = null;
    currentOperator = null;
    shouldResetDisplay = false;
    updateDisplay();
}

function resetCalculator() {
    firstNumber = null;
    currentOperator = null;
    shouldResetDisplay = true;
}

function backspace() {
    if (shouldResetDisplay) return;

    if (displayValue.length === 1) {
        displayValue = "0";
    } else {
        displayValue = displayValue.slice(0, -1);
    }

    updateDisplay();
}

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (!isNaN(key)) inputNumber(key);

    if (key === ".") inputDecimal();

    if (["+", "-", "*", "/"].includes(key)) setOperator(key);

    if (key === "Enter" || key === "=") calculate();

    if (key === "Backspace") backspace();

    if (key.toLowerCase() === "c") clearCalculator();
});

updateDisplay();