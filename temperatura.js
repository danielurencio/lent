var express = require('express');
var app = express();
var httpServer = require('http').createServer(app);
var five = require('johnny-five');
var io = require('socket.io')(httpServer);


////////////////////////////////////////////////////////////////////////
// Servidor
//////////////////////////////////////////////////////////////////////

app.use(express.static(__dirname + '/'));

app.get('/', function(req, res) {
        res.sendFile(__dirname + '/temperatura.html');
});

httpServer.listen(8080, '0.0.0.0', function() {
        console.log('El servidor está listo...');
});



//////////////////////////////////////////////////////////////////////
// Placa
/////////////////////////////////////////////////////////////////////

var board = new five.Board();

board.on("ready", function() {
  // This requires OneWire support using the ConfigurableFirmata
  var temperature = new five.Temperature({
    controller: "DS18B20",
    pin: 2
  });

  temperature.on("data", function(err, value) {
    console.log(this.celsius + "°C");
    board.emit("temp", this.celsius);  // Socket: de placa a servidor.


  });
});

/////////////////////////////////////////////////////////////////////
// Socket.io
////////////////////////////////////////////////////////////////////

io.on('connection', function(socket) {
        console.log(socket.id);

        board.on("temp", function( val) {
                socket.emit("ya", { val: val }); // De servidor a cliente.
        });
});

