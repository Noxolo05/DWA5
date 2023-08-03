// scripts.js

const form = document.querySelector("[data-form]");
const result = document.querySelector("[data-result]");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const entries = new FormData(event.target);
  const { dividend, divider } = Object.fromEntries(entries);

  if (isNaN(dividend) || isNaN(divider)) {
    handleCriticalError("Something critical went wrong. Please reload the page");
    return;
  }

  if (divider.trim() === "" || dividend.trim() === "") {
    handleValidationError("Division not performed. Both values are required in inputs. Try again");
    return;
  }

  const dividendValue = parseInt(dividend);
  const dividerValue = parseInt(divider);

  if (dividerValue === 0) {
    handleValidationError("Division not performed. Cannot divide by zero. Try again");
    return;
  }

  if (!Number.isSafeInteger(dividendValue) || !Number.isSafeInteger(dividerValue)) {
    handleValidationError("Division not performed. Invalid number provided. Try again");
    return;
  }

  const divisionResult = dividendValue / dividerValue;

  if (!Number.isInteger(divisionResult)) {
    result.innerText = Math.floor(divisionResult);
  } else {
    result.innerText = divisionResult;
  }
});

function handleValidationError(errorMessage) {
  result.innerText = errorMessage;
  console.error(errorMessage);
}

function handleCriticalError(errorMessage) {
  result.innerText = errorMessage;
  console.error(errorMessage);
  console.trace(); // Log the call stack to the console for critical errors.
}