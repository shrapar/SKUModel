/**
 * New node file
 */
var mongoose = require("mongoose");

//create a schema
var productSchema = new mongoose.Schema({
  //_id: String,
  name: { type: String, required: true, unique: true },
  description: String,
  SKUID: String,
  rackId: String,
  make: { type: mongoose.Schema.Types.ObjectId, ref: 'Make' },
  model: { type: mongoose.Schema.Types.ObjectId, ref: 'Model' },
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
