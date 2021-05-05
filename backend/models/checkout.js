const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const checkoutSchema = new Schema({
  coid: {
    type: String,
  },
  fullname: {
    type: String,
  },
  cName: {
    type: String,
  },
  Address1: {
    type: String,
  },
  Address2: {
    type: String,
  },
  city: {
    type: String,
  },
  RSD: {
    type: String,
  },
  country: {
    type: String,
  },
  zipcode: {
    type: Number,
  },
  carts: {
    type: [],
  },
  totalprice: {
    type: String,
  },

});

const checkout = mongoose.model('checkout', checkoutSchema);

module.exports = checkout;
