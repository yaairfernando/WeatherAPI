const fetchData = async (location) => {
  let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&APPID=da0d8220f15ccac543248b9fffdbbba7`);
  let data = await response.json()
  createObject(data);
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
  console.log(weather);
}

export default fetchData;