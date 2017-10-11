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
    res.render("login", {
      title: "Please Log in or Sign Up"
    });
  });

  app.get("/store", authenticationMiddleware(), function(req, res) {
    db.Categories.findAll({}).then(function(dbResults) {
      console.log("********\n" + dbResults + "~~~~~~~")
      res.render("store", {
        cat: dbResults
      });
    });

  });

  app.get("/store/:categoryName", authenticationMiddleware(), function(req, res) {

    db.Categories.findAll({}).then(function(dbResults) {
      res.render("store", {
        cat: dbResults,
        title: req.param.categoryName
      });
    });
  });

  app.get("/admin", function(req, res) {

    if (req.user.user === "admin") {
      db.Categories.findAll({}).then(function(dbResults) {
        res.render("adminCreateCategory", {
          categories: dbResults
        });
      });
    } else {
      res.redirect("/")
    }
  });


  app.get("/admin/remove-category", function(req, res) {
    if (req.user.user === "admin") {
      db.Categories.findAll({}).then(function(dbResults) {
        res.render("adminDeleteCategory", {
          categories: dbResults
        });
      });
    } else {
      res.redirect("/")
    }
  });

  app.get("/admin/add-product", function(req, res) {
    if (req.user.user === "admin") {
      db.Product.findAll({
        include: [{model: db.Categories}]
      }).then(function(allProducts) {
        db.Categories.findAll({
          order: [['name', 'DESC']]
          
        }).then(function(allCat) {
          console.log(`********** ${JSON.stringify(allProducts)}`);
          res.render("adminAddProduct", {
            products: allProducts,
            categories: allCat
          });
        });
      });
    } else {
      res.redirect("/")
    }
  });

  app.get("/admin/remove-product", function(req, res) {
    if (req.user.user === "admin") {
      db.Product.findAll({}).then(function(allProducts) {
        db.Categories.findAll({
          order: [['name', 'DESC']]
        }).then(function(allCat) {
          res.render("adminRemoveProduct");
        });
      });
    } else {
      res.redirect("/")
    }
  });

  app.delete("/admin/remove-category/:id", function(req, res) {

    if (req.user.user === "admin") {
      db.Categories.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(function(rowDeleted) {
          db.Categories.findAll({}).then(function(dbResults) {
            res.render("adminDeleteCategory", {
              categories: dbResults,
              success: ` ${rowDeleted.categories} removed from database`
            });
          })
        });
    } else {
      res.redirect("/")
    }
  });

  app.post("/admin/add-category", function(req, res) {

    if (req.user.user === "admin") {
      db.Categories.create(req.body)
        .then(function(newCat) {
          db.Categories.findAll({}).then(function(dbResults) {
            res.render("adminCreateCategory", {
              categories: dbResults,
              success: ` ${newCat.categories} added to database`
            });
          }).catch(function(err) {
            res.redirect("/");
          });
        });
    } else {
      res.redirect("/")
    }

  });

  app.post("/admin/add-product", function(req, res) {

    if (req.user.user === "admin") {
      console.log(`*************** ${JSON.stringify(req.body)}`);
      db.Product.create(req.body)
        .then(function(newProduct) {
          db.Product.findAll({
            order: [['name', 'DESC']],
            include: [{ model: db.Categories }]
          }).then(function(dbResults) {

            db.Categories.findAll({}).then(function(allCat) {
              res.render("adminAddProduct", {
                products: dbResults,
                categories : allCat,
                success: ` ${newProduct.productName} added to database`
              });
            });

          }).catch(function(err) {
            res.redirect("/");
          });
        });
    } else {
      res.redirect("/")
    }

  });

  app.delete("/admin/remove-product/:id", function(req, res) {

    if (req.user.user === "admin") {
      db.Product.destroy({
          where: {
            id: req.params.id
          }
        })
        .then(function(rowDeleted) { 
            res.json(rowDeleted);         
        });
    } else {
      res.redirect("/")
    }
  });



  function authenticationMiddleware() {
    return (req, res, next) => {
      console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);

      if (req.isAuthenticated()) return next();
      res.render('login', {
        title: "Error Loging"
      })
    }
  }



};