var express = require("express");
var app = express();
app.use(express.logger());
app.set("view engine", "tpl");
app.get('/', function(request, response) {
  response.render("index.tpl");
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
