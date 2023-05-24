const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  boardingNumber: {
    type: String,
    unique: true,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  tannage: {
    type: String,
    required: true
  },
  sediment: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('Ship', shipSchema, 'ship')