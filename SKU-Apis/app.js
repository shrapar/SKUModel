
/**
 * Module dependencies.
 */
var express = require('express')
  , bodyParser = require('body-parser')
  , logger = require('morgan')
  , http = require('http')
  , path = require('path');

var mongoose = require("mongoose");
//var url = 'mongodb://159.8.150.174:27017/sku_db';
var url = 'mongodb://localhost:27017/sku_db';

//Mongoose connection to MongoDB
mongoose.connect(url, function (error) {
    if (error) {
        console.log(error);
    }
});

var routes = require('./routes/index');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  //app.use(express.errorHandler());
}


app.get('/', routes.index);

var makes = require('./routes/makes'),
    make = require('./models/make');
app.get('/makes', makes);
app.get('/makes/:id', makes);

var models = require('./routes/models'),
    model = require('./models/model');
app.get('/models', models);
app.get('/models/:id', models);

var products = require('./routes/products'),
    product = require('./models/product');
app.get('/products', products);
app.get('/createproduct', products);
app.post('/products', products);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;