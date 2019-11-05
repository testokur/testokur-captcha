const router = require('express').Router();

router.use('/', require('./health'));
router.use('/hc', require('./health'));
router.use('/captcha', require('./captcha'));
module.exports = router;