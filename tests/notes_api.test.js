const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const api = supertest(app);
const Note = require('../models/note');
const initialNotes = [
  {
    content: 'HTML is easy',
    date: new Date(),
    important: false
  },
  {
    content: 'Browser can execute only Javascript',
    date: new Date(),
    important: true
  }
];

beforeEach(async () => {
  await Note.deleteMany({});

  let noteObject = new Note(initialNotes[0]);
  await noteObject.save();

  noteObject = new Note(initialNotes[1]);
  await noteObject.save();
});
test('all notes are returned', async () => {
  const response = await api.get('/notes');

  expect(response.body.length).toBe(initialNotes.length);
});

test('a specific note is within the returned notes', async () => {
  const response = await api.get('/notes');

  const contents = response.body.map(r => r.content);

  expect(contents).toContain('Browser can execute only Javascript');
});
test('note without content is not added', async () => {
  const newNote = {
    important: true
  };

  await api
    .post('/notes')
    .send(newNote)
    .expect(400);

  const response = await api.get('/notes');

  expect(response.body.length).toBe(initialNotes.length);
});

afterAll(() => {
  mongoose.connection.close();
});
