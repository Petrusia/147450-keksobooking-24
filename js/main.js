
import {createPointers, createMap} from './create-map.js';
import {postData} from './post-data.js';
import {getData} from './get-data.js';
import './utils/validate-form.js';

createMap(() => {
  getData((adsData) => {
    createPointers(adsData);
  });
});
postData();
