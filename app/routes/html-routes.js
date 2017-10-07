// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");
var db = require("../models");
// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
    res.render("login", {title : "Please Log in or Sign Up"});
  });
  
  app.get("/store", authenticationMiddleware(), function(req, res) {
    db.Categories.findAll({}).then(function (dbResults) {
      console.log("********\n" + dbResults + "~~~~~~~")
      res.render("store", {cat : dbResults});
    })
    
  });
  


  function authenticationMiddleware () {  
    return (req, res, next) => {
      console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

      if (req.isAuthenticated()) return next();
      res.render('login', {title : "Error Loging"})
    }
  }


};
