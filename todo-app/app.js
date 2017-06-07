var express = require('express');
var app = express();
var bodyParser = require('body-parser');  //for form data that is submited, you need a different parser for JSON or another, this is just standard form data

var promise = require('bluebird');
var pgp = require('pg-promise')({
  promiseLib: Promise
});
var db = pgp({database: 'todo'});

app.set('view engine', 'hbs');

app.use(bodyParser.urlencoded({extended: false}));  // set up body parser for form data that is submited
app.use('/static', express.static('public'));

app.get('/', function(request, response) {
  response.redirect('/todos');
});
app.get('/todos', function(request, response) {
  db.any('SELECT * FROM task')
  .then(function(todos) {
    response.render('todos.hbs', {todos: todos});
  })
});


app.post('/add_todo', function(request, response, next) {
  var desc = request.body.description;
  db.none(`INSERT INTO task VALUES (default, '${desc}', FALSE)`)
    .then(function() {
      response.redirect('/todos');
    })
    .catch(next);
});


//port
app.listen(8000, function () {
  console.log('Listening on port 8000');
});
