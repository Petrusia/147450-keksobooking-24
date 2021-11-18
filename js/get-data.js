import {showErrorMsg} from './utils/show-error-message.js';
const ERROR_MESSAGE = 'Ошибка загрузки данных';
const GET_API_URL = 'https://24.javascript.pages.academy/keksobooking/data';

export const getData = (onSuccess) => {
  fetch(
    GET_API_URL,
    {
      method: 'GET',
    },
  )
    .then((res) => {
      if (!res.ok) {
        throw new Error(ERROR_MESSAGE);
      }
      return res.json();
    })
    .then((data) => onSuccess(data))
    .catch((err) => {
      showErrorMsg(err);
    });
};
