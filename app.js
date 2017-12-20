const express = require('express');
const app = express();
const scraperjs = require('scraperjs');

let week = 0;
//app.use(express.static(__dirname + '/www'));

app.listen(2999, function () {
  console.log('Webserver listening on port 2999');
});

async function updateWeek(){
  scraperjs.StaticScraper.create('https://vecka.nu/')
      .scrape(function($) {
          return $("time").map(function() {
              return $(this).text();
          }).get();
      })
      .then(function(news) {
          week = news[0];
          console.log(week);
      })
}

updateWeek();


app.get('/', function (req, res) {
    
    console.log("req",req);
    
    
    
    // Connection URL
    const dbName = "Vintergatan5a-analystics";
    var url = 'mongodb://localhost:27017/Vintergatan5a-analystics';

    
    // Add visitor statistics
    var insertDocuments = function(db, callback) {
          // Get the documents collection
          var collection = db.collection('visitors');
          // Insert some documents
          let d = new Date();
          
          collection.insertMany([{date: d.getTime()}], function(err, result) {
            assert.equal(err, null);
            //console.log("Inserted "+result.ops.length+" documents into the document collection");
            callback(result);
          });
    }

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, database) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
        
        const myDB = database.db(dbName);
        const collection = myDB.collection('visitors');
        
        findDocuments(myDB, function() {
            //console.log("Found data!");
        });
        
        //insertDocuments(myDB, function() {
            //console.log("Inserted data!");
        //});
         
    });
    
    
    
    
    
    
    
    
    
   console.log("called for week", week);
   res.send("Vecka: " + week);
})
