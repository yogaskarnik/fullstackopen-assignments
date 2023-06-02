const Total = (props) => {
  const sum = props.total.reduce((accumulator, object) => {
    return accumulator + object.excercises;
  }, 0);
  return (
    <div>
      <h4>total of {sum} excercises</h4>
    </div>
  );
};

export default Total;
