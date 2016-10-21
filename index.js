var express = require('express');
var app = express();
var httpStatus = require('http-status');
var python = require('python-shell');

var emailController = require('./controllers/emailController');
var duolingoController = require('./controllers/duolingoController');
var leagueController = require('./controllers/leagueController')
var githubController = require('./controllers/githubController')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
  res.send('Express server serving harleyrowland.com.');
});

app.get('/duolingo', function (req, res) {
  var callback = function(data){
    res.send(data);
  }
  duolingoController.getData(callback);
});

app.get('/leagueOfLegends', function (req, res) {
  var callback = function(data){
    res.send(data);
  }
  leagueController.getData(callback);
});

app.get('/github', function (req, res) {
  var callback = function(data){
    res.send(data);
  }
  githubController.getData(callback);
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


