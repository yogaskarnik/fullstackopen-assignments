import Course from "./components/Course";

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        excercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        excercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        excercises: 14,
        id: 3,
      },
      {
        name: "Redux",
        excercises: 11,
        id: 4,
      },
    ],
  };
  return <Course course={course} />;
};

export default App;
