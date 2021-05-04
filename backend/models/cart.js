const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
  cartid: {
    type: String,
  },
  bookid: {
    type: String,
  },
  userid: {
    type: String,
  },
  quantity: {
    type: Number,
  },
});

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;