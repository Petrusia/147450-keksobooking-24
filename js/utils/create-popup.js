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

export const createPopup = ({author, location, offer}) => {
  const adsElement = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  adsElement.querySelector('.popup__avatar').src = author.avatar;
  adsElement.querySelector('.popup__title').textContent = offer.title;
  adsElement.querySelector('.popup__text--address').textContent = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
  adsElement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  adsElement.querySelector('.popup__type').textContent = getOfferType(offer.type);
  adsElement.querySelector('.popup__text--capacity').textContent = `${getOfferRooms(offer.rooms)} для ${getOfferGuests(offer.guests)}`;
  adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const popupFeatures = adsElement.querySelector('.popup__features');

  if(!offer.features) {
    popupFeatures.remove();
  }else {
    offer.features.forEach((element) => {
      const feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${element}`);
      popupFeatures.append(feature);
    });
  }

  const popupPhotos = adsElement.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');

  if(!offer.photos) {
    popupPhotos.remove();
  } else {
    offer.photos.forEach((photoSrc, index) => {
      if(index === 0){
        popupPhoto.src = offer.photos[0];
      } else {
        const popupPhotoItem = popupPhoto.cloneNode(true);
        popupPhotoItem.src = photoSrc;
        popupPhotos.appendChild(popupPhotoItem);
      }
    });
  }
  return adsElement;
};

