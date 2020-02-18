import axios from 'axios';
const baseUrl = '/notes';

const getAllNotes = async () => {
  console.log('get all notes');
  console.log(baseUrl);
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
