"use strict";

let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let port = process.env.PORT || 8081;

app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.get('/20', function (req, res) {
    res.render('days/20/index');
});

io.on('connection', function (socket) {
    socket.on('19_send', function (data) {
        socket.emit('19_listen', data);
        socket.broadcast.emit('19_listen', data);
    });

    socket.on('20_command_send', function (data) {
        socket.broadcast.emit('20_command_listen', data);
    });

    socket.on('21_command_send', function (data) {
        data.socket_id = socket.id;
        socket.broadcast.emit('21_command_listen', data);
    });

    socket.on('disconnect', function(){
        socket.broadcast.emit('21_command_listen', {
            socket_id: socket.id,
            command: 'delete'
        });
    });
});

server.listen(port, function () {
    console.log(`App listening on port ${port}`);
});
