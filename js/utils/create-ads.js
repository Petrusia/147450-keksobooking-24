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

export const createPopup = ({offer}) => {
  const adsElementFragment = document.createDocumentFragment();
  const adsElement = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  adsElement.querySelector('.popup__title').textContent = offer.title;
  adsElement.querySelector('.popup__text--address').textContent = offer.address;
  adsElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adsElement.querySelector('.popup__type').textContent = getOfferType(offer.type);
  adsElement.querySelector('.popup__text--capacity').textContent = `${getOfferRooms(offer.rooms)} для ${getOfferGuests(offer.guests)}`;
  adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;
  const featuresContainer = adsElement.querySelector('.popup__features');
  featuresContainer.innerHTML = '';
  featuresContainer.appendChild(getAdsFeatures(offer.features));
  adsElement.querySelector('.popup__description').textContent = offer.description;
  const photosContainer = adsElement.querySelector('.popup__photos');
  photosContainer.innerHTML = '';
  photosContainer.appendChild(getAdsPhotos(offer.photos));
  for (let index = 0; index < adsElement.children.length; index++) {
    if (!adsElement.children[index].innerHTML) {
      adsElement.children[index].remove();
    }
  }
  return adsElementFragment.appendChild(adsElement);
};
