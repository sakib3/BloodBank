var config = {};

config.mongoURI = {
  development: 'mongodb://localhost/bloodbank',
  test: 'mongodb://localhost/bloodbankTest'
};

config.serverPORT = {
  development: '3000',
  test: '3001'
};
module.exports = config;