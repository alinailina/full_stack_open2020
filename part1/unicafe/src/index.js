import React, { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

const Header = () => <h1>Please, leave feedback</h1>;

const Statistics = ({ good, neutral, bad, total, average, positive }) => {
  if (total === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }
  return (
    <table>
      <Statistic name="Good" value={good} />
      <Statistic name="Neutral" value={neutral} />
      <Statistic name="Bad" value={bad} />
      <Statistic name="Total" value={total} />
      <Statistic name="Average" value={average} />
      <Statistic name="Positive" value={positive} />
    </table>
  );
};

const Statistic = ({ name, value }) => (
  <tr>
    <td>{name}</td>
    <td>{value}</td>
  </tr>
);

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const average = (good * 1 + neutral * 0 + bad * -1) / total;
  const positive = (total / 100) * good + " %";

  const handleGood = () => {
    setTotal(total + 1);
    setGood(good + 1);
  };

  const handleNeutral = () => {
    setTotal(total + 1);
    setNeutral(neutral + 1);
  };

  const handleBad = () => {
    setTotal(total + 1);
    setBad(bad + 1);
  };

  return (
    <div>
      <Header />
      <Button onClick={handleGood} text="Good" />
      <Button onClick={handleNeutral} text="Neutral" />
      <Button onClick={handleBad} text="Bad" />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        average={average}
        positive={positive}
      />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
