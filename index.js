var app = require('express')();

var http = require('http').Server(app);

var io = require('socket.io')(http);

app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.get('/20', function(req, res) {
    res.sendFile(__dirname + '/days/20/index.html');
 
});

io.on('connection', function(socket){
  console.log('a user connected');
});
