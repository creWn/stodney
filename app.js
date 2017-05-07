"use strict";

let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let port = process.env.PORT || 8081;

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/21', function (req, res) {
    res.render('pages/21/index');
});
app.get('/21/controllers', function (req, res) {
    res.render('pages/21/controllers');
});

var array_sprites = {};
io.on('connection', function (socket) {
    socket.on('19_send', function (data) {
        socket.emit('19_listen', data);
        socket.broadcast.emit('19_listen', data);
    });

    socket.on('20_command_send', function (data) {
        socket.broadcast.emit('20_command_listen', data);
    });

    socket.emit('21_command_listen', array_sprites);
    socket.broadcast.emit('21_command_listen', array_sprites);
    socket.on('21_command_send', function (data) {
        if (socket.id in array_sprites) {
            switch (data.command) {
                case 'up':
                    array_sprites[socket.id].y -= 10;
                    break;
                case 'down':
                    array_sprites[socket.id].y += 10;
                    break;
                case 'right':
                    array_sprites[socket.id].x += 10;
                    break;
                case 'left':
                    array_sprites[socket.id].x -= 10;
                    break;
            }
        } else {
            array_sprites[socket.id] = {
                x: 40,
                y: 40
            };
        }

        socket.broadcast.emit('21_command_listen', array_sprites);
    });

    socket.on('disconnect', function(){
        delete array_sprites[socket.id];
        socket.broadcast.emit('21_command_listen', array_sprites);
    });
});

server.listen(port, function () {
    console.log(`App listening on port ${port}`);
});
