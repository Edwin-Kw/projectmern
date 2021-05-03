const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const bookuserSchema = new Schema({
  userid:{
    type: String,
  },
  username: {
    type: String,
    
  },
  password: {
    type: String,
    
  }
});

const bookuser = mongoose.model('bookusers', bookuserSchema);

module.exports = bookuser;