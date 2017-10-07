// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var expressValidator = require('express-validator');
var cookieParser = require('cookie-parser');
var randomstring = require("randomstring"); 
var path = require('path');

// Authentication Packages 
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt");
var SequelizeStore = require('connect-session-sequelize')(session.Store);


// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.use(expressValidator());

// Static directory
app.use(express.static(path.join(__dirname,"public")));


// Authentication has to be used after cookieParse 
app.use( session({
  secret: randomstring.generate(),
  resave: false,
  saveUninitialized: false,
  store : new SequelizeStore({
    db: db.sequelize
  })
  //cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// Set Handlebars.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


passport.use(new LocalStrategy(
  function(username, password, done) {

    db.Users.findOne( {where : { username: username }}).then(function (user) {

      console.log("\n" + user.username + "\n" + password + "\n");
      if (!user.username) {
        return done(null, false, { message: 'Incorrect username.' });
      }


      bcrypt.compare(password, user.password, function(err, response) {
        if (response) return done(null, {user_id : user.id});
        else return done(null, false);

        console.log(response);
    
      });

      
    });
  }
));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function() {

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

});
