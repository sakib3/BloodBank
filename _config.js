var config = {};

config.mongoURI = {
  development: process.env.DEV_DB_URL!==undefined ?process.env.DEV_DB_URL :'mongodb://localhost/veripankki',
  production: process.env.DEV_DB_URL!==undefined ?process.env.DEV_DB_URL :'mongodb://localhost/veripankki',
  test: process.env.TEST_DB_URL!==undefined ?process.env.TEST_DB_URL :'mongodb://localhost/veripankki-test'
};

config.serverPORT = {
  development: process.env.DEV_PORT!==undefined ?process.env.DEV_PORT :'3000',
  production: process.env.DEV_PORT!==undefined ?process.env.DEV_PORT :'3000',
  test: process.env.TEST_PORT!==undefined ?process.env.TEST_PORT :'3000'
};

config.dropDBOnStartUp = {
	test: true
}

config.jwtTokenSecret = 'testybear';
module.exports = config;
