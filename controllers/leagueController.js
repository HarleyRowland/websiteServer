var https = require('https');
var async = require('async');

var options = {
  host: 'euw.api.pvp.net',
  method: 'GET'
};

module.exports = {
  getData: function(callback){
    async.series([
      function(callback) {
        getBasics(callback);
      },
      function(callback) {
        async.waterfall([
          function(callback) {
            getLastGame(callback);
          },
          function(data, callback) {
            getChamp(data, callback);
          }
        ],
        function(err, results) {
          callback(null, results);
        });
      }
    ],
    function(err, results) {
      callback(results);
    });
  }
}

var getBasics = function(cb){
  options.path = '/api/lol/euw/v1.4/summoner/by-name/haychdizzle?api_key=RGAPI-06E2404A-7D0D-47AE-9B67-60BA7076474F';

  callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      cb(null, JSON.parse(str));
    });
  }

  var req = https.request(options, callback);
  req.end();
}

var getLastGame = function(cb){
  options.path = '/api/lol/euw/v1.3/game/by-summoner/56418416/recent?api_key=RGAPI-06E2404A-7D0D-47AE-9B67-60BA7076474F';

  callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      cb(null, JSON.parse(str).games[0]);
    });
  }

  var req = https.request(options, callback);
  req.end();
}

var getChamp = function(data, cb){
  options.host = 'global.api.pvp.net'
  options.path = '/api/lol/static-data/euw/v1.2/champion/'+ data.championId+'?api_key=RGAPI-06E2404A-7D0D-47AE-9B67-60BA7076474F';

  callback = function(response) {
    var str = ''
    response.on('data', function (chunk) {
      str += chunk;
    });

    response.on('end', function () {
      data.championName = JSON.parse(str).name;
      cb(null, data);
    });
  }

  var req = https.request(options, callback);
  req.end();
}
