const CountryData = ({ countryInfo, onViewDetails }) => {
  if (countryInfo.length === 0) {
    return null;
  }

  return (
    <div>
      {countryInfo.map((country, index) => (
        <div key={index}>
          <p>
            {country.name?.common}
            <button onClick={() => onViewDetails(country)}>show</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default CountryData;
