// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all 
  app.get("/api/posts/", function(req, res) {
    db.Product.findAll({}).then(function(dbAuthor) {
      res.json(dbAuthor);
    });
  });



  // POST route for saving a new product
  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    
  });

  // DELETE route for deleting 
  app.delete("/api/posts/:id", function(req, res) {
    
  });

  // PUT route for updating posts
  app.put("/api/posts", function(req, res) {
    
  });

  // POST to log in users
  app.post("/login", function(req, res) {

    console.log(req.body);

    res.render("login");
  });


};
