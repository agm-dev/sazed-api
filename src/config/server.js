const express = require('express');
const passport = require('passport');
const router = require('../routes/index');

const app = express();

app.use(passport.initialize());

app.use('/', router);

// handler
app.use((error, req, res, next) => {
  res.json({ status: 500, error: error.message });
});


module.exports = app;
