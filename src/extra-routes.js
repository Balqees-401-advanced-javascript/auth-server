'use strict';
const express = require('express');
const router = express.Router();
const bearerMiddleware = require('../src/auth/middleware/bearer');

router.get('/secret', bearerMiddleware, (req,res) => {
  console.log(req.user);
  res.status(200).json(req.user);
} );

module.exports = router;