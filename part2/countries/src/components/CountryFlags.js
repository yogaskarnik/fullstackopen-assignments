const CountryFlags = ({ countryInfo }) => {
  return (
    <div>
      {Object.keys(countryInfo).length > 0 ? (
        <>
          <p>
            <img src={countryInfo.flags.png} alt={countryInfo.flags.alt} />;
          </p>
        </>
      ) : (
        ""
      )}
    </div>
  );
};
export default CountryFlags;
