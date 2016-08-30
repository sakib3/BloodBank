var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	passport = require('./middlewares/passport'),
	//passport = require('./middlewares/passport');
	config = require('./_config');
	Person = require('./models/person');

// connect to Mongoose
mongoose.connect(config.mongoURI[process.env.NODE_ENV], function(err, res) {
  if(err){
    console.log('Error connecting to the database. ' + err);
  } 
  else {
    console.log('Connected to Database: ' + config.mongoURI[process.env.NODE_ENV]);
    var dropDBOnStartUp = false || config.dropDBOnStartUp[process.env.NODE_ENV];
	if(dropDBOnStartUp){
    	var dropDB = mongoose.connection.db.dropDatabase();
    	dropDB ? console.log('Database dropped') : console.log('Error: Database can not be dropped');
	}
  }
});

//var db = mongoose.connection;

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

router.get('/api/person/id/:id', function(req, res){
	Person.getPersonById(req.params.id, function(err, data){
		if(err){
			res.json(err);
		}
		res.json(data);
	});
});

router.get('/api/person/bloodGroup/:bloodGroup', function(req, res){
	var query = {bloodGroup : req.params.bloodGroup};
	Person.getPersonByQuery(query, function(err, data){
		if(err){
			res.json(err);
		}
		res.json(data);
	});
});

router.get('/api/person/currentLocation', function(req, res){
	var maxDistance = req.query.maxDistance;
	maxDistance/=100
	var lat = req.query.lat;
	var long = req.query.long;
	var query = {
					currentLocation : {	
						$geoWithin: { 
							$center: [	[lat,long], maxDistance ] 
						} 
					}			 
	};
	Person.getPersonByQuery(query, function(err, data){
		if(err){
			res.json(err);
		}
		res.json(data);
	});
});

router.post('/api/person/id/:id', function(req, res){
	var updateField = req.body;
	Person.updatePersonById(req.params.id, updateField,function(err, data){
		if(err){
			res.json(err);
		}
		res.json(data);
	});
});

// function passportAuthenticateUser(req, res){
// 	passport.authenticate('local', function(err, user, info) {
// 		if (err) { return next(err); }
// 		console.log(user);
// 		return;
// 		if (!user) {
// 			res.status(403);
// 			return res.send({message: info.message});
// 		}
		
// 	})(req, res);
// }
module.exports = router;