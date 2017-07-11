var express = require('express');
var app = express();
//we need it to also handle web sockets
var http = require('http').Server(app);
var io = require('socket.io')(http);
//app.set('view engine', 'hbs');
app.use(express.static('public'));


io.on('connection', function(socket) {
  console.log('CONNECTED');
  socket.on('disconnect', function () {
    console.log('EXITED');
  });
  socket.on('draw', function(past, current, color, size) {
    socket.broadcast.emit('draw', past, current, color, size);
  });
});


//instead of app.listen we not only want web request but socket immessions
http.listen(8000, function () {
  console.log('listening on port 8000');
});
