var Sessions = require('../models/session');
var util = require('../lib/utility');

var createSession = function(req, res, next) {
  console.log('this is time', req.body);
  var random = Math.random();
  
  var hash = util.encrypt(random.toString());
  res.cookies.shortlyid = {value: hash};
  req.session = {hash: hash};
  
  next();
};

module.exports = createSession;
