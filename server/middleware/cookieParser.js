var parseCookies = function(req, res, next) {
  var obj = {};
  
  if (req.headers.cookie) {
    // split the coookie string up om ';'
    var cookies = req.headers.cookie.split('; ');

    // split the remaining cookies on =; for
    for (var i = 0; i < cookies.length; i++) {
      var tuple = cookies[i].split('=');
      obj[tuple[0]] = tuple[1];
    }
    // go through our new array and reduce object with cookies
    
  }
  
  req.cookies = obj;

  next();
};

module.exports = parseCookies;
