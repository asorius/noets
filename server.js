const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const Note = require('./models/note');
require('dotenv').config();

app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.log('error from error handler function');
  console.error(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

//Get all notes
app.get('/notes', (request, response) => {
  Note.find({}).then(notes => response.json(notes.map(note => note.toJSON())));
});
//Get a singe note
app.get('/notes/:id', (request, response, next) => {
  Note.findById(request.params.id)
    .then(note => {
      if (note) {
        response.json(note.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch(error => next(error));
});

//Add a single note
app.post('/notes', (request, response, next) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing'
    });
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: Math.floor(Math.random() * 2000)
  });

  note
    .save()
    .then(savedNewNote => response.json(savedNewNote.toJSON()))
    .catch(error => next(error));
});
//Update note
app.put('/notes/:id', (request, response) => {
  const id = request.params.id;
  Note.findById(id)
    .then(note =>
      Note.findByIdAndUpdate(id, { important: !note.important }, { new: true })
    )
    .then(updatedNote => {
      console.log(updatedNote);
      response.status(200).json(updatedNote);
    });
});
//Delete a note
app.delete('/notes/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id).then(note => {
    console.log(note);

    response.status(204).end();
  });
});
// handler of requests with unknown endpoint
app.use(unknownEndpoint);
// handler of requests with result to errors
app.use(errorHandler);
const port = process.env.PORT;
app.listen(port, () => console.log('Server is running on ' + port + ' ...'));
