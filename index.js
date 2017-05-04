var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send("<form><button>Назад</button>");
  response.send("<button>Вперед</button></form>");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
