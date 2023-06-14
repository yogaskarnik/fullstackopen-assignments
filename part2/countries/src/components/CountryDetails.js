const CountryDetails = ({ country }) => {
  if (!country) {
    return null;
  }

  return (
    <div>
      <h2>{country.name?.common}</h2>
      {country.capital && <p>Capital: {country.capital}</p>}
      {country.area && <p>Area: {country.area} km²</p>}
    </div>
  );
};

export default CountryDetails;
