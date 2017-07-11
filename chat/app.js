var express = require('express');
var app = express();
//we need it to also handle web sockets
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'hbs');

app.get('/', function (request, response) {
  response.render('chat.hbs');
});

io.on('connection', function(client){
  console.log('CONNECTED');
  client.on('disconnect', function () {
    console.log('EXITED');
  });
  client.on('incoming', function(msg){  //catch event
  io.emit('chat-msg', msg); //sent the message back called chat-msg  io.emit: sends to everyone if you do client.emit it sends to only one.
  });
});
//instead of app.listen we not only want web request but socket immessions
http.listen(9000, function () {
  console.log('listening on port 9000');
});
