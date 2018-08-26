var express = require('express');
var app = express();
var path = require('path');

var port = 5000;
app.use(express.static('static'));
app.get('/', (req,res) => res.sendFile(path.join(__dirname + '/index.html')));
app.listen(port, () => console.log(`Listening on port ${port}`));
