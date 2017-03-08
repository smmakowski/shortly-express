var Sessions = require('../models/session');
var util = require('../lib/utility');

var createSession = function(req, res, next) {
  var agent = req.headers['user-agent'];
  console.log('are these...?', agent);

  var random = Math.random().toString();
  
  var hash = util.encrypt(random.toString());
  res.cookies.shortlyid = {value: hash};
  req.session = {hash: hash};

  if (agent === undefined) {
    var hash = util.encrypt(random.toString());
    res.cookies.shortlyid = {value: hash};
    req.session = {hash: hash};
  } else if (!req.cookies.shortlyid) {
    return Sessions.initialize(agent).then(function(hash) {
      res.cookie('shortlyid', hash);
      next();
    });
  }  

  // res.clearCookie('shortlyid');

  // return Sessions.f()
  // .then (function(){
  //   res.clearCookie('shortlyid');

  //   }).then
  
  // Sessions.checkSession(req.cookies.shortlyid).then(function(session) {
  //   if (!session) {
  //     res.clearCookie('shortlyid');
  //     return next();
  //   }

  //   if (util.encrypt(agent) !== session.hash) {
  //     return Sessions.destroy(sessions.hash)
  //     .then(function() {
  //       res.clearCookie('shortlyid');
  //       next();
  //     });
  //   }
  //   req.session = session;
  //   next();
  // });
//   var hash = util.encrypt(random.toString());
//   res.cookies.shortlyid = {value: hash};
//   req.session = {hash: hash};
  
  next();
};

module.exports = createSession;
