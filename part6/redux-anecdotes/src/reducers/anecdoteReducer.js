import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "INIT_ANECDOTES":
      return action.anecdotes;

    case "NEW_ANECDOTE":
      return [...state, action.newAnecdote];

    case "ADD_VOTE":
      const { id } = action.updatedAnecdote;
      const anecdoteToAddVote = state.find((a) => a.id === id);
      console.log(anecdoteToAddVote);
      const changedAnecdote = {
        ...anecdoteToAddVote,
        votes: anecdoteToAddVote.votes + 1,
      };
      return state.map((a) => (a.id !== id ? a : changedAnecdote));
    default:
      return state;
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      anecdotes,
    });
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createAnecdote(content);
    console.log(newAnecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      newAnecdote,
    });
  };
};

export const vote = (content, id, votes) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.addVote(content, id, votes);
    console.log(updatedAnecdote);
    dispatch({
      type: "ADD_VOTE",
      updatedAnecdote,
    });
  };
};

export default anecdoteReducer;
