const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  BookId: {
    type: String,
  },
  BookName: {
    type: String,
  },
  Publisher: {
    type: String,
  },
  Category: {
    type: String,
  },
  Lang: {
    type: String,
  },
  Author: {
    type: String,
  },
  Description: {
    type: String,
  },
  Price: {
    type: Number,
  },
  Published: {
    type: String,
  },
  NewArrival: {
    type: String,
  },

});

const book = mongoose.model('book', bookSchema);

module.exports = book;
