var express = require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function (socket){
   console.log('connection');

  socket.on('watts', function (data) {
          console.log(data);
          io.emit('watts',data);
  });

});

app.use(express.static(__dirname + '/'));


app.get('/graph', function(req, res) {
        res.sendFile(__dirname + '/path.html');
});


http.listen(80, function () {
  console.log('listening on *:3000');
});

