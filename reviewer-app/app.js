var express = require('express');
var body_parser = require('body-parser');
var promise = require('bluebird');
var pgp = require('pg-promise')({
  promiseLib: promise
});

var morgan = require('morgan');

var app = express();  //create your app
//session middleware
var session =require('express-session');

var db = pgp({database: 'restaurant'});

app.set('view engine', 'hbs');
app.use(body_parser.urlencoded({extended: true}));
app.use("/static", express.static("public"));
// app.use(express.static('public'));

app.use(morgan('dev'));

app.use(session( {
  secret: process.env.SECRET_KEY || 'dev',
  resave: true,
  saveUninitialized: false,
  cookie: {maxAge: 600000}
}));

//user login example
app.use(function (request, response, next) {
  if (request.session.user) {
    next();
  } else if (request.path == '/login') {
    next();
  } else {
    response.redirect('/login');
  }
});

function add_info(request, data) {
  data.session = request.session;
  // data.site_name = "My Site"
  data.title = data.title || 'Foodly';
  return data;
}

app.get("/", function (request, response) {
  console.log(request.session);
  response.render('homepage.hbs', add_info(request, {}));
});

app.get('/search', function (request, response, next) {
  results = []
  var search = request.query.searchTerm;
  var query = `SELECT * FROM restaurant WHERE restaurant.category ILIKE '%${search}%'`;
  db.any(query)
  //generate based on search term
  .then(function (results) {
  response.render('search.hbs', add_info(request, {results: results}));
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
    return [
      reviews,
      db.one(`
        select name as restaurant_name, * from restaurant
        where id = ${id}`)
    ];
  })
  .spread(function(reviews, restaurant) {
    resp.render('restaurant.hbs', {
      restaurant: restaurant,
      reviews: reviews,
      id: id
    });
    // .then(function(reviews) {
    //   resp.render('restaurant.hbs', add_info(req, {
    //     restaurant: reviews[0],
    //     reviews: reviews,
    //     id: id,
    //     // hasReviews: reviews[0].reviewer_name
    //   }));
    })
    .catch(next);
});

app.post('/submit_review/:id', function(request, response, next) {
  var restaurantId = request.params.id;
  request.body.restaurantId = restaurantId;
  let name = request.session.user;
  db.none('INSERT into REVIEW values \
  (default, ${stars}, ${title}, ${review}, NULL, ${restaurantId})', request.body)
  .then(function(restaurant) {
    response.redirect(`/restaurant/${restaurantId}`);
  })
  .catch(next);
});

app.get('/new', function(req, resp) {
  resp.render('new.hbs', {});
});

app.post('/submit_new', function(request, response, next) {
  //how do I get the id from the restaurant after it's created?
  let name = request.body.name;
  let address = request.body.address;
  let category = request.body.category;
  db.one('INSERT INTO restaurant VALUES (DEFAULT, $1, $2, $3) RETURNING restaurant.id', [name, address, category])
 .then(function (restaurant) {
   response.redirect('/restaurant/'+restaurant.id);
 })
 .catch(next);
});

//render login.hbs
app.get('/login', function (request, response) {
  response.render('login.hbs');
});
//user login example
app.post('/login', function (request, response, next) {
  var username = request.body.username;
  var password = request.body.password;
  db.query('SELECT * FROM reviewer WHERE name = $1', username)
    .then(function (results) {
      if (results.length == 0) {
        // send login error
        response.render('login.hbs', {error: 'wrong username or password'});
      } else {
        if (results[0].password == password) {
          request.session.user = username;
          response.redirect('/');
        } else {
          response.render('login.hbs', {error: 'wrong username or password'});
        }
      }
    })
    .catch(next);
});

app.listen(8000, function () {
  console.log('Listening on port 8000');
});
