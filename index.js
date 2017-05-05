var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
 
app.set('port', (process.env.PORT || 5000));
 
app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
