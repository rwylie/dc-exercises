var express = require('express');
var app = express();
app.set('view engine', 'hbs')
app.use('/static', express.static('public'));

app.get('/', function(request, response) {
  response.send('<h1>Hello World!</h1>');

  // response.render('hello.hbs', context)
});

app.get('/cats', function(request, response) {
  response.send('cats.hbs');
});

app.get('/dogs', function(request, response) {
  response.send('dogs.hbs');
});

app.get('/cats_and_dogs', function(request, response) {
  response.send('dogs_and_cats.hbs');
});

app.get('/age/:year', function(request, response) {
  let year = request.params.year;
  let age = (2017 - year);
  response.send('You are roughly ' + age + ' years old.')
})

app.get('/year', function(request, response) {
  var age = request.query.age;
  response.send('You were born in ' + (2017 - age));
});


app.get('/greet/:name', function (request, response) {
  var name = request.params.name;
  var year = request.query.year;
  var age = (2017 - year);
  context = {
    name: name,
    age: age
  }
  response.render('greet.hbs', context);
});

app.get('/fav_animals', function (request, response) {
  var animals = [
    { name: 'cats', favorite: true },
    { name: 'dogs', favorite: true },
    { name: 'tree frogs', favorite: true },
    { name: 'earth worms', favorite: false },
    { name: 'guinea pigs', favorite: true },
  ];
  context = {animals: animals}
  response.render('fav_animals.hbs', context);
});



app.listen(8000, function () {
  console.log('Listening on port 8000');
});
