import React from "react";
import Country from "./Country";

const Countries = ({ searchResults }) => {
  const length = searchResults.length;

  if (!length) return <p>No country found with this name</p>;

  if (length > 5) {
    return <p>Too many matches, refine your search query</p>;
  } else if (length > 1 && length <= 5)
    return (
      <ul>
        {searchResults.map((country, i) => (
          <li key={i}>{country.name}</li>
        ))}
      </ul>
    );

  return <Country searchResults={searchResults} />;
};

export default Countries;
