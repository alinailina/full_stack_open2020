import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const searchResults = countries.filter((country) =>
    country.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Countries</h1>
      <label>
        Search: <input type="text" value={query} onChange={handleQuery} />
      </label>
      {query.length ? (
        <Countries searchResults={searchResults} />
      ) : (
        <p>Enter country name</p>
      )}
    </div>
  );
}

export default App;
