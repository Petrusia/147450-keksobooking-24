import { AVATARS, TITLES, PRICE_MIN, PRICE_MAX, TYPES, ROOMS_MIN, ROOMS_MAX, GUESTS_MIN, GUESTS_MAX, CHECKINS, CHECKOUTS, FEATURES, DESCRIPTIONS, PHOTOS, LATITUDE_FROM, LATITUDE_TO, LONGITUDE_FROM, LONGITUDE_TO,  DIGITS_AFTER} from './ads-fake-data';

import {getRandomPositiveFloat} from './get-random-positive-float';
import {getRandomPositiveInteger} from './get-random-positive-integer';

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
const getRangeRandomArrayElements = (elements) => elements.slice(0, getRandomArrayElement(elements));

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

export const createAdd = () => (
  {
    author: getAuthor(),
    offer: getOffer(),
    location: getLocation(),
  }
);
