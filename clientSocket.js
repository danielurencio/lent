var child = require("child_process");
var io = require('socket.io-client');
var host1 = "http://localhost:8080";
var host2 = "http://iot-urencio.rhcloud.com:8000"
var socket = io.connect(host1, {reconnect: true});
var net = require("net");



// Add a connect listener
socket.on('connect', function(Socket) { 
  console.log('Connected!');
  console.log(socket.id)
  socket.emit("id",{ cerebro:"cholula", id:socket.id}); //reconocer de dónde viene la conexión
});

console.log('socket started');

var HOST = /*"192.168.0.9"*/"192.168.1.64";
var PORT = 5045;

var client = new net.Socket();
client.setEncoding("utf-8");

client.connect(PORT, HOST, function() {
  console.log("Connected to: ", HOST, PORT);
});

socket.on("netstatAsk", function(data) {
  child.exec("netstat -nat", function(err, stdout) {
    socket.emit("netstat Say",stdout);
  });
})

var t = 0;
client.on("data", function(data) {
  var temp = data.split("\n");

  if(temp.length == 1) {
    if(temp[0] != t) {
      t = temp[0];
      console.log(t);
      socket.emit("sensor", t);//{ 'temp':t, 'time': new Date().getTime() });
    }
  }
});
