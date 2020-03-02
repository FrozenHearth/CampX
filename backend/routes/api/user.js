const router = require('express').Router();
const User = require('../../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup The User

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 12).then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      avatarName: req.body.avatarName,
      contactNumber: req.body.contactNumber
    });
    user
      .save()
      .then(user => {
        res.status(201).json({
          message: `User created`,
          user: user
        });
      })
      .catch(err => {
        // if (user.contactNumber == req.body.contactNumber) {
        //   res.status(500).json({
        //     error: `Contact number already exists!`
        //   });
        // }
        res.status(500).json({
          error: err
        });
      });
  });
});

// Login the user

router.post('/login', (req, res, next) => {
  let fetchedUser;
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: 'Auth failed'
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then(result => {
      if (!result) {
        return res.status(402).json({
          message: 'Invalid password'
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
          firstName: fetchedUser.firstName
        },
        process.env.JWT_KEY,
        { expiresIn: '1h' }
      );
      res.status(200).json({
        token: token,
        loggedInUser: fetchedUser
      });
    })
    .catch(err => {
      console.log(err);
      return res.status(403).json({
        error: err,
        message: 'Authentication failed'
      });
    });
});

module.exports = router;
