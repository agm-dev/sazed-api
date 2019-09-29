const express = require('express');
const authRouter = require('./auth.routes');

const router = express.Router();

router.use('/', authRouter);
router.use('/', (req, res) => {
  console.log(req.user);
  res.json(req.user);
});

module.exports = router;
