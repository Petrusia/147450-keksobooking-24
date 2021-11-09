
import {generateAdsData} from './utils/generate-add-data.js';
import {createPopup} from './utils/create-popup.js';
import {deactivatePage, activatePage} from './utils/forms';

const ADS_NUMBER = 10;
const adsData = generateAdsData(ADS_NUMBER);

const popup = createPopup(adsData[0]);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(popup);

deactivatePage();
activatePage();

