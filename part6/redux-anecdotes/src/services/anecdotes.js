import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  console.log(response.data);
  return response.data;
};

const createAnecdote = async (content) => {
  const anecdote = { content, votes: 0 };
  const response = await axios.post(baseUrl, anecdote);
  return response.data;
};

const addVote = async (content, id, votes) => {
  const response = await axios.put(`${baseUrl}/${id}`, {
    content,
    id,
    votes: votes + 1,
  });
  console.log(response.data);
  return response.data;
};

export default { getAll, createAnecdote, addVote };
