var express = require('express');
var body_parser = require('body-parser');
var promise = require('bluebird');
var pgp = require('pg-promise')({
  promiseLib: promise
});

var app = express();  //create your app

var db = pgp({database: 'test'});
app.set('view engine', 'hbs');
app.use(body_parser.urlencoded({extended: false}));
app.use("/static", express.static("public"));
// app.use(express.static('public'));

app.get("/", function (request, response) {
  response.render('homepage.hbs', {});
});

app.get('/search', function (request, response) {
  var search = request.query.searchTerm;
  //generate based on search term
  //results = []
  response.render('search.hbs', {results: results});
});

app.listen(9000, function () {
  console.log('Listening on port 9000');
});
