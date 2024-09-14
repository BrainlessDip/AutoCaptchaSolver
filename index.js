window.onload = function() {
  const tdElement = document.querySelectorAll('td.footer_text')[1];
  if (tdElement) {
    tdElement.innerHTML = 'Automatic CAPTCHA Filling Extension by <a href="https://github.com/BrainlessDip">Brainless Dip</a>';
  }
  const equationRegex = /^\d+\s*[\+\-\*\/]\s*\d+$/;
  function parseExpression(expr) {
    const [left, operator, right] = expr.match(/(\d+)\s*([+\-*/])\s*(\d+)/).slice(1);
    const num1 = parseFloat(left);
    const num2 = parseFloat(right);
    switch (operator) {
      case '+': return num1 + num2;
      case '-': return num1 - num2;
      case '*': return num1 * num2;
      case '/': return num1 / num2;
      default: throw new Error('Unsupported operator');
    }
  }
  document.querySelectorAll('td').forEach(td => {
    const text = td.textContent.trim();
    if (equationRegex.test(text)) {
      try {
        const result = parseExpression(text);
        console.log(`Solved equation: ${text} = ${result}`);
        const valueInput = document.getElementById('value_s');
        if (valueInput) {
          valueInput.value = result;
        }
      } catch (e) {
        console.error(`Error evaluating: ${text}`, e);
      }
    }
  });
};