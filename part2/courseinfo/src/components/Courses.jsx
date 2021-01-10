import React from "react";
import Course from "./Course";

const Courses = ({ courses }) => {
  return (
    <ul>
      {courses.map((course) => (
        <Course key={course.id} course={course} />
      ))}
    </ul>
  );
};

export default Courses;
