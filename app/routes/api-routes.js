// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our Todo model
var db = require("../models");
var Sequelize = require('sequelize');
var expressValidator = require('express-validator');
var bcrypt = require("bcrypt");
var passport = require("passport");
var saltRounds = 10;

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all 
  app.get("/api/get-all-products", function(req, res) {
    db.Product.findAll({}).then(function(dbResults) {
      res.json(dbResults);
    });
  });

  app.get("/api/get-all-categories", function(req, res) {
    db.Categories.findAll({}).then(function(dbResults) {
      res.json(dbResults);
    });
  });

  app.get("/api/get-products-by-categories/:id", function(req, res) {
    db.Product.findAll({where : {CategoryId : req.params.id}, include: [{model: db.Categories}]}).then(function(dbResults) {
      res.json(dbResults);
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

  app.post("/log-in", passport.authenticate('local', {
    successRedirect: '/store',
    failureRedirect: '/'
  }));

  app.get("/log-out", function(req, res) {
    req.logout();
    req.session.destroy();
    res.redirect("/");
  });


  // POST to log in users
  app.post("/sign-up", function(req, res) {

    // uses validator in toder to check for good data
    req.checkBody('username', 'Username field cannot be empty.').notEmpty();
    req.checkBody('username', 'Username must be between 4-15 characters long.').len(4, 15);
    req.checkBody('email', 'The email you entered is invalid, please try again.').isEmail();
    req.checkBody('email', 'Email address must be between 4-100 characters long, please try again.').len(4, 100);
    req.checkBody('password', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody("password", "Password must include one lowercase character, one uppercase character, a number, and a special character.").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/, "i");
    req.checkBody('matchPassword', 'Password must be between 8-100 characters long.').len(8, 100);
    req.checkBody('matchPassword', 'Passwords do not match, please try again.').equals(req.body.password);
    req.checkBody('username', 'Username can only contain letters, numbers, or underscores.').matches(/^[A-Za-z0-9_-]+$/, 'i');

    const errors = req.validationErrors();

    if (errors) {
      console.log(`errors ${JSON.stringify(errors)}`);
      res.render("login", {
        errors: errors,
        title: "Errors!"
      });
    } else {


      const reqPassword = req.body.password;

      bcrypt.hash(reqPassword, saltRounds, function(err, hash) {
        db.Users.create({
          username: req.body.username,
          email: req.body.email,
          password: hash
        }).then(function(dbResponse) {

          console.log("here something" + JSON.stringify(dbResponse));

          const user_id = dbResponse.id;
          req.login({
            user_id: user_id
          }, err => {
            db.Categories.findAll({}).then(function(dbResults) {
              res.render("store", {
                cat: dbResults
              });
            });

            //res.render("store");
          });
          // res.render("store");


        }).catch(err => {

        });
      });
    }

  });


};

passport.serializeUser(function(user_id, done) {
  done(null, user_id);
});

passport.deserializeUser(function(user_id, done) {
  done(null, user_id);
});