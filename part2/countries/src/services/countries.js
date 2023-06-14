import axios from "axios";

const basURL = "https://studies.cs.helsinki.fi/restcountries/api/all";
const weatherAPI = "https://api.openweathermap.org/data/2.5/weather/";
const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

const getAll = () => {
  const request = axios.get(basURL);
  return request.then((response) => response.data);
};

const getWeather = (latitude, longitude) => {
  const request = axios.get(
    `${weatherAPI}/?lat=${latitude}&lon=${longitude}&units=metric&appid=${WEATHER_API_KEY}`
  );
  return request.then((response) => response.data);
};

export default { getAll, getWeather };
