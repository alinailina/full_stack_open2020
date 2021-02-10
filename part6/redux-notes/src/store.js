import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import noteReducer from "./reducers/noteReducer";
import filterReducer from "./reducers/filterReducer";

const reducers = combineReducers({
  notes: noteReducer,
  filter: filterReducer,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
  const storeNow = store.getState();
  console.log(storeNow);
});

export default store;
