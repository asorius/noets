import axios from 'axios';
const baseUrl = 'http://localhost:3001/notes';

const getAllNotes = async () => {
  const req = await axios.get(baseUrl);
  const response = await req.data;
  return response;
};
const addNote = async content => {
  try {
    const req = await axios.post(baseUrl, { content });
    const data = await req.data;
    return data;
  } catch (e) {
    console.log(e);
  }
};
const setImportance = async (id, updatedNote) => {
  try {
    const req = await axios.put(baseUrl + '/' + id, updatedNote);
    const data = await req.data;
    return data;
  } catch (e) {
    console.log(e);
  }
};
export default {
  getAllNotes,
  addNote,
  setImportance
};
