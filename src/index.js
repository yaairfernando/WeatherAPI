import './styles/styles.scss';
import { fetchBackground, fetchData } from './packages/weather';
import { setSpinner } from './packages/dom';

require('babel-polyfill');

setSpinner();
fetchBackground('cloudy');
setTimeout(() => {
  document
    .querySelector('#form')
    .addEventListener('submit', (e) => fetchData(e));
}, 2000);
