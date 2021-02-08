import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  return (
    <tr>
      <td>
        <p>{anecdote.content}</p>
      </td>
      <td>
        <p> {anecdote.votes}</p>
        <button
          onClick={() => dispatch(vote(anecdote.id, anecdote.votes))}
          className="button-primary"
        >
          +1
        </button>
      </td>
    </tr>
  );
};

const Anecdotes = () => {
  const anecdotes = useSelector((state) => state);

  return (
    <table>
      <thead>
        <tr>
          <th>Anecdote</th>
          <th>Votes</th>
        </tr>
      </thead>
      <tbody>
        {anecdotes
          .sort((a, b) => (a.votes < b.votes ? 1 : -1))
          .map((anecdote) => (
            <Anecdote key={anecdote.id} anecdote={anecdote} />
          ))}
      </tbody>
    </table>
  );
};

export default Anecdotes;
