const filterReducer = (state = "", action) => {
  switch (action.type) {
    case "FILTER":
      console.log(action.value);
      return action.value;
    default:
      return state;
  }
};

export const setFilter = (value) => {
  return {
    type: "FILTER",
    value,
  };
};

export default filterReducer;
