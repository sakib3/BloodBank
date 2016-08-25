var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
passport = require('passport'),
session = require('express-session'),
config = require('./_config'),
router = require('./routes');

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session(false));
app.use("/",router);

app.use("*",function(req,res){
	res.status(400).send({ error: 'Not found' });
});
var port = config.serverPORT[process.env.NODE_ENV];

app.listen(port);
console.log('Running on port '+ port+' ....');
