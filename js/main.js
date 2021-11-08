
import {generateAdsData} from './utils/generate-add-data';
import {createPopup} from './utils/create-popup';

const ADS_NUMBER = 10;
const adsData = generateAdsData(ADS_NUMBER);
const popup = createPopup(adsData[0]);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(popup);


