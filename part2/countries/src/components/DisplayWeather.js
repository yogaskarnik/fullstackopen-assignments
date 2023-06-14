const DisplayWeather = ({ country, weather }) => {
  if (weather.length === 0) {
    return null;
  }
  const icon = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
  return (
    <div>
      <h3>Weather in {country.capital}</h3>
      <p>temperature {weather.main.temp} Celsius</p>
      <img src={icon} alt={weather.description} />
      <p>wind {weather.wind.speed} m/s</p>
    </div>
  );
};
export default DisplayWeather;
