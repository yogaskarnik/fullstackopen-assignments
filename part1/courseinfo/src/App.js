const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part1} {props.excercises1}
      {props.part2} {props.excercises2}
      {props.part3} {props.excercises3}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part part1={props.part1} excercises1={props.excercises1} />
      <Part part2={props.part2} excercises2={props.excercises2} />
      <Part part3={props.part3} excercises3={props.excercises3} />
    </div>
  );
};

const Total = (props) => {
  return <p>Number of excercises {props.excercises}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      excercises: 10,
    },
    {
      name: "Using props to pass data",
      excercises: 7,
    },
    {
      name: "State of a component",
      excercises: 14,
    },
  ];
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
