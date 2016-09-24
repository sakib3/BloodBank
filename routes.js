var express = require('express'),
	router = express.Router(),
	mongoose = require('mongoose'),
	passport = require('./middlewares/passport'),
	config = require('./_config'),
	jwtauth = require('./middlewares/jwtauth');
	Person = require('./models/person');

// connect to Mongoose
mongoose.connect(config.mongoURI[process.env.NODE_ENV], function(err, res) {
	console.log('Database url -> ' + config.mongoURI[process.env.NODE_ENV]);
  if(err){
    console.log('Error connecting to the database. ' + err);
  }
  else {
    console.log('Connected to Database: ' + config.mongoURI[process.env.NODE_ENV]);
  }
});

//var db = mongoose.connection;

router.get('/', function(req, res){
	res.status(200).send({ message: 'Success' });
});

router.post('/login', function(req, res){
	passportAuthenticateUser(req, res);
});

router.all(/^\/api\/(.)*$/,jwtauth.decodeToken);

router.post('/api/validate', function(req, res){
	res.status(200);
	res.json({isLoggedIn:req.body.isLoggedIn});
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

function passportAuthenticateUser(req, res){
	passport.authenticate('local', function(err, user, info) {
		if (err) { return next(err); }

		if (!user) {
			res.status(403);
			return res.send({message: info.message});
		}

		jwtauth.generateToken(user,function(response_token){
			res.status(200);
			return res.json(response_token);
		});
	})(req, res);
}
module.exports = router;
