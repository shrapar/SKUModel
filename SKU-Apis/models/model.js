/**
 * New node file
 */
var mongoose = require("mongoose");

//create a schema
var modelSchema = new mongoose.Schema({
  _id: String,
  name: { type: String, required: true, unique: true },
  description: String,
  //updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('Model', modelSchema, 'models');