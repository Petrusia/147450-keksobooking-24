import {setDefaultMap} from './map.js';
const ERROR_SHOW_TIME = 3000;
const POST_API_URL = 'https://24.javascript.pages.academy/keksobooking';
const body = document.querySelector('body');
const adForm = document.querySelector('.ad-form');
const successTemplate = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorTemplate = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const mapFilters = document.querySelector('.map__filters');

const isEscKey = (evt) => evt.key === 'Escape' || evt.key === 'Esc' ;

const renderMessageTemplate = (element) => {
  body.appendChild(element);
  document.addEventListener('keydown',(evt) => {
    if (isEscKey(evt)) {
      element.remove();
    }
  });
  element.addEventListener('click', () => {
    element.remove();
  });
  setTimeout(() => {
    element.remove();
  }, ERROR_SHOW_TIME);

};

export const postData = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    fetch( POST_API_URL, { method: 'POST', body: formData })
      .then((response) => {
        if (response.ok) {
          renderMessageTemplate(successTemplate);
          adForm.reset();
          mapFilters.reset();
          setDefaultMap();
        } else {
          renderMessageTemplate(errorTemplate);
        }
      })
      .catch(() => {
        renderMessageTemplate(errorTemplate);
      });
  });
};
