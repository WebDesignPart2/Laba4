const mongoose = require('mongoose')

const Schema = mongoose.Schema

const pierSchema = new Schema({
  port: { type: String, required: true },
  number: { type: Number, required: true, unique: true },
  capacity: { type: Number, required: true, max: 20, min: 0 },
  minimumShipDraft: { type: Number, required: true }
})

module.exports = mongoose.model('Pier', pierSchema, 'pier')