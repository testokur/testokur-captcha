'use strict';

const router = require('express').Router();

router.get('/', (req, res) => {
  res.status(200).send('Healthy!')
});

export default router;