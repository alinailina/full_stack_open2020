import React, { useEffect } from "react";
import "./index.css";

import NewNote from "./components/NewNote";
import Filter from "./components/Filter";
import Notes from "./components/Notes";

import { useDispatch } from "react-redux";
// import noteService from "./services/notes";
import { initializeNotes } from "./reducers/noteReducer";

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   noteService.getAll().then((notes) => dispatch(initializeNotes(notes)));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(initializeNotes());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Redux Notes</h1>
      <NewNote />
      <Filter />
      <Notes />
    </div>
  );
};

export default App;
