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
app.use(cors());
app.use(express.static('build'));

//Handle no resourse
app.get('/', (req, res) => {
  res.json('no resource found');
});

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
app.get('/api/persons/:id', (req, res) => {
  Persons.findById(req.params.id)
    .then((person) => {
      res.json(person);
    })
    .catch((error) => {
      res.json('error fetch contact with id ', req.params.id);
    });
});

//Delete person with id
app.delete('/api/persons/:id', (req, res) => {
  Persons.deleteOne(req.params.id)
    .then((result) => res.json('deleted record'))
    .catch((error) => res.json('error deleting record'));
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

const PORT = process.env.PORT;
app.listen(PORT);
console.log(`Server running on port ${PORT}`);
