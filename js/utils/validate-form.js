const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const minRoomTypePrice = {
  bungalow: '0',
  flat: '1000',
  hotel: '3000',
  house: '5000',
  palace: '10000',
};

const guestRoomOptions = {
  1: [1],
  2: [1, 2],
  3: [1, 2, 3],
  100: [0],
};

const form = document.querySelector('.ad-form');
const formTitle = form.querySelector('#title');
const formPrice = form.querySelector('#price');
const formType = form.querySelector('#type');
const formRoomNumber = form.querySelector('#room_number');
const formCapacity = form.querySelector('#capacity');
const formTimeIn = form.querySelector('#timein');
const formTimeOut = form.querySelector('#timeout');

formTitle.addEventListener('invalid', () => {
  if (formTitle.validity.valueMissing){
    formTitle.setCustomValidity('Обязательное поле для заполнения');
  }
});

formTitle.addEventListener('input', () => {
  const inputLength = formTitle.value.length;
  if (inputLength < MIN_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Добавьте ${  MIN_TITLE_LENGTH - inputLength } симв.`);
  } else if (inputLength > MAX_TITLE_LENGTH) {
    formTitle.setCustomValidity(`Удалите ${inputLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    formTitle.setCustomValidity('');
  }
  formTitle.reportValidity();
});

formType.addEventListener('change', () => {
  formPrice.min = minRoomTypePrice[formType.value];
  formPrice.placeholder = minRoomTypePrice[formType.value];
});

formPrice.addEventListener('invalid', () => {
  if (formPrice.validity.valueMissing){
    formPrice.setCustomValidity('Обязательное поле для заполнения');
  }
});

formPrice.addEventListener('input', (evt) => {
  const inputValue = evt.target.value;
  const typeValue = minRoomTypePrice[formType.value];

  if (inputValue < typeValue) {
    formPrice.setCustomValidity(`Минимальная цена ${typeValue}`);
  } else if (inputValue > MAX_PRICE) {
    formPrice.setCustomValidity(`Максимальная цена ${MAX_PRICE}`);
  } else {
    formPrice.setCustomValidity('');
  }
  formPrice.reportValidity();
});


const numberOfGuest = () => {
  const availableValues = guestRoomOptions[+formRoomNumber.value];
  Array.from(formCapacity.options).forEach((option) => {
    option.disabled = !availableValues.includes(+option.value);
  });
};

window.addEventListener('load', () => {
  numberOfGuest();
});
formRoomNumber.addEventListener('change', numberOfGuest);

formTimeIn.addEventListener('change', () => {
  formTimeOut.value = formTimeIn.value;
});
formTimeOut.addEventListener('change', () => {
  formTimeIn.value = formTimeOut.value;
});
