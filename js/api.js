import {showErrorMsg} from './utils/show-error-message.js';
const ERROR_MESSAGE = 'Ошибка загрузки данных';
const API_URL = 'https://24.javascript.pages.academy/keksobooking/data';

export const getData = async () => {
  try {
    const res = await fetch(API_URL, {method:'GET', credentials: 'same-origin'});
    if(!res.ok) {throw new Error(ERROR_MESSAGE);}
    return await res.json();
  } catch (err) {
    showErrorMsg(err);
  }
};

// export const  postData =  (onSuccess, onFail, data) => {
//   fetch(API_URL,{method: 'POST',  body: data})
//     .then((res)=> {
//       if(res.ok) {
//         onSuccess();
//       } else {
//         onFail();
//       }
//     })
//     .catch(() => {
//       onFail();
//     });
// };

const sendData = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://24.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          appendInBody(success);
          resetForm();
        } else {
          appendInBody(error);
        }
      })
      .catch(() => {
        appendInBody(error);
      });
  });
};

// const success = document.querySelector('#success').content.querySelector('.success');
// const error = document.querySelector('#error').content.querySelector('.error');
// const body = document.querySelector('body');
// const successClone = success.cloneNode(true); // Клонированные элементы успеха
// const errorClone = error.cloneNode(true); // Клонированные элементы ошибки
