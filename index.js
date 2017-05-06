'use strict';

const express = require('express');
const socketIO = require('socket.io');
const path = require('path');

var app = express()
  .use((req, res) => res.sendFile(INDEX) )
.listen(PORT, () => console.log(`Listening on ${ PORT }`));

const io = socketIO(server);

app.get('/', function(req, res) {
    res.send("Hello World!");
});

app.get('/20', function(req, res) {
    res.sendFile(__dirname + '/days/20/index.html');
 
});
