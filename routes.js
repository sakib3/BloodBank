var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	
	//passport = require('./middlewares/passport');
	config = require('./_config');
	Person = require('./models/person');

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

router.post('/api/person', function(req, res){
	var person = req.body;
	Person.addPerson(person, function(err, data){
		if(err){
			res.json(err);
		}
		res.json(data);
	});
});
module.exports = router;