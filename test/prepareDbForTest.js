var MongoClient = require('mongodb').MongoClient,
    config = require('../_config');

var url= config.mongoURI[process.env.NODE_ENV];

// Establish connection to db
MongoClient.connect(url, function(err, db){
        // Drop the collection from this world
        db.dropCollection("person", function(err, result) {
          console.log("collection is deleting...");
          db.close();
        });
});
