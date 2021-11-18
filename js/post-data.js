import {resetMap} from './map.js';
const POST_API_URL = 'https://24.javascript.pages.academy/keksobooking';
const body = document.querySelector('body');
const adForm = document.querySelector('.ad-form');
const mapFilters = document.querySelector('.map__filters');

const renderMessageTemplate = (messageId) => {

  const messageTemplate = document.querySelector(`#${messageId}`).content;
  const messageElement = messageTemplate.firstElementChild.cloneNode(true);
  const onEscPress = (evt) => {
    if (evt.key === 'Escape') {
      messageElement.remove();
      window.removeEventListener('keydown', onEscPress);
    }
  };
  const onMessagePress = () => {
    messageElement.remove();
    window.removeEventListener('keydown', onEscPress);
  };
  messageElement.addEventListener('click', onMessagePress);
  window.addEventListener('keydown', onEscPress);
  body.appendChild(messageElement);
};

export const postData = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    fetch( POST_API_URL, { method: 'POST', body: formData })
      .then((response) => {
        if (response.ok) {
          renderMessageTemplate('success');
          adForm.reset();
          mapFilters.reset();
          resetMap();
        } else {
          renderMessageTemplate('error');
        }
      })
      .catch(() => {
        renderMessageTemplate('error');
      });
  });
};
