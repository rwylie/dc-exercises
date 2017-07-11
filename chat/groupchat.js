var express = require('express');
var app = express();
//we need it to also handle web sockets
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('view engine', 'hbs');

app.get('/', function (request, response) {
  response.render('groupchat.hbs');
});

io.on('connection', function(client){
  console.log('CONNECTED');
  client.on('disconnect', function () {
    console.log('EXITED');
  });

  client.on('join-room', function(room){
  client.join(room, function() {
    console.log(client.rooms);
    io.to(room).emit('chat-msg', '**new user joined**');
  });
    client.on('incoming', function(msg){
      io.to(msg.room).emit('chat-msg', msg.msg);
    });
  });
}); //not sure if you need this one
//instead of app.listen we not only want web request but socket immessions
http.listen(9000, function () {
  console.log('listening on port 9000');
});
