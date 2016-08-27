
var superagent = require('superagent'),
  expect = require('expect.js'),
  config = require('../_config');
  port = config.serverPORT[process.env.NODE_ENV],
  server_url = 'http://localhost:'+port,
  moment = require('moment');

var date = moment(),
    now = date.format(),
    dateOfBirth = date.format('1971-03-25','YYYY-MM-DD'),
    name="John Doe",
    email="john@gmail.com",
    phone=123456,
    password="Whats Up",
    address="Tråndsund,Stockholm",
    country="Sweden",
    nationality="Swedish",
    passportNumber="A0123456",
    votarId="12345678",
    gender="Male",
    occupation="Job Holder",
    maritalStatus="Single",
    physicalCondition="Good",
    dateOfBirth= dateOfBirth,
    currentLocation=[
      23.600800037384033,
      46.76758746952729
    ],
    currentLocationUpdateTimeStamp=now,
    bloodGroup="A+";

var newPerson={
          name:name,email:email,phone:phone,password:password,
          address:address,country:country,nationality:nationality,
          passportNumber:passportNumber,votarId:votarId,gender:gender,
          occupation:occupation,maritalStatus:maritalStatus,
          physicalCondition:physicalCondition,dateOfBirth: dateOfBirth,
          currentLocation:currentLocation,
          currentLocationUpdateTimeStamp:currentLocationUpdateTimeStamp,bloodGroup:bloodGroup
}

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
      .send(newPerson)
      .end(function(err, res){
        expect(res.body.name).to.eql(newPerson.name)
        expect(res.status).to.eql(200)
        done()
      })
  })

   it('should not create a person when required fields not found', function(done){
    anotherPerson={
                    occupation:newPerson.occupation,
                    maritalStatus:newPerson.maritalStatus,
                    physicalCondition:newPerson.physicalCondition,
                    currentLocation:newPerson.currentLocation,
                    currentLocationUpdateTimeStamp:newPerson.currentLocationUpdateTimeStamp

    }
    superagent
      .post(server_url+'/api/person')
      .send(anotherPerson)
      .end(function(err, res){
        expect(res.body.message).to.eql('Person validation failed')
        expect(res.body.errors).to.include.keys('name');
        expect(res.body.errors).to.include.keys('email');
        expect(res.body.errors).to.include.keys('dateOfBirth');
        expect(res.body.errors).to.include.keys('phone');
        expect(res.body.errors).to.include.keys('password');
        expect(res.body.errors).to.include.keys('address');
        expect(res.body.errors).to.include.keys('country');
        expect(res.body.errors).to.include.keys('nationality');
        expect(res.body.errors).to.include.keys('passportNumber');
        expect(res.body.errors).to.include.keys('votarId');
        expect(res.body.errors).to.include.keys('gender');
        expect(res.body.errors).to.include.keys('bloodGroup');
        done()
      })
  })
})
