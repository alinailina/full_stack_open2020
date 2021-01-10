import React from "react";

const Part = ({ part }) => {
  const { name, exercises } = part;
  return (
    <tr>
      <td>{name}</td>
      <td>{exercises}</td>
    </tr>
  );
};

export default Part;
