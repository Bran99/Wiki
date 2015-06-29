var express = require('express'),
    router = express.Router(),
    Article = require('../models/user.js');

// remember, every route has /posts before it in here...

// INDEX
router.get('/login', function (req, res) {
  User.find({}, function (err, usersArray) {
    if (err) {
      console.log(err);
    } else {
      res.render('users/login');
    };
  });
});

// NEW
router.get('/new', function (req, res) {
  res.render('users/new');
});

// CREATE
router.post('/', function (req, res) {
  var newUser = new User(req.body.user);

  newUser.save(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      session.currentUser = req.body.user.username;
      res.redirect(301, '/users/login');
    };
  });
});

// SHOW
router.get('/:id', function (req, res) {
  if(session.currentUser) {
    User.findById(req.params.id, function (err, user) {
      if(err) {
        console.log(err);
      } else {
        res.render('users/show', { user : user });
      };
    });
  } else {
    res.redirect('/users/login');
  };
});

// DELETE
router.delete('/:id', function (req, res) {
  if(session.currentUser) {
    User.findById(req.params.id, function (err, user) {
      if(err) {
        console.log(err);
      } else {
        User.remove(user);
        res.redirect(301, '/users');
      };
    });
  } else {
    res.redirect('/users/login');
  }
});

// EDIT
router.get('/:id/edit', function (req, res) {
  if(session.currentUser) {
    User.findById(req.params.id, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.render('users/edit', { user : user });
      };
    });
  } else {
    res.redirect('/users/login');
  }
});

// UPDATE
router.patch('/:id', function (req, res) {
  User.update({_id : req.params.id}, req.body.article, function (err, result) {
    if(err) {
      console.log(err);
    } else {
      res.redirect(301, '/users/' + req.params.id);
    };
  });
});



module.exports = router;
