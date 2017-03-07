var db = require('../db');
var utils = require('../lib/utility');

// Write you user database model methods here

var getOne = function(query) {
  var queryString = 'SELECT * FROM users WHERE username = ' + query.username;
  
  return db.queryAsync(queryString, query)
    .then(function() {
      return true;
    })
    .error(function() {
      return false;
    });
};

var addOne = function(user) {
  
  user.password = utils.encrypt(user.password);
  var queryString = 'INSERT INTO users SET ?';

  return db.queryAsync(queryString, user);
};

module.exports = {
  getOne: getOne,
  addOne: addOne

};
