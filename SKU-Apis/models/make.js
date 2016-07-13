/**
 * New node file
 */
var mongoose = require("mongoose");

//create a schema
var makeSchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true, unique: true },
  startYear: Date,
  revenue: String,
  stockPrice: String,
  hq: String
  //updated_at: Date
});

mongoose.model('Make', makeSchema, 'makes');