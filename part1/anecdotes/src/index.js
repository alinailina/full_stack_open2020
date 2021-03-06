import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const generateRandomNum = () => {
    const randomNum = Math.floor(Math.random() * Math.floor(anecdotes.length));
    setSelected(randomNum);
  };

  const getVote = (selected) => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  const maxVotes = Math.max(...votes);

  return (
    <div className="App">
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={generateRandomNum}>Next anecdote</button>
      <button onClick={() => getVote(`${selected}`)}>Vote</button>
      <h2>Anecdote with most votes</h2>
      <div>
        <p>{anecdotes[votes.indexOf(maxVotes)]}</p>
        <p>has {maxVotes} votes</p>
      </div>
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
