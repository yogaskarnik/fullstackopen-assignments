import Course from "./components/Course";

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          excercises: 3,
          id: 1,
        },
        {
          name: "Middleware",
          excercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course, i) => (
        <Course key={i} course={course} />
      ))}
    </div>
  );
};

export default App;
