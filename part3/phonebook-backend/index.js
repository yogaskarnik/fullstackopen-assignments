require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const Persons = require('./models/persons');

morgan.token('post-params', (req, res) => {
  return JSON.stringify(req.body);
});

app.use(express.json());
app.use(
  morgan(
    ':method :url :status :res[content-length] - :response-time ms :post-params'
  )
);
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(cors());
app.use(express.static('build'));

//Display all persons
app.get('/api/persons', (req, res) => {
  Persons.find({}).then((result) => {
    res.json(result);
  });
});

//Display person info
app.get('/info', (req, res) => {
  Persons.find({}).then((result) => {
    const info = {
      noOfPersons: `Phonebook has info for ${result.length} people`,
      timeOfProcessing: Date(),
    };
    const infoToSend = `<p>${info.noOfPersons}<br/><br/>${info.timeOfProcessing}</p>`;
    res.send(infoToSend);
  });
});

//Get person with id
app.get('/api/persons/:id', (req, res, next) => {
  Persons.findById(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => next(error));
});

//Delete person with id
app.delete('/api/persons/:id', (req, res) => {
  Persons.findByIdAndRemove(req.params.id)
    .then((result) => res.status(204).end())
    .catch((error) => next(error));
});

//Create new person
app.post('/api/persons', (req, res) => {
  const body = req.body;
  if (!body.name || !body.number) {
    res.json({
      error: `${!body.name ? 'name' : 'number'} must be provided`,
    });
  }

  const newPerson = new Persons({
    name: body.name,
    number: body.number,
  });

  newPerson.save().then((result) => {
    res.json(result);
  });
});

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };

  Persons.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((udpatedPerson) => {
      response.json(udpatedPerson);
    })
    .catch((error) => next(error));
});

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};
app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
