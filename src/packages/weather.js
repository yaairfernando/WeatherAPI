import {
  setBackGround,
  setSpinner,
  setDefatulBackground,
  DOMGetInputValue,
  DOMDisplayMessage,
  DOMDisplayWeather,
  DOMGetElement,
  addListener,
} from './dom';

const validateInput = (input) => {
  if (!input || input.length < 2) {
    DOMDisplayMessage('Please enter a valid location!', 'danger');
    return false;
  }
  return true;
};

const createObject = (obj) => {
  const urlIcon = `https://openweathermap.org/img/w/${obj.weather[0].icon}.png`;
  const weather = {
    name: obj.name,
    lon: obj.coord.lon,
    lat: obj.coord.lat,
    icon: urlIcon,
    temp: obj.main.temp,
    min: obj.main.temp_min,
    max: obj.main.temp_max,
    pressure: obj.main.pressure,
    humidity: obj.main.humidity,
    speed: obj.wind.speed,
    sys: obj.sys.country,
  };
  return weather;
};

const fetchBackground = async (search) => {
  setTimeout(async () => {
    try {
      const response = await fetch(
        `https://source.unsplash.com/featured/?${search}`,
      );
      const data = await response.blob();
      setBackGround(data);
    } catch (error) {
      setDefatulBackground();
    }
  }, 200);
};

const updateData = async (units = 'metric', loc = '') => {
  setSpinner();
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${loc}&units=${units}&APPID=da0d8220f15ccac543248b9fffdbbba7`,
    );
    const data = await response.json();
    DOMDisplayWeather(createObject(data));
    fetchBackground(data.weather[0].main);
    DOMGetElement('#form').reset();
    addListener('#fahrenheit', updateData, { units: 'imperial', loc: data.name });
    addListener('#celsius', updateData, { units: 'metric', loc: data.name });
  } catch (error) {
    setDefatulBackground();
    DOMGetElement('#form').reset();
    DOMDisplayMessage('City not found.. Try again.', 'danger');
  }
};

const addListeners = (loc) => {
  addListener('#fahrenheit', updateData, { units: 'imperial', loc });
  addListener('#celsius', updateData, { units: 'metric', loc });
};

const makeRequest = async (units, location) => {
  setSpinner();
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=da0d8220f15ccac543248b9fffdbbba7`,
    );
    const data = await response.json();
    DOMDisplayWeather(createObject(data));
    fetchBackground(data.weather[0].main);
    DOMGetElement('#form').reset();
    addListeners(data.name);
  } catch (error) {
    setDefatulBackground();
    DOMGetElement('#form').reset();
    DOMDisplayMessage('City not found.. Try again.', 'danger');
  }
};


const fetchData = async (e, units = 'metric') => {
  e.preventDefault();
  const location = DOMGetInputValue('#location');
  if (validateInput(location)) {
    makeRequest(units, location);
  }
};


export { fetchData, fetchBackground };
