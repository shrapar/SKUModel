/**
 * New node file
 */
var mongoose = require("mongoose");

//create a schema
var productSchema = new mongoose.Schema({
  id: String,
  name: { type: String, required: true, unique: true },
  description: String,
  SKUID: String,
  rackId: String,
  inventoryStartDate: Date,
  manufacturingDate: Date,
  soldDate: Date,
  price: Number,
  color: String
  //updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
mongoose.model('Product', productSchema, 'products');
