var express = require('express'),
    router = express.Router(),
    Article = require('../models/article.js').Article,
    Section = require('../models/article.js').Section,
    marked = require('marked');

// remember, every route has /posts before it in here...
router.use(function (req, res, next) {
  res.locals.marked = marked;
  next();
});


// INDEX
router.get('/', function (req, res) {
  if(req.session.currentUser) {
    Article.find({}, function (err, articlesArray) {
      if (err) {
        console.log(err);
      } else {
        res.render('articles/index', { articles : articlesArray });
      };
    });
  } else {
    res.redirect(301, '/users/login');
  };
});

// NEW
router.get('/new', function (req, res) {
  if(req.session.currentUser) {
    res.render('articles/new', { user : req.session.currentName });
  } else {
    res.redirect(301, '/users/login');
  };
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
  if(req.session.currentUser) {
    Article.findById(req.params.id, function (err, article) {
      if(err) {
        console.log(err);
      } else {
        
        var navData = article.content.map(function (section, i) {
        	var linkTitle = section.title;
        	var linkID = "section-" + i;

        	return {
        		title: linkTitle,
        		id: linkID
        	};
        });

        article.navData = navData;
        res.render('articles/show', { article : article });
      };
    });
  } else {
    res.redirect(301, '/users/login');
  };
});

// DELETE
router.delete('/:id', function (req, res) {
  Article.remove({_id : req.params.id}, function (err, result) {
    if(err) {
      console.log(err);
    } else {
      res.redirect(301, '/articles');
    };
  });
});

// EDIT
router.get('/:id/edit', function (req, res) {
  if(req.session.currentUser) {
    Article.findById(req.params.id, function (err, article) {
      if (err) {
        console.log(err);
      } else {
        article.user = req.session.currentName;
        res.render('articles/edit', { article : article });
      };
    });
  } else {
    res.redirect(301, '/users/login');
  };
});

// UPDATE
router.patch('/:id', function (req, res) {
  req.body.article.date = Date.now();
  req.body.article.updates.push(req.session.currentName);
  console.log(req.body.article);

  Article.update({_id : req.params.id}, req.body.article, function (err, result) {
    if(err) {
      console.log(err);
    } else {
      res.redirect(301, '/articles/' + req.params.id);
    };
  });
});



module.exports = router;
