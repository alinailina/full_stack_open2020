import React from "react";
import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";

//import anecdoteService from "../services/anecdotes";

const NewAnecdote = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = "";
    // const newAnecdote = await anecdoteService.createAnecdote(content);
    // dispatch(createAnecdote(newAnecdote));
    dispatch(createAnecdote(content));
  };

  return (
    <div>
      <h4>Add anecdote</h4>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewAnecdote;
