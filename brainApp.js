var express = require('express');
var app = express();
var http = require("http");
var httpServer = http.createServer(app);
var clientSocket = require("socket.io-client");
var io = require('socket.io')(httpServer);
var net = require("net");
var ioC = require('socket.io-client');
var host1 = "http://localhost:8080";
var host2 = "http://iot-urencio.rhcloud.com:8000"
var clientSocket = ioC.connect(host2, {reconnect: true});

var HOST = process.argv[2];
var PORT = 5000;

var server = net.createServer({ 'encoding':'utf8'}, function(socket) {
  socket.setEncoding("utf-8");

  socket.on("data", function (data) {
    console.log(data);
    io.emit("ya",data);
//    clientSocket.emit("cholula",data);
  });

});

server.listen(PORT,HOST);

console.log("Server listening on " + HOST + ":" + PORT);

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/temperatura.html');
});

httpServer.listen(3000, '0.0.0.0', function() {
        console.log('El servidor está listo...');
});
