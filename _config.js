var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/bloodbank-test',
  test: 'mongodb://localhost/bloodbank-test'
};

config.serverPORT = {
  development: '3000',
  test: '3000'
};

config.dropDBOnStartUp = {
	test: true
}

config.jwtTokenSecret = 'testybear';
module.exports = config;