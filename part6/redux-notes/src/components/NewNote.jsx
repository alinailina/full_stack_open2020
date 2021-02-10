import React from "react";
import { useDispatch } from "react-redux";
import { createNote } from "../reducers/noteReducer";

// import noteService from "../services/notes";

const NewNote = () => {
  const dispatch = useDispatch();

  const addNote = async (e) => {
    e.preventDefault();
    const content = e.target.note.value;
    e.target.note.value = "";
    // const newNote = await noteService.createNote(content);
    // dispatch(createNote(newNote));
    dispatch(createNote(content));
  };

  return (
    <form onSubmit={addNote}>
      <input type="text" name="note" />
      <button type="submit" className="button-primary">
        Add note
      </button>
    </form>
  );
};

export default NewNote;
