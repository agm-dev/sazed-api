const express = require('express');
const passport = require('../config/passport');

const router = express.Router();

router.get('/api/auth/google', passport.authenticate('google', {
  scope: ['profile'],
  session: false,
}));

router.get(
  '/api/auth/google/callback',
  passport.authenticate(
    'google',
    { failureRedirect: '/login' },
  ),
  (req, res) => {
    res.redirect('/');
  },
);

module.exports = router;
