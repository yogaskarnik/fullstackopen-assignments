const CountryDetails = ({ country }) => {
  if (!country) {
    return null;
  }

  return (
    <div>
      <h2>{country.name?.common}</h2>
      {country.capital && <p>capital {country.capital}</p>}
      {country.area && <p>area {country.area}</p>}
    </div>
  );
};

export default CountryDetails;
