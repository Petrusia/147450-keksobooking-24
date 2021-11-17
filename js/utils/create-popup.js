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

export const createPopup = (adsData) => {
  const adsElement = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  adsElement.querySelector('.popup__avatar').src = adsData.author.avatar;
  adsElement.querySelector('.popup__title').textContent = adsData.offer.title;
  adsElement.querySelector('.popup__text--address').textContent = `${adsData.location.lat.toFixed(5)}, ${adsData.location.lng.toFixed(5)}`;
  adsElement.querySelector('.popup__text--price').textContent = `${adsData.offer.price} ₽/ночь`;
  adsElement.querySelector('.popup__type').textContent = getOfferType(adsData.offer.type);
  adsElement.querySelector('.popup__text--capacity').textContent = `${getOfferRooms(adsData.offer.rooms)} для ${getOfferGuests(adsData.offer.guests)}`;
  adsElement.querySelector('.popup__text--time').textContent = `Заезд после ${adsData.offer.checkin}, выезд до ${adsData.offer.checkout}`;

  const popupFeatures = adsElement.querySelector('.popup__features');

  if(!adsData.offer.features) {
    popupFeatures.remove();
  }else {
    adsData.offer.features.forEach((element) => {
      const feature = document.createElement('li');
      feature.classList.add('popup__feature', `popup__feature--${element}`);
      popupFeatures.append(feature);
    });
  }

  const popupPhotos = adsElement.querySelector('.popup__photos');
  const popupPhoto = popupPhotos.querySelector('.popup__photo');

  if(!adsData.offer.photos) {
    popupPhotos.remove();
  } else {
    adsData.offer.photos.forEach((photoSrc, index) => {
      if(index === 0){
        popupPhoto.src = adsData.offer.photos[0];
      } else {
        const popupPhotoItem = popupPhoto.cloneNode(true);
        popupPhotoItem.src = photoSrc;
        popupPhotos.appendChild(popupPhotoItem);
      }
    });
  }
  return adsElement;
};

