import React from "react";

const Total = ({ parts }) => {
  let newArr = parts.map((part) => Number(part.exercises));
  let total = newArr.reduce((x, y) => x + y);
  return (
    <tr>
      <td>Total:</td>
      <td>{total}</td>
    </tr>
  );
};

export default Total;
