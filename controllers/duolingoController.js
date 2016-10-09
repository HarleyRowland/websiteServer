var httpStatus = require('http-status');
var python = require('python-shell');

module.exports = {
  getData: function(callback){
    python.run('duoScript.py', function (err, results) { 

      var res = JSON.parse(results);
      var language = res.language_data.es.language_string;
      var streak = res.language_data.es.streak;
      var level = res.language_data.es.level;
      var levelPerecentage = res.language_data.es.level_percent;
      var fluency = res.language_data.es.fluency_score;
      var nextLesson = res.language_data.es.next_lesson.skill_title;

      return callback({language, streak, level, levelPerecentage, fluency, nextLesson});
    });
  }
}