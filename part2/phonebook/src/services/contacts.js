import axios from "axios";
const baseUrl = "http://localhost:3002/contacts";

const getAll = () => {
  return axios.get(baseUrl);
};

const add = (newContact) => {
  return axios.post(baseUrl, newContact);
};

const deleteContact = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (index, updatedContact) => {
  return axios.put(`${baseUrl}/${index + 1}`, updatedContact);
};

export default {
  getAll,
  add,
  deleteContact,
  update,
};
