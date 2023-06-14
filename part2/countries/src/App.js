import { useEffect, useState } from "react";
import countryService from "./services/countries";
import CountryData from "./components/CountryData";
import CountryLanguages from "./components/CountryLanguages";
import CountryFlags from "./components/CountryFlags";
import CountryDetails from "./components/CountryDetails";
import DisplayWeather from "./components/DisplayWeather";

const App = () => {
  const [countryName, setCountryName] = useState("");
  const [countryInfo, setCountryInfo] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState("");

  const filterCountries = (countries, name) => {
    return countries.filter((country) =>
      country.name.common.toLowerCase().includes(name.toLowerCase())
    );
  };

  useEffect(() => {
    if (countryName === "") {
      return;
    }
    countryService.getAll().then((countries) => {
      setCountryInfo(filterCountries(countries, countryName));
    }).catch = (error) => {
      console.error("Error fetching countries ", error);
      setCountryInfo([]);
    };
  }, [countryName]);

  const onNameChange = (event) => {
    const countryToSearch = event.target.value;
    setCountryName(countryToSearch);
  };

  const onViewDetails = (country) => {
    setSelectedCountry(country);
    countryService
      .getWeather(country.latlng[0], country.latlng[1])
      .then((weather) => {
        setWeather(weather);
      });
  };

  return (
    <div>
      find countries <input value={countryName} onChange={onNameChange} />
      {selectedCountry ? (
        <>
          <CountryDetails country={selectedCountry} />
          <CountryLanguages country={selectedCountry} />
          <CountryFlags country={selectedCountry} />
          <DisplayWeather country={selectedCountry} weather={weather} />
        </>
      ) : (
        <CountryData countryInfo={countryInfo} onViewDetails={onViewDetails} />
      )}
    </div>
  );
};

export default App;
