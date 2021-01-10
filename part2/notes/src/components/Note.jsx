import React from "react";

const Note = ({ note, toggleImportance }) => {
  const { content, important } = note;
  const label = important ? "Important" : "Not important";
  return (
    <tr>
      <td>{content}</td>
      <td>
        <button
          className={important ? "button-primary" : null}
          onClick={toggleImportance}
        >
          {label}
        </button>
      </td>
    </tr>
  );
};

export default Note;
