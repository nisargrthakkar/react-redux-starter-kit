var express = require('express');
var app = express();

app.use(express.static(__dirname + '/dist'));
app.set('views', __dirname + '/dist/');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.get('/*', (req, res) => {
  res.render('index.html');
});

app.listen(8081, () => {
  console.log('MD listening on port 8081!');
});
