var express = require('express'),
    router = express.Router(),
    Article = require('../models/user.js');

// remember, every route has /posts before it in here...

// INDEX
router.get('/', function (req, res) {
  User.find({}, function (err, usersArray) {
    if (err) {
      console.log(err);
    } else {
      res.render('users/index', { users : usersArray });
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
      res.redirect(301, '/articles');
    };
  });
});

// SHOW
router.get('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) {
      console.log(err);
    } else {
      res.render('users/show', { user : user });
    };
  });
});

// DELETE
router.delete('/:id', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if(err) {
      console.log(err);
    } else {
      User.remove(user);
      res.redirect(301, '/users');
    };
  });
});

// EDIT
router.get('/:id/edit', function (req, res) {
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log(err);
    } else {
      res.render('users/edit', { user : user });
    };
  });
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
