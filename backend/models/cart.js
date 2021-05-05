const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  cartid: {
    type: String,
  },
  bookid: {
    type: String,
  },
  bookname: {
    type: String,
  },
  Price: {
    type: Number,
  },
  userid: {
    type: String,
  },
  username: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;