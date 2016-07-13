/**
 * GET make listing.
 */
var express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose') // mongo connection
  , bodyParser = require('body-parser') // parses information from POST
  , methodOverride = require('method-override'); // used to manipulate POST

// Any requests to this controller must pass through this 'use' function
// Copy and pasted from method-override
router.use(bodyParser.urlencoded({
	extended : true
}));
router.use(methodOverride(function(req, res) {
	if (req.body && typeof req.body === 'object' && '_method' in req.body) {
		// look in urlencoded POST bodies and delete it
		var method = req.body._method;
		delete req.body._method;
		return method;
	}
}));

// get all the Products
router.route('/products').get(function(req, res, next) {
	mongoose.model('Product').find({}, function(err, products) {
		if (err) {
			res.send(err);
		} else {
			// respond to both HTML and JSON. JSON responses require 'Accept:
			// application/json;' in the Request Header
			res.format({
				// HTML response will render the index.jade file in the
				// views/blobs folder. We are also setting "blobs" to be an
				// accessible variable in our jade view
				html : function() {
					res.render('products/index', {
						title : 'All Products',
						"products" : products
					});
				},
				// JSON response will show all blobs in JSON format
				json : function() {
					res.json(products);
				}
			});
		}
	});
})
// POST a new product
.post(function(req, res) {
});

// Get new product page
router.route('/createproduct').get(function(req, res) {
	res.render('products/createproduct', {
		title : 'Product'
	});
});

module.exports = router;