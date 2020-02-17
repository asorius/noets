const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('build'));
let notes = [
  {
    id: 1,
    content: 'HTML is easy',
    date: '2019-05-30T17:30:31.098Z',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only Javascript',
    date: '2019-05-30T18:39:34.091Z',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    date: '2019-05-30T19:20:14.298Z',
    important: true
  }
];
//Get all notes
app.get('/notes', (req, res) => {
  console.log('connection attempted');
  res.json(notes);
});

//Get a singe note
app.get('/notes/:id', (request, response) => {
  const id = request.params.id;
  const note = notes.find(note => note.id === +id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

//Add a single note
app.post('/notes', (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: Math.floor(Math.random() * 2000)
  };

  notes = notes.concat(note);

  response.json(note);
});
//Update note
app.put('/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.map(note =>
    note.id === id ? { ...note, important: !note.important } : note
  );

  response.status(200).json(notes);
});
//Delete a note
app.delete('/notes/:id', (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter(note => note.id !== id);

  response.status(204).end();
});

const port = process.env.PORT || 3001;
app.listen(port, () => console.log('Server is running on ' + port + ' ...'));
