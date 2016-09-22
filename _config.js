var config = {};

config.mongoURI = {
  development: process.env.DEV_DB_URL!==undefined ?process.env.DEV_DB_URL :'mongodb://localhost:27017/veripankki',
  production: process.env.DEV_DB_URL!==undefined ?process.env.DEV_DB_URL :'mongodb://localhost:27017/veripankki',
  test: process.env.TEST_DB_URL!==undefined ?process.env.TEST_DB_URL :'mongodb://localhost:27017/veripankki-test'
};

config.serverPORT = {
  development: process.env.DEV_PORT!==undefined ?process.env.PORT :'8080',
  production: process.env.DEV_PORT!==undefined ?process.env.PORT :'8080',
  test: process.env.TEST_PORT!==undefined ?process.env.PORT :'8080'
};

config.dropDBOnStartUp = {
	test: true
}

config.jwtTokenSecret = 'testybear';
module.exports = config;
