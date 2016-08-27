
var superagent = require('superagent'),
  expect = require('expect.js'),
  config = require('../_config');
  port = config.serverPORT[process.env.NODE_ENV],
  server_url = 'http://localhost:'+port;

describe('BloodBank-backend rest api server', function(){
  it('should get response 200', function(done){
    superagent
      .get(server_url)
      .end(function(err, res){
        expect(err).to.eql(null)
        expect(res.status).to.eql(200)
        done()
      });
  })

  it('should create a person', function(done){
    superagent
      .post(server_url+'/api/person')
      .send({
          email: 'sakib3@gmail.com',
          password: '123456'
      })
      .end(function(e, res){
        expect(e).to.eql(null)
        expect(res.status).to.eql(200)
        done()
      })
  })
})
