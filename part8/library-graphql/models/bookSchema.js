const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  published: {
    type: Number,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  genres: [
    {
      type: String,
    },
  ],
});

bookSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    ret.id = ret._id.toString();
    delete ret._id;
  },
});

bookSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Book', bookSchema);
