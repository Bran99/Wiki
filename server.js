var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    expressLayouts = require('express-ejs-layouts'),
    morgan = require('morgan'),
    mongoose = require('mongoose');

app.set('views', './views');
app.set('view engine', 'ejs');

app.use(morgan('short'));
app.use(express.static("./public"));

app.use(expressLayouts);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// in controller/posts.js we stash all posts routes
var articlesController = require('./controllers/articles.js');
app.use('/articles', articlesController);

app.get('/', function (req, res) {
  res.render('index.ejs');
});

mongoose.connect('mongodb://localhost:27017/wiki');
var db = mongoose.connection;

db.on('error', function () {
  console.log("Database errors!");
});

db.once('open', function () {
  app.listen(1337, function () {
    console.log("Now listening on port 1337");
  });
});
