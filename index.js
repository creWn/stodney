var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send("<form><a href='/back'><button>Назад</button></a><a href='/forward'><button>Вперед</button></a></form>");
});

app.get('/back', function(request, response) {
  console.log('hello world');
  response.send("<form><a href='/back'><button>Назад</button></a><a href='/forward'><button>Вперед</button></a></form>");
});

app.get('/forward', function(request, response) {
  console.log('hello world');
  response.send("<form><a href='/back'><button>Назад</button></a><a href='/forward'><button>Вперед</button></a></form>");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
