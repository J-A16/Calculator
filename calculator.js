let firstNumber = 0;
let operator;
let operatorSet = false;
let justAttemptedToCalculate = false;
let justPressedEqualSign = false;
const display = document.querySelector('.display');

function getDisplayText() {
    return display.innerText;
}

function backspace() {

    displayText = getDisplayText()

    if (!isNaN(displayText) && displayText.length > 1) {
        display.innerText = displayText.substring(0, displayText.length - 1);
    }

    if (!isNaN(displayText) && displayText.length === 1) {
        display.innerText = 0;
    }
}

function resetCalculator() {
    firstNumber = 0;
    operatorSet = false;
    justAttemptedToCalculate = false;
    justPressedEqualSign = false;
    display.innerText = 0;
}

function setOperator(buttonText) {
    if (justPressedEqualSign) {
        operatorSet = false;
        justPressedEqualSign = false;
    }

    attemptToCalculate();

    displayText = getDisplayText()
    if (!isNaN(displayText)) {
        firstNumber = parseFloat(displayText);
    }

    operator = buttonText;
    display.innerText = buttonText;
    operatorSet = true;

}

function attemptToCalculate() {
    displayText = getDisplayText()
    if (operatorSet && !isNaN(displayText)) {
        switch (operator) {
            case "/":
                display.innerText = firstNumber / parseFloat(displayText);
                break;
            case "*":
                display.innerText = firstNumber * parseFloat(displayText);
                break;
            case "-":
                display.innerText = firstNumber - parseFloat(displayText);
                break;
            case "+":
                display.innerText = firstNumber + parseFloat(displayText);
                break;
        }
    }

    justAttemptedToCalculate = true;
}

function sendNumberToDisplay(num) {
    displayText = getDisplayText()

    if (justAttemptedToCalculate || displayText === "0") {
        display.innerText = num;
        if (justPressedEqualSign) {
            operatorSet = false;
            justPressedEqualSign = false;
        }
    } else {
        display.innerText += num;
    }

    justAttemptedToCalculate = false;
}

document.querySelector('.calculator').addEventListener('click', function (event) {
    if (event.target.tagName === "BUTTON") {
        buttonText = event.target.innerText;
        if (!isNaN(buttonText)) {
            sendNumberToDisplay(buttonText);
        } else {
            switch (buttonText) {
                case "<--":
                    backspace();
                    break;
                case "C":
                    resetCalculator();
                    break;
                case "=":
                    justPressedEqualSign = true;
                    attemptToCalculate();
                    break;
                default:
                    setOperator(buttonText);
            }
        }
    }
});