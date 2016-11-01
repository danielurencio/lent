var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);
var io = require('socket.io')(httpServer);
var net = require("net");

var HOST = "192.168.1.64";
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

httpServer.listen(8080, '0.0.0.0', function() {
        console.log('El servidor está listo...');
});
  

var t = 0;
  client.on("data", function(data) {
    var temp = data.split("\n");

    if(temp.length == 1) {
      if(temp[0] != t) {
        t = temp[0];
	console.log(t);
//        socket.emit("ya", { val: t }); // De servidor a cliente.
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
