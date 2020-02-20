const notesRouter = require('express').Router();
const Note = require('../models/note');

//Get all notes
notesRouter.get('/', (request, response) => {
  Note.find({}).then(notes => response.json(notes.map(note => note.toJSON())));
});
//Get a singe note
notesRouter.get('/:id', (request, response, next) => {
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
notesRouter.post('/', (request, response, next) => {
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
notesRouter.put('/:id', (request, response) => {
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
notesRouter.delete('/:id', (request, response) => {
  Note.findByIdAndDelete(request.params.id).then(note => {
    console.log(note);

    response.status(204).end();
  });
});
module.exports = notesRouter;
