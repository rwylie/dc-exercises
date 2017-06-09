var express = require('express');
var body_parser = require('body-parser');
var promise = require('bluebird');
var pgp = require('pg-promise')({
  promiseLib: promise
});

var app = express();  //create your app

var db = pgp({database: 'restaurant'});
app.set('view engine', 'hbs');
app.use(body_parser.urlencoded({extended: false}));
app.use("/static", express.static("public"));
// app.use(express.static('public'));

app.get("/", function (request, response) {
  response.render('homepage.hbs', {});
});

app.get('/search', function (request, response, next) {
  results = []
  var search = request.query.searchTerm;
  var query = `SELECT * FROM restaurant WHERE restaurant.category ILIKE '%${search}%'`;
  db.any(query)
  //generate based on search term
  .then(function (results) {
  response.render('search.hbs', {results: results});
    })
    .catch(next);
});

app.get('/restaurant/:id', function(req, resp, next) {
  let id = req.params.id;
  db.any(`
    select
      restaurant.name as restaurant_name,
      restaurant.address,
      restaurant.category,
      reviewer.name as reviewer_name,
      review.title,
      review.stars,
      review.review
    from
      restaurant
    left outer join
      review on review.restaurant_id = restaurant.id
    left outer join
      reviewer on review.reviewer_id = reviewer.id
    where restaurant.id = ${id}
  `)
    .then(function(reviews) {
      resp.render('restaurant.hbs', {
        restaurant: reviews[0],
        reviews: reviews,
        id: id
        // hasReviews: reviews[0].reviewer_name
      });
    })
    .catch(next);
});

app.post('/submit_review/:id', function(request, response, next) {
  var restaurantId = request.params.id;
  console.log('restaurant ID', restaurantId);
  console.log('from the form', request.body);
  request.body.restaurantId = restaurantId;
  db.none('INSERT into REVIEW values \
  (default, ${stars}, ${title}, ${review}, NULL, ${restaurantId})', request.body)
  .then(function() {
    response.redirect(`/restaurant/${restaurantId}`);
  })
  .catch(next);
});

app.get('/new', function(req, resp) {
  resp.render('new.hbs', {});
});

app.post('/submit_new', function(request, response, next) {
  db.none('INSERT into RESTAURANT values \
 (default, ${name}, ${address}, ${category})', request.body)
 .then(function () {
   response.redirect(`/restaurant/${restaurantID}`);
 })
 .catch(next);
});

app.listen(8000, function () {
  console.log('Listening on port 8000');
});
