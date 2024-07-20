// script.js
document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    const clearButton = document.getElementById('clear');
    const equalButton = document.getElementById('equal');
  
    let currentInput = '0';
    let firstOperand = null;
    let operator = null;
    let shouldResetDisplay = false;
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');
  
        if (button.classList.contains('operator')) {
          handleOperator(value);
        } else {
          handleNumber(value);
        }
      });
    });
  
    clearButton.addEventListener('click', clearDisplay);
    equalButton.addEventListener('click', calculateResult);
  
    function handleNumber(value) {
      if (currentInput === '0' || shouldResetDisplay) {
        currentInput = value;
        shouldResetDisplay = false;
      } else {
        currentInput += value;
      }
      updateDisplay();
    }
  
    function handleOperator(value) {
      if (operator !== null && !shouldResetDisplay) {
        calculateResult();
      }
      firstOperand = currentInput;
      operator = value;
      shouldResetDisplay = true;
    }
  
    function calculateResult() {
      if (operator === null || shouldResetDisplay) return;
  
      const secondOperand = currentInput;
      currentInput = String(operate(firstOperand, secondOperand, operator));
      operator = null;
      shouldResetDisplay = true;
      updateDisplay();
    }
  
    function operate(a, b, operator) {
      a = parseFloat(a);
      b = parseFloat(b);
  
      switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return b;
      }
    }
  
    function clearDisplay() {
      currentInput = '0';
      firstOperand = null;
      operator = null;
      shouldResetDisplay = false;
      updateDisplay();
    }
  
    function updateDisplay() {
      display.textContent = currentInput;
    }
  });
  