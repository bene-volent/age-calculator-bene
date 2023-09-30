const form = document.querySelector(".form");
const date = form.querySelector("#dateInput");
const month = form.querySelector("#monthInput");
const year = form.querySelector("#yearInput");

const dateResult = document.querySelector(".result[data-result-type='date'] .result-value" )
const monthResult = document.querySelector(".result[data-result-type='month'] .result-value" )
const yearResult = document.querySelector(".result[data-result-type='year'] .result-value" )

year.setAttribute('max', new Date().getFullYear())



let inputDebounce = undefined;

function isValidDate(date, month, year) {
  if (date === 31 && ![1, 3, 5, 7, 8, 10, 12].some(value => month === value)) {
    return false
  }
  if (month === 2 && date === 29 && !checkLeapYear(year)) {
    return false
  }

  return true
}

function checkLeapYear(year) {

  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
}


function addInputValidationFunction(inputElement) {
  inputElement.addEventListener("input", (event) => {
    if (inputDebounce) clearTimeout(inputDebounce);

    inputDebounce = setTimeout(() => {
      let inputValue = parseInt(inputElement.value);
      let inputMaxValue = parseInt(inputElement.getAttribute("max"));
      let inputMinValue = parseInt(inputElement.getAttribute("min"));

      inputElement.addEventListener("input", (event) => {
        if (inputDebounce) clearTimeout(inputDebounce);

        inputDebounce = setTimeout(() => {
          let inputValue = parseInt(inputElement.value);
          let inputBox = inputElement.closest(".inputBox");

          if (inputElement.value.length === 0) {
            inputBox.dataset.error = true;
            inputBox.querySelector(
              ".inputBox-error-container"
            ).dataset.errorType = 1;
            return;
          }

          if (inputValue > inputMaxValue || inputValue < inputMinValue) {
            inputBox.dataset.error = true;
            inputBox.querySelector(
              ".inputBox-error-container"
            ).dataset.errorType = 2;
          } else {
            inputBox.dataset.error = false;
            inputBox.querySelector(
              ".inputBox-error-container"
            ).dataset.errorType = 0;
          }
        }, 250);
      });
    });
  });
}

addInputValidationFunction(date)
addInputValidationFunction(month)
addInputValidationFunction(year)

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let dateValue = parseInt(date.value)
  let monthValue = parseInt(month.value)
  let yearValue = parseInt(year.value)

  if (!isValidDate(dateValue, monthValue, yearValue)) {
    form.dataset.error = true
    date.closest(".inputBox").dataset.error = true
    month.closest(".inputBox").dataset.error = true
    year.closest(".inputBox").dataset.error = true
  }
  else {
    form.dataset.error = false
    date.closest(".inputBox").dataset.error = false
    month.closest(".inputBox").dataset.error = false
    year.closest(".inputBox").dataset.error = false
  }

  let givenDate = new Date(yearValue, monthValue - 1, dateValue)
  let currentDate = new Date()
  let age_year = currentDate.getFullYear() - givenDate.getFullYear()
  let age_month = age_day = 0;

  if (currentDate < new Date(currentDate.getFullYear(), monthValue - 1, dateValue)) {
    age_year = age_year - 1;
    age_mouth = currentDate.getMonth() + 1;
    age_day = currentDate.getDate();
  } else {
    if (currentDate.getMonth() + 1 === monthValue) {
      age_month = 0;
      age_day = currentDate.getDate() - dateValue;
    } else {
      age_month = currentDate.getMonth() + 1 - monthValue;
      if (currentDate.getDate() < dateValue) {
        age_month = age_month - 1;
        age_day = currentDate.getDate() + new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate() - dateValue;
      } else {
        age_day = currentDate.getDate() - dateValue;
      }
    }
  }

  dateResult.textContent = age_day
  monthResult.textContent = age_month
  yearResult.textContent = age_year

});
