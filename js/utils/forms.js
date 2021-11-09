const mapFilters = document.querySelector('.map__filters');
const adForm = document.querySelector('.ad-form');

const disableForm = (form, className) => {
  form.classList.add(`${className}--disabled`);
  Array.from(form.children).forEach((element) => element.disabled = true);
};

const enableForm = (form, className) => {
  form.classList.remove(`${className}--disabled`);
  Array.from(form.children).forEach((element) => element.disabled = false);
};

export const deactivatePage = () => {
  disableForm(adForm, 'ad-form');
  disableForm(mapFilters, 'map__filters');
};

export const activatePage = () => {
  enableForm(adForm, 'ad-form');
  enableForm(mapFilters, 'map__filters');
};
