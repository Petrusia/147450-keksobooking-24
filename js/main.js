import { generateAdsData } from './utils/generate-add-data.js';
import {createMap} from './map.js';
import './utils/validate-form.js';

const AMOUNT = 10;
const adsData = generateAdsData(AMOUNT);
createMap(adsData);
