var https = require('https');
var async = require('async');
var moment = require('moment');

var options = {
  host: 'api.github.com',
  method: 'GET',
  headers: {'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1521.3 Safari/537.36'}
};
module.exports = {
  getData: function(callback){
    async.waterfall([
      function(callback) {
        getRepoIDs(callback);
      },
      function(repos, callback) {
        var repoIds = [];
        repos.forEach(function(repo, index){
          repoIds[index] = repo.id;
        });
        getCommits(repoIds, callback);
      },
      function(actualCommits, callback) {
        var recentCommitsWithCount = getWeeksCommits(actualCommits);
        var mostRecent = mostRecentCommit(actualCommits);
        var learningAbout = getTopicFromTestsAndTutorials(actualCommits)

        var mostRecentRepo = mostRecent.url.split("/HarleyRowland/")[1].split("/")[0];
        var mostRecentMessage = mostRecent.commit.message;
        var recentCommitCount = recentCommitsWithCount.recentCommitCount;
        var returnObject = {
          recentCommitCount: recentCommitCount,
          mostRecentRepo: mostRecentRepo,
          mostRecentMessage: mostRecentMessage,
          learningAbout: learningAbout
        }

        callback(null, returnObject);
      }
    ],
    function(err, results) {
      callback(results);
    });
  }
}

var getRepoIDs = function(cb){
  options.path = '/users/harleyrowland/repos';

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

var getCommits = function(repoIds, cb){
  var commits = [];

  async.each(repoIds, function(repoId, cb1) {
    options.path = '/repositories/' + repoId + '/commits';
    callback = function(response) {
      var str = ''
      response.on('data', function (chunk) {
        str += chunk;
      });
      response.on('end', function () {      
        commits.push(JSON.parse(str));
        cb1();
      });
    }
    var req = https.request(options, callback);
    req.end();
  }, function(err) {
      if( err ) {
        cb('Error!');
      } else {
        cb(null, commits);
      }
  });
}

var getTopicFromTestsAndTutorials = function(repos){
  var topic = "";
  repos.forEach(function(repo){
    if(repo[0].url.includes("repos/HarleyRowland/TestsAndTutorials")){
      topic = repo[0].commit.message.split(" ")[0];
    }
  });
  return topic;
}

var getWeeksCommits = function(repos){
  var allCommits = 0;
  var recentCommits = [];
  repos.forEach(function(repo){
    repo.forEach(function(repoCommit){
      if(isWithinAWeek(repoCommit.commit.author.date)){
        allCommits++;
        recentCommits.push(repoCommit);
      }
    });
  });
  
  var returnData = {
    recentCommits: recentCommits,
    recentCommitCount: allCommits
  }

  return returnData;
}

var mostRecentCommit = function(repos){
  var mostRecent = repos[0][0];

  repos.forEach(function(repo){
    repo.forEach(function(repoCommit){
      if(moment(mostRecent.commit.author.date).isBefore(repoCommit.commit.author.date)){
        mostRecent = repoCommit;
      }
    });
  });

  return mostRecent;
}

function isWithinAWeek(momentDate) {
  var today = moment();
  var diff = today.diff(momentDate, 'days');
  var returnBool;
  if(diff > 7 ){
    returnBool = false;
  } else {
    returnBool = true;
  }
  return returnBool;
}