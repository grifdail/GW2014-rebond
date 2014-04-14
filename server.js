var express = require('express');
var app = express()
var port = 8080;
var http = require('http')
var server = http.createServer(app).listen(port)
var io = require('socket.io').listen(server);
app.use("/",express.static(__dirname + '/'));
 
io.sockets.on('connection', function (socket) {
  socket.on('broadcast', function (data) {
    socket.broadcast.emit(data.name, data.arg);
  });
  socket.on('publish', function (data) {
    io.sockets.emit(data.name, data.arg);
  });
  socket.on('disconnect', function (data) {
    io.sockets.emit(socket.id);
  });
  socket.emit("new socket id",socket.id);
});
 
console.log("listening on port "+port+".")