var express = require('express');
var app = express();
var httpStatus = require('http-status');

var emailController = require('./controllers/emailController');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Express server serving harleyrowland.com.');
});

app.get('/email', function(req, res){
  var callback = function(data){
    res.send(data);
  }
  var query = req.query;
  if(req && query && query.name && query.email && query.subject && query.body) {
  	emailController.sendEmail(query.name, query.email, query.subject, query.body, callback);
  } else {
    return callback(httpStatus.BAD_REQUEST);
  }
});


app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


