const express = require('express');
const passport = require('../config/passport');
const { generateJWT } = require('../utils/jwt');

const router = express.Router();

// TODO: middleware
const generateToken = (req, res) => {
  const token = generateJWT(req.user.id, {
    name: req.user.name,
    email: req.user.email,
  });
  console.log('generate token middleware', token);
  res.redirect(`/?access_token=${token}`);
};

router.get('/api/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email', 'openid'],
  session: false,
}));

router.get(
  '/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  generateToken,
);

// TODO: temporal route
router.get('/login', (req, res) => {
  res.json({
    token: generateJWT(1234567890),
  });
});

router.get('/', (req, res) => res.json({ holi: 'mundo' }));

module.exports = router;
