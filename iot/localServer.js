var express = require('express');
var app = express();
var http = require("http");
var httpServer = http.createServer(app);
var clientSocket = require("socket.io-client");
var io = require('socket.io')(httpServer);
var net = require("net");

var HOST = /*"192.168.0.9"*/"192.168.1.64";
var PORT = 5045;

var client = new net.Socket();
client.setEncoding("utf-8");

client.connect(PORT, HOST, function() {
  console.log("Connected to: ", HOST, PORT);
});


app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/temperatura.html');
});

httpServer.listen(3000, '0.0.0.0', function() {
        console.log('El servidor está listo...');
});
  


//tcp client

var t = 0;
client.on("data", function(data) {
  var temp = data.split("\n");

  if(temp.length == 1) {
    if(temp[0] != t) {
      t = temp[0];
//      var T="t=" + t;
      console.log(t);
//      req.end(T); //req.end();


    }
  }
});



io.on('connection', function(socket) {
  console.log(socket.id);
  var t = 0;

  client.on("data", function(data) {
    var temp = data.split("\n");

    if(temp.length == 1) {
      if(temp[0] != t) {
        t = temp[0];
        socket.emit("ya", { val: t }); // De servidor a cliente.
      }
    }

  });

});
