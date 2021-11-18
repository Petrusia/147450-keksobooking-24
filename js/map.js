import { activatePage, deactivatePage } from './utils/forms.js';
import { createPopup } from './utils/create-popup.js';
import {debounce} from './utils/debounce.js';

const AMOUNT = 10;
const DIGITS_AFTER = 5;
const ZOOM = 12;
const ZERO_PRICE = 0;
const MIDDLE_PRICE = 10000;
const HIGH_PRICE = 50000;

const centerTokyo = {
  lat: 35.68488,
  lng: 139.75297,
};

const mainPin = {
  width: 52,
  height: 52,
  src: './img/main-pin.svg',
};

const pin = {
  width: 40,
  height: 40,
  src: './img/pin.svg',
};

const address = document.querySelector('#address');
const resetBtn = document.querySelector('.ad-form__reset');
const mapFilters = document.querySelector('.map__filters');

deactivatePage();

function getPoint(evt) {
  const { lat, lng } = evt.target.getLatLng();
  address.value = `${lat.toFixed(DIGITS_AFTER)}, ${lng.toFixed(DIGITS_AFTER)}`;
}

const mainPinIcon = L.icon({
  iconUrl: mainPin.src,
  iconSize: [mainPin.width, mainPin.height],
  iconAnchor: [mainPin.width / 2, mainPin.height],
});

const mainPinMarker = L.marker(
  {lat: centerTokyo.lat, lng: centerTokyo.lng},
  {draggable: true, icon: mainPinIcon},
);

let mapCanvas;
let markerGroup;

export const createMap = (onLoad) => {
  mapCanvas = L.map('map-canvas')
    .on('load', () => {
      onLoad();
      activatePage();
    }).setView({
      lat: centerTokyo.lat,
      lng: centerTokyo.lng,
    }, ZOOM);
  address.value = `${centerTokyo.lat}, ${centerTokyo.lng}`;
  markerGroup = L.layerGroup().addTo(mapCanvas);
  mainPinMarker.addTo(mapCanvas);
  mainPinMarker.on('move', getPoint);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapCanvas);
};


export const setDefaultMap = () => {
  mainPinMarker.setLatLng({
    lat: centerTokyo.lat,
    lng: centerTokyo.lng,
  });
  mapCanvas.setView({
    lat: centerTokyo.lat,
    lng: centerTokyo.lng,
  }, ZOOM);
  mapCanvas.closePopup();
  address.value = `${centerTokyo.lat}, ${centerTokyo.lng}`;

};
resetBtn.addEventListener('click', () => {
  mapFilters.reset();
  setDefaultMap();
});

const createMarker = (element) => {
  const { lat, lng } = element.location;

  const icon = L.icon({
    iconUrl: pin.src,
    iconSize: [pin.width, pin.width],
    iconAnchor: [pin.width / 2, pin.height],
  });

  return L.marker({ lat, lng }, { icon }).addTo( markerGroup).bindPopup(createPopup(element));
};

const type = mapFilters.querySelector('#housing-type');
const price = mapFilters.querySelector('#housing-price');
const rooms = mapFilters.querySelector('#housing-rooms');
const guests = mapFilters.querySelector('#housing-guests');

const filterByType = ({offer}) => (type.value === 'any' || type.value === offer.type);

const filterByPrice = ({ offer }) => {
  switch (price.value) {
    case 'low':
      return offer.price > ZERO_PRICE && offer.price < MIDDLE_PRICE;
    case 'middle':
      return offer.price >= MIDDLE_PRICE && offer.price <= HIGH_PRICE;
    case 'high':
      return offer.price > HIGH_PRICE;
    default:
      return true;
  }
};

const filterByRooms = ({offer}) => (rooms.value === 'any' || Number(rooms.value) === offer.rooms);

const filterByGuests = ({offer}) => (guests.value === 'any' || Number(guests.value) === offer.guests);
const filterByFeatures = ({offer}) => {
  const features = offer.features || [];
  const featuresChecked = mapFilters.querySelectorAll('.map__checkbox:checked');
  const featuresSelected = Array.from(featuresChecked).map((input) => input.value);
  return featuresSelected.every((element) => features.includes(element));
};

const filteredAdsData = (adsData) => filterByType(adsData) && filterByPrice(adsData) && filterByRooms(adsData) && filterByGuests(adsData) && filterByFeatures(adsData);

export const createPointers = (adsData) => {
  markerGroup.clearLayers();
  adsData.filter(filteredAdsData).slice(0, AMOUNT).forEach((data) => createMarker(data));
  mapFilters.addEventListener('change', debounce(() => createPointers(adsData)));
};

