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

app.get('/33', function (req, res) {
    res.render('pages/33/index');
});
app.get('/34', function (req, res) {
    res.render('pages/34/index');
});
app.get('/35', function (req, res) {
    res.render('pages/35/index');
});

var rooms = [];

io.on('connection', function(socket) {

	socket.on('get rooms', function() {
		socket.emit('send rooms', rooms);
	});

	socket.on('create room', function(room, user) {
		var roomObj = {
			name: room,
			users: [user]
		};
		rooms.push(roomObj);
		socket.join(room);
		socket.emit('send users', roomObj.users);
	});

	socket.on('join to room', function(room, user) {
		var roomUsers = null;
		rooms.forEach(function(roomItem) {
			if (roomItem.name === room) {
				roomItem.users.push(user);
				roomUsers = roomItem.users;
			};
		})
		socket.join(room);
		socket.to(room).emit('add user', user);
		socket.emit('send users', roomUsers);
	});

	socket.on('send coord', function(user) {
		socket.to(user.room).emit('send coord', user);
	});

	socket.on('disconnect', function() {
		rooms.forEach(function(room) {
			room.users.forEach(function(user, index) {
				if (user.id === socket.id) {
					room.users.splice(index, 1);
					socket.to(room.name).emit('delete user', user);
				}
			})
		});
	});
});

server.listen(port, function () {
    console.log(`App listening on port ${port}`);
});
