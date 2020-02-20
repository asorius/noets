const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const notesRouter = require('./controllers/notes');
const middleware = require('./utils/middleware');
const config = require('./utils/config');

console.log('connecting to ', config.MONGODB_URI);
mongoose
  .connect(config.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('connected to MongoDB'))
  .catch(error => console.log('unable to connect to MongoDB ', error.message));

app.use(cors());
app.use(express.static('build'));
app.use(bodyParser.json());

app.use('/notes', notesRouter);

// handler of requests with unknown endpoint
app.use(middleware.unknownEndpoint);
// handler of requests with result to errors
app.use(middleware.errorHandler);

module.exports = app;
