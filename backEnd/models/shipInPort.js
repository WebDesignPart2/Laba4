const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shipInPortSchema = new Schema({
  shipId: {
    type: Schema.Types.ObjectId,
    ref: 'Ship',
    required: true
  },
  portId: {
    type: Schema.Types.ObjectId,
    ref: 'Port',
    required: true
  }
});

module.exports = mongoose.model('ShipInPort', shipInPortSchema, 'shipInPort')