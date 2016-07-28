/**
 * GET make listing.
 */
var express = require('express')
  , router = express.Router()
  , Product = require('../models/product')
  , Make = require('../models/make')
  , Model = require('../models/model')
  , mongoose = require('mongoose') // mongo connection
  , bodyParser = require('body-parser') // parses information from POST
  , methodOverride = require('method-override'); // used to manipulate POST

// Any requests to this controller must pass through this 'use' function
// Copy and pasted from method-override
router.use(bodyParser.urlencoded({
	extended : true
}));

// Parses the text as JSON and exposes the resulting object on req.body.
router.use(bodyParser.json());

router.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

// get all the Products
router.route('/products')
.get(function(req, res, next) {
	Product.find().populate('Make', 'make').populate('Model', 'model').exec(function(err, products) {
		if (err) {
			res.send(err);
		} else {
			// respond to both HTML and JSON. JSON responses
			// require 'Accept:
			// application/json;' in the Request Header
			res.format({
				// HTML response will render the index.jade file
				// in the
				// views/blobs folder. We are also setting
				// "blobs" to be an
				// accessible variable in our jade view
				html : function() {
					res.render('products/index', {
						title : 'All Products',
						"products" : products
					});
				},
				// JSON response will show all blobs in JSON
				// format
				json : function() {
					res.json(products);
				}
			});
		}
	});
})
// POST a new product
.post(function(req, res) {
	console.log('In POST - Req body');
	var newProduct = new Product();
	newProduct.name = req.body.name;
	newProduct.description = req.body.description;
	newProduct.SKUID = req.body.SKUID;
	newProduct.rackId = req.body.rackId;
	newProduct.inventoryStartDate = req.body.inventoryStartDate;
	newProduct.manufacturingDate = req.body.manufacturingDate;
	newProduct.soldDate = req.body.soldDate;
	newProduct.price = req.body.price;
	newProduct.color = req.body.color;
	Make.findOne(req.body.make, function(err, make1) {
		if (err) {
			res.send(err);
		} else {
			Model.findOne(req.body.model, function(err, model1) {
				if (err) {
					res.send(err);
				} else {
					newProduct.make = {
						"$ref" : "makes",
						"_id" : make1._id
					};
					newProduct.model = {
						"$ref" : "models",
						"_id" : model1._id
					};
					console.log(newProduct);
					newProduct.save(function(err, newPro) {
						if (err) {
							console.log(err);
							res.send(err);
						} else {
							console.log("Created successfully!");
							res.format({
								// HTML response will render the index.jade file
								// in the
								// views/blobs folder. We are also setting
								// "blobs" to be an
								// accessible variable in our jade view
								html : function() {
									var List1 = mongoose.model('Make');
									var List2 = mongoose.model('Model');

									List1.find(function (err, makes) {
										List2.find(function (err, models) {
												
													res.render('products/createproduct', {
														title : 'Create SKU',
														"makes" : makes,
														"models" : models,
														"message" : "SKU created successfully"
													});
												
										        });
									    });
								},
								// JSON response will show all blobs in JSON
								// format
								json : function() {
									res.json(products);
								}
							});
						}
					}); // end product.save
				}
			});
		}
	});
});

//Update a product
router.route('/products/:id').put(function(req, res) {
	var productToUpdate = new Product();
	productToUpdate._id = req.params.id;
	productToUpdate.name = req.body.name;
	productToUpdate.description = req.body.description;
	productToUpdate.SKUID = req.body.SKUID;
	productToUpdate.rackId = req.body.rackId;
	productToUpdate.inventoryStartDate = req.body.inventoryStartDate;
	productToUpdate.manufacturingDate = req.body.manufacturingDate;
	productToUpdate.soldDate = req.body.soldDate;
	productToUpdate.price = req.body.price;
	productToUpdate.color = req.body.color;
	Product.findOneAndUpdate({'_id': req.params.id}, productToUpdate, function(err, productToUpdate) {
	    if (err) {
	    	return res.send(500, { error: err });
	    }
	    return res.send("Succesfully updated!");
	});
});

// Get new product page
router.route('/createproduct').get(function(req, res) {
	
	 var List1 = mongoose.model('Make');
	 var List2 = mongoose.model('Model');

	 List1.find(function (err, makes) {
	        List2.find(function (err, models) {
	
			// respond to both HTML and JSON. JSON responses require 'Accept:
			// application/json;' in the Request Header
			res.format({
				// HTML response will render the index.jade file in the
				// views/blobs folder. We are also setting "blobs" to be an
				// accessible variable in our jade view
				html : function() {
					res.render('products/createproduct', {
						title : 'Create SKU',
						"makes" : makes,
						"models" : models
					});
				}
			});
	        });
	    });
});

module.exports = router;