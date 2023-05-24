const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const portSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  erdpou: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = mongoose.model('Port', portSchema, 'port')