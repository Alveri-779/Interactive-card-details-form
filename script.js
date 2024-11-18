const nameInput = document.getElementById('name');
const userName = document.getElementById('user-name');
const num = document.getElementById('num');
const cardNumInput = document.getElementById('card-num');
const monthInput = document.getElementById('expiry-month');
const yearInput = document.getElementById('expiry-year');
const month = document.querySelector('.month');
const year = document.querySelector('.year');
const cvcInput = document.getElementById('cvc');
const backNum = document.querySelector('.back-num');
const cvcError = document.getElementById('cvc-error');
const monthYearError = document.querySelector('.month-year-error');
const nameError = document.querySelector('.name-error');
const numError = document.querySelector('.num-error');
const confirmBtn = document.getElementById('confirm-btn');
const rightContainer = document.getElementById('right-container');

function emptyCheck(element, msg, msgBorder) {
  if (element.value === '') {
    msg.style.display = "block";
    msg.innerHTML = "Can't be blank";
    element.classList.add(msgBorder);
    hasError = true;
  } else if ((cardNumInput.value).length < 16) {
    numError.innerHTML = "Card number can't be less than 16 characters.";
    numError.style.display = "block";
    cardNumInput.classList.add('num-border');
    hasError = true;
  } else if ((cvcInput.value).length < 3) {
    cvcError.innerHTML = "Cvc can't be less than 3."
    cvcError.style.display = "block";
    cvcInput.classList.add('cvc-border');
    hasError = true;
  }
}

function numLength() {
  if ((cvcInput.value).length < 3) {
    cvcError.innerHTML = "Cvc can't be less than 3."
    cvcError.style.display = "block";
    cvcInput.classList.add('cvc-border');
    hasError = true;
  }
}

let hasError = false;
const template = "0000 0000 0000 0000";
const cvcTemplate = "000";
const monthYear = "00";

function resetState() {
  nameInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;
    if (/[0-9]/.test(inputValue) || /[+\-*/]/.test(inputValue)) {
      nameError.style.display = 'block';
      nameError.innerHTML = "Wrong Format, Can only contain letters";
      nameInput.classList.add('name-border');
      hasError = true;
    } else {
      nameError.style.display = "none";
      nameInput.classList.remove('name-border');
      hasError = false;
    }
    userName.textContent = event.target.value || 'Jane Appleseed';
  });

  cardNumInput.addEventListener('input', (event) => {
    const inputValue = event.target.value.replace(/(.{4})/g, '$1 ').trim();
  
    if (/[^\d\s]/g.test(inputValue)) {
      numError.innerHTML = "Numbers only";
      numError.style.display = "block";
      cardNumInput.classList.add('num-border');
      hasError = true;
    } else {
      numError.style.display = "none";
      cardNumInput.classList.remove('num-border');
      hasError = false;
    }
  
    let updatedNumber = template.split('');
    for(let i = 0; i < inputValue.length; i++) {
      updatedNumber[i] = inputValue[i];
    }
    num.textContent = updatedNumber.join('');
  });

  monthInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;
  
    if (/\D/.test(inputValue)) {
      monthYearError.innerHTML = "Numbers only";
      monthYearError.style.display = "block";
      monthInput.classList.add('monthError');
      hasError = true;
    } else if (inputValue < 1) {
      monthYearError.innerHTML = "Month can't be less than 1";
      monthYearError.style.display = "block";
      monthInput.classList.add('monthError');
      hasError = true;
    } else if (inputValue > 12) {
      monthYearError.innerHTML = "Only 12 months in a year";
      monthYearError.style.display = "block";
      monthInput.classList.add('monthError');
      hasError = true;
    } else {
      monthYearError.style.display = "none";
      monthInput.classList.remove('monthError');
      hasError = false
    }
  
    let updatedNumber = monthYear.split('');
    let inputIndex = inputValue.length - 1;
    for (let i = updatedNumber.length - 1; i >= 0 && inputIndex >= 0; i--) {
      if (updatedNumber[i] === '0') {
        updatedNumber[i] = inputValue[inputIndex];
        inputIndex--;
      }
    }
    month.textContent = updatedNumber.join('');
  });

  yearInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;
  
    if (/\D/.test(inputValue)) {
      monthYearError.innerHTML = "Numbers only";
      monthYearError.style.display = "block";
      yearInput.classList.add('yearError');
      hasError = true;
    } else {
      monthYearError.style.display = "none";
      yearInput.classList.remove('yearError');
      hasError = false;
    }
  
    let updatedNumber = monthYear.split('');
    let inputIndex = inputValue.length - 1;
    for (let i = updatedNumber.length - 1; i >= 0 && inputIndex >= 0; i--) {
      if (updatedNumber[i] === '0') {
        updatedNumber[i] = inputValue[inputIndex];
        inputIndex--;
      }
    }
    year.textContent = updatedNumber.join('');
  });

  cvcInput.addEventListener('input', (event) => {
    const inputValue = event.target.value;
  
    if (/\D/.test(inputValue)) {
      cvcError.innerHTML = "Numbers only"
      cvcError.style.display = "block";
      cvcInput.classList.add('cvc-border');
      hasError = true;
    } else if (inputValue === '') {
      backNum.textContent = "000"
    } else {
      cvcError.style.display = "none";
      cvcInput.classList.remove('cvc-border')
      hasError = false;
    }
     
    let updatedNumber = cvcTemplate.split('');
    for (let i = 0; i < inputValue.length; i++) {
      updatedNumber[i] = inputValue[i];
      backNum.textContent = updatedNumber.join('');
    }
  });
}

resetState();

function emptyCheckGp() {
  emptyCheck(nameInput, nameError, 'name-border');
  emptyCheck(cardNumInput, numError, 'num-border');
  emptyCheck(monthInput, monthYearError, 'monthError');
  emptyCheck(yearInput, monthYearError, 'yearError');
  emptyCheck(cvcInput, cvcError, 'cvc-border');
}

function reset() {
  nameInput.value = '';
  cardNumInput.value = '';
  monthInput.value = '';
  yearInput.value = '';
  cvcInput.value = '';

  userName.textContent = 'Jane Appleseed';
  num.textContent = template;
  month.textContent = '00';
  year.textContent = '00';
  backNum.textContent = '000';

  nameError.style.display = 'none';
  numError.style.display = 'none';
  monthYearError.style.display = 'none';
  cvcError.style.display = 'none';
  nameInput.classList.remove('name-border');
  cardNumInput.classList.remove('num-border');
  monthInput.classList.remove('monthError');
  yearInput.classList.remove('yearError');
  cvcInput.classList.remove('cvc-border');

  resetState();
}

const originalHTML = rightContainer.innerHTML;

confirmBtn.addEventListener('click', (event) => {
  event.preventDefault();

  emptyCheckGp();
  numLength();

  if (hasError) {
    console.log("there is an error");
    return
  }
  rightContainer.innerHTML = `
    <div class="check-mark">
      <svg width="80" height="80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="40" cy="40" r="40" fill="url(#a)"/><path d="M28 39.92 36.08 48l16-16" stroke="#fff" stroke-width="3"/><defs><linearGradient id="a" x1="-23.014" y1="11.507" x2="0" y2="91.507" gradientUnits="userSpaceOnUse"><stop stop-color="#6348FE"/><stop offset="1" stop-color="#610595"/></linearGradient></defs></svg>
    </div>
    <p class="ty-header">Thank you!</p>
    <p class="ty-msg">We've added your card details</p>
    <button id="reset-btn" class="confirm-btn">Confirm</button>
  `;
})