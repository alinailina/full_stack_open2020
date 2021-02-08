const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
};

const counterReducer = (state = initialState, action) => {
  console.log(action);
  let newState = { ...state };
  switch (action.type) {
    case "GOOD":
      //return state;
      newState.good += 1;
      return newState;

    case "OK":
      // return state;
      newState.ok += 1;
      return newState;

    case "BAD":
      // return state;
      newState.bad += 1;
      return newState;

    case "ZERO":
      return (newState = initialState);

    default:
      return state;
  }
};

export default counterReducer;
