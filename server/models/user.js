var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

var otherLogIn = function(req, res) {
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
  // addSession: addSession,
  // checkSession: checkSession
  otherLogIn: otherLogIn

};
