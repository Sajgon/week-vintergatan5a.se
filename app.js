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
  console.log("called for week", week);
   res.send("Vecka: " + week);
})
