var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	//passport = require('./middlewares/passport');
	config = require('./_config');

// connect to Mongoose
mongoose.connect(config.mongoURI[process.env.NODE_ENV], function(err, res) {
  if(err) {
    console.log('Error connecting to the database. ' + err);
  } else {
    console.log('Connected to Database: ' + config.mongoURI[process.env.NODE_ENV]);
  }
});

var db = mongoose.connection;

router.get('/', function(req, res){
	res.status(200).send({ message: 'Success' });
});

module.exports = router;