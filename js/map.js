import { activatePage, deactivatePage } from './utils/forms.js';
import { createPopup } from './utils/create-popup.js';


const DIGITS_AFTER = 5;
const ZOOM = 12;

const centerTokyo = {
  lat: 35.68488,
  lng: 139.75297,
};

const mainPin = {
  width: 52,
  height: 52,
  src: '../img/main-pin.svg',
};

const pin = {
  width: 40,
  height: 40,
  src: '../img/pin.svg',
};

const address = document.querySelector('#address');
const resetBtn = document.querySelector('.ad-form__reset');


deactivatePage();

const mapCanvas = L.map('map-canvas')
  .on('load', () => {activatePage();})
  .setView({
    lat: centerTokyo.lat,
    lng: centerTokyo.lng,
  }, ZOOM);

L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',{attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}).addTo(mapCanvas);

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

mainPinMarker.addTo(mapCanvas);
mainPinMarker.on('move', getPoint);

const setDefaultMap = () => {
  mainPinMarker.setLatLng({
    lat: centerTokyo.lat,
    lng: centerTokyo.lng,
  });
  mapCanvas.setView({
    lat: centerTokyo.lat,
    lng: centerTokyo.lng,
  }, ZOOM);

};
resetBtn.addEventListener('click', setDefaultMap);

const createMarker = (element) => {
  const { lat, lng } = element.location;

  const icon = L.icon({
    iconUrl: pin.src,
    iconSize: [pin.width, pin.width],
    iconAnchor: [pin.width / 2, pin.height],
  });

  L.marker({ lat, lng }, { icon }).addTo(mapCanvas).bindPopup(createPopup(element));
};

export const createMap = (adsData) => adsData.forEach(createMarker);
