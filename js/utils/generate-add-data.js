import { AVATARS, TITLES, PRICE_MIN, PRICE_MAX, TYPES, ROOMS_MIN, ROOMS_MAX, GUESTS_MIN, GUESTS_MAX, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTIONS, PHOTOS, LATITUDE_FROM, LATITUDE_TO, LONGITUDE_FROM, LONGITUDE_TO,  DIGITS_AFTER} from './data.js';

import {getRandomPositiveFloat} from './get-random-positive-float.js';
import {getRandomPositiveInteger} from './get-random-positive-integer.js';

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
const getRangeRandomArrayElements = (elements) => elements.slice(0, getRandomPositiveInteger(1, elements.length - 1));

const getAuthor = () => (
  {
    avatar: getRandomArrayElement(AVATARS),
  }
);

const getLocation = () => (
  {
    lat: getRandomPositiveFloat(LATITUDE_FROM, LATITUDE_TO, DIGITS_AFTER),
    lng: getRandomPositiveFloat(LONGITUDE_FROM, LONGITUDE_TO, DIGITS_AFTER),
  }
);

const getOffer = () => (
  {
    title:getRandomArrayElement(TITLES),
    address: getLocation(),
    price: getRandomPositiveInteger(PRICE_MIN, PRICE_MAX),
    type: getRandomArrayElement(TYPES),
    rooms: getRandomPositiveInteger(ROOMS_MIN, ROOMS_MAX),
    guests: getRandomPositiveInteger(GUESTS_MIN, GUESTS_MAX),
    checkin: getRandomArrayElement(CHECKINS),
    checkout: getRandomArrayElement(CHECKOUTS),
    features: getRangeRandomArrayElements(FEATURES),
    description: getRandomArrayElement(DESCRIPTIONS),
    photos: getRangeRandomArrayElements(PHOTOS),
  }
);

const createAddData = () => (
  {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation(),
  }
);

export const generateAdsData = (adsNumber) => Array.from({length: adsNumber}, createAddData);
