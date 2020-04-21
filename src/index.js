require("babel-polyfill");
import './styles/styles.scss'
import { fetchData, fetchBackground } from './packages/weather';
import { setSpinner } from './packages/dom';

setSpinner();
fetchBackground('cloudy')
