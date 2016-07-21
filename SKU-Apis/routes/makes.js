/**
 * GET make listing.
 */
var express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose') // mongo connection
  , bodyParser = require('body-parser') // parses information from POST
  , methodOverride = require('method-override'); // used to manipulate POST																								// connection

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

// get all the makes
router.route('/makes').get(function(req, res, next) {
	mongoose.model('Make').find({}, function(err, makes) {
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
					res.render('makes/index', {
						title : 'All Makes',
						"makes" : makes
					});
				},
				// JSON response will show all blobs in JSON format
				json : function() {
					res.json(makes);
				}
			});
		}
	});
});

//GET make by Id
router.route('/makes/:id').get(function(req, res) {
	var id = req.params.id;
	console.log(id);
	mongoose.model('Make').findById(id, function(err, make) {
		if (err) {
			res.send(err);
		} else {
			console.log(make);
			// JSON response will show all blobs in JSON format
			res.json(make);
		}
	});
});

module.exports = router;