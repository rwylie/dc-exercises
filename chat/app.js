var express = require('express');
var app = express();
//we need it to also handle web sockets
var http = require('http').Server(app);
var io = require('socket.io')(http);
var jwt = require('jsonwebtoken');

var SECRET = 'SUPER-SECRET';

app.set('view engine', 'hbs');
//app.use('/static', express.static('static')); //?
app.get('/', function (request, response) {
  var token = jwt.sign({user: 'ronda'}, SECRET, {expiresIn: 60 * 60});
  response.render('chat.hbs', {token: token});
});

io.on('connection', function(client){
  console.log('CONNECTED', client.id);

  client.on('disconnect', function () {
    console.log('EXITED');
  });
  //client.on('incoming', function(msg){  //catch event
  //io.emit('chat-msg', msg); //sent the message back called chat-msg  io.emit: sends to everyone if you do client.emit it sends to only one.
  //});
  client.on('join-room', function(room) {
    client.join(room, function () {
      console.log(client.rooms);
      io.to(room).emit('chat-msg', '**new user joined**');
    });

    client.on('incoming', function (msg) {
      try {
        var decoded = jwt.verify(msg.token, SECRET);
      } catch (e) {
        io.to(msg.room).emit('chat-msg', 'Sorry!!');
        return;
      }
      console.log(decoded);
      io.to(msg.room).emit('chat-msg', msg.msg);
    });
  });
});
//instead of app.listen we not only want web request but socket immessions
http.listen(9000, function () {
  console.log('listening on port 9000');
});
