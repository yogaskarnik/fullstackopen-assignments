const FilterView = ({ value, onSearchChange }) => {
  return (
    <div>
      filter shown with
      <input value={value} onChange={onSearchChange} />
    </div>
  );
};

export default FilterView;
