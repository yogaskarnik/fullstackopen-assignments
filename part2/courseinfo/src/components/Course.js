import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <Header key={"header"} name={course.name} />
      <Content key={"content"} parts={course.parts} />
      <Total key={"total"} total={course.parts} />
    </div>
  );
};

export default Course;
