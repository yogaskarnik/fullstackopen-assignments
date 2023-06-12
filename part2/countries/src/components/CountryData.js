const CountryData = ({ countryInfo }) => {
  return (
    <div>
      {Object.keys(countryInfo).length > 0 ? (
        <>
          <h1>{countryInfo.name?.common}</h1>
          <p>capital {countryInfo.capital}</p>
          <p>area {countryInfo.area}</p>
        </>
      ) : (
        <p>No country found</p>
      )}
    </div>
  );
};

export default CountryData;
