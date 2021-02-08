import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import counterReducer from "./counterReducer";
import "./index.css";

const store = createStore(counterReducer);

store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

const App = () => {
  return (
    <div className="App">
      <h1>Redux Unicafe</h1>
      <button onClick={(e) => store.dispatch({ type: "GOOD" })}>Good</button>
      <button onClick={(e) => store.dispatch({ type: "OK" })}>Neutral</button>
      <button onClick={(e) => store.dispatch({ type: "BAD" })}>Bad</button>
      <button onClick={(e) => store.dispatch({ type: "ZERO" })}>Reset</button>
      <h3>Good {store.getState().good}</h3>
      <h3>Neutral {store.getState().ok}</h3>
      <h3>Bad {store.getState().bad}</h3>
    </div>
  );
};

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById("root"));
};

renderApp();
store.subscribe(renderApp);
