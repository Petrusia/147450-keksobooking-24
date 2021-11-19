import { showErrorMsg } from './utils/show-error-message.js';

const FILE_TYPES = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];
const DEFAULT_AVATAR = 'img/muffin-grey.svg';
const ERROR_MESSAGE = 'У вас неподдерживаемый формат файла. Выберите png, jpeg или gif файлы.';

const avatarInput = document.querySelector('.ad-form-header__input');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoInput = document.querySelector('.ad-form__input');
const photosPreview = document.querySelector('.ad-form__photo');

const setAvatarPreview = () => {
  const file = avatarInput.files[0];
  const matches = FILE_TYPES.includes(file.type);

  if (matches) {
    avatarPreview.src = URL.createObjectURL(file);
  } else {
    showErrorMsg(ERROR_MESSAGE);
  }
};

const setPhotoPreview = () => {
  const file = photoInput.files[0];
  const matches = FILE_TYPES.includes(file.type);
  if (matches) {
    const img = new Image(70,  70);
    img.style.border = '1px solid orange';
    img.style.borderRadius = '7px';
    img.src = URL.createObjectURL(file);
    photosPreview.appendChild(img);
  } else {
    showErrorMsg(ERROR_MESSAGE);
  }
};


const setAllPreviews = () => {
  avatarInput.addEventListener('change', setAvatarPreview);
  photoInput.addEventListener('change', setPhotoPreview);
};

const clearAvatarPreview = () => {
  avatarInput.value = '';
  avatarPreview.src = DEFAULT_AVATAR;
};

const clearPhotosPreview = () => {
  const img =  photosPreview.querySelector('img');
  photosPreview.src = DEFAULT_AVATAR;
  if (img) {
    img.remove();
  }
};

const clearPreviews = () => {
  clearAvatarPreview();
  clearPhotosPreview();
};

export {
  setAllPreviews,
  clearPreviews
};
