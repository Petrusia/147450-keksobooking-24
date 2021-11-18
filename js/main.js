
import {createPointers, createMap} from './create-map.js';
import {postData} from './post-data.js';
import {getData} from './get-data.js';
import './utils/validate-form.js';
import {setAllPreviews} from './preview-img.js';

createMap(() => {
  getData((adsData) => {
    createPointers(adsData);
  });
});
postData();
setAllPreviews();
