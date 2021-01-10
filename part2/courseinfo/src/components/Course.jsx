import React from "react";
import Header from "./Header";
import Part from "./Part";
import Total from "./Total";

const Course = ({ course }) => {
  const { name, parts } = course;
  return (
    <li>
      <Header name={name} />
      <table>
        <thead>
          <tr>
            <th>Part</th>
            <th>Exercises</th>
          </tr>
        </thead>
        <tbody>
          {parts.map((part) => (
            <Part key={part.id} part={part} />
          ))}
        </tbody>
        <Total parts={parts} />
      </table>
    </li>
  );
};

export default Course;
