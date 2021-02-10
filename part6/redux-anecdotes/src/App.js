import React, { useEffect } from "react";
import "./index.css";

import NewAnecdote from "./components/NewAnecdote";
import Notification from "./components/Notification";
import Anecdotes from "./components/Anecdotes";

import { useDispatch } from "react-redux";
// import anecdoteService from "./services/anecdotes";
import { initializeAnecdotes } from "./reducers/anecdoteReducer";

const App = () => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   anecdoteService
  //     .getAll()
  //     .then((anecdotes) => dispatch(initializeAnecdotes(anecdotes)));
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(initializeAnecdotes());
  }, [dispatch]);

  return (
    <div className="App">
      <h1>Redux Anecdotes</h1>
      <Notification />
      <NewAnecdote />

      <Anecdotes />
    </div>
  );
};

export default App;
