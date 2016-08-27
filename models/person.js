var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	personSchema = Schema({
		name:{type:String, required:true},
		email:{type:String, required:true},
		phone:{type:Number, required:true},
		password:{type:String, required:true},
		address:{type:String, required:true},
		country:{type:String, required:true},
		nationality:{type:String, required:true},
		passportNumber:{type:String, required:true},
		votarId:{type:String, required:true},
		gender:{type:String, required:true},
		occupation:String,
		maritalStatus:String,
		physicalCondition:String,
		dateOfBirth:{type:Date, required:true},
		currentLocation: {
					type: [Number],  // [<longitude>, <latitude>]
    				index: '2d' // create the geospatial index
    	},
    	currentLocationUpdateTimeStamp:Date,
		bloodGroup:{
					type:String,
					enum: ['A+','A-','B+','B-','O+','O-','AB+','AB-'],
					required: true
		},
		registrationDate:{ type: Date, default: Date.now }
	});

//Before saving Employee perform additional task like hash password
personSchema.pre('save', function(next) {
    var person = this;
    return next();
});

var Person = module.exports = mongoose.model('Person', personSchema, 'person');
module.exports.getPersonById = function(id,callback){
	Person.findById(id)
		.exec(callback);
}
module.exports.addPerson = function(person,callback){
	Person.create(person,callback);
}