var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    expressLayouts = require('express-ejs-layouts'),
    morgan = require('morgan'),
    mongoose = require('mongoose'),
    session = require('express-session');

var PORT = process.env.PORT || 1337;
var MONGOURI = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/wiki'

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(morgan('short'));
app.use(express.static("./public"));

app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
  secret: "hiitsmeimsuchasecret",
  resave: true,
  saveUninitialized: false
}));

// in controller/posts.js we stash all posts routes
var articlesController = require('./controllers/articles.js');
app.use('/articles', articlesController);

var usersController = require('./controllers/users.js');
app.use('/users', usersController);

app.get('/', function (req, res) {
  if(req.session.currentUser) {
    res.render('home', {user : req.session.currentUserId});
  } else {
    res.redirect(301, 'users/login');
  }
  res.render('home');
});

mongoose.connect('mongodb://localhost:27017/wiki');
var db = mongoose.connection;

db.on('error', function () {
  console.log("Database errors!");
});

db.once('open', function () {
  app.listen(PORT, function () {
    console.log("Now listening on port 1337");
  });
});
