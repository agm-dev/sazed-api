const express = require('express');
const passport = require('passport');
const router = require('../routes/index');

const app = express();

app.use(passport.initialize());
app.use(passport.session());

app.use('/', router);

app.get('/status', (req, res) => {
  res.json({ status: 'OK' });
});


module.exports = app;
