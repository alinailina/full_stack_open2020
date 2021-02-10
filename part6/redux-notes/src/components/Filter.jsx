import React from "react";
import { filterChange } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

const Filter = () => {
  const dispatch = useDispatch();

  return (
    <div>
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("ALL"))}
      />
      All
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      Important
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("NONIMPORTANT"))}
      />
      Nonimportant
    </div>
  );
};

export default Filter;
