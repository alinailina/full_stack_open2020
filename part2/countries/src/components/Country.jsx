import React from "react";

const Country = ({ searchResults }) => {
  const { name, capital, population, languages, flag } = searchResults[0];

  return (
    <div>
      <div>
        <img src={flag} alt="flag" />
      </div>
      <h3>{name}</h3>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <h4>Languages:</h4>
      {languages.map((language, i) => (
        <p key={i}>
          <span>{i + 1}</span>. {language.name}
        </p>
      ))}
    </div>
  );
};

export default Country;
