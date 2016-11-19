var net = require("net");
var io = require('socket.io-client');
var host1 = "http://localhost:8080";
var host2 = "http://iot-urencio.rhcloud.com:8000"
var clientSocket = io.connect(host2, {reconnect: true});

var HOST = "192.168.0.6";
var PORT = 5000;

var server = net.createServer({ 'encoding':'utf8'}, function(socket) {
  socket.setEncoding("utf-8");

  socket.on("data", function (data) {
    console.log(data);
    clientSocket.emit("cholula",data);
  });

});

server.listen(PORT,HOST);

console.log("Server listening on " + HOST + ":" + PORT);
