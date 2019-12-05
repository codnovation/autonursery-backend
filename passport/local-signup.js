import User from "../models/user";
// const User = require('mongoose').model('ahmad');
const PassportLocalStrategy = require('passport-local').Strategy;


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  const userData = {
    email: email.trim(),
    password: password.trim(),
    firstName: req.body.firstName.trim(),
    lastName: req.body.lastName,
    dateOfBirth: req.body.dateOfBirth,
    phoneNumber: req.body.phoneNumber,
    role: req.body.role,
    children: req.body.children,
    requests: req.body.requests,
    messages: req.body.messages,
    photos: req.body.photos,
    section: req.body.section
  };

  const newUser = new User(userData);
  newUser.save((err) => {
    if (err) { return done(err); }

    return done(null);
  });
});
