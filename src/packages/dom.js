import { fetchData, toggleTemp } from "./weather";

let container = document.querySelector('#container')

const setBackGround = (background) => {
  container.style.background = `url("${window.URL.createObjectURL(background)}") top/cover`
  container.classList.add('after');
  DOMGetElement('.fa-spinner').remove();
  if (!DOMGetElement('#form')) {
    displayForm();
  }
}

const DOMDisplayMessage = (msg, type) => {
  let error = `
    <div class="${type} msg">
      <span>${msg}</span>
    </div>
  `
  container.insertAdjacentHTML("beforeend", error);
  DOMDismisMessage();
}

const DOMDismisMessage = () => {
  setTimeout(() => {
    DOMGetElement('.msg').remove();
  }, 3000);
}

const DOMGetElement = (selector) => {
  return document.querySelector(selector);
}

const setSpinner = () => {
  container.insertAdjacentHTML("beforeend", '<i class="fas fa-spinner"></i>');
}

const displayForm = () => {
  let form = `
  <form id="form">
    <h2>Find the weather of your city!!</h2>
    <div class="form-group">
      <input type="text" placeholder="Enter Location" id="location">
      <input type="submit" value="Search">
    </div>
  </form>
  `
  container.innerHTML = form
  document.querySelector('#form').addEventListener('submit', (e) => fetchData(e))
}

const DOMGetInputValue = (selector) => {
  return document.querySelector(selector).value
}

const setDefatulBackground = () => {
  container.classList.add('default');
  container.classList.add('after');
  container.innerHTML = ''
  displayForm();
}

const DOMClearForm = () => {
  DOMGetElement('.form').reset();
}

const DOMChangeTemp = (temp, target) => {
  DOMGetElement('.tempNum span').innerHTML = temp;
  DOMGetElement('.active').classList.remove('active');
  target.classList.add('active');
}

const DOMDisplayWeather = (weather) => {
  if (DOMGetElement('.weather')) {
    DOMGetElement('.weather').remove();
  }
  let div = `
  <div class="weather">
    <h1 class="title">${weather.name}</h1>
    <div class="content">
      <div class="right">
        <span>LON: ${weather.lon}</span>
        <span>LAT: ${weather.lat}</span>
        <span>PRESSURE: ${weather.pressure}</span>
        <span>HUMIDITY: ${weather.humidity}</span>
      </div>
      <div class="left">
        <span>MIN: ${weather.min}</span>
        <span>MAX: ${weather.max}</span>
        <span>SPEED: ${weather.speed}</span>
      </div>
    </div>
    <div class="icon">
      <img src="${weather.icon}" alt="Icon">
    </div>
    <div class="temp">
      <div class="btns">
        <a href="#" id="fahrenheit">F°</a>
        <a href="#" class="active" id="celsius">C°</a>
      </div>
      <div class="tempNum">
        <span>${weather.temp}</span>
      </div>
    </div>
  </div>
  `
  container.insertAdjacentHTML("beforeend", div);
  document.querySelector('#fahrenheit').addEventListener('click', (e) => toggleTemp(e))
  document.querySelector('#celsius').addEventListener('click', (e) => toggleTemp(e))
}


export { setBackGround, 
          setSpinner, 
          setDefatulBackground, 
          displayForm, 
          DOMGetInputValue, 
          DOMDisplayMessage, 
          DOMDisplayWeather,
          DOMClearForm,
          DOMChangeTemp,
          DOMGetElement }