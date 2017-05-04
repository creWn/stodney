var express = require("express");
var app = express();
app.use(express.logger());

app.get('/', function(request, response) {
  response.send(index());
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});

function index() {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  
  res.write('<form>');
  res.write('<button>');
  res.write('Назад');
  res.write('</button>');
  res.write('<button>');
  res.write('Вперед');
  res.write('</button>');
  res.write('</form>');

  res.end();
}
