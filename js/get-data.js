import {showErrorMsg} from './utils/show-error-message.js';
const ERROR_MESSAGE = 'Ошибка загрузки данных';
const GET_API_URL = 'https://24.javascript.pages.academy/keksobooking/data';

export const getData = async () => {
  try {
    const res = await fetch(GET_API_URL, {method:'GET', credentials: 'same-origin'});
    if(!res.ok) {throw new Error(ERROR_MESSAGE);}
    return await res.json();
  } catch (err) {
    showErrorMsg(err);
  }
};
