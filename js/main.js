import {getData} from './get-data.js';
import {createMap} from './map.js';
import {postData} from './post-data.js';
import './utils/validate-form.js';

const AMOUNT = 10;

getData().then((data) => createMap(data.slice(0, AMOUNT)));
postData();
