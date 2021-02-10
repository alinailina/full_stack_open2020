import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setFilter } from "../reducers/filterReducer";
import { vote } from "../reducers/anecdoteReducer";
import {
  setNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const Anecdote = ({ anecdote }) => {
  const dispatch = useDispatch();
  const { id, content, votes } = anecdote;

  return (
    <tr>
      <td>
        <p>{content}</p>
      </td>
      <td>
        <p>{votes}</p>
        <button
          onClick={() => {
            dispatch(vote(content, id, votes));
            dispatch(setNotification(`You voted: '${content}'`));
            setTimeout(() => {
              dispatch(clearNotification());
            }, 5000);
          }}
          className="button-primary"
        >
          +1
        </button>
      </td>
    </tr>
  );
};

const Anecdotes = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector((state) => state.anecdotes);

  // Filter
  const filter = useSelector((state) => state.filter);
  let filteredAnecdotes = anecdotes.filter((a) => a.content.includes(filter));

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>
            <p>Filter</p>
            <input onChange={handleChange} />
          </th>
          <th>
            <p>Votes</p>
          </th>
        </tr>
      </thead>
      <tbody>
        {filteredAnecdotes.length > 0
          ? filteredAnecdotes
              .sort((a, b) => (a.votes < b.votes ? 1 : -1))
              .map((anecdote) => (
                <Anecdote key={anecdote.id} anecdote={anecdote} />
              ))
          : null}
      </tbody>
    </table>
  );
};

export default Anecdotes;
