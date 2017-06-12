var express = require('express');
var app = express();
//we need it to also handle web sockets
var http = require('http').Server(app);
var io = require('socket.io')(http);
//app.set('view engine', 'hbs');
app.use(express.static('public'));



//instead of app.listen we not only want web request but socket immessions
http.listen(8000, function () {
  console.log('listening on port 8000');
});
