"use strict";

let express = require('express');
let app = express();
let server = require('http').createServer(app);
let io = require('socket.io')(server);
let port = process.env.PORT || 8081;


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('pages/index');
});

app.get('/22', function (req, res) {
    res.render('pages/22/server');
});
app.get('/22/mr', function (req, res) {
    res.render('pages/22/client');
});
app.get('/23', function (req, res) {
    res.render('pages/22/server');
});
app.get('/24', function (req, res) {
    res.render('pages/24/server');
});
app.get('/28', function (req, res) {
    res.render('pages/28/index');
});
app.get('/29', function (req, res) {
    res.render('pages/29/index');
});
app.get('/30', function (req, res) {
    res.render('pages/30/index');
});
app.get('/31', function (req, res) {
    res.render('pages/31/index');
});
app.get('/32', function (req, res) {
    res.render('pages/32/index');
});
app.get('/34', function (req, res) {
    res.render('pages/34/index');
});

var coords = {};

io.on('connection', function (socket) {
    socket.emit('circlexy_listen', coords);
    socket.broadcast.emit('circlexy_listen', coords);
    socket.on('circlexy_send', function (data) {

        if (socket.id in coords) {
            coords[socket.id].x = data.x;
            coords[socket.id].y = data.y;
            coords[socket.id].color = data.color;
            coords[socket.id].nick = data.nick;
            coords[socket.id].res = data.res;
        } else {
            coords[socket.id] = {
                x: 400,
                y: 300,
                color: 'red',
                res: 10
            };
        }
        socket.broadcast.emit('circlexy_listen', coords);
    });

    var room = '';
    socket.on('room_id', function (data) {
        room = data;
        socket.join(data);
    });

    socket.in('H3R0Ku').emit('console', 'H3R0Ku');

    socket.on('29_send', function (data) {
        if (socket.id in coords) {
            coords[socket.id].x = data.x;
            coords[socket.id].y = data.y;
            coords[socket.id].color = data.color;
            coords[socket.id].size = data.size;
        } else {
            coords[socket.id] = {
                x: 400,
                y: 300,
                color: 'red',
                size: 40
            };
        }
        socket.in(room).broadcast.emit('29_get', coords);

    });
    
    socket.on('disconnect', function(){
        delete coords[socket.id];
        socket.broadcast.emit('circlexy_listen', coords);
    });
});

server.listen(port, function () {
    console.log(`App listening on port ${port}`);
});
