function isAuthenticated(req, res, next) {
    if (req.session && req.session.email) { // check if session exists and user is authenticated
      return next();
    }
    else {
      res.redirect('/login'); // if not, redirect to login page
    }
  }


  module.exports = isAuthenticated;