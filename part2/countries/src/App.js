import { useEffect, useState } from "react";
import countryService from "./services/countries";
import CountryData from "./components/CountryData";
import CountryLanguages from "./components/CountryLanguages";
import CountryFlags from "./components/CountryFlags";

const App = () => {
  const [countryName, setCountryName] = useState("");
  const [countryInfo, setCountryInfo] = useState({});

  useEffect(() => {
    countryService.getAll().then((countries) => {
      const filteredCountries = countries.filter(
        (country) => country.name.common === countryName
      );
      if (filteredCountries.length > 0) {
        setCountryInfo(filteredCountries[0]);
      } else {
        setCountryInfo({});
      }
    });
  }, [countryName]);

  const onNameChange = (event) => {
    const countryToSearch = event.target.value;
    setCountryName(event.target.value);
    console.log("countryToSearch ", countryToSearch);
  };

  return (
    <div>
      find countries <input value={countryName} onChange={onNameChange} />
      <CountryData countryInfo={countryInfo} />
      <CountryLanguages countryInfo={countryInfo} />
      <CountryFlags countryInfo={countryInfo} />
    </div>
  );
};

export default App;
