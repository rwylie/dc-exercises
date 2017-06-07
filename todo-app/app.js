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

app.post('/delete', function(request, response, next) {
  // console.log(request.body);
  console.log(typeof(request.body.task));
  var taskId = request.body.task;
  var plist = [];
  if (typeof(taskId) === 'object') {
    for (var i=0; i < taskId.length; i++) {
      var p = db.none('DELETE FROM task WHERE id = $1', taskId[i]);
      plist.push(p);
    }
  }
  else {
    var p = db.none('DELETE FROM task WHERE id = $1', taskId);
    plist.push(p);
  }

  promise.all(plist).then(function () {
    console.log('delete successful');
    response.redirect('/todos');
  })
    .catch(next);
  // .then(function() {
  //  response.redirect('/todos');
  // })
  // .catch(next);
  // response.send('OK');
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
