var db = require('../db');
var util = require('../lib/utility');

// Write you session database model methods here
var initialize = function(agent) {
  var hash = util.encrypt(agent);
  var queryString = 'insert into sessions (hash, user_id) values (\'' + hash + '\', ' + (Math.random() * 100) + ')';
  
  return db.queryAsync(queryString, {hash: hash}).return(hash);
};

var checkSession = function(token) {
  // req.body.username = utils.encrypt(req.body.username);
  var queryString = 'SELECT * FROM sessions WHERE hash ="' + token + '"';
  
  return db.queryAsync(queryString, token)
    .then(function(rows) {

      var session = results[0][0];

      if (!session || !session.user_id) {
        return session;
      }

      var secondQuery = 'select username from users where id = ?';
      return db.queryAsync(secondQuery, session.user_id).then(function(result) {
        session.user = result[0][0];
        return session;
      });
    });
};
    
var f = function(token) {
  var que = 'DELETE FROM sessions';
  return db.queryAsync(que, token);
};
  

module.exports = {
  checkSession: checkSession,
  f: f,
  initialize: initialize
};
