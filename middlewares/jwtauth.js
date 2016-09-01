// load up the user model
var jwt = require('jwt-simple'),
    moment = require('moment');
var secret = require('../_config').jwtTokenSecret;

module.exports.generateToken = function (user, callback){
    var expires = moment().add('days', 7).valueOf();
    var token = jwt.encode({
      iss: user.id,
      exp: expires
    },secret);
    var response_token = {
      token : token,
      expires: expires,
      user: user.toJSON()
    };
    //console.log(response_token);
    callback(response_token);
};

module.exports.decodeToken = function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    req.body.isLoggedIn=false;
    if (token) {
        try {
            var decoded = jwt.decode(token, secret);

            if (decoded.exp <= Date.now()) {
              res.json({
                "status": 400,
                "message": "Oops something went wrong",
                "error": 'Access token has expired'
              });
            }
            req._currentIdentifierFromToken = decoded;
            req.body.isLoggedIn=false;
            return next();

        } catch (err) {
          res.status(500);
            res.json({
              "status": 500,
              "message": "Oops something went wrong",
              "error": err.message
            });
        }
    } 
    return next();
};

