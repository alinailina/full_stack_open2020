import React from "react";
import "./index.css";

import AnecdoteForm from "./components/AnecdoteForm";
import Anecdotes from "./components/Anecdotes";

const App = () => {
  return (
    <div className="App">
      <h1>Redux Anecdotes</h1>
      <Anecdotes />
      <AnecdoteForm />
    </div>
  );
};

export default App;
