// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads view.html
  app.get("/", function(req, res) {
  	console.log("\n*******"+ req.user +"\n ");
  	console.log(req.isAuthenticated());
    res.render("login", {title : "Please Log in"});
  });
  
  app.get("/store", function(req, res) {
    res.render("store");
  });
  


};
