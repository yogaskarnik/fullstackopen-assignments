const CountryFlags = ({ country }) => {
  if (!country) {
    return null;
  }

  return (
    <div>
      <h3>Flags</h3>
      <p>
        <img src={country.flags.png} alt={country.flags.alt} />
      </p>
    </div>
  );
};
export default CountryFlags;
