/**
 * GET make listing.
 */
var mongoose = require("mongoose");
var url = 'mongodb://localhost:27017/sku_db';

//Mongoose connection to MongoDB
mongoose.connect(url, function (error) {
    if (error) {
        console.log(error);
    }
});
var schema = mongoose.Schema;

//create a schema
var productSchema = new schema({
  id: String,
  name: { type: String, required: true, unique: true },
  description: String,
  skuId: String,
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
var product = mongoose.model('Product', productSchema, 'products');

// make this available to our users in our Node applications
//module.exports = product;

exports.list = function(req, res) {
  //get all the products
  product.find(function(err, products) {
    if (err) {
    	res.send(err);
    } else {
	    // object of all the products
	    console.log(products);
	    res.json(products);
    }
  });
};