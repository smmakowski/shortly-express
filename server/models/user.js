var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

var logIn = function(req, res) {
  req.body.password = utils.encrypt(req.body.password);
  var queryString = 'SELECT * FROM users WHERE username ="' + req.body.username + '"';
  
  return db.queryAsync(queryString, req.body)
    .then(function(rows) {
      if ((rows[0][0].password === req.body.password) && (rows[0][0].username === req.body.username)) {
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    })
    .catch(function(error) {
      res.redirect('/login');
    });
};
var checkSession = function(req, res) {
  req.body.username = utils.encrypt(req.body.username);
  var queryString = 'SELECT * FROM sessions WHERE hash ="' + req.body.username + '"';
  
  return db.queryAsync(queryString, req.body)
    .then(function(rows) {
      // console.log('db', userData.password);
      // console.log('post', req.body.password);
      if ((rows[0][0].hash === req.body.username)) {
        res.redirect('/');
      } else {
        res.redirect('/login');
      }
    })
    .catch(function(error) {
      res.redirect('/login');
    });
};
var addSession = function(req, res) {
  var hash = req.body.username;
  hash = util.encrypt(hash);
  // qr = 'insert into sessions (hash, user_id) values (hash + user_id)'; 
  var queryString = 'SELECT id FROM users WHERE username ="' + req.body.username + '"';
  
  return db.queryAsync(queryString, req.body)
    .then(function(row) {
      var qr = 'insert into sessions (hash, user_id) values (\'' + hash + '\', ' + row[0][0].id + ')';
      return db.queryAsync(queryString, req.body);
    }) .then(function() {
      checkSession(req, res);
    });
};

var getAnotherOne = function(query) {
  query.password = utils.encrypt(query.password);
  var queryString = 'SELECT * FROM users WHERE username = ' + query.username + ' AND password = ' + query.password;
  
  return db.queryAsync(queryString, query)
    .then(function(data) {
      return data;
      
    });
};

var addOne = function(user) {
  
  user.password = utils.encrypt(user.password);
  var queryString = 'INSERT INTO users SET ?';

  return db.queryAsync(queryString, user);
};

module.exports = {
  logIn: logIn,
  addOne: addOne,
  addSession: addSession,
  checkSession: checkSession

};
