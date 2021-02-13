var mongoose = require('mongoose');

var ContentSchema = new mongoose.Schema({
  name: String,
  address: String,
  position: String,
  salary: Number,
  updated_at : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Content', ContentSchema);