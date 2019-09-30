const express = require('express');
const authRouter = require('./auth.routes');
const miscRouter = require('./misc.routes');

const router = express.Router();

router.use('/', authRouter);
router.use('/', miscRouter);

module.exports = router;
