var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var server = require('http').Server(app); // Подключаем http через app
var io = require('socket.io')(server); // Подключаем socket.io и указываем на сервер

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('index');
});

app.get('/*', function(request, response) {
  response.send('404');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
