var MongoClient = require('mongodb').MongoClient,
    config = require('../_config');

var url= config.mongoURI[process.env.NODE_ENV];
console.log(url);
// Establish connection to db
MongoClient.connect(url, {native_parser:true},function(err, db){
        // Drop the collection from this world
        console.log(db);
        db.dropCollection("person", function(err, result) {
          console.log("collection is deleting...");
          db.close();
        });
});
