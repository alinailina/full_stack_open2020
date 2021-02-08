import React from "react";
import "./index.css";

import NewNote from "./components/NewNote";
import Notes from "./components/Notes";

const App = () => {
  return (
    <div className="App">
      <h1>Redux Notes</h1>
      <NewNote />
      <Notes />
    </div>
  );
};

export default App;
