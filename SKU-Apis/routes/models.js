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

// get all the models
router.route('/models').get(function(req, res, next) {
	mongoose.model('Model').find({}, function(err, models) {
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
					res.render('models/index', {
						title : 'All Models',
						"models" : models
					});
				},
				// JSON response will show all blobs in JSON format
				json : function() {
					res.json(models);
				}
			});
		}
	});
});

module.exports = router;