const CountryLanguages = ({ countryInfo }) => {
  return (
    <div>
      {Object.values(countryInfo).length > 0 ? (
        <>
          <h3>languages</h3>
          <ul>
            {Object.values(countryInfo.languages || {}).map((lang, key) => (
              <li key={key}>{lang}</li>
            ))}
          </ul>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default CountryLanguages;
