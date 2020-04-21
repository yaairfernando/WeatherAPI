import { setBackGround , 
        setSpinner, 
        setDefatulBackground, 
        DOMGetInputValue, 
        DOMDisplayMessage, 
        DOMDisplayWeather,
        DOMClearForm } from './dom';

const fetchData = async (e) => {
  e.preventDefault();
  let location  = DOMGetInputValue('#location');
  if (validateInput(location)) {
    setSpinner();
    try {
      let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=da0d8220f15ccac543248b9fffdbbba7`);
      let data = await response.json()
      console.log(data);
      DOMDisplayWeather(createObject(data));
      fetchBackground(data.weather[0].main);
      // DOMClearForm();
    } catch (error) {
      setDefatulBackground();
      DOMDisplayMessage('City not found.. Try again.', 'danger');
    }
  }
}

const validateInput = (input) => {
  if (!input || input.length < 2) {
    DOMDisplayMessage("Please enter a valid location!", "danger")
    return false;
  }
  return true;
}

const createObject = (obj) => {
  let urlIcon = "http://openweathermap.org/img/w/" + obj.weather[0].icon + ".png";
  let weather = {
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
    sys: obj.sys.country
  }
  return weather;
}

const fetchBackground = async (search) => {
  setTimeout(async () => {
    try {
      let response = await fetch(`https://source.unsplash.com/featured/?${search}`);
      const data = await response.blob();
      setBackGround(data);
    } catch (error) {
      setDefatulBackground();
    }
  },200)
}

export { fetchData, fetchBackground };