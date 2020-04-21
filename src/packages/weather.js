import {
  setBackGround,
  setSpinner,
  setDefatulBackground,
  DOMGetInputValue,
  DOMDisplayMessage,
  DOMDisplayWeather,
  DOMChangeTemp,
  DOMGetElement,
} from './dom';


let Initialtemp;

const validateInput = (input) => {
  if (!input || input.length < 2) {
    DOMDisplayMessage('Please enter a valid location!', 'danger');
    return false;
  }
  return true;
};

const createObject = (obj) => {
  const urlIcon = `http://openweathermap.org/img/w/${obj.weather[0].icon}.png`;
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
  Initialtemp = weather.temp;
  return weather;
};

const fetchBackground = async (search) => {
  setTimeout(async () => {
    try {
      const response = await fetch(`https://source.unsplash.com/featured/?${search}`);
      const data = await response.blob();
      setBackGround(data);
    } catch (error) {
      setDefatulBackground();
    }
  }, 200);
};

const fetchData = async (e) => {
  e.preventDefault();
  const location = DOMGetInputValue('#location');
  if (validateInput(location)) {
    setSpinner();
    try {
      const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=da0d8220f15ccac543248b9fffdbbba7`);
      const data = await response.json();
      DOMDisplayWeather(createObject(data));
      fetchBackground(data.weather[0].main);
      DOMGetElement('#form').reset();
    } catch (error) {
      setDefatulBackground();
      DOMDisplayMessage('City not found.. Try again.', 'danger');
    }
  }
};

const toggleTemp = (e) => {
  if (e.target.getAttribute('id') === 'celsius') {
    DOMChangeTemp(Initialtemp, e.target);
  } else {
    DOMChangeTemp(((Initialtemp * (9 / 5)) + 32), e.target);
  }
};


export { fetchData, fetchBackground, toggleTemp };