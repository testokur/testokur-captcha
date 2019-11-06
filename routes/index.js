'use strict';

const router = require('express').Router();

router.use('/', require('./health').default);
router.use('/hc', require('./health').default);
router.use('/captcha', require('./captcha'));
export default router;