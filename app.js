//custom server ftw 
'use strict'

var express = require('express');

var app = express();
app.use(express.static('public'));

app.get('/', function (req, res) {
	console.log('Request to Index')
  res.send('index.html');
});


var server = app.listen(process.env.PORT || 5000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('S&D @ TSA is listening at http://%s:%s', host, port);
});