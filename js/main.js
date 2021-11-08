import {generateAddData} from './utils/generate-add-data';
import {createPopup} from './utils/create-ads';

const ADS_NUMBER = 10;
const adsData = Array.from({length: ADS_NUMBER}, generateAddData);
const popup = createPopup(adsData[0]);
const mapCanvas = document.querySelector('#map-canvas');
mapCanvas.appendChild(popup);


