var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
app.set('port', (process.env.PORT || 5000));
 
app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.get('/19', function(req, res) {
    res.sendFile(__dirname + '/days/19/index.html');
});

app.get('/20', function(req, res) {
 
io.listen(server, {
     
    onClientConnect: function(client){
            console.log('hello');
    },
     
    onClientDisconnect: function(client){
        // Действие при отключении пользователя
    },
     
    onClientMessage: function(message, client) {
        // Действие при получении сообщения от пользователя
    }
     
});
    res.sendFile(__dirname + '/days/20/index.html');
 
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
