const express = require('express');
const passport = require('../config/passport');

const router = express.Router();

router.get('/status', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({ status: 'OK', user: req.user });
});

module.exports = router;
