import {createAdd} from './utils/create-add';

const ADS_NUMBER = 10;

const similarAds = Array.from({length: ADS_NUMBER}, createAdd);

console.log(similarAds);
