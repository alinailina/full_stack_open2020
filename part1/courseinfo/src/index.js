import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Header = ({ name }) => {
  return <h2>{name}</h2>;
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part) => {
        return <Part part={part} />;
      })}
    </div>
  );
};

const Part = ({ part }) => {
  return (
    <div>
      <p>
        {part.name}: {part.exercises}
      </p>
    </div>
  );
};

const Total = ({ parts }) => {
  let sum = (arr) => arr.reduce((x, y) => x + y);
  let total = sum(parts.map((part) => Number(part.exercises)));

  return <p>Total number of exercises: {total}</p>;
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
      {
        name: "Part x",
        exercises: 10,
      },
      {
        name: "Part y",
        exercises: 20,
      },
    ],
  };
  return (
    <div className="App">
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
