var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	personSchema = Schema({
		name:String,
		email:String,
		phone:Number,
		password:String,
		address:String,
		passportNumber:String,
		votarId:String,
		gender:String,
		occupation:String,
		maritalStatus:String,
		physicalCondition:String,
		dateOfBirth:Date,
		location:String,
		bloodGroup:String,
		registrationDate:{ type: Date, default: Date.now }
	});

personSchema.pre('save', function(next) {
    var person = this;
    return next();
});

var Person = module.exports = mongoose.model('Person', personSchema, 'person');
module.exports.getPersons = function(callback,limit){
	Person.Find(callback).limit(limit);
}
module.exports.addPerson = function(person,callback){
	Person.create(person,callback);
}