var express = require('express'),
    router = express.Router(),
    User = require('../models/user.js'),
    bcrypt = require('bcrypt'),
    salt = bcrypt.genSaltSync(10);

// remember, every route has /posts before it in here...

router.get('/', function (req, res) {
  if(req.session.currentUser) {
    res.redirect(301, '/articles');
  } else {
    res.redirect(301, '/users/login');
  };
});

// LOGIN
router.get('/login', function (req, res) {
  User.find({}, function (err, usersArray) {
    if (err) {
      console.log(err);
    } else {
      res.render('users/login');
    };
  });
});

router.post('/login', function (req, res) {
  User.findOne({userName : req.body.users.userName}, function (err, user) {
    if(user && bcrypt.compareSync(req.body.users.password, user.password)) {
      req.session.currentUser = user.userName;
      req.session.currentName = user.name;
      req.session.currentUserId = user._id;
      res.redirect(301, '/');
    } else {
      res.redirect(301, '/users/login');
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
  newUser.password = bcrypt.hashSync(newUser.password, salt);

  newUser.save(function (err, user) {
    if (err) {
      console.log(err);
    } else {
      req.session.currentUser = req.body.user.username;
      res.redirect(301, '/users/login');
    };
  });
});

// SHOW
router.get('/:id', function (req, res) {
  if(req.session.currentUser) {
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
  if(req.session.currentUser) {
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
  if(req.session.currentUser) {
    User.findById(req.params.id, function (err, user) {
      if (err) {
        console.log(err);
      } else {
        res.render('users/edit', { user : user });
      };
    });
  } else {
    res.redirect('/');
  }
});

// UPDATE
router.patch('/:id', function (req, res) {
  req.body.password = bcrypt.hashSync(newUser.password, salt);
  User.update({_id : req.params.id}, req.body.user, function (err, result) {
    if(err) {
      console.log(err);
    } else {
      res.redirect(301, '/');
    };
  });
});



module.exports = router;
