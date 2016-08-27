var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/bloodbank',
  test: 'mongodb://localhost/bloodbank-test'
};

config.serverPORT = {
  development: '3000',
  test: '3001'
};

config.dropDBOnStartUp = {
	test: true
}

module.exports = config;