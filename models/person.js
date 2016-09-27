var mongoose = require('mongoose'),
	bcrypt = require('bcrypt-nodejs'),
	SALT_WORK_FACTOR = 10,
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
		registrationDate:{ type: Date, default: Date.now },
		aboutMe:String,
		totalDonation:Number,
		lastDonation:Date
	});

//Before saving Employee perform additional task like hash password
personSchema.pre('save', function(next) {
    var person = this;
    // only hash the password if it has been modified (or is new)
    if (!person.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(person.password, salt, null, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            person.password = hash;
            next();
        });
    });


});

var Person = module.exports = mongoose.model('Person', personSchema, 'person');
module.exports.getPersonById = function(id,callback){
	Person.findById(id).exec(callback);
}
module.exports.getPersonByQuery = function(query,callback){
	Person.find(query)
		.sort({name: 1})
		.exec(callback);
}
module.exports.addPerson = function(person,callback){
	Person.create(person,callback);
}

module.exports.getUserByUsername = function(userName,callback){
	var query = {email:userName}
	Person.findOne(query,callback);
}

module.exports.updatePersonById = function(id,updateField,callback){
	Person.findByIdAndUpdate(id, { $set: updateField}, {new: true}, function (err, data) {
	  if (err) return handleError(err);
	  return callback(null,data);
	});
}
module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    	if(err) throw err;
    	callback(null, isMatch);
	});
}
