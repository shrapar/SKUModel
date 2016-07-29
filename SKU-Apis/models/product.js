/**
 * New node file
 */
var mongoose = require("mongoose");

//create a schema
var productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: String,
  SKUID: String,
  rackId: String,
  makeId: { type: mongoose.Schema.ObjectId, ref: 'Make' },
  modelId: { type: mongoose.Schema.ObjectId, ref: 'Model' },
  inventoryStartDate: Date,
  manufacturingDate: Date,
  soldDate: Date,
  price: Number,
  color: String
  //updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
module.exports = mongoose.model('Product', productSchema, 'products');
