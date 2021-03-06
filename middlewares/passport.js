
// config/passport.js

// load all the things we need
var passport = require('passport');
var LocalStrategy   = require('passport-local').Strategy;

// load up the user model
var User            = require('.././models/person');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(username, password, done) {
    Person.getUserByUsername(username, function(err, user){
    if(err) throw err;
    if(!user){
        return done(null, false, {message: 'Unknown User'});
    }
    Person.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;

        if(isMatch)
          return done(null, user);
        return done(null, false, {message: 'Invalid password'});
    });
   });
  }));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Person.getUserById(id, function(err, user) {
    done(err, user);
  });
});

module.exports = passport;
