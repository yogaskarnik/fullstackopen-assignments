const CountryLanguages = ({ country }) => {
  if (!country) {
    return null;
  }

  return (
    <div>
      <h3>Languages</h3>
      <ul>
        {Object.values(country.languages || {}).map((language, key) => (
          <li key={key}>{language}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountryLanguages;
