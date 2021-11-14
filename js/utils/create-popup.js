const OFFER_TYPES = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getOfferType = (type) => OFFER_TYPES[type];

const getOfferRooms = (rooms) => {
  if (rooms > 4) {return `${rooms} комнат`;}
  if (rooms > 1) {return  `${rooms} комнаты`;}
  return '1 комната';
};

const getOfferGuests = (guests) => guests === 1 ? '1 гостя' : `${guests} гостей`;

const getAdsFeatures = (features) => {
  const featuresFragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const featureItem = document.createElement('li');
    featureItem.classList.add('popup__feature', `popup__feature--${feature}`);
    featuresFragment.appendChild(featureItem);
  });
  return featuresFragment;
};

const getAdsPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();
  photos.forEach((photo) => {
    const image = document.createElement('img');
    image.src = photo;
    image.alt = 'Фотография жилья';
    image.width = 45;
    image.height = 40;
    image.classList.add('popup__photo');
    photosFragment.appendChild(image);
  });
  return photosFragment;
};

export const createPopup = (adsData) => {
  const adsElementFragment = document.createDocumentFragment();
  const adsElement = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  adsElement.querySelector('.popup__avatar').src = adsData.author.avatar;
  adsElement.querySelector('.popup__title').textContent = adsData.offer.title;
  adsElement.querySelector('.popup__text--address').textContent = `${adsData.location.lat.toFixed(5)}, ${adsData.location.lng.toFixed(5)}`;
  adsElement.querySelector('.popup__text--price').textContent = `${adsData.offer.price} ₽/ночь`;
  adsElement.querySelector('.popup__type').textContent = getOfferType(adsData.offer.type);
  adsElement.querySelector('.popup__text--capacity').textContent = `${getOfferRooms(adsData.offer.rooms)} для ${getOfferGuests(adsData.offer.guests)}`;
  adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${adsData.offer.checkin}, выезд до ${adsData.offer.checkout}`;
  const featuresContainer = adsElement.querySelector('.popup__features');
  featuresContainer.innerHTML = '';
  featuresContainer.appendChild(getAdsFeatures(adsData.offer.features));
  adsElement.querySelector('.popup__description').textContent = adsData.offer.description;
  const photosContainer = adsElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  photosContainer.appendChild(getAdsPhotos(adsData.offer.photos));
  for (let index = 1; index < adsElement.children.length; index++) {
    if (!adsElement.children[index].innerHTML) {
      adsElement.children[index].remove();
    }
  }
  return adsElementFragment.appendChild(adsElement);
};
