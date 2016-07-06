/**
 * GET make listing.
 */
var mongoose = require("mongoose");
var url = 'mongodb://localhost:27017/makedb';

//Mongoose connection to MongoDB
mongoose.connect(url, function (error) {
    if (error) {
        console.log(error);
    }
});
var schema = mongoose.Schema;

//create a schema
var makeSchema = new schema({
  id: String,
  name: { type: String, required: true, unique: true },
  startYear: Date,
  revenue: Number,
  stockPrice: String,
  hq: String
  //updated_at: Date
});

// the schema is useless so far
// we need to create a model using it
var Make = mongoose.model('Make', makeSchema, 'makecoll');

// make this available to our users in our Node applications
//module.exports = Make;

exports.list = function(req, res) {
  //get all the makes
  Make.find(function(err, makes) {
    if (err) {
    	res.send(err);
    } else {
	    // object of all the makes
	    console.log(makes);
	    res.json(makes);
    }
  });
};