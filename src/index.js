import './styles/styles.scss';
import { fetchBackground } from './packages/weather';
import { setSpinner } from './packages/dom';

require('babel-polyfill');

setSpinner();
fetchBackground('cloudy');
