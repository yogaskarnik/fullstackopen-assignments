const mongoose = require('mongoose');

const url = process.env.MONGODB_URI;
console.log('url ', url);

mongoose.set('strictQuery', false);
mongoose
  .connect(url)
  .then((result) => {
    console.log('connected to MongoDB');
  })
  .catch((error) => {
    console.log('error connecting to MongoDB');
  });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

module.exports = mongoose.model('Persons', personSchema);
