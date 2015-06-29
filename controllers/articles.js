var express = require('express'),
    router = express.Router(),
    Article = require('../models/article.js').Article,
    Section = require('../models/article.js').Section;

// remember, every route has /posts before it in here...

// INDEX
router.get('/', function (req, res) {
  Article.find({}, function (err, articlesArray) {
    if (err) {
      console.log(err);
    } else {
      res.render('articles/index', { articles : articlesArray });
    };
  });
});

// NEW
router.get('/new', function (req, res) {
  res.render('articles/new');
});

// CREATE
router.post('/', function (req, res) {
  var newArticle = new Article(req.body.article);

  newArticle.save(function (err, article) {
    if (err) {
      console.log(err);
    } else {
      res.redirect(301, '/articles');
    };
  });
});

// SHOW
router.get('/:id', function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) {
      console.log(err);
    } else {
      res.render('articles/show', { article : article });
    };
  });
});

// DELETE
router.delete('/:id', function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    if(err) {
      console.log(err);
    } else {
      Article.remove(article);
      res.redirect(301, '/articles');
    };
  });
});

// EDIT
router.get('/:id/edit', function (req, res) {
  Article.findById(req.params.id, function (err, article) {
    if (err) {
      console.log(err);
    } else {
      res.render('articles/edit', { article : article });
    };
  });
});

// UPDATE
router.patch('/:id', function (req, res) {
  Article.update({_id : req.params.id}, req.body.article, function (err, result) {
    if(err) {
      console.log(err);
    } else {
      res.redirect(301, '/articles/' + req.params.id);
    };
  });
});



module.exports = router;
