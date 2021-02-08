import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleImportanceOf } from "../reducers/noteReducer";

const Note = ({ note, handleClick }) => {
  return (
    <tr onClick={handleClick}>
      <td>{note.content}</td>
      <td>
        <button className={note.important ? "button-primary" : null}>
          {note.important ? "Important" : "Not mportant"}
        </button>
      </td>
    </tr>
  );
};

const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => state);

  return (
    <table>
      <thead>
        <tr>
          <th>Note</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note) => (
          <Note
            key={note.id}
            note={note}
            handleClick={() => dispatch(toggleImportanceOf(note.id))}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Notes;
