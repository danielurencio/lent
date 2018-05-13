var express = require("express");
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017',function(err,client) {
  const col = client.db('data').collection('watts');

  io.on('connection', function (socket) {
    console.log('Socket.io connection established...');

    socket.on('watts', function (data) {
          col.insert({ 'time':new Date().getTime(), 'watts':data });
	  io.emit('watts',data);
    });
  });

});

app.use(express.static(__dirname + '/'));


app.get('/graph', function(req, res) {
        res.sendFile(__dirname + '/path.html');
});


http.listen(80, function () {
  console.log('Server is running...');
});
